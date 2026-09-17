const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const OUT = "F:\\ML Research Inter\\UMMISCO\\Rapport_Stage_MCI\\captures_demo";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "light", locale: "fr-FR" })).newPage();
  await page.goto("http://127.0.0.1:3000/architecture", { waitUntil: "networkidle" });
  await sleep(1200);
  const dossiers = [];
  const labels = ["Infrastructure", "Domaine", "Application", "Présentation"];
  for (const name of labels) {
    await page.evaluate((n) => {
      const buttons = [...document.querySelectorAll("button.slab")];
      const btn = buttons.find((b) => (b.innerText || "").includes(n));
      if (btn) btn.click();
    }, name);
    await sleep(450);
    const h = (await page.locator("aside.dossier h2").innerText().catch(() => "")).trim();
    dossiers.push({ clicked: name, dossier: h });
  }
  // leave on Présentation for the figure
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button.slab")];
    const btn = buttons.find((b) => /Pr[eé]sentation/i.test(b.innerText || ""));
    if (btn) btn.click();
  });
  await sleep(500);
  const file = path.join(OUT, "fig5_2e_architecture.png");
  await page.screenshot({ path: file, fullPage: false });
  console.log("SAVED fig5_2e_architecture.png", fs.statSync(file).size);
  console.log("REPORT", JSON.stringify({ dossiers, archOk: new Set(dossiers.map((d) => d.dossier)).size >= 2 }, null, 2));
  await browser.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
