/**
 * AHKH Study Hub - Dist Inspector Utilities
 * Inspects, parses, and audits static HTML/CSS/JS artifacts in dist/ for E2E verification.
 */

import fs from 'node:fs';
import path from 'node:path';

export class DistInspector {
  constructor(distDir = path.join(process.cwd(), 'dist')) {
    this.distDir = distDir;
    this.htmlFiles = [];
    this.cssFiles = [];
    this.jsFiles = [];
    this.init();
  }

  init() {
    if (!fs.existsSync(this.distDir)) {
      return;
    }
    const walk = (dir) => {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          walk(full);
        } else if (full.endsWith('.html')) {
          this.htmlFiles.push(full);
        } else if (full.endsWith('.css')) {
          this.cssFiles.push(full);
        } else if (full.endsWith('.js')) {
          this.jsFiles.push(full);
        }
      }
    };
    walk(this.distDir);
  }

  getAllHtmlFiles() {
    return this.htmlFiles;
  }

  getLessonHtmlFiles() {
    return this.htmlFiles.filter((f) => {
      const rel = path.relative(this.distDir, f);
      // Pattern: courses/<course>/<lesson>/index.html
      const parts = rel.split(path.sep);
      return parts.length >= 3 && parts[0] === 'courses' && parts[1] !== 'index.html' && parts[2] !== 'index.html';
    });
  }

  getCourseIndexHtmlFiles() {
    return this.htmlFiles.filter((f) => {
      const rel = path.relative(this.distDir, f);
      const parts = rel.split(path.sep);
      return parts.length === 3 && parts[0] === 'courses' && parts[2] === 'index.html';
    });
  }

  getLibraryIndexHtml() {
    const p = path.join(this.distDir, 'index.html');
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  }

  readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
  }

  getFileSize(filePath) {
    return fs.statSync(filePath).size;
  }

  findTags(html, tagName) {
    const regex = new RegExp(`<${tagName}\\b([^>]*?)>([\\s\\S]*?)<\\/${tagName}>|<${tagName}\\b([^>]*?)\\/?>`, 'gi');
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      matches.push({
        full: match[0],
        attrsString: match[1] || match[3] || '',
        content: match[2] || '',
      });
    }
    return matches;
  }

  parseAttributes(attrsString) {
    const attrs = {};
    const regex = /([a-zA-Z0-9_-]+)(?:=["']([^"']*)["']|=(?=[^"'\s>]+)([^"'\s>]+))?/g;
    let m;
    while ((m = regex.exec(attrsString)) !== null) {
      attrs[m[1]] = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : true);
    }
    return attrs;
  }

  getCombinedCss() {
    return this.cssFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  }
}
