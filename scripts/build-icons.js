// Build PNG icons from the SVG using Canvas (node-canvas not included by default).
// If you have Inkscape or rsvg-convert installed, you can use one of those instead.
// This script is optional; you can also export PNGs from a design tool.

const fs = require('fs');
const { execSync } = require('child_process');

const sizes = [16, 32, 48, 128];
const svgPath = require('path').join(__dirname, '..', 'icons', 'icon.svg');
const outDir = require('path').join(__dirname, '..', 'icons');

function tryExec(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (e) {
    return false;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function renderWithTool(tool) {
  for (const size of sizes) {
    const out = `${outDir}/icon${size}.png`;
    let ok = false;
    if (tool === 'inkscape') {
      ok = tryExec(`inkscape ${svgPath} --export-type=png --export-filename=${out} -w ${size} -h ${size}`);
    } else if (tool === 'rsvg') {
      ok = tryExec(`rsvg-convert -w ${size} -h ${size} ${svgPath} -o ${out}`);
    }
    if (!ok) return false;
  }
  return true;
}

ensureDir(outDir);

if (renderWithTool('inkscape')) {
  console.log('Icons built using Inkscape');
  process.exit(0);
}
if (renderWithTool('rsvg')) {
  console.log('Icons built using rsvg-convert');
  process.exit(0);
}

console.warn('Could not find Inkscape or rsvg-convert. Please export PNGs manually from icons/icon.svg at sizes 16, 32, 48, 128.');

