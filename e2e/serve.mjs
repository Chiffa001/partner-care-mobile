// Serves the Expo static web export with clean route URLs (e2e web server).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || 'dist');
const PORT = Number(process.env.E2E_PORT || 8099);

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error(`[e2e serve] ${ROOT}/index.html not found — run "npm run build:web" first.`);
  process.exit(1);
}

const send = (res, file) => {
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') {
      return send(res, path.join(ROOT, 'index.html'));
    }
    const direct = path.join(ROOT, urlPath);
    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
      return send(res, direct);
    }
    const asHtml = path.join(ROOT, urlPath.replace(/\/$/, '') + '.html');
    if (fs.existsSync(asHtml)) {
      return send(res, asHtml);
    }
    return send(res, path.join(ROOT, 'index.html')); // SPA fallback
  })
  .listen(PORT, () => console.log(`[e2e serve] ${ROOT} on http://localhost:${PORT}`));
