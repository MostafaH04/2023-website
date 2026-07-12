import { gzipSync } from 'node:zlib';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const limits = {
  applicationGzip: 90_000,
  criticalFonts: 80_000,
  mainProjectMedia: 160_000,
  projectThumbnail: 20_000,
};

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? filesIn(path) : path;
    }),
  );

  return nested.flat();
}

function assertBudget(label, actual, limit, failures) {
  if (actual > limit) {
    failures.push(`${label}: ${actual} bytes exceeds ${limit} bytes`);
  }
}

const failures = [];
const applicationFiles = (await filesIn(resolve('dist/_astro'))).filter(
  (file) => ['.js', '.css'].includes(extname(file)),
);
const applicationGzip = (
  await Promise.all(
    applicationFiles.map(async (file) => gzipSync(await readFile(file)).length),
  )
).reduce((total, size) => total + size, 0);
assertBudget(
  'All emitted JavaScript and CSS (gzip)',
  applicationGzip,
  limits.applicationGzip,
  failures,
);

const fontFiles = (await filesIn(resolve('public/fonts'))).filter(
  (file) => extname(file) === '.woff2',
);
const criticalFonts = (
  await Promise.all(fontFiles.map(async (file) => (await stat(file)).size))
).reduce((total, size) => total + size, 0);
assertBudget(
  'Critical self-hosted fonts',
  criticalFonts,
  limits.criticalFonts,
  failures,
);

const projectMedia = (await filesIn(resolve('public/images/projects'))).filter(
  (file) => ['.avif', '.webp'].includes(extname(file)),
);

for (const file of projectMedia) {
  const size = (await stat(file)).size;
  const thumbnail = file.includes('-640.');
  assertBudget(
    thumbnail ? `Project thumbnail ${file}` : `Main project media ${file}`,
    size,
    thumbnail ? limits.projectThumbnail : limits.mainProjectMedia,
    failures,
  );
}

if (failures.length > 0) {
  console.error(
    `Performance budget failures:\n${failures.map((failure) => `- ${failure}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    [
      `Application JS + CSS: ${applicationGzip} / ${limits.applicationGzip} bytes gzip`,
      `Critical fonts: ${criticalFonts} / ${limits.criticalFonts} bytes`,
      `Project media: ${projectMedia.length} files within per-file budgets`,
    ].join('\n'),
  );
}
