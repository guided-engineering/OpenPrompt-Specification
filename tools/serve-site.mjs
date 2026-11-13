// Serve docs/ locally under the same base path GitHub Pages uses for a project
// site, so that relative links and assets are exercised as they will be served:
//   http://localhost:4173/OpenPrompt-Specification/
// Development helper only. No dependencies.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const docs = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const BASE = '/OpenPrompt-Specification';
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/') {
    res.writeHead(302, { Location: `${BASE}/` });
    return res.end();
  }
  if (!url.pathname.startsWith(`${BASE}/`) && url.pathname !== BASE) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found: this server only serves the project base path.');
  }
  let file = join(docs, normalize(decodeURIComponent(url.pathname.slice(BASE.length))));
  if (!file.startsWith(docs)) {
    res.writeHead(403);
    return res.end();
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`serving docs/ at http://localhost:${PORT}${BASE}/`));
