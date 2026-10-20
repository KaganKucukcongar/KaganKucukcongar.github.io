import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop: WebGL sculpture, pause control, case studies, and contact", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Building things");
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "webgl",
    { timeout: 30000 },
  );
  await page.getByRole("button", { name: "Pause sculpture animation" }).click();
  await expect(
    page.getByRole("button", { name: "Play sculpture animation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Play sculpture animation" }).click();
  await page.getByRole("link", { name: /Explore BOR/ }).click();
  await expect(page).toHaveURL(/\/projects\/bor\//);
  for (const name of [
    "The idea",
    "The challenge",
    "The approach",
    "The outcome",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await page.locator(".next-project a").click();
  await expect(page).toHaveURL(/\/projects\/ai-ids\//);
  await expect(page.locator("h1")).toContainText("AI-Powered IDS");
  await expect(page.locator(".case-award")).toContainText("2nd Place");
  await expect(page.locator(".contact-cta")).toHaveAttribute(
    "href",
    "mailto:kucukcongarkagan@gmail.com",
  );
  expect(errors).toEqual([]);
});

test("mobile menu works with touch and Escape, no overflow at narrow widths", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const route of ["/projects/bor/", "/projects/ai-ids/"]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("reduced motion keeps a static sculpture and readable content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "A little proof of the work." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("WebGL-unavailable desktop and mobile remain fully navigable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.startsWith("webgl") || type === "experimental-webgl")
        return null;
      return Reflect.apply(getContext, this, [type, ...args]);
    } as typeof getContext;
  });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".hero-art")).toHaveAttribute(
      "data-scene",
      "static",
    );
    await expect(page.locator(".sculpture-fallback")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.getByRole("link", { name: "Explore my work" }).click();
    await expect(page).toHaveURL(/#work/);
  }
});

test("context loss restores the fallback artwork", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "webgl",
    { timeout: 30000 },
  );
  await page
    .locator("canvas")
    .evaluate((canvas) => canvas.dispatchEvent(new Event("webglcontextlost")));
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator(".static-art")).not.toHaveClass(/is-hidden/);
});

test("locked cards expose no links or controls and support keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".locked-card");
  await expect(cards).toHaveCount(3);
  await expect(cards.locator("a,button,input")).toHaveCount(0);
  for (let index = 0; index < 3; index++) {
    await expect(cards.nth(index).getByRole("heading")).toHaveText(
      `Project 0${index + 3}`,
    );
    await cards.nth(index).focus();
    await expect(cards.nth(index)).toBeFocused();
  }
  const response = await page.goto("/projects/project-03/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
});

test("data-saving desktops keep the scene lightweight", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    }),
  );
  await page.goto("/");
  await expect(page.locator(".hero-art")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
});

test("static content and case-study links work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.locator("h1")).toContainText("Building things");
  await expect(page.locator(".locked-card")).toHaveCount(3);
  await page.getByRole("link", { name: /Explore BOR/ }).click();
  await expect(page.locator("h1")).toContainText("BOR");
  await expect(
    page.getByRole("heading", { name: "The outcome", exact: true }),
  ).toBeVisible();
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

test("homepage and both case studies pass WCAG AA automated checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/projects/bor/", "/projects/ai-ids/"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations, `${width}px ${route}`).toEqual([]);
    }
  }
});
