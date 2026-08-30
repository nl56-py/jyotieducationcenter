const path = require('path');
const fs = require('fs');
const http = require('http');
const { parse } = require('url');
const zlib = require('zlib');
const Module = require('module');

// Intercept Turbopack hashed external module requires (e.g. @prisma/client-hash)
const origRequire = Module.prototype.require;
Module.prototype.require = function(modulePath, ...args) {
  if (typeof modulePath === 'string' && modulePath.startsWith('@prisma/client-')) {
    return origRequire.call(this, '@prisma/client', ...args);
  }
  return origRequire.call(this, modulePath, ...args);
};

// Ensure both virtual environment and local node_modules are in module resolution path
const nodeVenvModules = '/home2/jyoti/nodevenv/domains/jyotieducation.edu.np/public_html/20/lib/node_modules';
const appNodeModules = path.join(__dirname, 'node_modules');
const paths = [appNodeModules, nodeVenvModules];
if (process.env.NODE_PATH) {
  paths.push(process.env.NODE_PATH);
}
process.env.NODE_PATH = paths.join(':');
process.env.DATABASE_URL = "mysql://jyoti_jecusr:JyotiEducations2026%21%23@localhost:3306/jyoti_jecapp";
Module._initPaths();

// Pure JS zip extractor supporting standard compression
function unzipSync(zipPath, destDir) {
  const buf = fs.readFileSync(zipPath);
  let pos = 0;
  let count = 0;
  while (pos < buf.length - 4) {
    const sig = buf.readUInt32LE(pos);
    if (sig !== 0x04034b50) break;
    const method = buf.readUInt16LE(pos + 8);
    const compSize = buf.readUInt32LE(pos + 18);
    const nameLen = buf.readUInt16LE(pos + 26);
    const extraLen = buf.readUInt16LE(pos + 28);
    let name = buf.toString('utf8', pos + 30, pos + 30 + nameLen);
    name = name.replace(/\\/g, '/');
    const dataStart = pos + 30 + nameLen + extraLen;
    const compData = buf.slice(dataStart, dataStart + compSize);
    
    const outPath = path.join(destDir, name);
    if (name.endsWith('/') || name.endsWith('\\')) {
      fs.mkdirSync(outPath, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      let outData;
      if (method === 0) {
        outData = compData;
      } else if (method === 8) {
        outData = zlib.inflateRawSync(compData);
      } else {
        outData = compData;
      }
      fs.writeFileSync(outPath, outData);
      count++;
    }
    pos = dataStart + compSize;
  }
  return count;
}

// Auto-extract deploy_next.zip if present upon server boot
const autoZip = path.join(__dirname, 'deploy_next.zip');
if (fs.existsSync(autoZip)) {
  try {
    console.log('> Found deploy_next.zip, extracting...');
    const count = unzipSync(autoZip, __dirname);
    console.log(`> Successfully auto-extracted ${count} files!`);
    try { fs.unlinkSync(autoZip); } catch (_) {}
  } catch (err) {
    console.error('> Auto-extract error:', err);
  }
}

const MIME_TYPES = {
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
};

const staticBase = path.join(__dirname, '.next', 'static');
const publicBase = path.join(__dirname, 'public');

function serveStaticFile(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

let nextApp = null;
let handle = null;
let preparePromise = null;
let prepareError = null;

try {
  const next = require('next');
  nextApp = next({
    dev: false,
    dir: __dirname,
    hostname: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000', 10),
  });

  preparePromise = nextApp.prepare()
    .then(() => {
      handle = nextApp.getRequestHandler();
      console.log('> Next.js prepared successfully!');
    })
    .catch((err) => {
      prepareError = err;
      console.error('> Next.js prepare failed:', err);
    });
} catch (err) {
  prepareError = err;
  console.error('> Next init failed:', err);
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname || '/';

  // 1. Direct high-speed static asset serving for /_next/static/*
  if (pathname.startsWith('/_next/static/')) {
    const relPath = pathname.slice('/_next/static/'.length);
    const fullPath = path.normalize(path.join(staticBase, relPath));
    if (fullPath.startsWith(staticBase)) {
      return serveStaticFile(fullPath, res);
    }
  }

  // 2. Direct high-speed public static assets (images, favicon, etc.)
  if (pathname.startsWith('/images/') || pathname.startsWith('/favicon/') || pathname === '/favicon.ico') {
    const fullPath = path.normalize(path.join(publicBase, pathname));
    if (fullPath.startsWith(publicBase) && fs.existsSync(fullPath)) {
      return serveStaticFile(fullPath, res);
    }
  }

  // 3. Extract any zip in-process
  if (pathname === '/__unzip__') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    try {
      const parsedUrl = parse(req.url, true);
      const fileName = parsedUrl.query?.file || 'deploy_next.zip';
      const zipPath = path.join(__dirname, fileName);
      const count = unzipSync(zipPath, __dirname);
      return res.end(`✅ Extracted ${count} files from ${fileName} successfully!`);
    } catch(e) {
      return res.end('❌ Unzip error: ' + (e.stack || e.message));
    }
  }

  // 4. One-click Live Database Seeder
  if (pathname === '/__seed_jyoti_database__') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    try {
      delete require.cache[require.resolve('./seed_jyoti_data.js')];
      const seeder = require('./seed_jyoti_data.js');
      await seeder.main();
      return res.end('✅ Seeding completed successfully! All destination countries, universities, team members, testimonials, blogs, services, test prep, and entrance programs are now in the database.');
    } catch(e) {
      return res.end('❌ Seeding Error:\n' + (e.stack || e.message));
    }
  }

  // 5. Test DB Connection
  if (pathname === '/__test_db__') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    try {
      const mysql = require('mysql2/promise');
      const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'jyoti_jecusr',
        password: 'JyotiEducations2026!#',
        database: 'jyoti_jecapp'
      });
      const [rows] = await conn.query('SELECT * FROM team_members');
      await conn.end();
      return res.end(JSON.stringify({ success: true, count: rows.length, rows }));
    } catch(e) {
      return res.end(JSON.stringify({ success: false, error: e.stack || e.message }));
    }
  }

  // 6. Execute SQL statements (POST body = raw SQL)
  if (pathname === '/__run_sql__' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      try {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({
          host: 'localhost',
          user: 'jyoti_jecusr',
          password: 'JyotiEducations2026!#',
          database: 'jyoti_jecapp',
          multipleStatements: true
        });
        const [results] = await conn.query(body);
        await conn.end();
        const info = Array.isArray(results)
          ? results.map((r, i) => ({ statement: i+1, affectedRows: r.affectedRows, changedRows: r.changedRows }))
          : { affectedRows: results.affectedRows, changedRows: results.changedRows };
        return res.end(JSON.stringify({ success: true, info }));
      } catch(e) {
        return res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (prepareError) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Next.js Prepare Error:\n' + (prepareError.stack || prepareError.message || String(prepareError)));
  }

  // Await prepare if request arrives during cold start
  if (!handle && preparePromise) {
    await preparePromise;
  }

  if (!handle) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Server handler not ready');
  }

  try {
    await handle(req, res, parsedUrl);
  } catch (err) {
    console.error('Request Error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Request Error:\n' + (err.stack || err.message || String(err)));
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
