import { expect, test, type Locator, type Page } from '@playwright/test';

const layoutRoutes = ['/', '/about', '/projects'] as const;

const viewportMatrix = [
  { name: 'small phone portrait', width: 320, height: 568 },
  { name: 'phone portrait', width: 390, height: 844 },
  { name: 'tablet portrait', width: 768, height: 1024 },
  { name: 'phone landscape', width: 844, height: 390 },
  { name: 'tablet landscape', width: 1024, height: 768 },
  { name: 'header breakpoint edge', width: 1061, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'ultrawide', width: 2560, height: 1080 },
] as const;

async function expectPointerHitTarget(locator: Locator) {
  await expect(locator).toBeVisible();

  const receivesPointer = await locator.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const hitTarget = document.elementFromPoint(
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2,
    );

    return (
      hitTarget === element ||
      (hitTarget !== null && element.contains(hitTarget))
    );
  });

  expect(receivesPointer).toBe(true);
}

async function waitForHeaderTheme(page: Page, theme: 'dark' | 'light') {
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  await expect(
    page.locator(`.site-theme-toggle[data-theme="${theme}"]`),
  ).toHaveCount(2);
}

async function expectThemeScene(page: Page, theme: 'dark' | 'light') {
  const inactiveTheme = theme === 'dark' ? 'light' : 'dark';

  await expect(page.locator(`.ambient-sky__${theme}`)).toHaveCSS(
    'opacity',
    '1',
  );
  await expect(page.locator(`.ambient-sky__${inactiveTheme}`)).toHaveCSS(
    'opacity',
    '0',
  );

  const landscape = page.locator('[data-ambient-landscape-image]');
  await expect(landscape).toHaveCount(1);
  await expect(landscape).toHaveAttribute('data-theme', theme);
  await expect(landscape).toHaveClass(
    new RegExp(`ambient-landscape__image--${theme}`),
  );
  await expect(landscape).toBeVisible();
  await expect(
    page.locator(`.ambient-landscape__image--${inactiveTheme}`),
  ).toHaveCount(0);
}

async function expectThemeMetadata(page: Page, theme: 'dark' | 'light') {
  const expected =
    theme === 'dark'
      ? {
          color: '#07131f',
          favicon: '/favicon-dark.svg',
          manifest: '/manifest-dark.webmanifest',
        }
      : {
          color: '#fff8e8',
          favicon: '/favicon-light.svg',
          manifest: '/manifest-light.webmanifest',
        };

  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    'content',
    expected.color,
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    expected.favicon,
  );
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    expected.manifest,
  );
}

test.describe('navigation and pointer safety', () => {
  test('header navigation receives pointer input above decorative layers', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const projectsLink = page.locator(
      '.site-header__desktop-controls a[href="/projects"]',
    );
    await expectPointerHitTarget(projectsLink);
    await projectsLink.click();

    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Built to move/ }),
    ).toBeVisible();
  });

  test('skip link and primary navigation work from the keyboard', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator('#main-content')).toBeInViewport();
    await expect(page.locator('#main-content')).toBeFocused();

    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('.site-brand')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('.site-header__desktop-controls a[href="/"]'),
    ).toBeFocused();
    await page.keyboard.press('Tab');

    const projectsLink = page.locator(
      '.site-header__desktop-controls a[href="/projects"]',
    );
    await expect(projectsLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/projects\/?$/);
  });
});

test.describe('mobile native navigation dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await waitForHeaderTheme(page, 'light');
  });

  test('opens above the page, manages focus, and closes with Escape and backdrop', async ({
    page,
  }) => {
    const menuButton = page.locator('.site-header__menu-button');
    await expectPointerHitTarget(menuButton);
    await menuButton.click();

    const dialog = page.getByRole('dialog', { name: 'Navigate' });
    await expect(dialog).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(
      page.getByRole('button', { name: 'Close navigation menu' }),
    ).toBeFocused();
    await expect(page.locator('body')).toHaveCSS('position', 'fixed');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toBeFocused();
    await expect(page.locator('body')).not.toHaveCSS('position', 'fixed');

    await menuButton.click();
    await expect(dialog).toBeVisible();
    await page.mouse.click(2, 2);
    await expect(dialog).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test('closes before a mobile navigation link changes routes', async ({
    page,
  }) => {
    const menuButton = page.locator('.site-header__menu-button');
    await menuButton.click();

    const dialog = page.getByRole('dialog', { name: 'Navigate' });
    await expect(dialog).toBeVisible();
    await dialog.locator('a[href="/about"]').click();

    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Engineering across/ }),
    ).toBeVisible();
    await expect(page.locator('#site-mobile-menu')).not.toHaveAttribute(
      'open',
      '',
    );
    await expect(page.locator('.site-header__menu-button')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});

test.describe('theme persistence and scenery', () => {
  test('keeps exactly one theme scene active and persists a manual theme', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await waitForHeaderTheme(page, 'light');
    await expectThemeScene(page, 'light');
    await expectThemeMetadata(page, 'light');

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await waitForHeaderTheme(page, 'dark');
    await expectThemeScene(page, 'dark');
    await expectThemeMetadata(page, 'dark');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('portfolio-theme')))
      .toBe('dark');

    await page.reload();
    await waitForHeaderTheme(page, 'dark');
    await expectThemeScene(page, 'dark');

    await page.goto('/about');
    await waitForHeaderTheme(page, 'dark');
    await expect(page.locator('[data-theme-portrait-image]')).toHaveAttribute(
      'data-theme',
      'dark',
    );
    await expect(page.locator('[data-theme-portrait-image]')).toHaveCSS(
      'opacity',
      '0.78',
    );
    await expect(page.locator('.portrait-card__scene--light')).toHaveCount(0);
    await expectThemeMetadata(page, 'dark');
  });
});

test.describe('responsive layout and motion preferences', () => {
  test('avoids horizontal overflow and keeps header controls on-screen across the viewport matrix', async ({
    page,
  }) => {
    for (const route of layoutRoutes) {
      for (const viewport of viewportMatrix) {
        await test.step(`${route} at ${viewport.width}×${viewport.height} (${viewport.name})`, async () => {
          await page.setViewportSize(viewport);
          await page.goto(route);

          await expect(page.locator('.site-header__inner')).toBeVisible();
          await expect(page.locator('.site-brand')).toBeVisible();

          const layout = await page.evaluate(() => {
            const scrollingElement =
              document.scrollingElement ?? document.documentElement;
            const visibleControls = Array.from(
              document.querySelectorAll<HTMLElement>(
                '.site-header a, .site-header button',
              ),
            )
              .filter((element) => {
                const style = window.getComputedStyle(element);
                const bounds = element.getBoundingClientRect();

                return (
                  style.display !== 'none' &&
                  style.visibility !== 'hidden' &&
                  bounds.width > 0 &&
                  bounds.height > 0
                );
              })
              .map((element) => {
                const bounds = element.getBoundingClientRect();

                return {
                  label:
                    element.getAttribute('aria-label') ??
                    element.textContent?.trim() ??
                    element.tagName,
                  left: bounds.left,
                  right: bounds.right,
                  top: bounds.top,
                  bottom: bounds.bottom,
                };
              });

            return {
              clientWidth: scrollingElement.clientWidth,
              scrollWidth: scrollingElement.scrollWidth,
              viewportHeight: window.innerHeight,
              viewportWidth: window.innerWidth,
              visibleControls,
            };
          });

          expect(
            layout.scrollWidth,
            `${route} overflowed horizontally at ${viewport.width}×${viewport.height}`,
          ).toBeLessThanOrEqual(layout.clientWidth + 1);
          expect(layout.visibleControls.length).toBeGreaterThanOrEqual(2);

          for (const control of layout.visibleControls) {
            expect(
              control.left,
              `${control.label} clips on the left`,
            ).toBeGreaterThanOrEqual(-1);
            expect(
              control.right,
              `${control.label} clips on the right`,
            ).toBeLessThanOrEqual(layout.viewportWidth + 1);
            expect(
              control.top,
              `${control.label} clips above the viewport`,
            ).toBeGreaterThanOrEqual(-1);
            expect(
              control.bottom,
              `${control.label} clips below the viewport`,
            ).toBeLessThanOrEqual(layout.viewportHeight + 1);
          }
        });
      }
    }
  });

  test('settles animated decoration into static states with reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.hero-name')).toBeVisible();

    expect(
      await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      ),
    ).toBe(true);

    const animatedElements = page.locator(
      '.hero-name__english, .hero-name__arabic, .hero-name__mark, .ambient-sky__dark .ambient-star',
    );
    await expect(animatedElements).not.toHaveCount(0);
    await page.waitForTimeout(50);

    const sampleStyles = () =>
      animatedElements.evaluateAll((elements) =>
        elements.map((element) => {
          const style = window.getComputedStyle(element);
          const durations = style.animationDuration.split(',').map((value) => {
            const duration = Number.parseFloat(value);
            return value.trim().endsWith('ms') ? duration : duration * 1000;
          });

          return {
            maxDurationMs: Math.max(...durations),
            iterationCount: style.animationIterationCount,
            opacity: style.opacity,
            transform: style.transform,
          };
        }),
      );

    const before = await sampleStyles();
    await page.waitForTimeout(120);
    const after = await sampleStyles();

    expect(after).toEqual(before);
    for (const style of after) {
      expect(style.maxDurationMs).toBeLessThanOrEqual(0.011);
      expect(
        style.iterationCount.split(',').every((value) => value.trim() === '1'),
      ).toBe(true);
    }
  });
});

test.describe('projects, redirects, and failure states', () => {
  test('synchronizes project filters with the query string and live count', async ({
    page,
  }) => {
    await page.goto('/projects?category=software');

    const softwareButton = page.getByRole('button', { name: 'Software' });
    await expect(softwareButton).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-project-card]:not([hidden])')).toHaveCount(
      4,
    );
    expect(
      await page
        .locator('[data-project-card]:not([hidden])')
        .evaluateAll((cards) =>
          cards.every((card) => card.dataset.category === 'software'),
        ),
    ).toBe(true);
    await expect(page.getByText('4 projects shown')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    const hardwareButton = page.getByRole('button', { name: 'Hardware' });
    const hardwareBounds = await hardwareButton.boundingBox();
    expect(hardwareBounds?.width).toBeGreaterThanOrEqual(44);
    expect(hardwareBounds?.height).toBeGreaterThanOrEqual(44);
    await hardwareButton.click();

    await expect(page).toHaveURL(/\/projects\?category=hardware$/);
    await expect(page.locator('[data-project-card]:not([hidden])')).toHaveCount(
      4,
    );
    expect(
      await page
        .locator('[data-project-card]:not([hidden])')
        .evaluateAll((cards) =>
          cards.every((card) => card.dataset.category === 'hardware'),
        ),
    ).toBe(true);

    await page.reload();
    await expect(hardwareButton).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'All' }).click();
    await expect(page).toHaveURL(/\/projects\/?$/);
    await expect(page.locator('[data-project-card]:not([hidden])')).toHaveCount(
      8,
    );
  });

  test('preserves legacy software and hardware redirects', async ({ page }) => {
    await page.goto('/projects/software');
    await expect(page).toHaveURL(/\/projects\?category=software$/);
    await expect(
      page.getByRole('button', { name: 'Software' }),
    ).toHaveAttribute('aria-pressed', 'true');

    await page.goto('/projects/hardware');
    await expect(page).toHaveURL(/\/projects\?category=hardware$/);
    await expect(
      page.getByRole('button', { name: 'Hardware' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('serves the custom noindex 404 page with recovery links', async ({
    page,
  }) => {
    const response = await page.goto('/route-that-does-not-exist');

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle(/Page not found/);
    await expect(
      page.getByRole('heading', { level: 1, name: /doesn.t lead anywhere/ }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, follow',
    );
    await expect(page.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(
      page.getByRole('link', { name: 'View projects' }),
    ).toHaveAttribute('href', '/projects');
  });

  test('shows a text fallback when project media cannot load', async ({
    page,
  }) => {
    await page.route('**/images/projects/robot-dog*', (route) => route.abort());
    await page.goto('/projects');

    const media = page.locator('#robot-dog .project-card__media');
    await expect(media).toHaveAttribute('data-image-error', 'true');
    await expect(media.locator('.project-card__media-fallback')).toBeVisible();
    await expect(media.locator('img')).toBeHidden();
  });
});
