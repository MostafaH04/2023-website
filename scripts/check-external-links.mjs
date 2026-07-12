import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputRoot = resolve('dist');
const siteOrigin = new URL(
  process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
).origin;
const userAgent =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const maxRetries = 3;

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

function sleep(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

async function request(url, method) {
  const response = await fetch(url, {
    method,
    redirect: 'follow',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
      'User-Agent': userAgent,
    },
    signal: AbortSignal.timeout(15_000),
  });

  await response.body?.cancel();
  return response;
}

async function validate(url) {
  let lastFailure = 'unknown failure';

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      let response = await request(url, 'HEAD');
      if (!response.ok) response = await request(url, 'GET');

      if (response.ok) return;

      lastFailure = `HTTP ${response.status}`;
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable) break;
    } catch (error) {
      lastFailure = error instanceof Error ? error.message : String(error);
    }

    if (attempt < maxRetries) await sleep(500 * 2 ** attempt);
  }

  throw new Error(`${url} (${lastFailure})`);
}

const htmlFiles = (await walk(outputRoot)).filter((file) =>
  file.endsWith('.html'),
);
const urls = new Set();

for (const htmlFile of htmlFiles) {
  const document = await readFile(htmlFile, 'utf8');
  const anchors = document.matchAll(/<a\b[^>]*\bhref=(['"])(.*?)\1/gi);

  for (const [, , href] of anchors) {
    if (!/^https?:\/\//i.test(href)) continue;

    const url = new URL(href);
    if (url.origin !== siteOrigin) urls.add(url.href);
  }
}

const failures = [];
await Promise.all(
  [...urls].map(async (url) => {
    try {
      await validate(url);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }),
);

if (failures.length > 0) {
  console.error(
    `Unreachable external anchors:\n${failures.map((failure) => `- ${failure}`).join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${urls.size} unique external anchors with retry and GET fallback.`,
  );
}
