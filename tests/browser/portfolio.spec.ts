import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("lab switches visual systems and shares a real inspection axis", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("KAĞAN");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "running",
  );
  await page.getByRole("button", { name: "Pause study" }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await page.getByRole("tab", { name: /SIGNAL/ }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
  const paths = page.locator(".experiment svg path");
  const before = await paths.nth(9).getAttribute("d");
  const slider = page.getByRole("slider", { name: "Inspection axis" });
  await slider.focus();
  await page.keyboard.press("End");
  await expect(slider).toHaveValue("100");
  expect(await paths.nth(9).getAttribute("d")).not.toEqual(before);
  await page.getByRole("tab", { name: /SIGNAL/ }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: /LANGUAGE/ })).toBeFocused();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "language",
  );
  const field = await page.getByRole("tabpanel").boundingBox();
  if (!field) throw new Error("Study field has no layout");
  await page.mouse.move(
    field.x + field.width * 0.2,
    field.y + field.height * 0.4,
  );
  await expect(slider).toHaveValue("20");
  await page.getByRole("button", { name: "Animate study" }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "running",
  );
  expect(errors).toEqual([]);
});

test("both public exhibits preserve factual narratives and native navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Enter the BOR exhibit" }).click();
  await expect(page).toHaveURL(/\/projects\/bor\//);
  await expect(page.locator("h1")).toHaveText("BOR");
  for (const name of [
    "The idea",
    "The challenge",
    "The approach",
    "The outcome",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(page.locator(".case-award")).toContainText("1st Place");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "language",
  );
  await page.locator(".next-exhibit a").click();
  await expect(page).toHaveURL(/\/projects\/ai-ids\//);
  await expect(page.locator(".case-award")).toContainText("2nd Place");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
  await expect(page.locator(".case-art-note")).toContainText(
    "does not show attack data",
  );
  await expect(page.locator(".contact-cta")).toHaveAttribute(
    "href",
    "mailto:kucukcongarkagan@gmail.com",
  );
});

test("mobile menu, manual study and responsive routes work", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/projects/bor/", "/projects/ai-ids/"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}px ${route}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await page.getByRole("tab", { name: /SIGNAL/ }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
  await page.getByRole("button", { name: "Animate study" }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "running",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Exhibits" })
    .click();
  await expect(page).toHaveURL(/#work/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
});

test("touch inspection changes the same axis without starting animation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  const field = await page.getByRole("tabpanel").boundingBox();
  if (!field) throw new Error("Study field has no layout");
  await page.touchscreen.tap(
    field.x + field.width * 0.25,
    field.y + field.height * 0.5,
  );
  await expect(
    page.getByRole("slider", { name: "Inspection axis" }),
  ).toHaveValue("25");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await context.close();
});

test("reduced motion preserves deliberate inspection without animation or depth", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "reduced",
  );
  await expect(
    page.getByRole("button", { name: "Motion reduced" }),
  ).toBeDisabled();
  await page.getByRole("tab", { name: /SIGNAL/ }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
  await page.getByRole("slider", { name: "Inspection axis" }).focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("slider")).toHaveValue("1");
  expect(
    await page
      .locator(".experiment-plane")
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("WebGL-disabled visitors receive the complete vector instrument", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = (() =>
      null) as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await expect(page.locator(".experiment svg")).toBeVisible();
  await page.getByRole("tab", { name: /SIGNAL/ }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "Enter the signal exhibit" }).click();
  await expect(page).toHaveURL(/\/projects\/ai-ids\//);
});

test("sealed files reveal no private links, controls or routes", async ({
  page,
}) => {
  await page.goto("/");
  const files = page.locator(".sealed-file");
  await expect(files).toHaveCount(3);
  await expect(files.locator("a,button,input")).toHaveCount(0);
  for (let index = 0; index < 3; index++) {
    await expect(files.nth(index).getByRole("heading")).toHaveText(
      `CASE 00${index + 3}`,
    );
    await files.nth(index).focus();
    await expect(files.nth(index)).toBeFocused();
  }
  expect((await page.goto("/projects/case-003/"))?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
});

test("data saving starts paused while keeping the study usable", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    }),
  );
  await page.goto("/");
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await page.getByRole("tab", { name: /SIGNAL/ }).click();
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-mode",
    "signal",
  );
});

test("identity, case studies and contact remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.locator("h1")).toContainText("KÜÇÜKÇONGAR");
  await expect(page.locator(".experiment svg")).toBeVisible();
  await expect(page.locator(".sealed-file")).toHaveCount(3);
  await page.getByRole("link", { name: "Enter the BOR exhibit" }).click();
  await expect(page.locator("h1")).toHaveText("BOR");
  await expect(
    page.getByRole("heading", { name: "The outcome", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".contact-cta")).toHaveAttribute("href", /mailto:/);
  await context.close();
});

test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main/);
});

test("all routes pass automated WCAG AA checks in desktop and mobile compositions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/projects/bor/", "/projects/ai-ids/"]) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, `${width}px ${route}`).toEqual([]);
    }
  }
});
