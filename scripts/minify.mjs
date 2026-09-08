// Runs after `eleventy` builds _site/. Strips comments and whitespace from
// the public output only — src/ stays fully commented for maintenance.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { minify as minifyHtml } from "html-minifier-terser";
import CleanCSS from "clean-css";
import { minify as minifyJs } from "terser";

const OUT_DIR = path.join(process.cwd(), "_site");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function minifyFile(file) {
  const ext = path.extname(file);
  const content = await readFile(file, "utf8");

  if (ext === ".html") {
    const out = await minifyHtml(content, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
    await writeFile(file, out);
  } else if (ext === ".css") {
    const out = new CleanCSS({ level: 2 }).minify(content);
    if (out.errors.length) throw new Error(`CSS minify failed for ${file}: ${out.errors.join(", ")}`);
    await writeFile(file, out.styles);
  } else if (ext === ".js") {
    // vendor/html2canvas.min.js is already minified; skip re-processing it
    if (file.includes("vendor")) return;
    const out = await minifyJs(content, { format: { comments: false } });
    await writeFile(file, out.code);
  }
}

const files = await walk(OUT_DIR);
let count = 0;
for (const file of files) {
  const ext = path.extname(file);
  if (ext === ".html" || ext === ".css" || ext === ".js") {
    await minifyFile(file);
    count++;
  }
}
console.log(`Minified ${count} files in ${path.relative(process.cwd(), OUT_DIR)}/`);
