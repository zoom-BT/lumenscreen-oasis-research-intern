const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.locator('input[type="checkbox"]').first().check();
  await Promise.all([page.waitForURL(/diagnostic/), page.getByRole("button", { name: /Ouvrir le diagnostic/i }).click()]);
  await page.getByRole("button", { name: /OAS2_0001/i }).click();
  await page.getByRole("button", { name: /Obtenir le score/i }).click();
  await page.waitForTimeout(2000);
  const s1 = {
    cls: (await page.locator(".gauge__cls").innerText().catch(() => "")).trim(),
    p: (await page.locator(".gauge__p").innerText().catch(() => "")).trim(),
    imp: await page.locator(".imp li").count().catch(() => 0),
  };
  await page.getByRole("button", { name: /OAS2_0002/i }).click();
  await page.getByRole("button", { name: /Obtenir le score/i }).click();
  await page.waitForTimeout(2000);
  const s2 = {
    cls: (await page.locator(".gauge__cls").innerText().catch(() => "")).trim(),
    p: (await page.locator(".gauge__p").innerText().catch(() => "")).trim(),
    imp: await page.locator(".imp li").count().catch(() => 0),
  };
  const cdrFields = await page.locator("input, select, textarea").evaluateAll((nodes) =>
    nodes.filter((n) => /cdr/i.test((n.name || "") + (n.id || "") + (n.placeholder || "") + ((n.labels && n.labels[0] && n.labels[0].innerText) || ""))).length
  );
  const body = await page.locator("body").innerText();
  const blank = (await page.locator("body").innerText()).trim().length < 20;
  console.log(JSON.stringify({ s1, s2, cdrFields, mentionsAucunChampCDR: /aucun champ CDR/i.test(body), blank, title: await page.title() }, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
