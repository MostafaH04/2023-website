# Testing

Run the same validation used by CI before merging:

```sh
npm ci
npm run check
npm run test
npm run build
npm run test:budgets
npm run test:links
npm run test:links:external
npm run test:e2e
```

CI also runs a moderate-severity dependency audit, exercises production deep links, and enforces the budgets in `.lighthouserc.json` on all core route variants.

## Viewport matrix

Test every route in both themes. Use real touch hardware for at least one phone profile.

| Profile         | Viewport    | Input / DPR            | Acceptance                                                                             |
| --------------- | ----------- | ---------------------- | -------------------------------------------------------------------------------------- |
| Compact phone   | 320 x 568   | Touch / 2              | No horizontal scroll or clipped text; controls remain at least 44 x 44 CSS px.         |
| Standard phone  | 360 x 800   | Touch / 2-3            | Hero, project cards, and menu fit without overlap.                                     |
| Modern phone    | 390 x 844   | Touch / 3              | Safe-area controls remain reachable; scrolling and filter interactions stay smooth.    |
| Large phone     | 430 x 932   | Touch / 3              | Layout uses the available width without stretched copy or oversized art.               |
| Phone landscape | 844 x 390   | Touch / 2-3            | Menu content neither overlaps nor clips and remains scrollable.                        |
| Tablet          | 768 x 1024  | Touch / 2              | Cards and media do not overflow at breakpoint boundaries.                              |
| Laptop          | 1024 x 768  | Mouse + keyboard / 1-2 | Navigation, focus states, and content hierarchy remain clear.                          |
| Breakpoint edge | 1061 x 768  | Mouse + keyboard / 1-2 | Project media, grid columns, and header controls remain contained.                     |
| Desktop         | 1440 x 900  | Mouse + keyboard / 1-2 | Line lengths, spacing, and artwork stay balanced at the maximum content width.         |
| Ultrawide       | 2560 x 1080 | Mouse + keyboard / 1-2 | Content remains intentionally bounded and scenery does not stretch over readable text. |

Also verify 200% and 400% browser zoom, portrait/landscape rotation, coarse and fine pointers, direct-route refreshes, and browser back/forward scroll restoration.

## Accessibility matrix

| Check          | Acceptance                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Keyboard       | Every action is reachable in a logical order; focus is always visible; dialogs and menus contain and restore focus.             |
| Structure      | One descriptive `h1` per route, ordered headings, landmarks, link names, and useful image alternatives.                         |
| Contrast       | WCAG 2.2 AA: at least 4.5:1 for body text and 3:1 for large text and interactive boundaries.                                    |
| Motion         | `prefers-reduced-motion: reduce` removes nonessential motion; no content depends on animation to become usable.                 |
| Themes         | Dark and light modes have equivalent readability, focus visibility, and system `theme-color`; the saved choice survives reload. |
| Screen reader  | Smoke-test VoiceOver or NVDA: route changes are announced and menu/filter state is understandable.                              |
| Automated scan | Axe or an equivalent scan reports no serious or critical violations on any route.                                               |

## Performance matrix

Run a cold-cache mobile Lighthouse pass for `/`, `/about`, `/projects?category=software`, and `/projects?category=hardware` using production output.

| Metric                 | Acceptance                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| Lighthouse Performance | 95 or higher on every route.                                                                              |
| LCP                    | 2.5 seconds or less.                                                                                      |
| CLS                    | 0.1 or less.                                                                                              |
| TBT                    | 200 milliseconds or less; field INP target is 200 milliseconds or less.                                   |
| Initial JS + CSS       | 90 kB gzip or less.                                                                                       |
| Media                  | Responsive dimensions, no broken remote assets, main project images below 160 kB, thumbnails below 20 kB. |
| Idle animation         | No recurring paint/raster loop after entrance motion settles; no task longer than 50 milliseconds.        |

Repeat the smoke test with reduced motion, a failed image request, slow 4G throttling, and a warm cache.
