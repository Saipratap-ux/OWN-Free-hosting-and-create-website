import { ProjectFile } from '../types';

export function generateClientSideWebsite(
  title: string,
  category: string,
  prompt: string,
  style: string = 'Modern Dark',
  palette: string = 'Indigo & Violet'
): Record<string, ProjectFile> {
  const cleanCategory = (category || 'Business').toLowerCase();
  const cleanTitle = title || 'NextGen Project';

  let colorFrom = 'from-indigo-600';
  let colorVia = 'via-purple-600';
  let colorTo = 'to-pink-600';
  let accentColor = 'indigo-400';
  let btnBg = 'bg-indigo-600 hover:bg-indigo-500';

  if (palette.includes('Emerald') || palette.includes('Cyan')) {
    colorFrom = 'from-emerald-600';
    colorVia = 'via-teal-600';
    colorTo = 'to-cyan-600';
    accentColor = 'emerald-400';
    btnBg = 'bg-emerald-600 hover:bg-emerald-500';
  } else if (palette.includes('Rose') || palette.includes('Pink')) {
    colorFrom = 'from-rose-600';
    colorVia = 'via-pink-600';
    colorTo = 'to-amber-500';
    accentColor = 'rose-400';
    btnBg = 'bg-rose-600 hover:bg-rose-500';
  } else if (palette.includes('Amber') || palette.includes('Gold')) {
    colorFrom = 'from-amber-600';
    colorVia = 'via-orange-600';
    colorTo = 'to-yellow-500';
    accentColor = 'amber-400';
    btnBg = 'bg-amber-600 hover:bg-amber-500';
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanTitle} — Built with SaipratapS❤️C</title>
  <meta name="description" content="${prompt.slice(0, 150)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
  <!-- Top Banner -->
  <div class="bg-gradient-to-r ${colorFrom} ${colorVia} ${colorTo} text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
    ✨ Created with <span class="underline font-bold">SaipratapS❤️C</span> • Free AI Website Builder
  </div>

  <!-- Navbar -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#home" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr ${colorFrom} ${colorTo} flex items-center justify-center text-white font-black text-xl shadow-lg">
          ${cleanTitle.charAt(0).toUpperCase()}
        </div>
        <span class="text-xl font-bold tracking-tight text-white">${cleanTitle}</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#about" class="hover:text-${accentColor} transition-colors">About</a>
        <a href="#features" class="hover:text-${accentColor} transition-colors">Features</a>
        <a href="#highlights" class="hover:text-${accentColor} transition-colors">Highlights</a>
        <a href="#pricing" class="hover:text-${accentColor} transition-colors">Plans</a>
        <a href="#contact" class="hover:text-${accentColor} transition-colors">Contact</a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <a href="#contact" class="px-5 py-2.5 rounded-xl ${btnBg} text-white text-sm font-semibold transition shadow-lg">
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
      <a href="#highlights" class="block py-2 text-slate-200">Highlights</a>
      <a href="#pricing" class="block py-2 text-slate-200">Plans</a>
      <a href="#contact" class="block py-2 text-${accentColor}">Contact Us</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-${accentColor} text-xs font-semibold tracking-wide">
          <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          Tailored ${cleanCategory.toUpperCase()} Experience
        </div>
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Empowering Your Vision with <span class="bg-gradient-to-r ${colorFrom} ${colorTo} bg-clip-text text-transparent">${cleanTitle}</span>
        </h1>
        <p class="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          ${prompt.length > 25 ? prompt : 'Transforming experiences with intuitive design, modern performance, and next-generation craftsmanship. Built to scale seamlessly.'}
        </p>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r ${colorFrom} ${colorTo} text-white font-bold text-base transition shadow-xl flex items-center justify-center gap-2">
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
          <h3 class="text-xl font-bold text-white mb-2">High Performance</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Instantaneous load times, responsive animations, and lightweight execution across all mobile screens.</p>
        </div>

        <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 transition-all hover:-translate-y-1 group">
          <div class="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Enterprise Security</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Verified integrity, standard HTTPS, and robust protection for visitor interactions.</p>
        </div>

        <div class="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/50 transition-all hover:-translate-y-1 group">
          <div class="w-12 h-12 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-mobile-screen"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">100% Responsive</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Fluid layouts tailored across mobile smartphones, tablets, laptops, and ultra-wide screens.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Highlights Showcase -->
  <section id="highlights" class="py-20 bg-slate-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-12">
        <div class="lg:w-1/2 space-y-6">
          <span class="text-xs font-bold uppercase tracking-wider text-${accentColor}">Crafted with Quality</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">Elevate Every Aspect of Your Online Identity</h2>
          <p class="text-slate-400 leading-relaxed">
            Designed for seamless accessibility, modern aesthetics, and interactive customer satisfaction.
          </p>
          <ul class="space-y-3 text-slate-300 text-sm">
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-${accentColor}"></i> Intuitive navigation and mobile-friendly menus
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-${accentColor}"></i> Accessible form controls with immediate validation
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-check text-${accentColor}"></i> Zero-subscription free public publishing
            </li>
          </ul>
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-3 h-3 rounded-full bg-rose-500"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span class="text-xs text-slate-500 ml-2 font-mono">analytics-overview</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
              <span class="text-slate-300">Visitor Satisfaction</span>
              <span class="text-emerald-400 font-bold">99.8%</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
              <span class="text-slate-300">Page Speed Score</span>
              <span class="text-${accentColor} font-bold">100 / 100</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
              <span class="text-slate-300">Global Uptime</span>
              <span class="text-purple-400 font-bold">99.99%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
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
        <button type="submit" class="w-full py-3.5 rounded-xl ${btnBg} text-white font-semibold text-sm transition shadow-lg">
          Send Message
        </button>
        <p id="form-feedback" class="hidden text-xs text-center text-emerald-400 mt-2">Thank you! Your message has been received.</p>
      </form>
    </div>
  </section>

  <!-- About / Details Section -->
  <section id="about" class="py-16 border-t border-slate-900 bg-slate-950 text-slate-400 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
      <h3 class="text-lg font-bold text-white">About ${cleanTitle}</h3>
      <p class="max-w-2xl mx-auto leading-relaxed">
        ${cleanTitle} was built to provide high-quality services and exceptional digital engagement. Created and published for free using the SaipratapS❤️C AI platform.
      </p>
    </div>
  </section>

  <!-- Pricing Anchor for compatibility -->
  <div id="pricing"></div>

  <!-- Footer -->
  <footer class="border-t border-slate-900 bg-slate-950 py-12 text-slate-500 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2">
        <span class="font-bold text-white text-sm">${cleanTitle}</span>
        <span>© 2026. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="#home" class="hover:text-slate-300">Privacy</a>
        <a href="#home" class="hover:text-slate-300">Terms</a>
        <span class="text-${accentColor}">Powered by SaipratapS❤️C</span>
      </div>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>`;

  const cssContent = `/* Custom Stylesheet for ${cleanTitle} */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

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
`;

  const jsContent = `// Interactive functionality for ${cleanTitle}
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

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
      content: `# ${cleanTitle}\n\nGenerated with **SaipratapS❤️C** (Build. Create. Publish. Share. Free.)\n\n- Description: ${prompt}\n- Category: ${category}\n- Style: ${style}\n\n## Structure\n- index.html: Semantic HTML5 with Tailwind CSS\n- styles.css: Custom layout rules & fonts\n- app.js: Interactive scripts\n`,
      language: 'markdown',
    },
  };
}
