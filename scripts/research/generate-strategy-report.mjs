import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const VOL5 = {
  title: "第5回 Agentic AI Hackathon with Google Cloud",
  sourceUrl: "https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol5",
  checkedAt: "2026-09-10",
  period: "2026-08-20〜2026-10-15（提出締切 23:59）",
  finalPitch: "2026-12-01",
  judgingCriteria: [
    "課題の新規性と解決策の有効性",
    "自律性・エージェントらしさ",
    "実装品質と拡張性",
  ],
  submissionRequirements: [
    "GitHubリポジトリ連携を行う。",
    "動作確認可能なデプロイURLを提出する。認証が必要な場合は、手順にテストアカウントとサンプルデータを記載する。",
    "ユーザー・課題・解決策を含む説明、システムアーキテクチャ図、約3分の自作デモ動画を提出し、動画はYouTubeで公開する。",
    "GitHubリポジトリの状態・連携とデプロイを12月1日まで維持し、提出時点のデフォルトブランチを保持する。",
  ],
  runtimeProducts: [
    "App Engine",
    "Compute Engine",
    "Google Kubernetes Engine (GKE)",
    "Cloud Run",
    "Cloud Run functions",
    "Cloud TPU / GPU",
  ],
  aiProducts: [
    "Gemini Enterprise Agent Platform（旧称 Vertex AI）",
    "Gemini API",
    "Gemma",
    "Nano Banana",
    "Agent Development Kit (ADK)",
    "Speech-to-Text / Text-to-Speech API",
    "Vision AI",
    "Natural Language AI",
    "Translation AI",
  ],
};

const DOMAIN_RULES = [
  ["医療・健康", /医療|健康|ヘルス|病院|診療|問診|看護|介護|リハビリ|メンタル|患者|医師|医学|病気|手術|解剖|睡眠|薬|認知症/gi],
  ["福祉・公共", /福祉|行政|公共|支援制度|政策|選挙|法律|法務|労働相談|補助金|防災|自治体/gi],
  ["教育・学習", /教育|学習|勉強|学校|学生|教師|先生|授業|受験|英語|IELTS|子ども|児童|教材|研修/gi],
  ["業務・経営", /業務|企業|営業|採用|経営|会議|人事|マーケ|顧客|問い合わせ|契約|請求|バックオフィス|企業調査/gi],
  ["開発・IT運用", /開発|コード|プログラ|エンジニア|GitHub|テスト|デバッグ|監視|クラウド|インフラ|セキュリティ|脆弱性/gi],
  ["創作・メディア", /創作|クリエイ|画像|動画|音楽|漫画|小説|アート|デザイン|コンテンツ|ポッドキャスト|ゲーム/gi],
  ["生活・家事・買い物", /生活|家事|料理|レシピ|買い物|商品|家計|育児|家族|住まい|服|本|ペット/gi],
  ["地域・移動・観光", /地域|地方|観光|旅行|移動|交通|経路|電車|バス|ホテル|地図/gi],
  ["環境・一次産業", /環境|農業|漁業|林業|自然|気候|省エネ|廃棄|リサイクル|植物|野菜|生物/gi],
  ["コミュニケーション", /コミュニケーション|会話|チャット|相談|対話|交流|コミュニティ|マッチング|SNS/gi],
];

const CAPABILITY_RULES = [
  ["行動・ワークフロー", /自動|実行|操作|予約|管理|監視|通知|ワークフロー|タスク|支援|代行/gi],
  ["知識・調査・RAG", /検索|調査|知識|RAG|文書|ドキュメント|回答|要約|分析|データ/gi],
  ["音声・対話", /音声|会話|対話|チャット|Speech|Voice|電話/gi],
  ["画像・映像・マルチモーダル", /画像|映像|動画|カメラ|写真|Vision|マルチモーダル|アバター/gi],
  ["個別最適化", /個別|パーソナ|あなた専用|最適|推薦|レコメンド|伴走/gi],
  ["マルチエージェント", /マルチエージェント|複数.*エージェント|エージェント.*協調|AIチーム/gi],
  ["リアルタイム", /リアルタイム|Live API|即時|常時|リアルタイム/gi],
  ["物理・空間連携", /\b(?:IoT|AR|VR)\b|ロボット|センサー|位置情報|ブロック|実世界|空間/gi],
];

function searchableText(project) {
  return [project.project_name, project.project_description, project.article_title]
    .filter(Boolean)
    .join(" ");
}

function keywordScore(text, pattern) {
  return new Set([...text.matchAll(pattern)].map((match) => match[0].toLowerCase())).size;
}

export function classifyDomain(project) {
  const text = searchableText(project);
  const ranked = DOMAIN_RULES.map(([name, pattern], index) => ({
    name,
    index,
    score: keywordScore(text, pattern),
  })).sort((left, right) => right.score - left.score || left.index - right.index);
  return ranked[0].score > 0 ? ranked[0].name : "その他・分類不能";
}

export function classifyCapabilities(project) {
  const text = searchableText(project);
  return CAPABILITY_RULES
    .filter(([, pattern]) => keywordScore(text, pattern) > 0)
    .map(([name]) => name);
}

function percentage(numerator, denominator) {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function summarizeGroup(projects, name) {
  const awarded = projects.filter((project) => project.awards.length > 0).length;
  return {
    name,
    projects: projects.length,
    awarded,
    awardRate: percentage(awarded, projects.length),
  };
}

export function analyzeProjects(projects) {
  const awardedProjects = projects.filter((project) => project.awards.length > 0);
  const totals = {
    projects: projects.length,
    awarded: awardedProjects.length,
    individual: projects.filter((project) => project.participant_type === "individual").length,
    team: projects.filter((project) => project.participant_type === "team").length,
  };
  const byEdition = [1, 2, 3, 4].map((edition) => {
    const records = projects.filter((project) => project.edition === edition);
    return { edition, ...summarizeGroup(records, `第${edition}回`) };
  });
  const domains = [...DOMAIN_RULES.map(([name]) => name), "その他・分類不能"]
    .map((name) => summarizeGroup(projects.filter((project) => classifyDomain(project) === name), name))
    .filter((item) => item.projects > 0)
    .map((item) => ({
      ...item,
      projectShare: percentage(item.projects, totals.projects),
      awardShare: percentage(item.awarded, totals.awarded),
      awardIndex:
        item.projects > 0 && totals.awarded > 0
          ? Math.round((percentage(item.awarded, totals.awarded) / percentage(item.projects, totals.projects)) * 100) / 100
          : 0,
    }))
    .sort((left, right) => right.projects - left.projects || left.name.localeCompare(right.name, "ja"));
  const capabilities = CAPABILITY_RULES.map(([name]) => {
    const records = projects.filter((project) => classifyCapabilities(project).includes(name));
    return summarizeGroup(records, name);
  })
    .filter((item) => item.projects > 0)
    .sort((left, right) => right.projects - left.projects || left.name.localeCompare(right.name, "ja"));
  const participant = ["individual", "team"].map((type) => {
    const records = projects.filter((project) => project.participant_type === type);
    return { type, ...summarizeGroup(records, type === "team" ? "チーム" : "個人") };
  });
  const technologies = new Map();
  for (const project of awardedProjects) {
    for (const technology of project.technologies) {
      technologies.set(technology, (technologies.get(technology) ?? 0) + 1);
    }
  }
  return {
    totals,
    byEdition,
    domains,
    capabilities,
    participant,
    champions: awardedProjects
      .filter((project) => project.awards.some((award) => /最優秀賞|^🥇/.test(award)))
      .sort((left, right) => left.edition - right.edition),
    technologies: [...technologies.entries()]
      .map(([name, awarded]) => ({ name, awarded }))
      .sort((left, right) => right.awarded - left.awarded || left.name.localeCompare(right.name, "ja")),
  };
}

function escapeHtml(value) {
  return String(value ?? "").trim().replace(/[ \t]+\r?\n/g, "\n")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mdValue(value) {
  if (value == null || (Array.isArray(value) && value.length === 0)) return "不明・未確認";
  const text = (Array.isArray(value) ? value.join(" / ") : String(value)).trim();
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("\r", " ")
    .replaceAll("\n", " ")
    .replaceAll("|", "\\|");
}

function assertHttpUrl(value, field) {
  if (value == null || value === "") return;
  let parsed;
  try {
    parsed = new URL(String(value));
  } catch {
    throw new Error(`${field} must be an HTTP(S) URL`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${field} must be an HTTP(S) URL`);
  }
}

function assertReportDataset(dataset) {
  if (!dataset || !Array.isArray(dataset.projects)) {
    throw new Error("dataset.projects must be an array");
  }
  for (const [index, project] of dataset.projects.entries()) {
    assertHttpUrl(project.article_url, `projects[${index}].article_url`);
    assertHttpUrl(project.source_url, `projects[${index}].source_url`);
    for (const [urlIndex, url] of (project.github_urls ?? []).entries()) {
      assertHttpUrl(url, `projects[${index}].github_urls[${urlIndex}]`);
    }
    for (const [urlIndex, url] of (project.demo_urls ?? []).entries()) {
      assertHttpUrl(url, `projects[${index}].demo_urls[${urlIndex}]`);
    }
  }
}

function participantLabel(project) {
  if (project.participant_type === "team") return "チーム";
  if (project.participant_type === "individual") return "個人";
  return "未確認";
}

function topDomainSignals(analysis) {
  return analysis.domains
    .filter((item) => item.projects >= 5 && item.awarded > 0)
    .sort((left, right) => right.awardIndex - left.awardIndex || right.awarded - left.awarded)
    .slice(0, 3);
}

function crowdedDomains(analysis) {
  return [...analysis.domains].sort((left, right) => right.projects - left.projects).slice(0, 3);
}

function strategyMarkdown(analysis) {
  const top = topDomainSignals(analysis);
  const crowded = crowdedDomains(analysis);
  const team = analysis.participant.find((item) => item.type === "team");
  const individual = analysis.participant.find((item) => item.type === "individual");
  return [
    "## 第5回に向けた企画判断",
    "",
    "### まず満たすべき公式評価軸",
    "",
    ...VOL5.judgingCriteria.map((criterion, index) => `${index + 1}. **${criterion}**`),
    "",
    "過去4回の集計はアイデア探索の補助線であり、第5回の新審査基準に対する採点結果ではない。以下の受賞率はキーワード分類との相関であり、受賞理由の因果を証明するものではない。",
    "",
    "### 過去データから得られるシグナル",
    "",
    `- 応募形態別: チーム ${team.projects}件中${team.awarded}件受賞（${team.awardRate}%）、個人 ${individual.projects}件中${individual.awarded}件受賞（${individual.awardRate}%）。人数そのものではなく、実装・検証・デモを分担できる体制設計の参考値とする。`,
    `- 比較的受賞側へ偏った領域（5件以上）: ${top.map((item) => `${item.name} ${item.projects}件中${item.awarded}件（受賞指数${item.awardIndex}）`).join("、") || "該当なし"}。`,
    `- 提出が多い領域: ${crowded.map((item) => `${item.name} ${item.projects}件`).join("、")}。この領域を選ぶ場合、対象ユーザー、未解決の瞬間、固有データ、評価指標のいずれかで明確な差別化が必要。`,
    "- 技術欄は受賞32件の記事だけを限定語彙で確認しているため、技術の受賞率や非受賞作との差は算出できない。技術名の多さではなく、課題解決と管理された自律性を実証する構成を優先する。",
    "",
    "### 優勝を狙う企画ゲート",
    "",
    "1. **未解決課題**: 特定利用者の頻度・損失・既存代替策を実測し、『誰が、いつ、なぜ困るか』を一文で言える。",
    "2. **解決の有効性**: エージェント導入前後を、時間・精度・完了率・金額・安全性のうち少なくとも1指標で比較できる。",
    "3. **必然的な自律性**: LLMチャットでは足りない理由があり、観測→判断→ツール実行→結果確認→停止または人間承認のループをデモできる。",
    "4. **制御可能性**: 権限境界、監査ログ、失敗時の停止、プロンプトインジェクション対策、人間へのエスカレーションを設計する。",
    "5. **実用品質**: 実データ・実ユーザーフローで再現可能にし、費用、遅延、可用性、テスト、拡張方法を説明する。",
    "6. **3分デモ**: 最初の30秒で課題と価値を示し、正常系だけでなくエージェントの判断根拠と安全な失敗も見せる。",
    "",
    "### 企画候補の採点テンプレート（各5点）",
    "",
    "| 軸 | 5点の状態 | 証拠 |",
    "| --- | --- | --- |",
    "| 課題の新規性 | 既存手段が見落とす具体的な未解決場面がある | ユーザー観察・一次情報 |",
    "| 解決策の有効性 | ベースライン比の改善を計測済み | 比較実験・利用ログ |",
    "| エージェント必然性 | 複数段の判断と行動が価値の中心 | 実行トレース |",
    "| ガバナンス | 権限・監査・停止・攻撃対策が動作する | 失敗デモ・テスト |",
    "| 実装品質 | 実利用可能で、費用・運用・拡張を説明可能 | 稼働URL・設計図・CI |",
    "| プレゼン | 3分で課題→自律行動→成果が伝わる | 台本付きデモ動画 |",
  ].join("\n");
}

export function renderMarkdownContext(dataset) {
  assertReportDataset(dataset);
  const analysis = analyzeProjects(dataset.projects);
  const catalog = dataset.projects.map((project) => {
    const id = `V${project.edition}-${String(project.entry_order).padStart(3, "0")}`;
    return [
      `### ${id} ${mdValue(project.project_name)}`,
      "",
      `- 公式説明: ${mdValue(project.project_description)}`,
      `- 参加形態: ${participantLabel(project)}`,
      `- 参加者・チーム名: ${mdValue(project.participant_name)}`,
      `- 受賞: ${project.awards.length > 0 ? mdValue(project.awards) : "公式結果上は受賞なし"}`,
      `- 主分類（キーワード推定）: ${classifyDomain(project)}`,
      `- 機能シグナル（キーワード推定）: ${mdValue(classifyCapabilities(project))}`,
      `- 記事タイトル: ${mdValue(project.article_title)}`,
      `- 記事URL（文字列保存）: ${mdValue(project.article_url)}`,
      `- GitHub URL: ${mdValue(project.github_urls)}`,
      `- デモURL: ${mdValue(project.demo_urls)}`,
      `- 明示技術: ${mdValue(project.technologies)}`,
      `- 公式一覧URL（文字列保存）: ${mdValue(project.source_url)}`,
      `- 確認日・状態: ${project.checked_at} / ${project.verification_status}`,
      `- 注記: ${mdValue(project.notes)}`,
    ].join("\n");
  });
  return [
    "---",
    "title: 第五回で優勝するための製品企画 AIコンテキスト",
    `date: ${dataset.checked_at}`,
    "status: reference",
    `source_dataset_schema: ${dataset.schema_version}`,
    "---",
    "",
    "# 第五回で優勝するための製品企画 AIコンテキスト",
    "",
    "## 目的",
    "",
    "過去4回の全提出・受賞データと第5回の公式評価軸を、製品企画の仮説生成・競合確認・企画採点に使える形で保持する。外部リンクが失効しても、取得時点の作品名・公式説明・受賞・参加形態・確認済み派生情報はこのファイルだけで読める。",
    "",
    "## 根拠と限界",
    "",
    `- 過去データ確認日: ${dataset.checked_at}。全${analysis.totals.projects}件、受賞${analysis.totals.awarded}件。`,
    `- 第5回ルール確認日: ${VOL5.checkedAt}。公式URL: ${VOL5.sourceUrl}`,
    "- 非受賞作品は公式一覧の名称・説明まで。受賞作品だけ記事本文由来のタイトル・限定技術・GitHub・デモを補足している。",
    "- 分類は作品名・公式説明・記事タイトルへの公開キーワード規則による一次分類であり、意味理解による断定ではない。",
    "- 過去傾向は第5回での受賞を保証しない。第5回は審査軸が刷新されているため、公式基準を優先する。",
    "",
    "## 第5回公式スナップショット",
    "",
    `- 開催期間: ${VOL5.period}`,
    `- 最終ピッチ: ${VOL5.finalPitch}`,
    `- 必須実行基盤（1つ以上）: ${VOL5.runtimeProducts.join(" / ")}`,
    `- 必須AI技術（1つ以上）: ${VOL5.aiProducts.join(" / ")}`,
    "### 失格防止チェック",
    "",
    ...VOL5.submissionRequirements.map((requirement) => `- ${requirement}`),
    "",
    strategyMarkdown(analysis),
    "",
    "## 集計データ",
    "",
    "### 回別",
    "",
    "| 回 | 提出 | 受賞 | 受賞率 |",
    "| --- | ---: | ---: | ---: |",
    ...analysis.byEdition.map((item) => `| 第${item.edition}回 | ${item.projects} | ${item.awarded} | ${item.awardRate}% |`),
    "",
    "### 課題領域（一次分類）",
    "",
    "| 領域 | 提出 | 受賞 | 受賞率 | 提出構成比 | 受賞構成比 | 受賞指数 |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...analysis.domains.map((item) => `| ${item.name} | ${item.projects} | ${item.awarded} | ${item.awardRate}% | ${item.projectShare}% | ${item.awardShare}% | ${item.awardIndex} |`),
    "",
    "### 機能シグナル別比較（複数該当あり）",
    "",
    "| 機能シグナル | 該当提出 | 受賞 | 受賞率 |",
    "| --- | ---: | ---: | ---: |",
    ...analysis.capabilities.map((item) => `| ${item.name} | ${item.projects} | ${item.awarded} | ${item.awardRate}% |`),
    "",
    "### 歴代最優秀賞",
    "",
    ...analysis.champions.map((project) => `- 第${project.edition}回 **${mdValue(project.project_name)}** — ${mdValue(project.project_description)}`),
    "",
    "## 全作品コンテキスト",
    "",
    ...catalog,
    "",
  ].join("\n");
}

function horizontalBars(items, valueKey, label) {
  const width = 720;
  const labelWidth = 175;
  const rowHeight = 34;
  const max = Math.max(...items.map((item) => item[valueKey]), 1);
  return `<svg viewBox="0 0 ${width} ${items.length * rowHeight + 12}" role="img" aria-label="${escapeHtml(label)}">
    ${items.map((item, index) => {
      const y = index * rowHeight + 8;
      const barWidth = Math.max(2, ((width - labelWidth - 70) * item[valueKey]) / max);
      return `<text x="0" y="${y + 16}" class="chart-label">${escapeHtml(item.name)}</text><rect x="${labelWidth}" y="${y}" width="${barWidth}" height="22" rx="6" class="bar"/><text x="${labelWidth + barWidth + 8}" y="${y + 16}" class="chart-value">${item[valueKey]}</text>`;
    }).join("\n")}
  </svg>`;
}

function projectCard(project) {
  const participant = project.participant_name || (project.participant_type === "team" ? "チーム名未確認" : participantLabel(project));
  const awards = project.awards.length > 0 ? project.awards.join(" / ") : "非受賞";
  const capabilities = classifyCapabilities(project);
  const safeUrl = escapeHtml(project.article_url);
  return `<article class="project-card" data-edition="${project.edition}" data-awarded="${project.awards.length > 0}" data-type="${escapeHtml(project.participant_type)}">
    <div class="project-meta"><span>V${project.edition}-${String(project.entry_order).padStart(3, "0")}</span><span>${escapeHtml(classifyDomain(project))}</span><span>${escapeHtml(awards)}</span></div>
    <h3>${escapeHtml(project.project_name)}</h3>
    <p>${escapeHtml(project.project_description || "公式一覧の説明なし")}</p>
    <dl><dt>参加</dt><dd>${escapeHtml(participant)}</dd><dt>機能シグナル</dt><dd>${escapeHtml(capabilities.join(" / ") || "分類不能")}</dd><dt>明示技術</dt><dd>${escapeHtml(project.technologies.join(" / ") || "未確認")}</dd><dt>確認</dt><dd>${escapeHtml(project.checked_at)} / ${escapeHtml(project.verification_status)}</dd></dl>
    <p class="url-label">保存URL</p><a href="${safeUrl}" rel="noreferrer">${safeUrl}</a>
  </article>`;
}

function championCard(project) {
  const description = project.project_description || "公式一覧の説明なし";
  const shortened = description.length > 180 ? `${description.slice(0, 180)}…` : description;
  return `<article class="champion"><div class="champion-edition">第${project.edition}回</div><h3>${escapeHtml(project.project_name)}</h3><p>${escapeHtml(shortened)}</p><div class="project-meta"><span>${escapeHtml(classifyDomain(project))}</span><span>${escapeHtml(classifyCapabilities(project).join(" / ") || "機能分類不能")}</span></div></article>`;
}

export function renderHtmlReport(dataset) {
  assertReportDataset(dataset);
  const analysis = analyzeProjects(dataset.projects);
  const team = analysis.participant.find((item) => item.type === "team");
  const individual = analysis.participant.find((item) => item.type === "individual");
  const top = topDomainSignals(analysis);
  const crowded = crowdedDomains(analysis);
  const editionChart = analysis.byEdition.map((item) => ({ name: `第${item.edition}回`, projects: item.projects }));
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>第5回優勝に向けた製品企画リサーチ</title>
  <style>
    :root{--ink:#152238;--muted:#637087;--paper:#f6f3ec;--card:#fff;--navy:#102a43;--cyan:#16b8a6;--gold:#f5b942;--line:#dfe5e8;--shadow:0 14px 45px #102a4314}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--paper);font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic UI",sans-serif;line-height:1.7}a{color:#006f77;overflow-wrap:anywhere}svg{width:100%;height:auto;display:block}.hero{padding:72px max(24px,calc((100vw - 1120px)/2));background:radial-gradient(circle at 80% 20%,#1ecdb9 0 8%,transparent 33%),linear-gradient(135deg,#0b2034,#173f59);color:#fff}.eyebrow{font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:#86efe3}.hero h1{max-width:850px;margin:.3em 0;font-size:clamp(2.2rem,6vw,4.8rem);line-height:1.05}.hero p{max-width:750px;font-size:1.08rem;color:#d9edf0}.container{max-width:1120px;margin:auto;padding:42px 24px 80px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:-72px}.stat,.panel,.project-card{background:var(--card);border:1px solid #fff;border-radius:18px;box-shadow:var(--shadow)}.stat{padding:22px}.stat strong{display:block;font-size:2rem;color:var(--navy)}.stat span{color:var(--muted);font-size:.9rem}.panel{padding:28px;margin:24px 0}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}.criteria{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0;list-style:none}.criteria li{padding:20px;background:#e8f7f4;border-radius:14px;border-top:5px solid var(--cyan)}.criteria b{display:block;font-size:1.05rem}.callout{border-left:5px solid var(--gold);padding:16px 20px;background:#fff8df;border-radius:8px}.champions{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.champion{padding:20px;background:linear-gradient(145deg,#fff8df,#fff);border:1px solid #f2df9f;border-radius:14px}.champion h3{margin:.2em 0}.champion p{font-size:.9rem;color:#445166}.champion-edition{font-size:.75rem;font-weight:800;color:#9a6800;letter-spacing:.08em}.chart-label,.chart-value{font-size:13px;fill:var(--ink)}.bar{fill:var(--cyan)}.signal{font-size:1.1rem;padding:18px;border-radius:12px;background:#f3f7fa}.signal strong{color:#006f77}.comparison{width:100%;border-collapse:collapse}.comparison th,.comparison td{text-align:left;padding:10px;border-bottom:1px solid var(--line)}.comparison td:nth-child(n+2),.comparison th:nth-child(n+2){text-align:right}.gates{counter-reset:gate;display:grid;gap:12px;padding:0;list-style:none}.gates li{counter-increment:gate;padding:16px 18px 16px 58px;background:#f3f7fa;border-radius:12px;position:relative}.gates li:before{content:counter(gate);position:absolute;left:16px;top:14px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--navy);color:#fff;font-weight:700}.filters{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0}.filters button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 15px;cursor:pointer}.filters button.active{background:var(--navy);color:#fff}.project-list{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.project-card{padding:20px;box-shadow:none}.project-card[hidden]{display:none}.project-card h3{margin:.4em 0}.project-card p{color:#445166}.project-meta{display:flex;flex-wrap:wrap;gap:7px}.project-meta span{font-size:.75rem;background:#e8f7f4;padding:3px 8px;border-radius:999px}dl{display:grid;grid-template-columns:100px 1fr;font-size:.86rem}dt{font-weight:700}dd{margin:0;color:var(--muted)}.url-label{font-size:.75rem;margin-bottom:0}.fineprint{font-size:.83rem;color:var(--muted)}@media(max-width:800px){.stats,.criteria,.grid-2,.project-list,.champions{grid-template-columns:1fr}.stats{margin-top:-40px}.hero{padding-top:48px}.panel{padding:20px}}
  </style>
</head>
<body>
  <header class="hero"><div class="eyebrow">Evidence-backed product strategy · ${escapeHtml(dataset.checked_at)}</div><h1>第5回で優勝するための<br>製品企画リサーチ</h1><p>過去4回・全${analysis.totals.projects}作品を、リンクが失効しても読める説明付きで保存。過去の傾向を盲信せず、刷新された第5回の3つの審査軸から逆算する。</p></header>
  <main class="container">
    <section class="stats" aria-label="全体集計"><div class="stat"><strong>${analysis.totals.projects}</strong><span>過去4回の提出</span></div><div class="stat"><strong>${analysis.totals.awarded}</strong><span>受賞プロジェクト</span></div><div class="stat"><strong>${analysis.totals.team}</strong><span>チーム提出</span></div><div class="stat"><strong>${analysis.totals.individual}</strong><span>個人提出</span></div></section>
    <section class="panel"><div class="eyebrow" style="color:#008c80">Win condition</div><h2>第5回は「作れる」から「使える」へ</h2><ul class="criteria">${VOL5.judgingCriteria.map((item, index) => `<li><b>0${index + 1}</b>${escapeHtml(item)}</li>`).join("")}</ul><p class="callout">過去4回の受賞傾向は発想の補助線です。第5回は審査軸が刷新されたため、最終判断では公式3軸と、管理された自律性・可観測性・セキュリティを優先してください。</p><p><a href="${VOL5.sourceUrl}">第5回公式ページ</a>（確認日 ${VOL5.checkedAt}）</p></section>
    <section class="panel"><h2>失格防止チェック</h2><p>企画の強さとは別に、提出形式と審査期間中の維持条件を満たす。</p><ul>${VOL5.submissionRequirements.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    <section class="panel"><h2>歴代最優秀賞</h2><p>毎回の頂点に選ばれた企画を、リンク先に依存しない公式説明付きで比較する。</p><div class="champions">${analysis.champions.map(championCard).join("")}</div></section>
    <section class="grid-2"><div class="panel"><h2>回別提出数</h2>${horizontalBars(editionChart,"projects","回別提出数")}</div><div class="panel"><h2>課題領域の混雑度</h2>${horizontalBars(analysis.domains,"projects","課題領域別提出数")}<p class="fineprint">作品名・説明へのキーワード一次分類。複数領域にまたがる作品も主分類1つで集計。</p></div></section>
    <section class="panel"><h2>企画に使えるシグナル</h2><div class="grid-2"><div class="signal"><strong>受賞側への偏り</strong><br>${escapeHtml(top.map((item) => `${item.name}: ${item.projects}件中${item.awarded}件（指数${item.awardIndex}）`).join(" / ") || "十分な件数なし")}</div><div class="signal"><strong>混雑領域</strong><br>${escapeHtml(crowded.map((item) => `${item.name}: ${item.projects}件`).join(" / "))}</div><div class="signal"><strong>チーム</strong><br>${team.projects}件中${team.awarded}件受賞（${team.awardRate}%）</div><div class="signal"><strong>個人</strong><br>${individual.projects}件中${individual.awarded}件受賞（${individual.awardRate}%）</div></div><p class="fineprint">受賞率は相関であり因果ではありません。技術情報は受賞記事だけを確認しているため、技術別の受賞率は算出していません。</p></section>
    <section class="panel"><h2>機能シグナル別比較</h2><table class="comparison"><thead><tr><th>シグナル</th><th>提出</th><th>受賞</th><th>受賞率</th></tr></thead><tbody>${analysis.capabilities.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${item.projects}</td><td>${item.awarded}</td><td>${item.awardRate}%</td></tr>`).join("")}</tbody></table><p class="fineprint">作品名・説明の複数キーワード分類。機能の実装完了を保証する値ではない。</p></section>
    <section class="panel"><h2>優勝を狙う6つの企画ゲート</h2><ol class="gates"><li><b>未解決課題</b> — 誰が、いつ、どれほど困るかを一次情報で示す。</li><li><b>有効性</b> — 導入前後を時間・精度・完了率・金額・安全性で比較する。</li><li><b>自律性の必然</b> — 観測→判断→実行→確認→停止または承認のループを価値の中心にする。</li><li><b>制御可能性</b> — 権限、監査、停止、攻撃対策、人間へのエスカレーションを動作で見せる。</li><li><b>実用品質</b> — 実データ、費用、遅延、テスト、運用、拡張を説明可能にする。</li><li><b>3分デモ</b> — 課題→自律行動→成果に加え、安全な失敗まで見せる。</li></ol></section>
    <section class="panel" id="catalog"><h2>過去4回・全作品コンテキスト</h2><p>外部リンクが切れても作品名と公式説明が残ります。リンクは取得時点の文字列です。</p><div class="filters" role="group" aria-label="作品フィルター"><button class="active" data-filter="all">すべて</button>${[1,2,3,4].map((edition) => `<button data-filter="edition-${edition}">第${edition}回</button>`).join("")}<button data-filter="awarded">受賞のみ</button><button data-filter="team">チーム</button><button data-filter="individual">個人</button></div><p id="result-count" aria-live="polite">${analysis.totals.projects}件を表示</p><div class="project-list">${dataset.projects.map(projectCard).join("\n")}</div></section>
    <p class="fineprint">データ確認日 ${escapeHtml(dataset.checked_at)}。非受賞作品は公式一覧まで、受賞作品のみ記事本文を追加確認。分類と提案は企画支援用であり、審査結果を保証しません。</p>
  </main>
  <script>
    (() => { const buttons=[...document.querySelectorAll('[data-filter]')]; const cards=[...document.querySelectorAll('.project-card')]; const count=document.querySelector('#result-count'); for(const button of buttons){button.addEventListener('click',()=>{for(const item of buttons)item.classList.toggle('active',item===button);const filter=button.dataset.filter;let visible=0;for(const card of cards){const show=filter==='all'||(filter==='awarded'&&card.dataset.awarded==='true')||(filter==='team'&&card.dataset.type==='team')||(filter==='individual'&&card.dataset.type==='individual')||(filter.startsWith('edition-')&&card.dataset.edition===filter.slice(8));card.hidden=!show;if(show)visible+=1}count.textContent=visible+'件を表示'})} })();
  </script>
</body>
</html>\n`;
}

function parseOptions(args) {
  const options = { input: null, htmlOutput: null, markdownOutput: null };
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--input") options.input = args[++index];
    else if (value === "--html-output") options.htmlOutput = args[++index];
    else if (value === "--markdown-output") options.markdownOutput = args[++index];
    else throw new Error(`Unknown argument: ${value}`);
  }
  if (!options.input || !options.htmlOutput || !options.markdownOutput) {
    throw new Error("Usage: generate-strategy-report.mjs --input FILE --html-output FILE --markdown-output FILE");
  }
  return options;
}

function main() {
  const options = parseOptions(process.argv.slice(2));
  const dataset = JSON.parse(fs.readFileSync(options.input, "utf8"));
  fs.mkdirSync(path.dirname(options.htmlOutput), { recursive: true });
  fs.mkdirSync(path.dirname(options.markdownOutput), { recursive: true });
  fs.writeFileSync(options.htmlOutput, renderHtmlReport(dataset));
  fs.writeFileSync(options.markdownOutput, renderMarkdownContext(dataset));
  console.log(`HTML report: ${options.htmlOutput}`);
  console.log(`AI context: ${options.markdownOutput}`);
  console.log(`projects: ${dataset.projects.length}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
