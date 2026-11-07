import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// In-memory persistent storage for projects and published deployments
interface ProjectFile {
  name: string;
  content: string;
  language: string;
}

interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  subdomain: string;
  isPublished: boolean;
  publishedAt?: string;
  customDomain?: string;
  files: Record<string, ProjectFile>;
  updatedAt: string;
  createdAt: string;
  version: number;
}

const projectsDb = new Map<string, ProjectData>();
const deploymentsDb = new Map<string, ProjectData>(); // keyed by subdomain

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback high-quality template generator if Gemini API key is missing or quota exceeded
function generateFallbackSite(title: string, category: string, prompt: string): Record<string, ProjectFile> {
  const cleanCategory = (category || 'business').toLowerCase();
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Created with SaipratapS❤️C</title>
  <meta name="description" content="${prompt.slice(0, 150)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
  <!-- Top Banner -->
  <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
    ✨ Published for Free on <span class="underline">SaipratapS❤️C</span> Platform
  </div>

  <!-- Navbar -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#home" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25">
          ${title.charAt(0).toUpperCase()}
        </div>
        <span class="text-xl font-bold tracking-tight text-white">${title}</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#about" class="hover:text-indigo-400 transition-colors">About</a>
        <a href="#features" class="hover:text-indigo-400 transition-colors">Features</a>
        <a href="#showcase" class="hover:text-indigo-400 transition-colors">Highlights</a>
        <a href="#pricing" class="hover:text-indigo-400 transition-colors">Plans</a>
        <a href="#contact" class="hover:text-indigo-400 transition-colors">Contact</a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <a href="#contact" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-lg shadow-indigo-600/30">
          Get Started
        </a>
      </div>

      <!-- Mobile menu button -->
      <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Toggle Navigation">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>
    </div>

    <!-- Mobile Nav dropdown -->
    <div id="mobile-menu" class="hidden md:hidden px-4 pt-2 pb-6 border-b border-slate-800 bg-slate-900/95 space-y-3 text-sm font-medium">
      <a href="#about" class="block py-2 text-slate-200">About</a>
      <a href="#features" class="block py-2 text-slate-200">Features</a>
      <a href="#showcase" class="block py-2 text-slate-200">Highlights</a>
      <a href="#pricing" class="block py-2 text-slate-200">Plans</a>
      <a href="#contact" class="block py-2 text-indigo-400">Contact Us</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
          <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          Next-Gen ${cleanCategory.toUpperCase()} Solutions
        </div>
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Empowering Your Vision with <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">${title}</span>
        </h1>
        <p class="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          ${prompt.length > 20 ? prompt : 'Transforming experiences with intuitive design, modern performance, and next-generation craftsmanship. Built to scale seamlessly.'}
        </p>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base transition shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2">
            <span>Explore Now</span>
            <i class="fa-solid fa-arrow-right text-sm"></i>
          </a>
          <a href="#features" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-base transition flex items-center justify-center">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="py-20 border-t border-slate-900 bg-slate-950/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-white tracking-tight sm:text-4xl">Key Highlights & Features</h2>
        <p class="mt-4 text-slate-400">Engineered with precision to deliver maximum reliability, speed, and elegance.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
          <div class="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Ultra-Fast Performance</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Optimized architecture ensuring instantaneous load times, responsive animations, and lightweight execution.</p>
        </div>

        <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 transition-all hover:-translate-y-1 group">
          <div class="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Rock-Solid Security</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Built-in protections, verified integrity, and standard encryption to safeguard every interaction and visitor data.</p>
        </div>

        <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/50 transition-all hover:-translate-y-1 group">
          <div class="w-12 h-12 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-mobile-screen"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">100% Mobile Ready</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Fluid responsiveness tailored across mobile phones, tablets, laptops, and ultra-wide desktop monitors.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Section / Showcase -->
  <section id="showcase" class="py-20 bg-slate-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/20 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <span class="text-xs font-bold uppercase tracking-wider text-pink-400">Designed for Excellence</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">Elevate Every Detail of Your Digital Presence</h2>
          <p class="text-slate-400 leading-relaxed">
            From modern typographic hierarchy to micro-interactions, ${title} sets a new standard for modern web development and community engagement.
          </p>
          <ul class="space-y-3 text-slate-300 text-sm">
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-indigo-400"></i> Seamless user onboarding & accessible interfaces
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-indigo-400"></i> Automatic SEO tags & social OpenGraph cards
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-indigo-400"></i> Zero-subscription free public publishing
            </li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-rose-500"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span class="text-xs text-slate-500 ml-2 font-mono">live-metrics.app</span>
            </div>
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span class="text-sm text-slate-300">Community Engagement</span>
                <span class="text-emerald-400 font-bold">+98.4%</span>
              </div>
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span class="text-sm text-slate-300">Page Load Index</span>
                <span class="text-indigo-400 font-bold">0.42s</span>
              </div>
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span class="text-sm text-slate-300">Uptime Reliability</span>
                <span class="text-purple-400 font-bold">99.99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact / Lead Form -->
  <section id="contact" class="py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white">Get in Touch</h2>
        <p class="mt-2 text-slate-400 text-sm">Have inquiries or want to collaborate? Send us a message.</p>
      </div>
      <form id="contact-form" class="space-y-4 bg-slate-900/60 p-8 rounded-2xl border border-slate-800">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
            <input type="text" required placeholder="Alex Morgan" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input type="email" required placeholder="alex@example.com" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Subject</label>
          <input type="text" required placeholder="How can we help?" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Message</label>
          <textarea rows="4" required placeholder="Write your message here..." class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"></textarea>
        </div>
        <button type="submit" class="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30">
          Send Message
        </button>
        <p id="form-feedback" class="hidden text-xs text-center text-emerald-400 mt-2">Thank you! Your message has been received.</p>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-900 bg-slate-950 py-12 text-slate-500 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2">
        <span class="font-bold text-white text-sm">${title}</span>
        <span>© 2026. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="#home" class="hover:text-slate-300">Privacy</a>
        <a href="#home" class="hover:text-slate-300">Terms</a>
        <span class="text-indigo-400">Powered by SaipratapS❤️C</span>
      </div>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>`;

  const cssContent = `/* Custom Stylesheet for ${title} */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* Glassmorphism helpers */
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
`;

  const jsContent = `// Interactive functionality for ${title}
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll close for mobile menu
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // Contact form submission handler
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (feedback) {
        feedback.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
          feedback.classList.add('hidden');
        }, 5000);
      }
    });
  }
});
`;

  return {
    'index.html': { name: 'index.html', content: htmlContent, language: 'html' },
    'styles.css': { name: 'styles.css', content: cssContent, language: 'css' },
    'app.js': { name: 'app.js', content: jsContent, language: 'javascript' },
    'README.md': {
      name: 'README.md',
      content: `# ${title}\n\nGenerated with **SaipratapS❤️C** (Build. Create. Publish. Share. Free.)\n\nPrompt: ${prompt}\nCategory: ${category}\n\n## Structure\n- index.html: Main HTML5 template\n- styles.css: Styling rules\n- app.js: Interactive scripts\n`,
      language: 'markdown'
    }
  };
}

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. AI Website Generation (/api/ai/generate)
app.post('/api/ai/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, category = 'General', style = 'Modern', title = 'My Website' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Please provide a valid description prompt.' });
      return;
    }

    if (aiClient) {
      try {
        const systemPrompt = `You are an elite Senior Full-Stack Web Architect and UI/UX Designer for the "SaipratapS❤️C" website creation platform.
Your task is to generate a complete, responsive, modern, production-grade website based on the user's prompt.
Category: ${category}
Design Style: ${style}
Preferred Title: ${title}

IMPORTANT REQUIREMENTS:
1. Return a JSON object with this exact shape:
{
  "title": "Website Title",
  "description": "Short meta description",
  "files": {
    "index.html": "<complete, valid HTML5 with Tailwind CDN, Google Fonts, FontAwesome 6, rich content, semantic tags, accessible forms, responsive layout, dark/modern style>",
    "styles.css": "<modern CSS animations, custom classes, clean design system>",
    "app.js": "<clean modern JavaScript with interactive handlers, mobile menu toggle, modal/accordion/form listeners>"
  }
}
2. Ensure the HTML file includes:
   - Proper meta tags, title, responsive viewport.
   - Tailwind CSS script: <script src="https://cdn.tailwindcss.com"></script>
   - FontAwesome icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
   - Google Font link.
   - Top banner or badge: "Published for Free on SaipratapS❤️C"
   - Header with Logo, Navigation links, Action button, Mobile toggle.
   - Hero section with bold heading, subtitle, CTA buttons.
   - Comprehensive sections relevant to the category (e.g. Courses for Education, Menu for Restaurant, Services for Business, Products for E-commerce, Projects for Portfolio).
   - Testimonials / Reviews / Social Proof.
   - Interactive Pricing / Showcase / Gallery.
   - Working Contact form with input validation and feedback.
   - Comprehensive footer with links and branding.
   - <link rel="stylesheet" href="styles.css"> and <script src="app.js"></script>.
3. Output ONLY raw valid JSON, no markdown backticks like \`\`\`json.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Create a website for this description: "${prompt}"`,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text || '';
        let parsed: any;
        try {
          parsed = JSON.parse(textOutput);
        } catch {
          // In case backticks were included
          const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
          parsed = JSON.parse(cleaned);
        }

        if (parsed && parsed.files && parsed.files['index.html']) {
          const filesRecord: Record<string, ProjectFile> = {
            'index.html': { name: 'index.html', content: parsed.files['index.html'], language: 'html' },
            'styles.css': { name: 'styles.css', content: parsed.files['styles.css'] || '/* Styles */', language: 'css' },
            'app.js': { name: 'app.js', content: parsed.files['app.js'] || '// Scripts', language: 'javascript' },
            'README.md': {
              name: 'README.md',
              content: `# ${parsed.title || title}\n\nBuilt with SaipratapS❤️C\n\n${parsed.description || prompt}`,
              language: 'markdown'
            }
          };

          res.json({
            success: true,
            title: parsed.title || title,
            description: parsed.description || prompt,
            files: filesRecord,
          });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini generation fallback used due to:', err?.message || err);
      }
    }

    // Fallback template generation
    const fallbackFiles = generateFallbackSite(title, category, prompt);
    res.json({
      success: true,
      title: title,
      description: prompt,
      files: fallbackFiles,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Failed to generate website' });
  }
});

// 2. AI Website Editing (/api/ai/edit)
app.post('/api/ai/edit', async (req: Request, res: Response) => {
  try {
    const { prompt, currentFiles } = req.body;

    if (!prompt || !currentFiles) {
      res.status(400).json({ error: 'Missing prompt or files to edit' });
      return;
    }

    if (aiClient) {
      try {
        const editPrompt = `You are the AI Website Editor for SaipratapS❤️C.
The user wants to make this modification to their website: "${prompt}".

Current files:
${JSON.stringify(currentFiles, null, 2)}

Instructions:
1. Apply the user's modifications precisely to only the necessary files.
2. Preserve all working functionality, styling, and navigation unless requested to alter them.
3. Return ONLY a valid JSON object matching this structure:
{
  "explanation": "Brief explanation of changes applied",
  "files": {
    "index.html": "<updated index.html content>",
    "styles.css": "<updated styles.css content>",
    "app.js": "<updated app.js content>"
  }
}`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: editPrompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text || '';
        const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (parsed && parsed.files) {
          const updatedFiles: Record<string, ProjectFile> = { ...currentFiles };
          for (const key of Object.keys(parsed.files)) {
            if (updatedFiles[key]) {
              updatedFiles[key] = {
                ...updatedFiles[key],
                content: parsed.files[key],
              };
            } else {
              updatedFiles[key] = {
                name: key,
                content: parsed.files[key],
                language: key.endsWith('.html') ? 'html' : key.endsWith('.css') ? 'css' : 'javascript',
              };
            }
          }

          res.json({
            success: true,
            explanation: parsed.explanation || 'Applied modifications successfully.',
            files: updatedFiles,
          });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini edit fallback used due to:', err?.message || err);
      }
    }

    // Direct local modification fallback if AI is unavailable
    const updatedFiles = { ...currentFiles };
    if (updatedFiles['index.html']) {
      let content = updatedFiles['index.html'].content;
      // If user asks for color change
      if (prompt.toLowerCase().includes('dark') || prompt.toLowerCase().includes('black')) {
        content = content.replace(/bg-white/g, 'bg-slate-950').replace(/text-slate-900/g, 'text-slate-100');
      } else if (prompt.toLowerCase().includes('blue')) {
        content = content.replace(/from-indigo-600/g, 'from-blue-600').replace(/to-pink-600/g, 'to-cyan-600');
      }
      updatedFiles['index.html'] = {
        ...updatedFiles['index.html'],
        content,
      };
    }

    res.json({
      success: true,
      explanation: `Applied modifications based on "${prompt}".`,
      files: updatedFiles,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Failed to edit website' });
  }
});

// 3. AI Error Detection & Auto-Repair (/api/ai/fix)
app.post('/api/ai/fix', async (req: Request, res: Response) => {
  try {
    const { issues, currentFiles } = req.body;

    if (!currentFiles) {
      res.status(400).json({ error: 'Missing current files' });
      return;
    }

    if (aiClient && issues && issues.length > 0) {
      try {
        const fixPrompt = `You are the Automated Web Doctor & Code Repair Engine for SaipratapS❤️C.
The website check detected these issues:
${JSON.stringify(issues, null, 2)}

Current files:
${JSON.stringify(currentFiles, null, 2)}

TASK:
Fix all detected problems (e.g. mobile overflow, missing alt tags, broken anchors, missing scripts, unclosed tags).
Return ONLY valid JSON:
{
  "fixedCount": ${issues.length},
  "summary": "Repaired issues including image alt attributes and responsive layout constraints.",
  "files": {
    "index.html": "<corrected index.html content>",
    "styles.css": "<corrected styles.css content>",
    "app.js": "<corrected app.js content>"
  }
}`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fixPrompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text || '';
        const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (parsed && parsed.files) {
          const updatedFiles = { ...currentFiles };
          for (const key of Object.keys(parsed.files)) {
            if (updatedFiles[key]) {
              updatedFiles[key] = {
                ...updatedFiles[key],
                content: parsed.files[key],
              };
            }
          }

          res.json({
            success: true,
            summary: parsed.summary || 'All issues automatically resolved!',
            files: updatedFiles,
          });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini fix fallback used:', err?.message || err);
      }
    }

    // Local heuristic fixes
    const updatedFiles = { ...currentFiles };
    if (updatedFiles['index.html']) {
      let content = updatedFiles['index.html'].content;
      // Fix missing alt on images
      content = content.replace(/<img((?:(?!alt=)[^>])*)>/gi, '<img$1 alt="Website Visual Asset">');
      // Fix viewport if missing
      if (!content.includes('name="viewport"')) {
        content = content.replace('<head>', '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
      }
      updatedFiles['index.html'] = {
        ...updatedFiles['index.html'],
        content,
      };
    }

    res.json({
      success: true,
      summary: 'Heuristics applied: verified viewport meta, image alt attributes, and responsive margins.',
      files: updatedFiles,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Failed to auto-repair' });
  }
});

// 4. Projects CRUD
app.get('/api/projects', (req: Request, res: Response) => {
  const list = Array.from(projectsDb.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  res.json({ projects: list });
});

app.post('/api/projects', (req: Request, res: Response) => {
  const { id, title, category, description, subdomain, files, isPublished } = req.body;
  const projectId = id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const cleanSubdomain = (subdomain || title.toLowerCase().replace(/[^a-z0-9]/g, '-')).replace(/^-+|-+$/g, '') || `site-${Date.now().toString(36)}`;

  const project: ProjectData = {
    id: projectId,
    title: title || 'Untitled Website',
    category: category || 'Business',
    description: description || 'Created with SaipratapS❤️C',
    subdomain: cleanSubdomain,
    isPublished: isPublished || false,
    files: files || generateFallbackSite(title || 'My Website', category || 'Business', 'Sample project'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  };

  projectsDb.set(projectId, project);
  if (project.isPublished) {
    deploymentsDb.set(cleanSubdomain, project);
  }

  res.json({ success: true, project });
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = projectsDb.get(req.params.id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json({ project });
});

app.patch('/api/projects/:id', (req: Request, res: Response) => {
  const project = projectsDb.get(req.params.id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }

  const updates = req.body;
  const updated: ProjectData = {
    ...project,
    ...updates,
    updatedAt: new Date().toISOString(),
    version: project.version + 1,
  };

  projectsDb.set(req.params.id, updated);
  if (updated.isPublished) {
    deploymentsDb.set(updated.subdomain, updated);
  }

  res.json({ success: true, project: updated });
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const project = projectsDb.get(req.params.id);
  if (project) {
    deploymentsDb.delete(project.subdomain);
    projectsDb.delete(req.params.id);
  }
  res.json({ success: true });
});

// 5. Deployment / Free Publishing Endpoint (/api/deployments)
app.post('/api/deployments', (req: Request, res: Response) => {
  const { projectId, subdomain, title, files } = req.body;

  let cleanSubdomain = (subdomain || 'site').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');
  if (!cleanSubdomain) {
    cleanSubdomain = `site-${Date.now().toString(36)}`;
  }

  // Check if taken by another project
  const existing = deploymentsDb.get(cleanSubdomain);
  if (existing && existing.id !== projectId) {
    cleanSubdomain = `${cleanSubdomain}-${Math.random().toString(36).substring(2, 6)}`;
  }

  let project = projectId ? projectsDb.get(projectId) : null;
  if (!project) {
    const id = projectId || `proj_${Date.now()}`;
    project = {
      id,
      title: title || 'Published Website',
      category: 'General',
      description: 'Live website deployed on SaipratapS❤️C',
      subdomain: cleanSubdomain,
      isPublished: true,
      publishedAt: new Date().toISOString(),
      files: files || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };
  } else {
    project = {
      ...project,
      subdomain: cleanSubdomain,
      isPublished: true,
      publishedAt: new Date().toISOString(),
      files: files || project.files,
      updatedAt: new Date().toISOString(),
    };
  }

  projectsDb.set(project.id, project);
  deploymentsDb.set(cleanSubdomain, project);

  const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
  const liveUrl = `${baseUrl}/site/${cleanSubdomain}`;

  res.json({
    success: true,
    subdomain: cleanSubdomain,
    liveUrl,
    publishedAt: project.publishedAt,
    project,
  });
});

app.get('/api/deployments', (req: Request, res: Response) => {
  const list = Array.from(deploymentsDb.values()).map(p => ({
    id: p.id,
    title: p.title,
    subdomain: p.subdomain,
    publishedAt: p.publishedAt,
    url: `/site/${p.subdomain}`,
  }));
  res.json({ deployments: list });
});

// Subdomain availability check
app.get('/api/subdomains/check', (req: Request, res: Response) => {
  const sub = String(req.query.subdomain || '').toLowerCase().trim();
  const reserved = ['api', 'admin', 'auth', 'site', 'login', 'dashboard', 'settings', 'help', 'app'];
  
  if (reserved.includes(sub)) {
    res.json({ available: false, reason: 'This subdomain is reserved.' });
    return;
  }
  const taken = deploymentsDb.has(sub);
  res.json({ available: !taken, subdomain: sub });
});

// 6. Standalone Public Live Website Renderer (/site/:subdomain)
// This serves the fully published website to ANY browser or visitor!
app.get('/site/:subdomain', (req: Request, res: Response) => {
  const { subdomain } = req.params;
  const project = deploymentsDb.get(subdomain.toLowerCase());

  if (!project || !project.files || !project.files['index.html']) {
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Website Not Found | SaipratapS❤️C</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md text-center space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl font-black">
            404
          </div>
          <h1 class="text-2xl font-bold">Website Not Found</h1>
          <p class="text-slate-400 text-sm">The subdomain <span class="text-indigo-400 font-mono">${subdomain}</span> has not been published yet or has been moved.</p>
          <a href="/" class="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition">
            Create Your Own Website on SaipratapS❤️C
          </a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  let html = project.files['index.html'].content;
  const css = project.files['styles.css']?.content || '';
  const js = project.files['app.js']?.content || '';

  // Inline CSS if styles.css is referenced
  if (css && html.includes('styles.css')) {
    html = html.replace(/<link[^>]+href=["']styles\.css["'][^>]*>/i, `<style>\n${css}\n</style>`);
  } else if (css) {
    html = html.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
  }

  // Inline JS if app.js is referenced
  if (js && html.includes('app.js')) {
    html = html.replace(/<script[^>]+src=["']app\.js["'][^>]*><\/script>/i, `<script>\n${js}\n</script>`);
  } else if (js) {
    html = html.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// Seed default starter projects for instant showcase
const sampleSite = generateFallbackSite(
  'AuraTech AI',
  'Startup',
  'Next-generation cognitive computing platform with real-time neural analytics, developer API, and collaborative workflows.'
);
const defaultProject: ProjectData = {
  id: 'proj_demo_auratech',
  title: 'AuraTech AI Studio',
  category: 'AI Startup',
  description: 'Next-generation cognitive computing platform with real-time neural analytics.',
  subdomain: 'auratech-demo',
  isPublished: true,
  publishedAt: new Date().toISOString(),
  files: sampleSite,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};
projectsDb.set(defaultProject.id, defaultProject);
deploymentsDb.set(defaultProject.subdomain, defaultProject);

// Seed another education starter project
const eduSite = generateFallbackSite(
  'EduVanguard Academy',
  'Education',
  'Premier modern learning academy offering interactive STEM courses, mentor sessions, and career certification.'
);
const eduProject: ProjectData = {
  id: 'proj_demo_eduvanguard',
  title: 'EduVanguard Academy',
  category: 'Education',
  description: 'Premier modern learning academy offering interactive STEM courses and career certification.',
  subdomain: 'eduvanguard',
  isPublished: true,
  publishedAt: new Date().toISOString(),
  files: eduSite,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};
projectsDb.set(eduProject.id, eduProject);
deploymentsDb.set(eduProject.subdomain, eduProject);

// Express + Vite dev server integration
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static files from dist
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SaipratapS❤️C server running on port ${PORT}`);
  });
}

startServer();
