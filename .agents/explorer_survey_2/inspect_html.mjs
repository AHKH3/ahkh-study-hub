import fs from 'node:fs';

function inspectHtml(filePath) {
  console.log(`=== Inspecting ${filePath} ===`);
  const html = fs.readFileSync(filePath, 'utf8');
  console.log('Total HTML size:', html.length, 'bytes');

  // Check script tags
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  console.log('Script tags count:', scripts.length);
  let totalScriptBytes = 0;
  scripts.forEach((s, idx) => {
    totalScriptBytes += s[0].length;
    console.log(`  Script ${idx + 1} size: ${s[0].length} bytes. Preview: ${s[0].slice(0, 100).replace(/\n/g, ' ')}...`);
  });
  console.log('Total script bytes:', totalScriptBytes);

  // Check SVG elements
  const svgs = [...html.matchAll(/<svg\b[^>]*>([\s\S]*?)<\/svg>/gi)];
  let totalSvgBytes = svgs.reduce((acc, s) => acc + s[0].length, 0);
  console.log('Total SVG count:', svgs.length, 'totaling', totalSvgBytes, 'bytes');

  // Check head vs body
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  console.log('Head size:', headMatch ? headMatch[0].length : 0, 'bytes');
  console.log('Body size:', bodyMatch ? bodyMatch[0].length : 0, 'bytes');

  // In body, breakdown by major sections
  if (filePath.includes('courses/springboard-ux/index.html')) {
    // Check modules markup
    const modulesMatch = html.match(/<div class="space-y-6">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/main>/i);
    if (modulesMatch) {
      console.log('Modules markup size:', modulesMatch[0].length, 'bytes');
    }
  }

  if (filePath.includes('how-do-you-break-into-ux-design')) {
    const formattedView = html.match(/id="formatted-view"[\s\S]*?<\/div>\s*<div id="transcript-view"/i);
    const transcriptView = html.match(/id="transcript-view"[\s\S]*?<\/div>\s*<footer/i);
    console.log('Formatted view size:', formattedView ? formattedView[0].length : 0, 'bytes');
    console.log('Transcript view size:', transcriptView ? transcriptView[0].length : 0, 'bytes');
  }
  console.log('');
}

inspectHtml('dist/courses/springboard-ux/index.html');
inspectHtml('dist/courses/springboard-ux/how-do-you-break-into-ux-design/index.html');
inspectHtml('dist/courses/springboard-ux/the-anatomy-of-product-experience/index.html');
