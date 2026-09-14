const fs = require("fs");
const path = require("path");

const imagesRoot = path.join(process.cwd(), "public", "images");
const codeRoots = ["app", "components", "data"];
const imageExts = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const assets = walk(imagesRoot)
  .filter((file) => imageExts.has(path.extname(file).toLowerCase()))
  .map((file) => ({
    file,
    publicPath: `/${path.relative(path.join(process.cwd(), "public"), file).replaceAll(path.sep, "/")}`,
    size: fs.statSync(file).size,
  }))
  .sort((a, b) => b.size - a.size);

const codeText = codeRoots
  .flatMap((root) => walk(path.join(process.cwd(), root)))
  .filter((file) => /\.(tsx|ts|js|jsx|css|md|json)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const unused = assets.filter((asset) => !codeText.includes(asset.publicPath));
const total = assets.reduce((sum, asset) => sum + asset.size, 0);

function format(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

console.log(`Total image assets: ${assets.length}`);
console.log(`Total image weight: ${format(total)}`);
console.log("\nLargest assets:");
assets.slice(0, 15).forEach((asset) => {
  console.log(`- ${format(asset.size).padStart(8)}  ${asset.publicPath}`);
});

if (unused.length) {
  console.log("\nPotentially unused assets:");
  unused.forEach((asset) => console.log(`- ${asset.publicPath}`));
} else {
  console.log("\nNo unused public image assets detected by static path scan.");
}
