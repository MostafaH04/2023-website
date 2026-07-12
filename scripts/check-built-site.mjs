import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(projectRoot, 'dist');
const siteOrigin = new URL(
  process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
).origin;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? walk(path) : path;
    }),
  );

  return files.flat();
}

function routeFor(file) {
  const outputPath = relative(outputRoot, file).split(sep).join('/');

  if (outputPath === 'index.html') return '/';
  if (outputPath.endsWith('/index.html')) {
    return `/${outputPath.slice(0, -'index.html'.length)}`;
  }

  return `/${outputPath}`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function hasBuiltTarget(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const target = resolve(outputRoot, `.${decodedPath}`);

  if (target !== outputRoot && !target.startsWith(`${outputRoot}${sep}`)) {
    return false;
  }

  const candidates = [target, resolve(target, 'index.html')];
  if (!decodedPath.endsWith('/')) candidates.push(`${target}.html`);

  return (await Promise.all(candidates.map(exists))).some(Boolean);
}

await access(outputRoot);
const htmlFiles = (await walk(outputRoot)).filter((file) =>
  file.endsWith('.html'),
);
const failures = [];

for (const htmlFile of htmlFiles) {
  const document = await readFile(htmlFile, 'utf8');
  const documentUrl = new URL(routeFor(htmlFile), siteOrigin);
  const references = [
    ...document.matchAll(/\b(?:href|src)=(['"])(.*?)\1/gi),
  ].map((match) => match[2]);

  for (const reference of new Set(references)) {
    if (
      !reference ||
      reference.startsWith('#') ||
      /^(?:data|mailto|tel|javascript):/i.test(reference)
    ) {
      continue;
    }

    const targetUrl = new URL(reference, documentUrl);
    if (targetUrl.origin !== documentUrl.origin) continue;

    if (!(await hasBuiltTarget(targetUrl.pathname))) {
      failures.push(`${routeFor(htmlFile)} -> ${reference}`);
    }
  }
}

if (failures.length > 0) {
  console.error(
    `Broken internal references:\n${failures.map((failure) => `- ${failure}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${htmlFiles.length} HTML files: every internal href/src has a built target.`,
  );
}
