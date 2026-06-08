import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pagesDir = path.join(root, 'public', 'pages')

const LOGO_CSS_AND_JS = `
\t<!-- Global Custom Header Logo Styling and Script -->
\t<style id="cl-global-header-logo-style">
\t/* 1. Header Logo */
\timg[src*="FWNkv69JGijvxHCNNVcTqsdMmFg"],
\theader img,
\t.framer-1ed0056 img,
\t.framer-joevt5 img {
\t\tcontent: url('/assets/images/logo.png') !important;
\t}
\t/* Enlarge the header logo container */
\t.framer-joevt5 {
\t\twidth: 155px !important;
\t\theight: 40px !important;
\t}

\t/* 2. Description Section Logo */
\timg[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"],
\t.framer-1otr4zy img,
\t[data-framer-name="Main White Background Logo"] img {
\t\tcontent: url('/assets/images/logo.png') !important;
\t}

\t/* 3. Team Section Logo */
\timg[src*="PubWQVztlJFvyd49JO2oB7p6EWc"],
\t.framer-1xnime3 img,
\t.framer-2ufe3c-container img,
\t[data-framer-name="Logo desktop"] img,
\t[data-framer-name="Main Black Background Logo"] img {
\t\tcontent: url('/assets/images/logo-team.png') !important;
\t}
\t</style>
\t<script id="cl-global-header-logo-script">
\t(function() {
\t\tfunction updateLogos() {
\t\t\t// Header Logo
\t\t\tvar headerImgs = document.querySelectorAll('img[src*="FWNkv69JGijvxHCNNVcTqsdMmFg"], header img, .framer-1ed0056 img, .framer-joevt5 img');
\t\t\theaderImgs.forEach(function(img) {
\t\t\t\tif (img.getAttribute('src') !== '/assets/images/logo.png') {
\t\t\t\t\timg.setAttribute('src', '/assets/images/logo.png');
\t\t\t\t\timg.removeAttribute('srcset');
\t\t\t\t}
\t\t\t});

\t\t\t// Description Section Logo
\t\t\tvar descImgs = document.querySelectorAll('img[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"], .framer-1otr4zy img, [data-framer-name="Main White Background Logo"] img');
\t\t\tdescImgs.forEach(function(img) {
\t\t\t\tif (img.getAttribute('src') !== '/assets/images/logo.png') {
\t\t\t\t\timg.setAttribute('src', '/assets/images/logo.png');
\t\t\t\t\timg.removeAttribute('srcset');
\t\t\t\t}
\t\t\t});

\t\t\t// Team Section Logo
\t\t\tvar teamImgs = document.querySelectorAll('img[src*="PubWQVztlJFvyd49JO2oB7p6EWc"], .framer-1xnime3 img, .framer-2ufe3c-container img, [data-framer-name="Logo desktop"] img, [data-framer-name="Main Black Background Logo"] img');
\t\t\tteamImgs.forEach(function(img) {
\t\t\t\tif (img.getAttribute('src') !== '/assets/images/logo-team.png') {
\t\t\t\t\timg.setAttribute('src', '/assets/images/logo-team.png');
\t\t\t\t\timg.removeAttribute('srcset');
\t\t\t\t}
\t\t\t});
\t\t}
\t\tupdateLogos();
\t\tvar logoInterval = setInterval(updateLogos, 250);
\t\tsetTimeout(function() { clearInterval(logoInterval); }, 15000);
\t\t
\t\tvar observer = new MutationObserver(updateLogos);
\t\tobserver.observe(document.body, { childList: true, subtree: true });
\t})();
\t</script>
`

const MULTI_HERO_VIDEO_SCRIPT = `\t<!-- Background Video for Hero Section -->
\t<script id="cl-hero-video-script">
\t(function () {
\t\tfunction ensureVideo() {
\t\t\tvar heroes = document.querySelectorAll('.framer-fbtq8l');
\t\t\theroes.forEach(function(hero, index) {
\t\t\t\tvar videoContainerId = 'cl-hero-video-container-' + index;
\t\t\t\tvar overlayId = 'cl-hero-white-overlay-' + index;
\t\t\t\t
\t\t\t\tvar videoContainer = document.getElementById(videoContainerId);
\t\t\t\tif (!videoContainer) {
\t\t\t\t\tvideoContainer = document.createElement('div');
\t\t\t\t\tvideoContainer.id = videoContainerId;
\t\t\t\t\tvideoContainer.className = 'cl-hero-video-container';
\t\t\t\t\tvideoContainer.innerHTML = 
\t\t\t\t\t\t'<video autoplay loop muted playsinline class="cl-hero-video">' +
\t\t\t\t\t\t'<source src="/assets/videos/mandala-hero.mp4" type="video/mp4">' +
\t\t\t\t\t\t'</video>';
\t\t\t\t\thero.insertBefore(videoContainer, hero.firstChild);
\t\t\t\t}

\t\t\t\tvar overlay = document.getElementById(overlayId);
\t\t\t\tif (!overlay) {
\t\t\t\t\toverlay = document.createElement('div');
\t\t\t\t\toverlay.id = overlayId;
\t\t\t\t\toverlay.className = 'cl-hero-white-overlay';
\t\t\t\t\tif (videoContainer.nextSibling) {
\t\t\t\t\t\thero.insertBefore(overlay, videoContainer.nextSibling);
\t\t\t\t\t} else {
\t\t\t\t\t\thero.appendChild(overlay);
\t\t\t\t\t}
\t\t\t\t}
\t\t\t});
\t\t}

\t\t// Keep checking and injecting if it gets wiped out by Framer hydration
\t\tensureVideo();
\t\tvar videoAttempts = 0;
\t\tvar videoInterval = setInterval(function () {
\t\t\tensureVideo();
\t\t\tvideoAttempts++;
\t\t\tif (videoAttempts > 40) clearInterval(videoInterval); // Stop after 10 seconds
\t\t}, 250);

\t\t// Also listen for DOM modifications to guarantee it stays in place
\t\tvar observer = new MutationObserver(ensureVideo);
\t\tobserver.observe(document.body, { childList: true, subtree: true });
\t})();
\t</script>`

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const baseName = path.basename(filePath)

  console.log(`Processing ${baseName}...`)

  // 1. Remove any existing logo scripts/styles
  content = content.replace(/<!-- Global Custom Header Logo Styling and Script -->[\s\S]*?<\/script>/g, '')

  // 2. Inject the custom logo CSS and JS right before </head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${LOGO_CSS_AND_JS}\n</head>`)
    console.log(`  ✔ Injected global logo script & style.`)
  } else {
    console.log(`  ⚠ Could not find </head> in ${baseName}`)
  }

  // 3. For index.html, update the video background scripts and opacity
  if (baseName === 'index.html') {
    // Replace the old video script with the new multi-hero one
    content = content.replace(/<!-- Background Video for Hero Section -->[\s\S]*?<\/script>/g, '')
    
    // Inject the new multi-hero script before the main container hydrate config
    const mainDivTag = '<div id="main"'
    if (content.includes(mainDivTag)) {
      content = content.replace(mainDivTag, `${MULTI_HERO_VIDEO_SCRIPT}\n\t${mainDivTag}`)
      console.log(`  ✔ Injected multi-hero background video script.`)
    } else {
      console.log(`  ⚠ Could not find <div id="main" in index.html to insert video script`)
    }

    // Update overlay opacity from 0.60 to 0.85
    if (content.includes('opacity: 0.60 !important; /* 60% opacity white overlay */')) {
      content = content.replace(
        'opacity: 0.60 !important; /* 60% opacity white overlay */',
        'opacity: 0.85 !important; /* 85% opacity white overlay */'
      )
      console.log(`  ✔ Updated white overlay opacity to 85%.`)
    } else {
      // Fallback if the comment differs
      content = content.replace(
        /opacity:\s*0\.\d+\s*!important;\s*\/\*\s*\d+%\s*opacity\s*white\s*overlay\s*\*\//g,
        'opacity: 0.85 !important; /* 85% opacity white overlay */'
      )
      console.log(`  ✔ Applied regex fallback for overlay opacity update.`)
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8')
}

// Read all HTML files in public/pages
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))
files.forEach(file => {
  processFile(path.join(pagesDir, file))
})

console.log('\n✨ Custom script and logo injection complete!\n')
