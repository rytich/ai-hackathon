import assert from "node:assert/strict";
import test from "node:test";

import { configureCustomDomain } from "./configure-cloudflare-pages-domain.mjs";

function response(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return body;
    },
  };
}

test("creates the Pages domain and a proxied CNAME when neither exists", async () => {
  const requests = [];
  const fetchFn = async (url, options) => {
    requests.push({ url, options });

    if (url.endsWith("/domains")) {
      return response(200, { success: true, result: { name: "ai.microdotz.net" } });
    }
    if (url.includes("/dns_records?")) {
      return response(200, { success: true, result: [] });
    }
    if (url.endsWith("/dns_records")) {
      return response(200, { success: true, result: { id: "record-1" } });
    }
    if (url.endsWith("/domains/ai.microdotz.net")) {
      return response(200, { success: true, result: { status: "active", certificate_authority: "lets_encrypt" } });
    }

    throw new Error(`Unexpected request: ${url}`);
  };

  const result = await configureCustomDomain({
    accountId: "account-id",
    zoneId: "zone-id",
    apiToken: "token",
    project: "agentic-framework",
    domain: "ai.microdotz.net",
    fetchFn,
  });

  assert.deepEqual(result, { domain: "ai.microdotz.net", dnsAction: "created", pagesStatus: "active" });
  assert.deepEqual(requests.map(({ url, options }) => ({ url, method: options.method })), [
    {
      url: "https://api.cloudflare.com/client/v4/accounts/account-id/pages/projects/agentic-framework/domains",
      method: "POST",
    },
    {
      url: "https://api.cloudflare.com/client/v4/zones/zone-id/dns_records?name=ai.microdotz.net",
      method: "GET",
    },
    {
      url: "https://api.cloudflare.com/client/v4/zones/zone-id/dns_records",
      method: "POST",
    },
    {
      url: "https://api.cloudflare.com/client/v4/accounts/account-id/pages/projects/agentic-framework/domains/ai.microdotz.net",
      method: "GET",
    },
  ]);
  assert.deepEqual(JSON.parse(requests[2].options.body), {
    type: "CNAME",
    name: "ai.microdotz.net",
    content: "agentic-framework.pages.dev",
    proxied: true,
    ttl: 1,
  });
});

test("updates an existing CNAME that does not point to the Pages project", async () => {
  const requests = [];
  const fetchFn = async (url, options) => {
    requests.push({ url, options });

    if (url.endsWith("/domains")) {
      return response(200, { success: true, result: { name: "ai.microdotz.net" } });
    }
    if (url.includes("/dns_records?")) {
      return response(200, {
        success: true,
        result: [{ id: "record-1", type: "CNAME", name: "ai.microdotz.net", content: "old.pages.dev", proxied: false }],
      });
    }
    if (url.endsWith("/dns_records/record-1")) {
      return response(200, { success: true, result: { id: "record-1" } });
    }
    if (url.endsWith("/domains/ai.microdotz.net")) {
      return response(200, { success: true, result: { status: "active", certificate_authority: "lets_encrypt" } });
    }

    throw new Error(`Unexpected request: ${url}`);
  };

  const result = await configureCustomDomain({
    accountId: "account-id",
    zoneId: "zone-id",
    apiToken: "token",
    project: "agentic-framework",
    domain: "ai.microdotz.net",
    fetchFn,
  });

  assert.deepEqual(result, { domain: "ai.microdotz.net", dnsAction: "updated", pagesStatus: "active" });
  assert.equal(requests[2].options.method, "PUT");
  assert.deepEqual(JSON.parse(requests[2].options.body), {
    type: "CNAME",
    name: "ai.microdotz.net",
    content: "agentic-framework.pages.dev",
    proxied: true,
    ttl: 1,
  });
});

test("leaves an already-correct CNAME unchanged", async () => {
  const requests = [];
  const fetchFn = async (url, options) => {
    requests.push({ url, options });

    if (url.endsWith("/domains")) {
      return response(200, { success: true, result: { name: "ai.microdotz.net" } });
    }
    if (url.includes("/dns_records?")) {
      return response(200, {
        success: true,
        result: [{ id: "record-1", type: "CNAME", name: "ai.microdotz.net", content: "agentic-framework.pages.dev", proxied: true }],
      });
    }
    if (url.endsWith("/domains/ai.microdotz.net")) {
      return response(200, { success: true, result: { status: "active", certificate_authority: "lets_encrypt" } });
    }

    throw new Error(`Unexpected request: ${url}`);
  };

  const result = await configureCustomDomain({
    accountId: "account-id",
    zoneId: "zone-id",
    apiToken: "token",
    project: "agentic-framework",
    domain: "ai.microdotz.net",
    fetchFn,
  });

  assert.deepEqual(result, { domain: "ai.microdotz.net", dnsAction: "unchanged", pagesStatus: "active" });
  assert.equal(requests.length, 3);
});

test("rejects an existing non-CNAME record instead of overwriting it", async () => {
  const fetchFn = async (url) => {
    if (url.endsWith("/domains")) {
      return response(200, { success: true, result: { name: "ai.microdotz.net" } });
    }
    if (url.includes("/dns_records?")) {
      return response(200, {
        success: true,
        result: [{ id: "record-1", type: "A", name: "ai.microdotz.net", content: "192.0.2.1", proxied: true }],
      });
    }

    throw new Error(`Unexpected request: ${url}`);
  };

  await assert.rejects(
    configureCustomDomain({
      accountId: "account-id",
      zoneId: "zone-id",
      apiToken: "token",
      project: "agentic-framework",
      domain: "ai.microdotz.net",
      fetchFn,
    }),
    /CNAME ではない既存 DNS レコード/,
  );
});
