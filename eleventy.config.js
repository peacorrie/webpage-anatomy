import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const OUTPUT_DIR = "_site";

// Concatenated in dependency order: reset first, tokens/typography before
// anything that reads their custom properties, layout/components last.
const CSS_FILES = ["reset.css", "tokens.css", "typography.css", "layout.css", "components.css"];

function buildCombinedCss() {
  const combined = CSS_FILES.map((file) => readFileSync(path.join("src/assets/css", file), "utf8")).join("\n");
  const outDir = path.join(OUTPUT_DIR, "assets/css");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "site.css"), combined);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");

  eleventyConfig.addFilter("pad2", (value) => String(value).padStart(2, "0"));
  eleventyConfig.addFilter("jsonSafe", (value) => JSON.stringify(value));

  // Five separate <link rel="stylesheet"> tags each cost a render-blocking
  // round trip. Combining them into one file (still five separate, fully
  // commented source files in src/assets/css/ for maintenance) measurably
  // improved LCP in a real Lighthouse run against this site.
  eleventyConfig.on("eleventy.after", buildCombinedCss);

  return {
    dir: {
      input: "src",
      output: OUTPUT_DIR,
      includes: "_includes",
      data: "_data",
    },
  };
}
