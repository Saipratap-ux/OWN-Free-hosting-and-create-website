import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'ai-startup',
    title: 'Cognitive AI NextGen',
    category: 'AI Startup',
    description: 'Ultra-modern dark SaaS template with interactive neural network canvas, dynamic metric badges, and waitlist integration.',
    tags: ['AI', 'SaaS', 'Dark Mode', 'Waitlist'],
    gradient: 'from-purple-600 via-indigo-600 to-blue-600',
    iconName: 'Cpu',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cognitive AI — The Autonomous Intelligence Layer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
  <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold py-1.5 px-4 text-center">
    ⚡ Built with SaipratapS❤️C • 100% Free Hosting & Instant Publishing
  </div>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">C</div>
        <span class="text-xl font-bold tracking-tight text-white">Cognitive.ai</span>
      </div>
      <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-400">
        <a href="#models" class="hover:text-purple-400 transition">Models</a>
        <a href="#benchmarks" class="hover:text-purple-400 transition">Benchmarks</a>
        <a href="#api" class="hover:text-purple-400 transition">API</a>
        <a href="#pricing" class="hover:text-purple-400 transition">Pricing</a>
      </nav>
      <a href="#waitlist" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition shadow-lg shadow-purple-600/30">
        Request Access
      </a>
    </div>
  </header>
  <main class="py-20 lg:py-28 max-w-7xl mx-auto px-6 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-8">
      <span class="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
      Model 4.0 Omni Live Preview
    </div>
    <h1 class="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
      Reasoning models engineered for <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">autonomous execution</span>
    </h1>
    <p class="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
      Empower agents with real-time semantic synthesis, sub-10ms tool calling, and deterministic multi-modal outputs.
    </p>
    <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center" id="waitlist">
      <input type="email" placeholder="Enter developer email..." class="px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm w-72 focus:outline-none focus:border-purple-500">
      <button class="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition">Join Developer Beta</button>
    </div>
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      <div class="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition">
        <i class="fa-solid fa-bolt text-2xl text-purple-400 mb-4"></i>
        <h3 class="text-lg font-bold text-white mb-2">Sub-10ms Latency</h3>
        <p class="text-slate-400 text-sm">Edge-cached inference checkpoints deployed globally across 35 regions.</p>
      </div>
      <div class="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition">
        <i class="fa-solid fa-code text-2xl text-pink-400 mb-4"></i>
        <h3 class="text-lg font-bold text-white mb-2">Declarative Function Calls</h3>
        <p class="text-slate-400 text-sm">Autonomous schema validation with zero hallucination on complex API payloads.</p>
      </div>
      <div class="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition">
        <i class="fa-solid fa-shield text-2xl text-blue-400 mb-4"></i>
        <h3 class="text-lg font-bold text-white mb-2">SOC2 Type II Compliant</h3>
        <p class="text-slate-400 text-sm">Enterprise isolation, zero-retention logging, and dedicated hardware enclaves.</p>
      </div>
    </div>
  </main>
  <footer class="border-t border-slate-800 py-10 text-center text-xs text-slate-500">
    © 2026 Cognitive.ai • Published via SaipratapS❤️C
  </footer>
</body>
</html>`
      },
      'styles.css': {
        name: 'styles.css',
        language: 'css',
        content: `body { font-family: system-ui, -apple-system, sans-serif; }`
      },
      'app.js': {
        name: 'app.js',
        language: 'javascript',
        content: `console.log("Cognitive AI loaded!");`
      }
    }
  },
  {
    id: 'education-academy',
    title: 'EduVanguard University',
    category: 'Education',
    description: 'Comprehensive educational platform with interactive course catalogs, student registration modals, and faculty directories.',
    tags: ['Education', 'Courses', 'Portal', 'Registration'],
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    iconName: 'GraduationCap',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduVanguard Academy — Learn the Future</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-900 text-slate-100 font-sans">
  <header class="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white"><i class="fa-solid fa-graduation-cap"></i></div>
        <span class="text-xl font-bold text-white">EduVanguard</span>
      </div>
      <nav class="hidden md:flex gap-6 text-sm text-slate-300">
        <a href="#courses" class="hover:text-blue-400">Programs</a>
        <a href="#faculty" class="hover:text-blue-400">Faculty</a>
        <a href="#admissions" class="hover:text-blue-400">Admissions</a>
        <a href="#contact" class="hover:text-blue-400">Campus</a>
      </nav>
      <a href="#admissions" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm">Apply for 2026</a>
    </div>
  </header>
  <section class="py-24 text-center max-w-5xl mx-auto px-6">
    <span class="text-blue-400 text-xs font-bold uppercase tracking-wider">Accredited Global Curriculum</span>
    <h1 class="text-4xl sm:text-6xl font-extrabold text-white mt-4 leading-tight">Master High-Impact Skills with Industry Leaders</h1>
    <p class="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">Engage in cohort-based computer science, biotechnology, and artificial intelligence programs designed by professors and practitioners.</p>
    <div class="mt-8 flex gap-4 justify-center">
      <a href="#courses" class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold">Browse 40+ Courses</a>
      <a href="#admissions" class="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 font-semibold border border-slate-700">Student Portal</a>
    </div>
  </section>
  <section id="courses" class="py-16 max-w-7xl mx-auto px-6">
    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-8">Popular Certificate Programs</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <span class="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full">New Cohort</span>
        <h3 class="text-lg font-bold text-white mt-4">Full-Stack Cloud Architecture</h3>
        <p class="text-slate-400 text-sm mt-2">12-week comprehensive bootcamp spanning microservices, Kubernetes, and reactive frameworks.</p>
        <div class="mt-6 flex justify-between items-center text-xs text-slate-500">
          <span>120 Hours</span>
          <span class="text-blue-400 font-bold">Enroll Now &rarr;</span>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <span class="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full">Bestseller</span>
        <h3 class="text-lg font-bold text-white mt-4">Autonomous Systems & Robotics</h3>
        <p class="text-slate-400 text-sm mt-2">Hands-on simulation of ROS2, sensor fusion, LiDAR kinematics, and reinforcement learning.</p>
        <div class="mt-6 flex justify-between items-center text-xs text-slate-500">
          <span>90 Hours</span>
          <span class="text-blue-400 font-bold">Enroll Now &rarr;</span>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <span class="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-400 rounded-full">Advanced</span>
        <h3 class="text-lg font-bold text-white mt-4">Applied Generative AI & LLMs</h3>
        <p class="text-slate-400 text-sm mt-2">Fine-tuning, RAG architecture, agent orchestration, and evaluation benchmarks.</p>
        <div class="mt-6 flex justify-between items-center text-xs text-slate-500">
          <span>80 Hours</span>
          <span class="text-blue-400 font-bold">Enroll Now &rarr;</span>
        </div>
      </div>
    </div>
  </section>
  <footer class="border-t border-slate-800 py-10 text-center text-xs text-slate-500">
    © 2026 EduVanguard Academy • Hosted Free via SaipratapS❤️C
  </footer>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: `/* EduVanguard Styles */` },
      'app.js': { name: 'app.js', language: 'javascript', content: `// EduVanguard Script` }
    }
  },
  {
    id: 'developer-portfolio',
    title: 'Alex Rivera — Full Stack Engineer',
    category: 'Developer Portfolio',
    description: 'Clean developer portfolio showcasing open source repositories, skill tags, project terminal preview, and contact dialog.',
    tags: ['Portfolio', 'Developer', 'GitHub', 'Minimal'],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    iconName: 'Terminal',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera — Staff Software Engineer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-black text-slate-200 font-mono selection:bg-emerald-500 selection:text-black">
  <div class="max-w-4xl mx-auto px-6 py-16">
    <header class="flex justify-between items-center mb-16 border-b border-slate-800 pb-6">
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-emerald-400 font-bold">alex@rivera:~$</span>
      </div>
      <div class="flex gap-4 text-sm text-slate-400">
        <a href="#projects" class="hover:text-emerald-400">projects</a>
        <a href="#stack" class="hover:text-emerald-400">stack</a>
        <a href="#contact" class="hover:text-emerald-400">contact</a>
      </div>
    </header>
    <section class="space-y-4 mb-16">
      <h1 class="text-3xl sm:text-4xl font-bold text-white">Alex Rivera</h1>
      <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
        Staff Software Engineer specializing in distributed databases, low-latency streaming pipelines, and reactive client architecture.
      </p>
      <div class="flex flex-wrap gap-2 pt-2">
        <span class="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-emerald-400">TypeScript</span>
        <span class="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-emerald-400">Rust</span>
        <span class="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-emerald-400">Go</span>
        <span class="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-emerald-400">PostgreSQL</span>
        <span class="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-emerald-400">Docker</span>
      </div>
    </section>
    <section id="projects" class="space-y-6 mb-16">
      <h2 class="text-lg font-bold text-white border-b border-slate-800 pb-2">Selected Open Source & Work</h2>
      <div class="space-y-4">
        <div class="p-5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-white">HyperQueue — Distributed Event Broker</h3>
            <span class="text-xs text-emerald-400">v2.4.0</span>
          </div>
          <p class="text-xs text-slate-400 mt-2">Zero-copy persistence engine written in Rust delivering 2.4M writes/second on NVMe drives.</p>
        </div>
        <div class="p-5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-white">VectorLite — In-Memory HNSW Search</h3>
            <span class="text-xs text-emerald-400">v1.1.2</span>
          </div>
          <p class="text-xs text-slate-400 mt-2">High-performance SIMD-accelerated cosine distance search for browser and edge environments.</p>
        </div>
      </div>
    </section>
    <footer class="pt-8 border-t border-slate-900 text-xs text-slate-600 flex justify-between">
      <span>Built on SaipratapS❤️C</span>
      <span>Published with Free SSL</span>
    </footer>
  </div>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: `/* Developer styles */` },
      'app.js': { name: 'app.js', language: 'javascript', content: `// Developer script` }
    }
  },
  {
    id: 'artisan-restaurant',
    title: 'Terra & Fiamma Trattoria',
    category: 'Restaurant',
    description: 'Rustic gourmet Italian restaurant with online menu, chef specials, reservations table booking, and customer reviews.',
    tags: ['Restaurant', 'Food', 'Menu', 'Booking'],
    gradient: 'from-amber-600 via-orange-600 to-rose-600',
    iconName: 'Utensils',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terra & Fiamma Trattoria</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-stone-950 text-stone-200 font-serif">
  <header class="py-6 px-8 border-b border-stone-800 flex justify-between items-center">
    <div class="text-2xl font-bold tracking-widest text-amber-500 uppercase">Terra & Fiamma</div>
    <nav class="hidden md:flex gap-8 text-sm font-sans tracking-wide">
      <a href="#menu" class="hover:text-amber-400">Menu</a>
      <a href="#story" class="hover:text-amber-400">Our Story</a>
      <a href="#reserve" class="hover:text-amber-400 text-amber-500 font-bold">Reserve Table</a>
    </nav>
  </header>
  <section class="py-24 text-center px-6 max-w-4xl mx-auto">
    <span class="text-xs uppercase tracking-widest text-amber-500 font-sans font-semibold">Fire-Roasted Authentic Dining</span>
    <h1 class="text-5xl sm:text-6xl font-light text-stone-100 mt-4 leading-tight italic">Crafted by tradition. Perfected over flame.</h1>
    <p class="font-sans text-stone-400 text-sm sm:text-base mt-6 max-w-xl mx-auto">Hand-rolled pastas, 72-hour sourdough Neapolitan pizzas, and cellared vintage Tuscan wines in the heart of the city.</p>
    <a href="#reserve" class="inline-block mt-8 px-8 py-3.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-sans text-sm uppercase tracking-wider font-semibold transition">Book a Table</a>
  </section>
  <section id="menu" class="py-16 max-w-5xl mx-auto px-6 font-sans">
    <h2 class="text-3xl font-serif text-center text-amber-400 mb-12">Chef's Seasonal Tasting</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="border-b border-stone-800 pb-4 flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-white">Tartufo Nero Tagliolini</h3>
          <p class="text-xs text-stone-400 mt-1">House-extruded egg ribbons, Normandy cultured butter, shaved black Umbrian winter truffle.</p>
        </div>
        <span class="text-amber-400 font-bold ml-4">₹850</span>
      </div>
      <div class="border-b border-stone-800 pb-4 flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-white">Bistecca alla Fiorentina</h3>
          <p class="text-xs text-stone-400 mt-1">Oak-grilled dry-aged Chianina T-bone, rosemary smoked sea salt, cold-pressed olive oil.</p>
        </div>
        <span class="text-amber-400 font-bold ml-4">₹1,450</span>
      </div>
    </div>
  </section>
  <footer class="py-12 border-t border-stone-900 text-center text-xs font-sans text-stone-600">
    © 2026 Terra & Fiamma • Powered by SaipratapS❤️C
  </footer>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: `/* Restaurant styles */` },
      'app.js': { name: 'app.js', language: 'javascript', content: `// Restaurant script` }
    }
  },
  {
    id: 'luxe-boutique-hotel',
    title: 'The Azure Crest Resort & Suites',
    category: 'Hotel',
    description: 'Luxury seaside hospitality landing page with suite photo showcases, check-in availability picker, and spa amenities.',
    tags: ['Hotel', 'Resort', 'Suites', 'Booking'],
    gradient: 'from-sky-600 via-indigo-700 to-slate-900',
    iconName: 'BedDouble',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Azure Crest Resort & Suites</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans">
  <div class="max-w-6xl mx-auto px-6 py-20 text-center">
    <span class="text-xs uppercase tracking-widest text-sky-400 font-semibold">Private Island Sanctuary</span>
    <h1 class="text-4xl sm:text-6xl font-serif text-white mt-4">Azure Crest Resort</h1>
    <p class="text-slate-400 mt-4 max-w-xl mx-auto">Panoramic oceanfront villas, Michelin-starred gastronomy, and private infinity waters.</p>
    <div class="mt-8 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
      <input type="date" class="px-4 py-2 rounded bg-slate-950 border border-slate-800 text-sm text-slate-200 w-full">
      <input type="date" class="px-4 py-2 rounded bg-slate-950 border border-slate-800 text-sm text-slate-200 w-full">
      <button class="px-6 py-2 rounded bg-sky-600 hover:bg-sky-500 font-semibold text-sm whitespace-nowrap">Check Suites</button>
    </div>
  </div>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: '' },
      'app.js': { name: 'app.js', language: 'javascript', content: '' }
    }
  },
  {
    id: 'creative-agency',
    title: 'Kinetic Digital Agency',
    category: 'Agency',
    description: 'Award-winning creative design agency with bold typographic branding, interactive case studies, and client marquee.',
    tags: ['Agency', 'Creative', 'Design', 'Branding'],
    gradient: 'from-pink-600 via-rose-600 to-orange-500',
    iconName: 'Sparkles',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kinetic — High Velocity Creative Agency</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-zinc-100">
  <div class="max-w-6xl mx-auto px-6 py-24">
    <h1 class="text-5xl sm:text-7xl font-black uppercase tracking-tighter">We engineer brands that break through noise.</h1>
    <p class="text-zinc-400 mt-6 text-xl max-w-2xl">Strategy, high-end motion design, 3D interaction, and custom web architecture.</p>
  </div>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: '' },
      'app.js': { name: 'app.js', language: 'javascript', content: '' }
    }
  },
  {
    id: 'ecommerce-coffee',
    title: 'RoastCraft Specialty Coffee',
    category: 'E-commerce',
    description: 'Artisan micro-batch coffee roaster with product catalog, origin roast notes, cart drawer simulation, and subscription picker.',
    tags: ['E-commerce', 'Store', 'Products', 'Coffee'],
    gradient: 'from-yellow-700 via-amber-700 to-stone-900',
    iconName: 'ShoppingBag',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RoastCraft — Single Origin Specialty Coffee</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-stone-950 text-stone-200">
  <div class="max-w-6xl mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl sm:text-5xl font-bold text-amber-500">RoastCraft Coffee</h1>
    <p class="text-stone-400 mt-2">Ethically sourced high-altitude beans roasted fresh daily.</p>
  </div>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: '' },
      'app.js': { name: 'app.js', language: 'javascript', content: '' }
    }
  },
  {
    id: 'fitness-portal',
    title: 'PulseFit Athletic Club',
    category: 'Fitness',
    description: 'High-energy fitness & gym landing page with workout schedule, personal trainers, membership pricing tiers, and class bookings.',
    tags: ['Fitness', 'Gym', 'Health', 'Membership'],
    gradient: 'from-red-600 via-orange-600 to-yellow-600',
    iconName: 'Flame',
    files: {
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PulseFit Athletic Club</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-zinc-100 font-sans">
  <div class="max-w-6xl mx-auto px-6 py-20 text-center">
    <h1 class="text-5xl font-black text-red-500 uppercase tracking-tight">Train Without Limits</h1>
    <p class="text-zinc-400 mt-4">State-of-the-art strength floor, HIIT studios, and Olympic recovery saunas.</p>
  </div>
</body>
</html>`
      },
      'styles.css': { name: 'styles.css', language: 'css', content: '' },
      'app.js': { name: 'app.js', language: 'javascript', content: '' }
    }
  }
];
