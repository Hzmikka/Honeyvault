const [major, minor, patch] = process.versions.node
  .split(".")
  .map((part) => Number.parseInt(part, 10));

const meetsMinimum =
  major > 18 ||
  (major === 18 && (minor > 17 || (minor === 17 && patch >= 0)));

if (meetsMinimum) {
  process.exit(0);
}

console.error(
  [
    `Unsupported Node.js ${process.version}.`,
    "This Next.js 14 starter requires Node.js >=18.17.0.",
    "Use Node 20 or newer, then run `npm run dev:clean` once to rebuild the Next cache.",
  ].join("\n")
);

process.exit(1);
