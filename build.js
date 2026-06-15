/*
 * build.js — produces a self-contained index.html.
 *
 * The dev version (Portfolio.html) loads each .jsx file with
 * <script type="text/babel" src="..."> and compiles it in the browser.
 * That works when the page is served over HTTP, but NOT when the file is
 * opened directly (file://), because the browser blocks XHR to local files.
 *
 * This build inlines every .jsx file straight into the HTML as
 * <script type="text/babel"> blocks, so there is nothing to fetch and the
 * page works anywhere — double-clicked or served. No bundler, no deps.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC_HTML = path.join(ROOT, 'Portfolio.html');
const OUT_HTML = path.join(ROOT, 'index.html');

let html = fs.readFileSync(SRC_HTML, 'utf8');

// Inline every external babel script: <script type="text/babel" src="X"></script>
const re = /<script\s+type="text\/babel"\s+src="([^"]+)"><\/script>/g;
html = html.replace(re, (match, src) => {
  const filePath = path.join(ROOT, src);
  let code = fs.readFileSync(filePath, 'utf8');
  // Guard against an accidental closing tag inside string literals.
  code = code.replace(/<\/script>/g, '<\\/script>');
  return `<script type="text/babel" data-src="${src}">\n${code}\n</script>`;
});

fs.writeFileSync(OUT_HTML, html, 'utf8');
console.log('Built index.html (self-contained). Open it directly or serve it.');
