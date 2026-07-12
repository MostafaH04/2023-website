import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'projects', path: '/projects' },
  { name: 'not found', path: '/accessibility-missing-route' },
] as const;

const themes = ['dark', 'light'] as const;

async function analyzeStablePage(page: Page) {
  let navigationError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await new AxeBuilder({ page })
        .exclude('astro-dev-toolbar')
        .analyze();
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !error.message.includes('Execution context was destroyed')
      ) {
        throw error;
      }

      navigationError = error;
      await page.waitForLoadState('domcontentloaded');
    }
  }

  throw navigationError;
}

for (const route of routes) {
  for (const theme of themes) {
    test(`${route.name} has no serious or critical axe violations in ${theme} mode`, async ({
      page,
    }) => {
      await page.addInitScript((selectedTheme) => {
        window.localStorage.setItem('portfolio-theme', selectedTheme);
      }, theme);

      await page.goto(route.path);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

      const results = await analyzeStablePage(page);
      const blockingViolations = results.violations.filter(
        (violation) =>
          violation.impact === 'serious' || violation.impact === 'critical',
      );
      const summary = blockingViolations
        .map(
          (violation) =>
            `${violation.id} (${violation.impact}): ${violation.nodes
              .map((node) => node.target.join(' '))
              .join(', ')}`,
        )
        .join('\n');

      expect(blockingViolations, summary).toEqual([]);
    });
  }
}
