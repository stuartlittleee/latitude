
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Latitude — Kids Outdoor Adventures in Bangalore</title>
<meta name="description" content="Latitude offers outdoor education experiences for kids in Bangalore. Nature trails, rock climbing, survival skills & more."/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="styles.css" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#2D5A27", 
              "primary-dark": "#1e3d1a", 
              "primary-light": "#3a7a30",
              "accent": "#E8A838",
              "accent-dark": "#c78c25",
              "accent-brown": "#8B5A2B",
              "background-light": "#fdfbf7", 
              "background-beige": "#f5f2eb",
              "background-dark": "#1a1816",
              "neutral-surface": "#ffffff",
              "neutral-surface-dark": "#262422",
              "text-main": "#262422",
              "text-muted": "#6b665f",
            },
            fontFamily: {
              "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px"},
            boxShadow: {
              'soft': '0 4px 20px -2px rgba(45, 90, 39, 0.08)',
              'hover': '0 10px 25px -5px rgba(45, 90, 39, 0.12)',
            }
          },
        },
      }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 antialiased selection:bg-accent-brown selection:text-white">
<header id="main-header" class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex justify-between items-center h-20">
<!-- Logo -->
<a href="index.html" class="flex-shrink-0 flex items-center gap-2 group">
<div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white relative overflow-hidden transition-transform duration-300 group-hover:scale-110">
<span class="material-icons text-xl">explore</span>
</div>
<span class="font-extrabold text-2xl tracking-tight text-primary block">Latitude</span>
</a>
<!-- Desktop Nav -->
<nav class="hidden md:flex items-center gap-8">
<a href="index.html" class="nav-link active text-sm font-semibold text-text-main hover:text-primary transition-colors">Home</a>
<a href="programs.html" class="nav-link text-sm font-semibold text-text-muted hover:text-primary transition-colors">Programs</a>
<a href="guides.html" class="nav-link text-sm font-semibold text-text-muted hover:text-primary transition-colors">Our Guides</a>
<a href="about.html" class="nav-link text-sm font-semibold text-text-muted hover:text-primary transition-colors">About Us</a>
</nav>
<!-- Desktop CTA + Mobile Toggle -->
<div class="flex items-center gap-3">
<a href="#contact" class="hidden md:inline-flex btn-primary bg-primary text-white font-bold py-2.5 px-6 rounded-xl text-sm items-center gap-2">
Get in Touch
<span class="material-icons text-base">arrow_forward</span>
</a>
<button id="mobile-menu-toggle" class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu">
<span class="material-icons text-2xl">menu</span>
</button>
</div>
</div>
</div>
</header>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu-overlay" class="fixed inset-0 bg-black/40 z-50 opacity-0 pointer-events-none transition-opacity duration-300"></div>
<!-- Mobile Menu -->
<div id="mobile-menu" class="mobile-menu fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl p-6 flex flex-col">
<div class="flex justify-between items-center mb-8">
<span class="font-extrabold text-xl text-primary">Latitude</span>
<button id="mobile-menu-close" class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Close menu">
<span class="material-icons">close</span>
</button>
</div>
<nav class="flex flex-col gap-2">
<a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary font-bold text-sm"><span class="material-icons text-xl">home</span>Home</a>
<a href="programs.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-main font-semibold text-sm transition-colors"><span class="material-icons text-xl">terrain</span>Programs</a>
<a href="guides.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-main font-semibold text-sm transition-colors"><span class="material-icons text-xl">groups</span>Our Guides</a>
<a href="about.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-text-main font-semibold text-sm transition-colors"><span class="material-icons text-xl">info</span>About Us</a>
</nav>
<div class="mt-auto pt-6 border-t border-gray-100">
<a href="#contact" class="btn-primary flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-xl text-sm w-full">Get in Touch<span class="material-icons text-base">arrow_forward</span></a>
</div>
</div>
<main class="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
<section class="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-soft group">
<img alt="Kids walking on a wooden bridge in a forest" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Group of diverse kids trekking across a wooden bridge in a lush green forest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoch_6_h_6m8t6wZ7piy4AfR-_taX7qbacyRwwWZxkD5uKyWbc_sDqVM2nvzJqQf8N6UPtNYF0FdVtYnL9MXCDDzUgKE189Yf2wKZjqsCuPx7MvrTsPYP4Ctbtt34EYpFrqqS1cvJcYj1TzP_4-oP4Pcpls_ONZcV8DXodNqr1fI6GxmoEFgQ6ENgr2W2HEjwrzYyoBMd4zmqYrMP8RI1qTaciZ1f-ELK90O09x05y-d0ramILWL9vUwriuHpDaVE_iLtQDylCpKA"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
<div class="relative z-10 flex flex-col justify-end h-full p-8 sm:p-12 max-w-2xl">
<span class="inline-block py-1.5 px-4 rounded-full bg-accent text-white text-xs font-bold mb-4 w-fit uppercase tracking-wider backdrop-blur-sm shadow-md">Bangalore's #1 Kids Outdoor Program</span>
<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">Adventure Awaits<br/>Your Kids in <span class="text-[#8BCC70]">Bangalore</span></h1>
<p class="text-lg text-gray-200 mb-8 max-w-lg">Outdoor education experiences that build confidence, resilience, and curiosity through nature exploration.</p>
<div class="flex flex-col sm:flex-row gap-4">
<a href="programs.html" class="btn-primary bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/50 w-fit flex items-center gap-2 group/btn">
Explore Programs
<span class="material-icons group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</a>
<a href="#contact" class="border-2 border-white/40 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 hover:bg-white hover:text-primary w-fit backdrop-blur-sm transition-all">
<span class="material-icons">play_circle</span>
Learn More
</a>
</div>
</div>
</section>
<section>
<div class="flex justify-between items-end mb-6">
<div>
<span class="text-primary font-bold text-sm uppercase tracking-wider">Our Programs</span>
<h2 class="text-2xl font-bold mb-1 mt-1">Adventures for Every Age</h2>
<p class="text-text-muted dark:text-gray-400 text-sm">Age-appropriate outdoor programs in and around Bangalore</p>
</div>
<a class="hidden sm:flex items-center gap-1 text-sm font-bold text-primary link-hover" href="programs.html">View all programs <span class="material-icons text-sm">chevron_right</span></a>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<a href="programs.html" class="card-hover group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft block">
<div class="relative aspect-[4/3] overflow-hidden">
<img alt="Young children exploring nature in Cubbon Park Bangalore" class="w-full h-full object-cover img-zoom transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDazc0Et9IsjWm5uCH6gDL8flMRu7Bni4dltiyE2uHU3mfR9qPF-4sWljP21JbBHX2QBhADb3xmls4FZI_a6UStJV3v4O8fm3JUFYFOCBB1qtcGvBEIpFkKUYuez2uby3jdgC6JXARYPzWn7jDgLZbxCzRaCGvVQiXOJQUxLn8LeIi760VzSKc8K6j4pwq9RogAL3nPgP33M8dLxjcUDGZxdcmnSU5mDZMnGAJzJn4hSTIbP5k2swcJnYKUngazI6iXqTNix0c_rWg"/>
<div class="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
Ages 5–7
</div>
</div>
<div class="p-5">
<h3 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Little Explorers</h3>
<p class="text-text-muted text-sm mt-1.5 leading-relaxed">Nature walks, sensory play, animal tracking & outdoor crafts in safe, guided environments.</p>
<div class="flex items-center gap-4 mt-3 text-xs text-text-muted">
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">schedule</span> Half Day</span>
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">location_on</span> Cubbon Park</span>
</div>
<span class="mt-4 flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">Learn More <span class="material-icons text-base">arrow_forward</span></span>
</div>
</a>
<a href="programs.html" class="card-hover group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft block">
<div class="relative aspect-[4/3] overflow-hidden">
<img alt="Kids rock climbing with safety harnesses near Ramanagara" class="w-full h-full object-cover img-zoom transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTMX_J4e6zEU-FHVlaJHJRqt7bauW4266tvGIF_h7-OSf5AqxhADuJNx-e0fsaVjpXnUMA_qNmYcokYxAvUOVeM8V2gH5ne8ARb3z7_Mf-gLp10phYIEx_LZoE2cwgXfJiSIcfF4foD_1Tn3pm93ybhOQ3sV1eRAGP6VxBCZsxkHhh-68Gu1BdIuppJFLC3iyd0fMvVQcC5zBMQOMKmI06gQZ1N5bBg5sk_WSRHyJvKCv6BAvDk2-683Y6o-MfW2AXmKijXkdD-z4"/>
<div class="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
Ages 8–10
</div>
</div>
<div class="p-5">
<h3 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Junior Adventurers</h3>
<p class="text-text-muted text-sm mt-1.5 leading-relaxed">Rock climbing, camping basics, team challenges & hands-on survival skills for curious minds.</p>
<div class="flex items-center gap-4 mt-3 text-xs text-text-muted">
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">schedule</span> Full Day</span>
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">location_on</span> Ramanagara</span>
</div>
<span class="mt-4 flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">Learn More <span class="material-icons text-base">arrow_forward</span></span>
</div>
</a>
<a href="programs.html" class="card-hover group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft block">
<div class="relative aspect-[4/3] overflow-hidden">
<img alt="Teenagers trekking through forested hills near Savandurga" class="w-full h-full object-cover img-zoom transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_T7bxhlZq-tvERgem8gGvufkDGEL-o954DwXei6s5bPcFuEoX86v3bnKqfW1VaXo3mQdwQNZx4HKQld74ltrHpa8Al610tNN2a-yj8NHwZgSjOhx4XfxPobcaj6ps9H1ESw9lFIbBAu8TyG7ogXlN-8zqAIr8ZDiBO3gEqwnfywKxeP_x7a-zHF7Ksyx17tILEHkUk9JT-XNvOpKDSeQBrPdbWyvQJWjgmGKomRw6tWfzb58db6RYjzv4sNtDGbNFojrXh7fVPHQ"/>
<div class="absolute top-3 left-3 bg-accent-brown text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
Ages 11–13
</div>
</div>
<div class="p-5">
<h3 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Outdoor Leaders</h3>
<p class="text-text-muted text-sm mt-1.5 leading-relaxed">Advanced trekking, navigation, survival skills & leadership development in the wilderness.</p>
<div class="flex items-center gap-4 mt-3 text-xs text-text-muted">
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">schedule</span> Weekend</span>
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">location_on</span> Savandurga</span>
</div>
<span class="mt-4 flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">Learn More <span class="material-icons text-base">arrow_forward</span></span>
</div>
</a>
<a href="programs.html" class="card-hover group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft block">
<div class="relative aspect-[4/3] overflow-hidden">
<img alt="Teens on a multi-day expedition at Bheemeshwari" class="w-full h-full object-cover img-zoom transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD8glRzWmfnR6sPsvDR_WVYnLpe9kGVPBpaghmbafWIaHiJsYvBoGPqYOYGhALUbkWwGxc57bcQz2b8DUvu3XFC1vlnD5mcAjRipQFAji0YdnY9_K1JQRG3b6fGn82f-AePf1jRBMhQe7ERwY1ykWzFsJoc3b9670azoeG18T1-P6Kz4FBHgJv65U5c9w4yKjjSwynLYD0dPwErYLyreLyinY9Zx5GB_FB__WmCWoxaQf8vxLE3PDEAT7GAX5psYaBnqCmc-CSkrw"/>
<div class="absolute top-3 left-3 bg-primary-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
Ages 14–16
</div>
</div>
<div class="p-5">
<h3 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Teen Expeditions</h3>
<p class="text-text-muted text-sm mt-1.5 leading-relaxed">Multi-day camps, environmental projects, wilderness first aid & real-world problem solving.</p>
<div class="flex items-center gap-4 mt-3 text-xs text-text-muted">
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">schedule</span> 2–3 Days</span>
<span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">location_on</span> Bheemeshwari</span>
</div>
<span class="mt-4 flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">Learn More <span class="material-icons text-base">arrow_forward</span></span>
</div>
</a>
</div>
<div class="mt-8 flex justify-center sm:hidden">
<a href="programs.html" class="btn-outline border-2 border-text-main rounded-xl px-6 py-3 font-bold text-sm inline-block">View All Programs</a>
</div>
</section>
<section class="py-12 relative overflow-hidden">
<div class="flex justify-between items-end mb-8">
<div class="max-w-2xl">
<span class="text-primary font-bold text-sm uppercase tracking-wider">Testimonials</span>
<h2 class="text-3xl font-bold mb-2">Loved by Parents</h2>
<p class="text-text-muted dark:text-gray-400">Hear from families who have discovered new horizons with Latitude.</p>
</div>
<div class="hidden sm:flex gap-2">
<button id="testimonial-prev" class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
<span class="material-icons">chevron_left</span>
</button>
<button id="testimonial-next" class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
<span class="material-icons">chevron_right</span>
</button>
</div>
</div>
<div id="testimonial-carousel" class="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
<div class="min-w-[300px] sm:min-w-[380px] snap-center card-hover-subtle bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
<div class="flex items-center gap-1 text-accent mb-4">
<span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span>
</div>
<p class="text-lg font-medium leading-relaxed mb-6">"My son came back from the wilderness weekend with a newfound confidence. He hasn't stopped talking about how to build a shelter!"</p>
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">PS</div>
<div>
<h4 class="font-bold text-sm">Priya Sharma</h4>
<p class="text-xs text-text-muted">Mother of Arjun, age 10</p>
</div>
</div>
</div>
<div class="min-w-[300px] sm:min-w-[380px] snap-center card-hover-subtle bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
<div class="flex items-center gap-1 text-accent mb-4">
<span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span>
</div>
<p class="text-lg font-medium leading-relaxed mb-6">"Latitude guides are exceptional. They managed to engage my teenager in nature without him missing his phone for a second. Truly magical."</p>
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">RK</div>
<div>
<h4 class="font-bold text-sm">Rajesh Kumar</h4>
<p class="text-xs text-text-muted">Father of Kiran, age 14</p>
</div>
</div>
</div>
<div class="min-w-[300px] sm:min-w-[380px] snap-center card-hover-subtle bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
<div class="flex items-center gap-1 text-accent mb-4">
<span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span>
</div>
<p class="text-lg font-medium leading-relaxed mb-6">"Safety was my biggest concern, but the protocols Latitude has in place are top-notch. I felt completely at ease sending my daughter on the trekking program."</p>
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">AN</div>
<div>
<h4 class="font-bold text-sm">Anita Nair</h4>
<p class="text-xs text-text-muted">Mother of Meera, age 8</p>
</div>
</div>
</div>
<div class="min-w-[300px] sm:min-w-[380px] snap-center card-hover-subtle bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
<div class="flex items-center gap-1 text-accent mb-4">
<span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star</span><span class="material-icons text-sm">star_half</span>
</div>
<p class="text-lg font-medium leading-relaxed mb-6">"We've done three programs with Latitude now. Each one has been unique, educational, and most importantly, incredibly fun for the kids!"</p>
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">VR</div>
<div>
<h4 class="font-bold text-sm">Vikram Reddy</h4>
<p class="text-xs text-text-muted">Father of twins, age 12</p>
</div>
</div>
</div>
</div>
</section>
<section class="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 sm:p-12 border border-primary/10">
<div class="text-center max-w-2xl mx-auto mb-12">
<span class="text-primary font-bold text-sm uppercase tracking-wider">Why Parents Trust Us</span>
<h2 class="text-3xl font-bold mb-4 mt-2">Why Choose Latitude</h2>
<p class="text-text-muted dark:text-gray-300">We combine expert instruction, safety-first protocols, and a genuine love for the outdoors.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
<div class="card-hover-subtle flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100">
<div class="w-16 h-16 bg-primary/10 rounded-2xl shadow-soft flex items-center justify-center mb-6 text-primary icon-pulse">
<span class="material-icons text-3xl">verified_user</span>
</div>
<h3 class="text-lg font-bold mb-2">Safety First</h3>
<p class="text-sm text-text-muted dark:text-gray-400 leading-relaxed">All guides are certified in First Aid & CPR. Strict 1:8 adult-to-child ratio with full insurance.</p>
</div>
<div class="card-hover-subtle flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100">
<div class="w-16 h-16 bg-primary/10 rounded-2xl shadow-soft flex items-center justify-center mb-6 text-primary icon-pulse">
<span class="material-icons text-3xl">school</span>
</div>
<h3 class="text-lg font-bold mb-2">Expert Guides</h3>
<p class="text-sm text-text-muted dark:text-gray-400 leading-relaxed">Experienced outdoor educators passionate about child development and character building.</p>
</div>
<div class="card-hover-subtle flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100">
<div class="w-16 h-16 bg-primary/10 rounded-2xl shadow-soft flex items-center justify-center mb-6 text-primary icon-pulse">
<span class="material-icons text-3xl">emoji_nature</span>
</div>
<h3 class="text-lg font-bold mb-2">Nature Connection</h3>
<p class="text-sm text-text-muted dark:text-gray-400 leading-relaxed">We help kids disconnect from screens and reconnect with nature—right here in Bangalore.</p>
</div>
<div class="card-hover-subtle flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100">
<div class="w-16 h-16 bg-primary/10 rounded-2xl shadow-soft flex items-center justify-center mb-6 text-primary icon-pulse">
<span class="material-icons text-3xl">psychology</span>
</div>
<h3 class="text-lg font-bold mb-2">Character Building</h3>
<p class="text-sm text-text-muted dark:text-gray-400 leading-relaxed">Programs foster resilience, teamwork, decision-making and self-confidence through outdoor challenges.</p>
</div>
</div>
</section>
<!-- ===== CONTACT FORM ===== -->
<section id="contact" class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-8">
<div>
<span class="text-primary font-bold text-sm uppercase tracking-wider">Get in Touch</span>
<h2 class="text-3xl font-bold mb-4 mt-2">Start Your Child’s Adventure</h2>
<p class="text-text-muted dark:text-gray-300 mb-8 max-w-md">Have questions about our programs? Want to book an outing for your child? Drop us a message and we’ll get back to you within 24 hours.</p>
<div class="space-y-5">
<div class="flex items-start gap-4">
<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><span class="material-icons text-primary">email</span></div>
<div><h4 class="font-bold text-sm">Email Us</h4><p class="text-text-muted text-sm">hello@latitudeoutdoors.in</p></div>
</div>
<div class="flex items-start gap-4">
<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><span class="material-icons text-primary">phone</span></div>
<div><h4 class="font-bold text-sm">Call Us</h4><p class="text-text-muted text-sm">+91 98765 43210</p></div>
</div>
<div class="flex items-start gap-4">
<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><span class="material-icons text-primary">location_on</span></div>
<div><h4 class="font-bold text-sm">Based In</h4><p class="text-text-muted text-sm">Bangalore, Karnataka</p></div>
</div>
</div>
<div class="mt-8 relative h-64 md:h-56 rounded-2xl overflow-hidden shadow-soft hidden md:block">
<img alt="Happy kids on a Latitude outdoor program in Bangalore" class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6N4BKW_7MdCr8wGgUTxHZaP6fYmSPv3qhyCEMR0DYdHyDvM5YEficox0almb95ZJVesTPw2csVG-Ui5B8q1EcJz5nXMV6pJMzsKLO4_J3yq0xRD4gwuJMPrq-VcsSjgRA1VreQuaoizlzytaOGdox44vm-e3chbw9DXI0taCWXcwPxCDp65B2Y1F8CXSKadjl6BzEZhTsAkJ9IHCGq2yHTAkaWNtq8WSjeyapsENUMKRs8qvkPpT-8qKk5fBKvxOB9XOrBVbNQU8"/>
</div>
</div>
<div class="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-gray-100">
<form id="contact-form" class="space-y-5" data-sheet-url="">
<div>
<label class="block text-sm font-semibold mb-1.5">Parent / Guardian Name *</label>
<input type="text" name="name" required placeholder="Your full name" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none"/>
<p class="form-error"></p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
<div>
<label class="block text-sm font-semibold mb-1.5">Email *</label>
<input type="email" name="email" required placeholder="you@email.com" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none"/>
<p class="form-error"></p>
</div>
<div>
<label class="block text-sm font-semibold mb-1.5">Phone *</label>
<input type="tel" name="phone" required placeholder="+91 98765 43210" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none"/>
<p class="form-error"></p>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
<div>
<label class="block text-sm font-semibold mb-1.5">Child’s Age</label>
<select name="childAge" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none bg-white">
<option value="">Select age range</option>
<option value="5-7">5 – 7 years</option>
<option value="8-10">8 – 10 years</option>
<option value="11-13">11 – 13 years</option>
<option value="14-16">14 – 16 years</option>
</select>
</div>
<div>
<label class="block text-sm font-semibold mb-1.5">Interested In</label>
<select name="program" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none bg-white">
<option value="">Select a program</option>
<option value="little-explorers">Little Explorers (5–7)</option>
<option value="junior-adventurers">Junior Adventurers (8–10)</option>
<option value="outdoor-leaders">Outdoor Leaders (11–13)</option>
<option value="teen-expeditions">Teen Expeditions (14–16)</option>
<option value="custom">Custom / Group Outing</option>
</select>
</div>
</div>
<div>
<label class="block text-sm font-semibold mb-1.5">Message</label>
<textarea name="message" rows="4" placeholder="Tell us about your child and what they’re looking for…" class="form-input w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none resize-none"></textarea>
</div>
<button type="submit" class="btn-primary w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg">
<span class="btn-text">Send Message</span>
<span class="btn-spinner spinner" style="display:none;"></span>
<span class="material-icons text-base">send</span>
</button>
<p class="text-xs text-text-muted text-center">We respect your privacy and will never share your information.</p>
</form>
</div>
</section>
</main>
<footer class="bg-text-main text-gray-300 pt-16 pb-8">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
<!-- Brand -->
<div class="md:col-span-1">
<div class="flex items-center gap-2.5 mb-4">
<div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white"><span class="material-icons text-xl">explore</span></div>
<span class="font-extrabold text-xl text-white">Latitude</span>
</div>
<p class="text-sm leading-relaxed text-gray-400 mb-5">Outdoor education experiences for kids in Bangalore. Building confidence, resilience & curiosity through nature.</p>
<div class="flex items-center gap-3">
<a href="#" class="social-icon instagram w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20" aria-label="Instagram"><span class="material-icons text-lg">camera_alt</span></a>
<a href="#" class="social-icon facebook w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20" aria-label="Facebook"><span class="material-icons text-lg">facebook</span></a>
<a href="#" class="social-icon whatsapp w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20" aria-label="WhatsApp"><span class="material-icons text-lg">chat</span></a>
</div>
</div>
<!-- Quick Links -->
<div>
<h4 class="font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
<ul class="space-y-2.5 text-sm">
<li><a href="index.html" class="link-hover hover:text-white transition-colors">Home</a></li>
<li><a href="programs.html" class="link-hover hover:text-white transition-colors">Programs</a></li>
<li><a href="guides.html" class="link-hover hover:text-white transition-colors">Our Guides</a></li>
<li><a href="about.html" class="link-hover hover:text-white transition-colors">About Us</a></li>
</ul>
</div>
<!-- Programs -->
<div>
<h4 class="font-bold text-white text-sm uppercase tracking-wider mb-4">Programs</h4>
<ul class="space-y-2.5 text-sm">
<li><a href="programs.html" class="link-hover hover:text-white transition-colors">Little Explorers (5–7)</a></li>
<li><a href="programs.html" class="link-hover hover:text-white transition-colors">Junior Adventurers (8–10)</a></li>
<li><a href="programs.html" class="link-hover hover:text-white transition-colors">Outdoor Leaders (11–13)</a></li>
<li><a href="programs.html" class="link-hover hover:text-white transition-colors">Teen Expeditions (14–16)</a></li>
</ul>
</div>
<!-- Contact -->
<div>
<h4 class="font-bold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
<ul class="space-y-2.5 text-sm">
<li class="flex items-center gap-2"><span class="material-icons text-primary text-base">email</span> hello@latitudeoutdoors.in</li>
<li class="flex items-center gap-2"><span class="material-icons text-primary text-base">phone</span> +91 98765 43210</li>
<li class="flex items-center gap-2"><span class="material-icons text-primary text-base">location_on</span> Bangalore, Karnataka</li>
</ul>
</div>
</div>
<div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-xs text-gray-500">© 2026 Latitude. All rights reserved.</p>
<div class="flex items-center gap-6 text-xs text-gray-500">
<a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
<a href="#" class="hover:text-white transition-colors">Terms of Service</a>
<a href="#" class="hover:text-white transition-colors">Refund Policy</a>
</div>
</div>
</div>
</footer>
<script src="script.js"></script>
</body></html>