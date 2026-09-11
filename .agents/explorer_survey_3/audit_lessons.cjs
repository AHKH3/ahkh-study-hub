const fs = require("fs");
const content = fs.readFileSync("src/data/courses.ts", "utf8");

// Parse lessons from courses.ts
// Match lessons by regex
const lessonRegex = /id:\s*'(sb-[0-9]+-[0-9]+)',\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)'[\s\S]*?contentHtml:\s*`([\s\S]*?)`\s*,\s*(?:videoTimestamps|outline|\})/g;

let match;
let count = 0;
const results = [];

while ((match = lessonRegex.exec(content)) !== null) {
  count++;
  const [_, id, slug, title, html] = match;
  const hasBlockquote = /<blockquote/i.test(html);
  const hasSocratic = /Inquiry|Reflection|Callout|<aside/i.test(html);
  const hasTable = /<table/i.test(html);
  const hasFooter = /Attribution|Citation|Original Source|<footer|Source:/i.test(html);
  const hasCard = /rounded-xs[^"]*(?:bg-white|bg-paper-100|bg-paper-50)[^"]*border/i.test(html);
  
  results.push({
    id,
    slug,
    title,
    hasBlockquote,
    hasSocratic,
    hasTable,
    hasFooter,
    hasCard,
  });
}

console.log(`Parsed ${count} lessons.`);
console.log("Summary of editorial components across 37 lessons:");
console.log("Lessons with Blockquote (Pullout Axiom):", results.filter(r => r.hasBlockquote).length);
console.log("Lessons with Socratic/Reflection Callout:", results.filter(r => r.hasSocratic).length);
console.log("Lessons with Comparative Matrix (Table):", results.filter(r => r.hasTable).length);
console.log("Lessons with Attribution Footer/Citation:", results.filter(r => r.hasFooter).length);
console.log("Lessons with Editorial Cards:", results.filter(r => r.hasCard).length);

const missingFooter = results.filter(r => !r.hasFooter);
console.log("\nLessons without Attribution Footer:", missingFooter.map(r => r.id));

const missingBlockquote = results.filter(r => !r.hasBlockquote);
console.log("Lessons without Blockquote:", missingBlockquote.map(r => r.id));

