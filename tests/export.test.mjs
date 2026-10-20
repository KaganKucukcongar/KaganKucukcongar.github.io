import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";

const root = resolve("out");
async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? filesAt(resolve(directory, entry.name))
          : resolve(directory, entry.name),
      ),
    )
  ).flat();
}

test("static export includes only the two public case studies", async () => {
  const routes = (
    await readdir(resolve(root, "projects"), { withFileTypes: true })
  )
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
  assert.deepEqual(routes, ["ai-ids", "bor"]);
  for (const route of [
    "index.html",
    "404.html",
    "projects/bor/index.html",
    "projects/ai-ids/index.html",
    "sitemap.xml",
    "robots.txt",
    "social.png",
    ".nojekyll",
  ])
    assert.ok((await stat(resolve(root, route))).isFile(), route);
});

test("approved domain and root canonical URLs survive export", async () => {
  assert.equal(
    await readFile(resolve(root, "CNAME"), "utf8"),
    await readFile("CNAME", "utf8"),
  );
  for (const route of ["", "projects/bor/", "projects/ai-ids/"]) {
    const html = await readFile(resolve(root, route, "index.html"), "utf8");
    assert.ok(
      html.includes(
        `rel="canonical" href="https://kagankucukcongar.github.io/${route}"`,
      ),
      `canonical for /${route}`,
    );
    for (const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)"/g))
      assert.ok(
        (
          await stat(resolve(root, `.${decodeURIComponent(match[1])}`))
        ).isFile(),
        match[1],
      );
  }
});

test("shipped HTML, RSC payloads, and application chunks exclude old private details and source maps", async () => {
  const files = await filesAt(root);
  assert.equal(files.filter((file) => file.endsWith(".map")).length, 0);
  // Regression checks against details on the legacy page; the replacement must never ship them.
  const forbidden =
    /TransferAnalyze|transfer-news-analyzer|Transfermarkt|EnsembleDefend|idswithai|XGBoost|Random Forest|Google Gemini/i;
  for (const file of files.filter((file) =>
    [".html", ".js", ".txt", ".json", ".xml"].includes(extname(file)),
  )) {
    assert.equal(forbidden.test(await readFile(file, "utf8")), false, file);
  }
});

test("exported project links have matching static routes", async () => {
  for (const file of (await filesAt(root)).filter((file) =>
    file.endsWith(".html"),
  )) {
    for (const match of (await readFile(file, "utf8")).matchAll(
      /href="(\/projects\/[^"#?]+)"/g,
    )) {
      assert.ok(
        (await stat(resolve(root, `.${match[1]}`, "index.html"))).isFile(),
        `${file}: ${match[1]}`,
      );
    }
  }
});

test("the exported identity uses the owner's name and excludes the retired branding and visual system", async () => {
  const html = await readFile(resolve(root, "index.html"), "utf8");
  assert.ok(html.includes("<title>Kağan Küçükçongar</title>"));
  assert.ok(html.includes("KAĞAN"));
  assert.ok(html.includes("LANGUAGE") && html.includes("SIGNAL"));
  assert.ok(
    html.includes("CASE") && html.includes("003") && html.includes("005"),
  );
  for (const file of (await filesAt(root)).filter((file) =>
    [".html", ".js", ".css", ".svg"].includes(extname(file)),
  )) {
    assert.equal(
      /open lab|o\/l|#D7FF72|#9276FF|Building things that go beyond|Abstract interconnected chrome rings|Connected by curiosity/i.test(
        await readFile(file, "utf8"),
      ),
      false,
      file,
    );
  }
});
