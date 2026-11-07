import { ProjectFile, WebsiteIssue } from '../types';

export function diagnoseWebsite(files: Record<string, ProjectFile>): WebsiteIssue[] {
  const issues: WebsiteIssue[] = [];
  const html = files['index.html']?.content || '';
  const css = files['styles.css']?.content || '';
  const js = files['app.js']?.content || '';

  // 1. Missing Viewport Check (Critical for mobile)
  if (!html.includes('name="viewport"')) {
    issues.push({
      id: 'missing-viewport',
      type: 'error',
      title: 'Missing Mobile Viewport Meta Tag',
      description: 'Without a viewport meta tag, mobile browsers will scale the website incorrectly.',
      file: 'index.html',
      autoFixable: true,
    });
  }

  // 2. Images missing alt attributes (Accessibility)
  const imgMatches = html.match(/<img((?:(?!alt=)[^>])*)>/gi);
  if (imgMatches && imgMatches.length > 0) {
    issues.push({
      id: 'missing-alt-tags',
      type: 'warning',
      title: `${imgMatches.length} Image(s) Missing Alternative Text (alt)`,
      description: 'Screen readers and search engines require descriptive alt attributes on all images.',
      file: 'index.html',
      autoFixable: true,
    });
  }

  // 3. Broken internal anchor links
  const anchorHrefs = Array.from(html.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)).map(m => m[1]);
  for (const anchor of anchorHrefs) {
    if (anchor && !html.includes(`id="${anchor}"`)) {
      issues.push({
        id: `broken-anchor-${anchor}`,
        type: 'warning',
        title: `Broken Anchor Link (#${anchor})`,
        description: `Navigation links to #${anchor}, but no section with id="${anchor}" was found.`,
        file: 'index.html',
        autoFixable: true,
      });
    }
  }

  // 4. Fixed wide width styling that might cause mobile overflow
  if (html.includes('w-[1200px]') || html.includes('width: 1200px') || css.includes('width: 1200px')) {
    issues.push({
      id: 'mobile-overflow',
      type: 'warning',
      title: 'Potential Mobile Horizontal Overflow',
      description: 'Hardcoded wide widths detected. Use max-w-full and responsive classes instead.',
      file: 'styles.css',
      autoFixable: true,
    });
  }

  // 5. Missing title or empty document
  if (!html.includes('<title>') || html.includes('<title></title>')) {
    issues.push({
      id: 'missing-title',
      type: 'warning',
      title: 'Missing Page Title Tag',
      description: 'Browser tab and SEO title is missing.',
      file: 'index.html',
      autoFixable: true,
    });
  }

  // 6. Basic JS error check
  if (js.includes('eval(')) {
    issues.push({
      id: 'dangerous-eval',
      type: 'error',
      title: 'Security Warning: Dangerous eval() Found',
      description: 'eval() allows arbitrary code execution and poses serious security vulnerabilities.',
      file: 'app.js',
      autoFixable: true,
    });
  }

  return issues;
}

export function autoFixWebsite(files: Record<string, ProjectFile>): Record<string, ProjectFile> {
  const updated = { ...files };
  if (updated['index.html']) {
    let content = updated['index.html'].content;

    // Fix viewport
    if (!content.includes('name="viewport"')) {
      content = content.replace('<head>', '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    }

    // Fix alt tags
    content = content.replace(/<img((?:(?!alt=)[^>])*)>/gi, '<img$1 alt="Website Visual Asset">');

    // Fix missing title
    if (!content.includes('<title>')) {
      content = content.replace('<head>', '<head>\n  <title>SaipratapS❤️C Website</title>');
    }

    // Fix missing targets for common anchors
    const commonAnchors = ['features', 'about', 'contact', 'pricing', 'showcase'];
    for (const anchor of commonAnchors) {
      if (content.includes(`href="#${anchor}"`) && !content.includes(`id="${anchor}"`)) {
        content = content.replace('</body>', `<div id="${anchor}"></div>\n</body>`);
      }
    }

    updated['index.html'] = {
      ...updated['index.html'],
      content,
    };
  }

  if (updated['app.js']) {
    let js = updated['app.js'].content;
    js = js.replace(/eval\([^)]*\);?/g, '// [SaipratapS❤️C Security Guard: Removed unsafe eval call]');
    updated['app.js'] = {
      ...updated['app.js'],
      content: js,
    };
  }

  return updated;
}
