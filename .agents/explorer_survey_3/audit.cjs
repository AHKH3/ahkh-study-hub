const fs = require("fs");
const content = fs.readFileSync("src/data/courses.ts", "utf8");

// Strip URLs
const noUrls = content.replace(/https?:\/\/[^\s"'<>]+/g, "");
const slashMatches = [...noUrls.matchAll(/\/\/\s*[A-Za-z0-9]/g)];
console.log("Non-URL Double slashes count:", slashMatches.length);
slashMatches.forEach(m => {
  const start = Math.max(0, m.index - 30);
  const end = Math.min(noUrls.length, m.index + 50);
  console.log("Snippet:", noUrls.substring(start, end).replace(/\n/g, " "));
});

// Check bg fills
const bgMatches = [...content.matchAll(/\b(?:dark:)?bg-(blue|purple|amber|emerald|rose|sky|teal|indigo|orange|red)-[0-9]+\b/g)];
console.log("\nColored bg fills count:", bgMatches.length);
bgMatches.forEach(m => {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(content.length, m.index + 80);
  console.log("Bg snippet (" + m[0] + "):", content.substring(start, end).replace(/\n/g, " "));
});
