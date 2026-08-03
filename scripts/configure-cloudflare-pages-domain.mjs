#!/usr/bin/env node
import { pathToFileURL } from "node:url";

const API_BASE_URL = "https://api.cloudflare.com/client/v4";

function apiError(response, payload) {
  const detail = payload?.errors?.map((error) => error.message).filter(Boolean).join("; ")
    || payload?.messages?.map((message) => message.message).filter(Boolean).join("; ")
    || "詳細は Cloudflare の応答を確認してください";
  const error = new Error(`Cloudflare API request failed (${response.status}): ${detail}`);
  error.status = response.status;
  return error;
}

async function cloudflareRequest({ fetchFn, apiToken, path, method, body }) {
  const response = await fetchFn(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json();

  if (!response.ok || payload.success === false) {
    throw apiError(response, payload);
  }

  return payload.result;
}

function desiredRecord(domain, project) {
  return {
    type: "CNAME",
    name: domain,
    content: `${project}.pages.dev`,
    proxied: true,
    ttl: 1,
  };
}

function isExpectedCname(record, target) {
  return record.type === "CNAME"
    && record.content.toLowerCase() === target.content.toLowerCase()
    && record.proxied === true;
}

export async function configureCustomDomain({
  accountId,
  zoneId,
  apiToken,
  project,
  domain,
  fetchFn = fetch,
}) {
  const record = desiredRecord(domain, project);
  const pagesDomainPath = `/accounts/${encodeURIComponent(accountId)}/pages/projects/${encodeURIComponent(project)}/domains/${encodeURIComponent(domain)}`;

  try {
    await cloudflareRequest({
      fetchFn,
      apiToken,
      path: pagesDomainPath,
      method: "GET",
    });
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
    await cloudflareRequest({
      fetchFn,
      apiToken,
      path: `/accounts/${encodeURIComponent(accountId)}/pages/projects/${encodeURIComponent(project)}/domains`,
      method: "POST",
      body: { name: domain },
    });
  }

  const existingRecords = await cloudflareRequest({
    fetchFn,
    apiToken,
    path: `/zones/${encodeURIComponent(zoneId)}/dns_records?name=${encodeURIComponent(domain)}`,
    method: "GET",
  });

  let dnsAction;
  if (existingRecords.length === 0) {
    await cloudflareRequest({
      fetchFn,
      apiToken,
      path: `/zones/${encodeURIComponent(zoneId)}/dns_records`,
      method: "POST",
      body: record,
    });
    dnsAction = "created";
  } else if (existingRecords.length !== 1 || existingRecords[0].type !== "CNAME") {
    throw new Error(`${domain} には CNAME ではない既存 DNS レコードがあります。手動で内容を確認してください。`);
  } else if (isExpectedCname(existingRecords[0], record)) {
    dnsAction = "unchanged";
  } else {
    await cloudflareRequest({
      fetchFn,
      apiToken,
      path: `/zones/${encodeURIComponent(zoneId)}/dns_records/${encodeURIComponent(existingRecords[0].id)}`,
      method: "PUT",
      body: record,
    });
    dnsAction = "updated";
  }

  const pagesDomain = await cloudflareRequest({
    fetchFn,
    apiToken,
    path: pagesDomainPath,
    method: "GET",
  });
  return { domain, dnsAction, pagesStatus: pagesDomain.status };
}

function requiredEnvironment(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} を環境変数に設定してください。`);
  }
  return value;
}

async function main() {
  const result = await configureCustomDomain({
    accountId: requiredEnvironment("CLOUDFLARE_ACCOUNT_ID"),
    zoneId: requiredEnvironment("CLOUDFLARE_ZONE_ID"),
    apiToken: requiredEnvironment("CLOUDFLARE_API_TOKEN"),
    project: process.env.CF_PAGES_PROJECT || "agentic-framework",
    domain: process.env.CF_CUSTOM_DOMAIN || "ai.microdotz.net",
  });
  console.log(`Cloudflare custom domain ${result.domain}: DNS ${result.dnsAction}, Pages ${result.pagesStatus}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
