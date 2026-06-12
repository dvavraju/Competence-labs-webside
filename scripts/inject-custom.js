import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pagesDir = path.join(root, 'public', 'pages')

function getInjectableMarkup() {
	// Services hero is now the light abstract image (cl-services-hero-light-theme),
	// so its header should render with the same black-on-light controls as every
	// other page — match the runtime getTheme()'s 'light' classification for /services.
	const logoUrl = '/assets/images/logo.png';
	const controlColor = '#000000';
	
	return `
	<!-- Global Custom Header Logo Styling and Script -->
	<style id="cl-global-header-logo-style">
	/* Framer's ":root body { background: var(--token-09fd1980..., rgb(12,12,12)) }" uses
	   this CSS variable for the page background color. The variable is only defined by the
	   Framer JS chunks after they load. Until then the fallback rgb(12,12,12) makes every
	   page flash near-black during navigation. Defining it here as white eliminates the
	   flash. Framer's JS also sets the token on the body's inline style which overrides the
	   :root definition, so we force body background directly with !important too. */
	:root { --token-09fd1980-8076-4f0b-8bb4-7ba5919ad6b8: rgb(255, 255, 255); }
	body { background-color: #ffffff !important; }

	/* Hide original responsive CDN logo images to prevent srcset override and flickers */
	img[src*="FWNkv69JGijvxHCNNVcTqsdMmFg"],
	img[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"],
	img[src*="PubWQVztlJFvyd49JO2oB7p6EWc"],
	header img,
	.framer-1ed0056 img,
	.framer-joevt5 img {
		display: none !important;
		opacity: 0 !important;
	}

	/* Enlarge the header logo container. Some pages (About, Contact) render a
	   different responsive header variant whose logo carries the class
	   framer-ffav11 instead of framer-joevt5, so match it by its stable
	   data-framer-name too -- scoped to header to avoid the team-section logo. */
	.framer-joevt5,
	header [data-framer-name="Main Black Background Logo"] {
		width: 155px !important;
		height: 40px !important;
	}

	/* 1. Header Logo & Description Section Logo background replacement */
	.framer-joevt5,
	.framer-joevt5 [data-framer-background-image-wrapper="true"],
	header [data-framer-name="Main Black Background Logo"],
	header [data-framer-name="Main Black Background Logo"] [data-framer-background-image-wrapper="true"] {
		background-image: url('${logoUrl}') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: left center !important;
	}

	/* framer-1otr4zy = footer/description logo (has background-image fallback).
	   framer-11lcapo = inner container for "Main White Background Logo" in
	   content sections (Creative force, etc.) — previously had bg:none so the
	   CDN original img showed a black sphere instead of our purple one. Adding
	   it here means the correct logo.png background appears immediately (no JS
	   delay) and the original CDN img is made transparent. */
	.framer-1otr4zy,
	.framer-1otr4zy [data-framer-background-image-wrapper="true"],
	.framer-11lcapo,
	.framer-11lcapo [data-framer-background-image-wrapper="true"] {
		background-image: url('/assets/images/logo.png') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: center !important;
	}
	.framer-11lcapo img,
	.framer-1otr4zy img {
		opacity: 0 !important;
	}

	/* The home page "Erfolgsgeschichten" ("Success Stories") heading sits in a
	   fixed 247px box sized for the two-word English version. The single
	   18-letter German compound word does not fit on one line there, so the
	   browser's default break-word wrapping splits it mid-syllable into
	   "Erfolgsgesc" / "hichten". Switching to language-aware hyphenation
	   (the page already declares lang="de") breaks it cleanly at a syllable
	   boundary instead: "Erfolgsge-" / "schichten". framer-bd46t4 is this
	   heading's unique wrapper, so the rule only affects this one element. */
	.framer-bd46t4 h2 {
		hyphens: auto !important;
		-webkit-hyphens: auto !important;
		overflow-wrap: normal !important;
		word-break: normal !important;
	}

	/* 2. Team Section Logo background replacement */
	.framer-1xnime3,
	.framer-1xnime3 [data-framer-background-image-wrapper="true"],
	.framer-2ufe3c-container,
	.framer-2ufe3c-container [data-framer-background-image-wrapper="true"] {
		background-image: url('/assets/images/logo-team.png') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: center !important;
	}

	/* On the About/Contact header variant the nav row holds a third, empty
	   native locale-picker slot alongside the logo and burger menu. With
	   justify-content: space-between that empty slot pushes the burger/MENU
	   group into the middle of the header instead of flush right like every
	   other page. Collapsing it out of the flex flow restores the same
	   logo-left, controls-right layout used elsewhere. */
	header .framer-13gbrwu-container {
		display: none !important;
	}

	/* 3. Force Nav Links and Contact Items inside drawer to be White */
	html body .framer-lhs01 .framer-1w3jqcb,
	html body .framer-lhs01 .framer-1w3jqcb *,
	html body .framer-lhs01 .framer-1oywgs7,
	html body .framer-lhs01 .framer-1oywgs7 *,
	html body .framer-lhs01 .framer-styles-preset-10ygvy8,
	html body .framer-lhs01 .framer-styles-preset-10ygvy8 *,
	html body .framer-lhs01 .framer-styles-preset-1nr60og,
	html body .framer-lhs01 .framer-styles-preset-1nr60og *,
	html body .framer-lhs01 [data-styles-preset="pFXRpm75X"],
	html body .framer-lhs01 [data-styles-preset="pFXRpm75X"] *,
	html body .framer-lhs01 [data-styles-preset="Z43DfkPk9"],
	html body .framer-lhs01 [data-styles-preset="Z43DfkPk9"] * {
		color: #ffffff !important;
		--framer-text-color: #ffffff !important;
		--framer-link-text-color: #ffffff !important;
		--framer-link-hover-text-color: #ffffff !important;
		--framer-link-current-text-color: #ffffff !important;
		--extracted-r6o4lv: #ffffff !important;
		-webkit-text-fill-color: #ffffff !important;
		text-decoration: none !important;
	}

	/* 4. Force Menu Word, Burger Icon lines, and Language Dropdown Theme Colors */
	/* Burger Menu Lines */
	html body .framer-1v2q1i2,
	html body .framer-6vcmxr {
		background-color: ${controlColor} !important;
	}

	/* MENU Word */
	html body .framer-1665p36,
	html body .framer-1665p36 *,
	html body [data-framer-name="MENU"],
	html body [data-framer-name="MENU"] * {
		color: ${controlColor} !important;
		--framer-text-color: ${controlColor} !important;
		--extracted-r6o4lv: ${controlColor} !important;
		-webkit-text-fill-color: ${controlColor} !important;
	}

	/* Language Dropdown - rounded border, no sharp outline */
	html body .framer-1pl4r2c,
	html body .framer-1pl4r2c .input {
		border-radius: 20px !important;
		outline: none !important;
		box-shadow: none !important;
	}
	html body .framer-1pl4r2c select {
		outline: none !important;
		box-shadow: none !important;
		-webkit-appearance: none !important;
		border: none !important;
	}
	html body .framer-1pl4r2c .input,
	html body .framer-1pl4r2c .input *,
	html body .framer-1pl4r2c select,
	html body .framer-1pl4r2c option,
	html body .framer-1pl4r2c .title,
	html body .framer-1pl4r2c .caret,
	html body .framer-1pl4r2c .caret * {
		color: ${controlColor} !important;
		--framer-color: ${controlColor} !important;
		--framer-text-color: ${controlColor} !important;
		--extracted-r6o4lv: ${controlColor} !important;
		-webkit-text-fill-color: ${controlColor} !important;
		border-color: ${controlColor} !important;
	}
	html body .framer-1pl4r2c .input svg,
	html body .framer-1pl4r2c .input path {
		fill: ${controlColor} !important;
		stroke: ${controlColor} !important;
	}

	/* Services hero "Learn more" button: drop the dark pill-shaped border —
	   it clashes with the button's purple fill and overly rounded corners. */
	[data-framer-name="Header button one"]::after {
		border: none !important;
	}
	</style>
	<script id="cl-global-header-logo-script">
	(function() {
		// ── Adaptive header theme ─────────────────────────────────────────────────
		// Samples the computed background color of large elements in the top portion
		// of the viewport and converts to perceived brightness (ITU-R BT.601 luma).
		// Returns 'dark' | 'light'.
		function analyzePageBackground() {
			// Fast path: known background themes by URL.
			// Services hero used to be a dark photo; it's now the light abstract
			// image (cl-services-hero-light-theme), so its header controls
			// (logo, language switch, MENU, burger) should read as light-theme too.
			var path = window.location.pathname;
			if (path.indexOf('/services') !== -1) return 'light';

			// General approach: sample large viewport-spanning elements in the header zone
			try {
				var candidates = document.querySelectorAll('div, section, main, article');
				var checked = 0;
				for (var i = 0; i < candidates.length && checked < 40; i++) {
					var el = candidates[i];
					var r = el.getBoundingClientRect();
					// Must be tall + wide + inside the header zone
					if (r.top < 200 && r.bottom > 60 &&
						r.width > window.innerWidth * 0.5 &&
						r.height > 80) {
						checked++;
						var bg = window.getComputedStyle(el).backgroundColor;
						if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') continue;
						var m = bg.match(/\d+/g);
						if (m && m.length >= 3) {
							// Perceived brightness (BT.601)
							var lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
							if (lum < 0.35) return 'dark';
							if (lum > 0.65) return 'light';
						}
					}
				}
			} catch(e) {}

			return 'light'; // default: assume light/white background
		}

		function getTheme() {
			var pageBg = analyzePageBackground(); // 'dark' | 'light'
			var isDark = pageBg === 'dark';
			return {
				isServices: window.location.pathname.indexOf('/services') !== -1,
				isDark: isDark,
				logoUrl: isDark ? '/assets/images/logo-team.png' : '/assets/images/logo.png',
				controlColor: isDark ? '#ffffff' : '#000000',
				controlBorderColor: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.2)'
			};
		}

		function updateStyleTag(theme) {
			var styleEl = document.getElementById('cl-global-header-logo-style');
			if (!styleEl) return;
			var currentThemeMode = styleEl.getAttribute('data-theme-mode');
			var expectedMode = theme.isDark ? 'dark' : 'light';
			if (currentThemeMode === expectedMode) return;

			styleEl.setAttribute('data-theme-mode', expectedMode);
			styleEl.innerHTML = \`
	/* Prevent dark background flash — define Framer's page-color token as white
	   so its fallback rgb(12,12,12) is never used before chunks load. Framer's JS
	   also sets the token as an inline body style (overriding our :root value), so
	   we also force body background-color directly with !important to win regardless. */
	:root { --token-09fd1980-8076-4f0b-8bb4-7ba5919ad6b8: rgb(255, 255, 255); }
	body { background-color: #ffffff !important; }

	/* Hide original responsive CDN logo images to prevent srcset override and flickers */
	img[src*="FWNkv69JGijvxHCNNVcTqsdMmFg"],
	img[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"],
	img[src*="PubWQVztlJFvyd49JO2oB7p6EWc"],
	header img,
	.framer-1ed0056 img,
	.framer-joevt5 img {
		display: none !important;
		opacity: 0 !important;
	}

	/* Enlarge the header logo container. Some pages (About, Contact) render a
	   different responsive header variant whose logo carries the class
	   framer-ffav11 instead of framer-joevt5, so match it by its stable
	   data-framer-name too -- scoped to header to avoid the team-section logo. */
	.framer-joevt5,
	header [data-framer-name="Main Black Background Logo"] {
		width: 155px !important;
		height: 40px !important;
	}

	/* 1. Header Logo & Description Section Logo background replacement */
	.framer-joevt5,
	.framer-joevt5 [data-framer-background-image-wrapper="true"],
	header [data-framer-name="Main Black Background Logo"],
	header [data-framer-name="Main Black Background Logo"] [data-framer-background-image-wrapper="true"] {
		background-image: url('\${theme.logoUrl}') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: left center !important;
	}

	/* framer-1otr4zy = footer/description logo (has background-image fallback).
	   framer-11lcapo = inner container for "Main White Background Logo" in
	   content sections (Creative force, etc.) — previously had bg:none so the
	   CDN original img showed a black sphere instead of our purple one. Adding
	   it here means the correct logo.png background appears immediately (no JS
	   delay) and the original CDN img is made transparent. */
	.framer-1otr4zy,
	.framer-1otr4zy [data-framer-background-image-wrapper="true"],
	.framer-11lcapo,
	.framer-11lcapo [data-framer-background-image-wrapper="true"] {
		background-image: url('/assets/images/logo.png') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: center !important;
	}
	.framer-11lcapo img,
	.framer-1otr4zy img {
		opacity: 0 !important;
	}

	/* The home page "Erfolgsgeschichten" ("Success Stories") heading sits in a
	   fixed 247px box sized for the two-word English version. The single
	   18-letter German compound word does not fit on one line there, so the
	   browser's default break-word wrapping splits it mid-syllable into
	   "Erfolgsgesc" / "hichten". Switching to language-aware hyphenation
	   (the page already declares lang="de") breaks it cleanly at a syllable
	   boundary instead: "Erfolgsge-" / "schichten". framer-bd46t4 is this
	   heading's unique wrapper, so the rule only affects this one element. */
	.framer-bd46t4 h2 {
		hyphens: auto !important;
		-webkit-hyphens: auto !important;
		overflow-wrap: normal !important;
		word-break: normal !important;
	}

	/* 2. Team Section Logo background replacement */
	.framer-1xnime3,
	.framer-1xnime3 [data-framer-background-image-wrapper="true"],
	.framer-2ufe3c-container,
	.framer-2ufe3c-container [data-framer-background-image-wrapper="true"] {
		background-image: url('/assets/images/logo-team.png') !important;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		background-position: center !important;
	}

	/* On the About/Contact header variant the nav row holds a third, empty
	   native locale-picker slot alongside the logo and burger menu. With
	   justify-content: space-between that empty slot pushes the burger/MENU
	   group into the middle of the header instead of flush right like every
	   other page. Collapsing it out of the flex flow restores the same
	   logo-left, controls-right layout used elsewhere. */
	header .framer-13gbrwu-container {
		display: none !important;
	}

	/* 3. Force Nav Links and Contact Items inside drawer to be White */
	html body .framer-lhs01 .framer-1w3jqcb,
	html body .framer-lhs01 .framer-1w3jqcb *,
	html body .framer-lhs01 .framer-1oywgs7,
	html body .framer-lhs01 .framer-1oywgs7 *,
	html body .framer-lhs01 .framer-styles-preset-10ygvy8,
	html body .framer-lhs01 .framer-styles-preset-10ygvy8 *,
	html body .framer-lhs01 .framer-styles-preset-1nr60og,
	html body .framer-lhs01 .framer-styles-preset-1nr60og *,
	html body .framer-lhs01 [data-styles-preset="pFXRpm75X"],
	html body .framer-lhs01 [data-styles-preset="pFXRpm75X"] *,
	html body .framer-lhs01 [data-styles-preset="Z43DfkPk9"],
	html body .framer-lhs01 [data-styles-preset="Z43DfkPk9"] * {
		color: #ffffff !important;
		--framer-text-color: #ffffff !important;
		--framer-link-text-color: #ffffff !important;
		--framer-link-hover-text-color: #ffffff !important;
		--framer-link-current-text-color: #ffffff !important;
		--extracted-r6o4lv: #ffffff !important;
		-webkit-text-fill-color: #ffffff !important;
		text-decoration: none !important;
	}

	/* 4. Force Menu Word, Burger Icon lines, and Language Dropdown Theme Colors */
	/* Burger Menu Lines */
	html body .framer-1v2q1i2,
	html body .framer-6vcmxr {
		background-color: \${theme.controlColor} !important;
	}

	/* MENU Word */
	html body .framer-1665p36,
	html body .framer-1665p36 *,
	html body [data-framer-name="MENU"],
	html body [data-framer-name="MENU"] * {
		color: \${theme.controlColor} !important;
		--framer-text-color: \${theme.controlColor} !important;
		--extracted-r6o4lv: \${theme.controlColor} !important;
		-webkit-text-fill-color: \${theme.controlColor} !important;
	}

	/* Language Dropdown - rounded border, no sharp outline */
	html body .framer-1pl4r2c,
	html body .framer-1pl4r2c .input {
		border-radius: 20px !important;
		outline: none !important;
		box-shadow: none !important;
	}
	html body .framer-1pl4r2c select {
		outline: none !important;
		box-shadow: none !important;
		-webkit-appearance: none !important;
		border: none !important;
	}
	html body .framer-1pl4r2c .input,
	html body .framer-1pl4r2c .input *,
	html body .framer-1pl4r2c select,
	html body .framer-1pl4r2c option,
	html body .framer-1pl4r2c .title,
	html body .framer-1pl4r2c .caret,
	html body .framer-1pl4r2c .caret * {
		color: \${theme.controlColor} !important;
		--framer-color: \${theme.controlColor} !important;
		--framer-text-color: \${theme.controlColor} !important;
		--extracted-r6o4lv: \${theme.controlColor} !important;
		-webkit-text-fill-color: \${theme.controlColor} !important;
		border-color: \${theme.controlColor} !important;
	}
	html body .framer-1pl4r2c .input svg,
	html body .framer-1pl4r2c .input path {
		fill: \${theme.controlColor} !important;
		stroke: \${theme.controlColor} !important;
	}

	/* Services hero "Learn more" button: drop the dark pill-shaped border —
	   it clashes with the button's purple fill and overly rounded corners. */
	[data-framer-name="Header button one"]::after {
		border: none !important;
	}
			\`;
		}

		function updateLogos(theme) {
			// Find all header logo images
			var logoImgs = document.querySelectorAll('img[src*="FWNkv69JGijvxHCNNVcTqsdMmFg"], img[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"]');
			logoImgs.forEach(function(img) {
				// Check if this image is a header logo (not description logo)
				var isDescOrTeam = img.closest('.framer-1otr4zy, .framer-1xnime3, .framer-2ufe3c-container, [data-framer-name="Main White Background Logo"], [data-framer-name="Main Black Background Logo"]');
				if (!isDescOrTeam) {
					// Hide the original img element
					img.style.setProperty('display', 'none', 'important');
					img.style.setProperty('opacity', '0', 'important');
					if (img.getAttribute('src') !== theme.logoUrl) {
						img.setAttribute('src', theme.logoUrl);
						img.removeAttribute('srcset');
					}
					
					// Apply background replacement and sizing to parent wrappers up to <a> tag
					var p = img.parentElement;
					var depth = 0;
					while (p && p.tagName !== 'HEADER' && p.tagName !== 'BODY' && depth < 5) {
						p.style.setProperty('background-image', "url('" + theme.logoUrl + "')", 'important');
						p.style.setProperty('background-size', 'contain', 'important');
						p.style.setProperty('background-repeat', 'no-repeat', 'important');
						p.style.setProperty('background-position', 'left center', 'important');
						p.style.setProperty('width', '155px', 'important');
						p.style.setProperty('height', '40px', 'important');
						if (p.tagName === 'A') {
							break;
						}
						p = p.parentElement;
						depth++;
					}
				}
			});

			// Description Section Logo
			var descImgs = document.querySelectorAll('img[src*="hFyLPLK9uaWEn5J5Qh40cFJ3os"], .framer-1otr4zy img, [data-framer-name="Main White Background Logo"] img');
			descImgs.forEach(function(img) {
				img.style.display = 'block';
				// The "10:45" phone-mockup notification card (services page) has a
				// dark purple background — the dark "White Background" logo variant
				// is invisible there, so swap in the white logo variant instead.
				var inPhoneMockup = img.closest('[data-framer-name="Logo text"]');
				var targetSrc = inPhoneMockup ? '/assets/images/logo-team.png' : '/assets/images/logo.png';
				if (img.getAttribute('src') !== targetSrc) {
					img.setAttribute('src', targetSrc);
					img.removeAttribute('srcset');
				}
			});

			// Team Section Logo
			var teamImgs = document.querySelectorAll('img[src*="PubWQVztlJFvyd49JO2oB7p6EWc"], .framer-1xnime3 img, .framer-2ufe3c-container img, [data-framer-name="Logo desktop"] img, [data-framer-name="Main Black Background Logo"] img');
			teamImgs.forEach(function(img) {
				img.style.display = 'block';
				if (img.getAttribute('src') !== '/assets/images/logo-team.png') {
					img.setAttribute('src', '/assets/images/logo-team.png');
					img.removeAttribute('srcset');
				}
			});
		}

		function updateBlackControls(theme) {
			// 1. Burger Lines (Dynamic & Selector based)
			var burgerLines = Array.prototype.slice.call(document.querySelectorAll(
				'.framer-1v2q1i2, .framer-6vcmxr, [data-framer-name="Burger"] div, [data-framer-name="Toggle"] div, [data-framer-name="Menu Button"] div'
			));
			
			// Find MENU word and look for nearby horizontal lines
			var menuWord = null;
			var allTexts = document.querySelectorAll('div, span, p');
			for (var i = 0; i < allTexts.length; i++) {
				var txt = allTexts[i].textContent ? allTexts[i].textContent.trim().toUpperCase() : '';
				if (txt === 'MENU' || txt === 'MENÜ') {
					menuWord = allTexts[i];
					break;
				}
			}
			if (menuWord) {
				var parent = menuWord.parentElement;
				for (var depth = 0; depth < 3 && parent; depth++) {
					var divs = parent.querySelectorAll('div, span');
					divs.forEach(function(div) {
						var w = div.offsetWidth || (div.getBoundingClientRect && div.getBoundingClientRect().width);
						var h = div.offsetHeight || (div.getBoundingClientRect && div.getBoundingClientRect().height);
						if (w >= 10 && w <= 45 && h >= 1 && h <= 4) {
							if (burgerLines.indexOf(div) === -1) {
								burgerLines.push(div);
							}
						}
					});
					parent = parent.parentElement;
				}
			}
			
			burgerLines.forEach(function(el) {
				el.style.setProperty('background-color', theme.controlColor, 'important');
				if (el.tagName === 'svg' || el.tagName === 'path' || el.tagName === 'line' || el.tagName === 'rect') {
					el.style.setProperty('fill', theme.controlColor, 'important');
					el.style.setProperty('stroke', theme.controlColor, 'important');
				}
			});
			
			// 2. MENU Word (Dynamic & Selector based)
			var menuWords = Array.prototype.slice.call(document.querySelectorAll(
				'.framer-1665p36, .framer-1665p36 *, [data-framer-name="MENU"], [data-framer-name="MENU"] *'
			));
			allTexts.forEach(function(el) {
				var txt = el.textContent ? el.textContent.trim().toUpperCase() : '';
				if (txt === 'MENU' || txt === 'MENÜ') {
					if (menuWords.indexOf(el) === -1) menuWords.push(el);
					var children = el.querySelectorAll('*');
					children.forEach(function(child) {
						if (menuWords.indexOf(child) === -1) menuWords.push(child);
					});
				}
			});
			menuWords.forEach(function(el) {
				el.style.setProperty('color', theme.controlColor, 'important');
				el.style.setProperty('-webkit-text-fill-color', theme.controlColor, 'important');
				el.style.setProperty('--framer-text-color', theme.controlColor, 'important');
				el.style.setProperty('--extracted-r6o4lv', theme.controlColor, 'important');
			});

			// 3. Language Selector Dropdown (Dynamic select styling & text-based)
			var selects = document.querySelectorAll('select');
			selects.forEach(function(sel) {
				sel.style.setProperty('color', theme.controlColor, 'important');
				sel.style.setProperty('background-color', 'transparent', 'important');
				sel.style.setProperty('border-color', theme.controlColor, 'important');
				sel.style.setProperty('--framer-color', theme.controlColor, 'important');
				sel.style.setProperty('--framer-text-color', theme.controlColor, 'important');
				sel.style.setProperty('--extracted-r6o4lv', theme.controlColor, 'important');
				sel.style.setProperty('outline', 'none', 'important');
				sel.style.setProperty('box-shadow', 'none', 'important');

				// Chevron arrow must match controlColor too -- i18n.js's floating-pill
				// CSS hardcodes a white-stroke chevron with !important, which loses to
				// nothing else here, leaving a white arrow invisible on light pages.
				var chevronStroke = theme.controlColor.replace('#', '%23');
				sel.style.setProperty('background-image', "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='" + chevronStroke + "' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", 'important');

				var parent = sel.parentElement;
				if (parent) {
					parent.style.setProperty('color', theme.controlColor, 'important');
					parent.style.setProperty('border-color', theme.controlColor, 'important');
					parent.style.setProperty('--framer-color', theme.controlColor, 'important');
					parent.style.setProperty('--framer-text-color', theme.controlColor, 'important');
					parent.style.setProperty('--extracted-r6o4lv', theme.controlColor, 'important');
					parent.style.setProperty('border', '1px solid ' + theme.controlBorderColor, 'important');
					parent.style.setProperty('border-radius', '20px', 'important');
					parent.style.setProperty('outline', 'none', 'important');
					parent.style.setProperty('box-shadow', 'none', 'important');
					
					var svgs = parent.querySelectorAll('svg, path');
					svgs.forEach(function(svg) {
						svg.style.setProperty('color', theme.controlColor, 'important');
						svg.style.setProperty('fill', theme.controlColor, 'important');
						svg.style.setProperty('stroke', theme.controlColor, 'important');
					});

					var grandparent = parent.parentElement;
					if (grandparent) {
						grandparent.style.setProperty('color', theme.controlColor, 'important');
						grandparent.style.setProperty('border-color', theme.controlColor, 'important');
						grandparent.style.setProperty('--framer-color', theme.controlColor, 'important');
						grandparent.style.setProperty('--framer-text-color', theme.controlColor, 'important');
						grandparent.style.setProperty('--extracted-r6o4lv', theme.controlColor, 'important');
						
						var gpSvgs = grandparent.querySelectorAll('svg, path');
						gpSvgs.forEach(function(svg) {
							svg.style.setProperty('color', theme.controlColor, 'important');
							svg.style.setProperty('fill', theme.controlColor, 'important');
							svg.style.setProperty('stroke', theme.controlColor, 'important');
						});
					}
				}
			});

			allTexts.forEach(function(el) {
				var text = el.textContent ? el.textContent.trim() : '';
				if (text === 'English' || text === 'Deutsch' || text === 'EN' || text === 'DE') {
					el.style.setProperty('color', theme.controlColor, 'important');
					el.style.setProperty('-webkit-text-fill-color', theme.controlColor, 'important');
					el.style.setProperty('--framer-color', theme.controlColor, 'important');
					el.style.setProperty('--framer-text-color', theme.controlColor, 'important');
					el.style.setProperty('--extracted-r6o4lv', theme.controlColor, 'important');
					
					var svgs = el.querySelectorAll('svg, path');
					svgs.forEach(function(svg) {
						svg.style.setProperty('color', theme.controlColor, 'important');
						svg.style.setProperty('fill', theme.controlColor, 'important');
						svg.style.setProperty('stroke', theme.controlColor, 'important');
					});
				}
			});

			// Style all SVGs in the header/nav to match theme.controlColor
			var headerSvgs = document.querySelectorAll('header svg, nav svg, [data-framer-name="Header"] svg, [data-framer-name="Navigation"] svg');
			headerSvgs.forEach(function(svg) {
				svg.style.setProperty('color', theme.controlColor, 'important');
				svg.style.setProperty('fill', theme.controlColor, 'important');
				svg.style.setProperty('stroke', theme.controlColor, 'important');
				var paths = svg.querySelectorAll('path, rect, line, circle');
				paths.forEach(function(p) {
					p.style.setProperty('color', theme.controlColor, 'important');
					p.style.setProperty('fill', theme.controlColor, 'important');
					p.style.setProperty('stroke', theme.controlColor, 'important');
				});
			});
		}

		// The exported logo link carries a nested "#mainhero" anchor href
		// (e.g. "./#mainhero") that Framer's own click handler reads directly,
		// landing on a hash URL that re-triggers hero-specific rendering instead
		// of a clean homepage load. Strip the hash so every logo click — on any
		// page, including the homepage itself — resolves to a plain "/".
		function fixLogoLinks() {
			var nestedLinks = document.querySelectorAll('[data-nested-link="true"][href*="#mainhero"], a[href*="#mainhero"]');
			nestedLinks.forEach(function(el) {
				var href = el.getAttribute('href');
				var clean = href.split('#')[0];
				if (clean === '' || clean === './') clean = '/';
				if (href !== clean) {
					el.setAttribute('href', clean);
				}
			});
		}

		// Framer's runtime computes its own contrast color for the arrow icon
		// inside the services hero "Learn more" button and bakes it into the
		// inline style as important black, overriding the white the design
		// intends. An important inline declaration can only be beaten by
		// another inline declaration, so re-apply white on top of it here.
		function fixLearnMoreIcon() {
			var btn = document.querySelector('[data-framer-name="Header button one"]');
			if (!btn) return;
			var icons = btn.querySelectorAll('svg, path, line, polyline, circle, rect');
			icons.forEach(function(el) {
				el.style.setProperty('color', '#ffffff', 'important');
				el.style.setProperty('fill', '#ffffff', 'important');
				el.style.setProperty('stroke', '#ffffff', 'important');
			});
		}

		function updateAll() {
			// This script runs in <head>, before <body> is parsed — the very
			// first synchronous call landed here with document.body still null,
			// throwing and aborting the rest of the IIFE (interval, observer,
			// click interceptor never registered). Bail until body exists.
			if (!document.body) return;
			var theme = getTheme();
			updateStyleTag(theme);
			updateLogos(theme);
			updateBlackControls(theme);
			fixLogoLinks();
			fixLearnMoreIcon();
		}

		updateAll();
		var logoInterval = setInterval(updateAll, 250);
		setTimeout(function() { clearInterval(logoInterval); }, 15000);
		
		var observer = new MutationObserver(updateAll);
		if (document.body) {
			observer.observe(document.body, { childList: true, subtree: true });
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				observer.observe(document.body, { childList: true, subtree: true });
			});
		}

		// Listen for SPA history changes
		var originalPushState = history.pushState;
		var originalReplaceState = history.replaceState;
		history.pushState = function() {
			originalPushState.apply(this, arguments);
			updateAll();
		};
		history.replaceState = function() {
			originalReplaceState.apply(this, arguments);
			updateAll();
		};
		window.addEventListener('popstate', updateAll);

		// Re-apply styles after CSS transitions/animations complete (e.g. menu drawer open)
		document.addEventListener('transitionend', function() { setTimeout(updateAll, 20); });
		document.addEventListener('animationend', function() { setTimeout(updateAll, 20); });

		// Intercept ALL clicks to force full-page redirects on local page routes
		window.addEventListener('click', function(e) {
			var target = e.target;
			var link = null;
			while (target && target !== document.body) {
				if (target.tagName === 'A') {
					link = target;
					break;
				}
				target = target.parentElement;
			}
			if (link) {
				var href = link.getAttribute('href');
				if (href) {
					var cleanHref = href.trim();
					if (cleanHref.startsWith('/') || cleanHref.startsWith('./') || cleanHref.indexOf(window.location.host) !== -1) {
						if (!cleanHref.startsWith('tel:') && !cleanHref.startsWith('mailto:') && !cleanHref.startsWith('#')) {
							// Exclude absolute external URLs unless they match window.location.host
							var isExternal = cleanHref.indexOf('://') !== -1 && cleanHref.indexOf(window.location.host) === -1;
							if (!isExternal) {
								var urlPath = cleanHref.split('?')[0].split('#')[0];
								if (urlPath === './') urlPath = '/';
								if (urlPath.startsWith('./')) urlPath = '/' + urlPath.substring(2);
								
								// Handle anchors on the same page
								var hasHash = cleanHref.indexOf('#') !== -1;
								var hashValue = hasHash ? cleanHref.substring(cleanHref.indexOf('#')) : '';
								
								var targetUrl = null;
								if (urlPath === '/' || urlPath === '') {
									targetUrl = '/';
								} else if (urlPath.indexOf('services') !== -1) {
									targetUrl = '/services';
								} else if (urlPath.indexOf('about') !== -1) {
									targetUrl = '/about';
								} else if (urlPath.indexOf('contact') !== -1) {
									targetUrl = '/contact';
								} else if (urlPath.indexOf('terms') !== -1) {
									targetUrl = '/terms';
								}

								if (targetUrl) {
									var currentPath = window.location.pathname;
									if (currentPath === './' || currentPath === '') currentPath = '/';
									var normalizedTarget = targetUrl;
									
									// If it's a hash link on the current page, let the default behavior (scroll) happen
									if (hasHash && currentPath === normalizedTarget) {
										return;
									}
									
									e.preventDefault();
									e.stopPropagation();
									window.location.href = targetUrl + hashValue;
								}
							}
						}
					}
				}
			}
		}, true); // Use capture phase to intercept before React router handlers
	})();
	</script>
	`;
}

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
  const markup = getInjectableMarkup()
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${markup}\n</head>`)
    console.log(`  ✔ Injected global logo script & style.`)
  } else {
    console.log(`  ⚠ Could not find </head> in ${baseName}`)
  }

  // 3. Convert all relative links starting with ./ to absolute root-relative links
  content = content.replace(/href="\.\/([^"]*)"/g, 'href="/$1"')
  content = content.replace(/src="\.\/([^"]*)"/g, 'src="/$1"')
  console.log(`  ✔ Rewrote relative links and sources to absolute paths.`)

  // 4. For index.html, update the video background scripts and opacity
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
