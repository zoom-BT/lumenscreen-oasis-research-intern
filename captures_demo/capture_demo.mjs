const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = "F:\\ML Research Inter\\UMMISCO\\Rapport_Stage_MCI\\captures_demo";
const BASE = "http://127.0.0.1:3000";

async function shot(page, name) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file, fullPage: false });
  console.log("SAVED", name, fs.statSync(file).size);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
    locale: "fr-FR",
  });
  const page = await context.newPage();
  const report = { scores: [], errors: [] };
  page.on("pageerror", (e) => report.errors.push(String(e)));

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.locator('input[type="checkbox"]').first().check();
  await shot(page, "fig5_2a_protocole.png");
  await Promise.all([
    page.waitForURL(/diagnostic/),
    page.getByRole("button", { name: /Ouvrir le diagnostic/i }).click(),
  ]);
  await page.waitForTimeout(700);

  const ex1 = page.getByRole("button", { name: /OAS2_0001/i });
  if (await ex1.count()) await ex1.click();
  await page.waitForTimeout(400);
  await shot(page, "fig5_2b_formulaire.png");

  await page.getByRole("button", { name: /Obtenir le score/i }).click();
  await page.waitForTimeout(2500);
  report.scores.push({
    id: "0001",
    cls: (await page.locator(".gauge__cls").innerText().catch(() => "")).trim(),
    p: (await page.locator(".gauge__p").innerText().catch(() => "")).trim(),
  });

  const ex2 = page.getByRole("button", { name: /OAS2_0002/i });
  if (await ex2.count()) await ex2.click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: /Obtenir le score/i }).click();
  await page.waitForSelector(".gauge__p", { timeout: 15000 });
  await page.waitForTimeout(1200);
  report.scores.push({
    id: "0002",
    cls: (await page.locator(".gauge__cls").innerText().catch(() => "")).trim(),
    p: (await page.locator(".gauge__p").innerText().catch(() => "")).trim(),
  });
  await shot(page, "fig5_2c_resultat.png");

  const cdrHits = await page.locator("input, select, textarea").evaluateAll((nodes) =>
    nodes.filter((n) => /cdr/i.test((n.name || "") + (n.id || "") + (n.placeholder || ""))).length
  );
  report.cdrFields = cdrHits;
  report.noCdrMention = /aucun champ CDR|CDR/i.test(await page.locator("body").innerText());

  await page.goto(BASE + "/prevention", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await shot(page, "fig5_2d_prevention.png");

  await page.goto(BASE + "/architecture", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const dossiers = [];
  for (const name of ["Infrastructure", "Domaine", "Application", "Présentation"]) {
    const btn = page.getByRole("button", { name: new RegExp(name, "i") });
    if (await btn.count()) {
      await btn.first().click();
      await page.waitForTimeout(350);
      dossiers.push({
        clicked: name,
        dossier: (await page.locator("aside.dossier h2").innerText().catch(() => "")).trim(),
      });
    }
  }
  report.dossiers = dossiers;
  report.archOk = new Set(dossiers.map((d) => d.dossier)).size >= 2;
  await shot(page, "fig5_2e_architecture.png");

  await browser.close();
  console.log("REPORT " + JSON.stringify(report, null, 2));
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
