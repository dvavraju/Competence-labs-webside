/**
 * Competence Labs – Language Switcher
 *
 * - Hides Framer's built-in "German" locale picker
 * - Default language: English (translates DE → EN on load)
 * - Persists choice in localStorage key "cl-lang" ("en" | "de")
 * - Injects a clean EN / DE dropdown into the top-right of every page
 * - Reruns after Framer hydration to catch dynamically rendered nodes
 */
(function () {
  'use strict';

  // ── Complete DE → EN translation map ──────────────────────────────────────
  const DE_TO_EN = {
    // ── Navigation ──────────────────────────────────────────────────────────
    "Dienstleistungen": "Services",
    "Über uns": "About Us",
    "Kontakt": "Contact",
    "Home": "Home",
    "MENU": "MENU",

    // ── Hero (home page) ────────────────────────────────────────────────────
    "Marken aufbauen": "Build Brands",
    "Menschen antreiben": "Empower People",
    "Unter der Leitung von Samy Seif ist Competence Labs eine in Frankfurt ansässige Agentur, die sich auf Talentakquise, digitales Marketing, Markenentwicklung und Organisationskultur spezialisiert hat.":
      "Led by Samy Seif, Competence Labs is a Frankfurt-based agency specializing in talent acquisition, digital marketing, brand development, and organizational culture.",

    // ── Animated service ticker ─────────────────────────────────────────────
    "Weblösungen": "Web Solutions",
    "HR-Beratung": "HR Consulting",
    "Kulturelle": "Cultural",
    "Arbeit": "Work",

    // ── Services section (home) ─────────────────────────────────────────────
    "Talentakquise": "Talent Acquisition",
    "Arbeitsplatzkultur": "Workplace Culture",
    "Direkte Vermittlung": "Direct Placement",
    "Branding und Design": "Branding & Design",
    "Designs, die Leistung bringen, Ideen, die skalieren": "Designs that drive performance, ideas that scale",

    // ── Stats section ───────────────────────────────────────────────────────
    "Unsere Arbeit spricht durch Zahlen.": "Our work speaks through numbers.",
    "Zufriedene Kunden": "Satisfied Clients",
    "Kunden dabei helfen, ihre Träume zu verwirklichen": "Helping clients realize their dreams",
    "Kundenzufriedenheitsrate": "Client Satisfaction Rate",
    "Wir sind stolz darauf, dauerhafte Partnerschaften aufzubauen und die Erwartungen zu übertreffen.":
      "We take pride in building lasting partnerships and exceeding expectations.",
    "Jahrelange Erfahrung": "Years of Experience",
    "Ein Jahrzehnt Erfahrung in den Bereichen Design, Marketing, Ausstellungen und Inneneinrichtung.":
      "A decade of experience in design, marketing, exhibitions, and interior design.",
    "Bereitstellung wirkungsvoller Kampagnen in allen Branchen.": "Delivering impactful campaigns across all industries.",
    "Besetzungsquote": "Placement Rate",
    "Zeit bis zur Einstellung": "Time to Hire",
    "Conversion-Rate": "Conversion Rate",
    "Kundenbindung": "Client Retention",
    "Marketing campaigns": "Marketing campaigns",

    // ── Process section ─────────────────────────────────────────────────────
    "Unser Prozess": "Our Process",
    "Unser vierstufiger Prozess hält Sie in jeder Phase informiert und eingebunden und stellt sicher, dass das Endergebnis Ihren Zielen entspricht und bei Ihrem Publikum Anklang findet.":
      "Our four-step process keeps you informed and engaged at every stage, ensuring the final result aligns with your goals and resonates with your audience.",
    "Wir analysieren Ihr Unternehmen, Ihre Talentlücken und Ihre Marktposition, um Wachstumschancen in den Bereichen Personalbeschaffung, Branding und digitale Strategie aufzudecken.":
      "We analyze your company, talent gaps and market position to uncover growth opportunities in recruitment, branding and digital strategy.",
    "Wir entwickeln eine einheitliche Strategie, die Ihre Marke, Ihren Einstellungsansatz und Ihre interne Kultur aufeinander abstimmt – so stellen wir sicher, dass alles auf die gleiche Vision hinarbeitet.":
      "We develop a unified strategy that aligns your brand, hiring approach and internal culture — ensuring everything works toward the same vision.",
    "Erstellen, aktivieren und ausführen": "Create, activate and execute",
    "Optimieren, skalieren und transformieren": "Optimize, scale and transform",
    "Einblicke, Talent- und Marktkartierung": "Insights, talent and market mapping",
    "Strategie, Positionierung und Kulturausrichtung": "Strategy, positioning and cultural alignment",
    "Wir verfeinern Ihr Wachstum kontinuierlich durch Analysen, Kulturtransformation und langfristige Partnerschaften und helfen Ihnen so, nachhaltig zu skalieren.":
      "We continuously refine your growth through analytics, culture transformation and long-term partnerships, helping you scale sustainably.",
    "Vereinbaren Sie einen Beratungstermin": "Schedule a Consultation",
    "Vereinbaren Sie einen Anruf mit unserem Team": "Schedule a call with our team",

    // ── Testimonials ────────────────────────────────────────────────────────
    "Erfolgsgeschichten": "Success Stories",
    "Unsere Arbeit spricht für sich, aber unsere Kunden sagen es noch besser.":
      "Our work speaks for itself, but our clients say it even better.",
    "Vom Logo bis zur Markteinführung haben sie jedes Detail auf den Punkt gebracht.":
      "From logo to market launch, they nailed every detail.",
    "Herr Adhili": "Mr. Adhili",
    "Herr Mohammad": "Mr. Mohammad",
    "Senior Director, europäisches HR und Compliance": "Senior Director, European HR and Compliance",
    "Spectrum Cars Services: Branding, Webentwicklung, Online-Marketing, Videoproduktion Sie gaben unserer Marke eine mutige neue Identität und eine Website, die die Conversions wirklich steigert.":
      "Spectrum Cars Services: Branding, web development, online marketing, video production. They gave our brand a bold new identity and a website that truly drives conversions.",
    "Ich kann Ihnen nicht genug für die Ergebnisse der Kampagne danken.":
      "I can't thank you enough for the campaign results.",

    // ── CTA / Footer ────────────────────────────────────────────────────────
    "Kreative Kraft, die das Geschäft vorantreibt": "Creative force that drives business",
    "Lassen Sie uns Ihre Vision zum Leben erwecken": "Let us bring your vision to life",
    "Bleiben Sie in Verbindung": "Stay Connected",
    "Nehmen Sie Kontakt auf": "Get in Touch",
    "Ob es sich um ein neues Projekt oder eine kurze Frage handelt, wir sind hier, um Kontakte zu knüpfen.":
      "Whether it's a new project or a quick question, we're here to connect.",
    "In Partnerschaft mit RevolutionX.Studio": "In partnership with RevolutionX.Studio",
    "Arbeit, die für sich spricht": "Work that speaks for itself",
    "Competence Labs ist eine Full-Service-Agentur mit Sitz in Frankfurt am Main, Deutschland. Wir liefern integrierte Lösungen für Unternehmen auf der ganzen Welt.":
      "Competence Labs is a full-service agency headquartered in Frankfurt am Main, Germany. We deliver integrated solutions for companies worldwide.",

    // ── Team ────────────────────────────────────────────────────────────────
    "Unser Team": "Our Team",
    "Meet our team": "Meet our team",
    "Eine vielfältige Gruppe von Kreativen, Strategen und Entwicklern, angetrieben von der gemeinsamen Leidenschaft, wirkungsvolle digitale Erlebnisse zu schaffen.":
      "A diverse group of creatives, strategists, and developers, driven by a shared passion for creating impactful digital experiences.",
    "Erfahrene Designer": "Experienced Designers",
    "Erfahrene Entwickler mit": "Experienced Developers with",
    "Kreative Denker": "Creative Thinkers",
    "Liebe zum Detail": "Attention to Detail",
    "und Strategen": "and strategists",
    "konzentriert sich auf die Benutzererfahrung": "focuses on user experience",
    "Mitbegründer und Geschäftsführer": "Co-Founder and Managing Director",
    "Führung": "Leadership",
    "Chief Marketing Officer, der die Marketingstrategie, die Kampagnendurchführung und die kundenorientierte Kommunikation der Agentur überwacht.":
      "Chief Marketing Officer overseeing the agency's marketing strategy, campaign execution, and client-facing communications.",
    "Vinzent Samuel Kirchberger verbindet als Chief Operations Officer operative Effizienz mit einem starken Verständnis für modernes Marketing. Durch klare Prozesse und strukturierte Abläufe sorgt er für eine professionelle und skalierbare Umsetzung von Kundenprojekten.":
      "As Chief Operations Officer, Vinzent Samuel Kirchberger combines operational efficiency with a strong understanding of modern marketing. Through clear processes and structured workflows, he ensures professional and scalable delivery of client projects.",

    // ── Selected work ───────────────────────────────────────────────────────
    "Designstudio": "Design Studio",
    "Zahnklinik": "Dental Clinic",
    "Derma-Firma": "Derma Firm",
    "Facility Management und Reinigung": "Facility Management and Cleaning",
    "Dr.med. dent. Imre Jancsecz Zahnarztpraxis": "Dr.med. dent. Imre Jancsecz Dental Practice",
    "m-Aktas": "m-Aktas",
    "MS-thetik": "MS-thetik",
    "Digital": "Digital",

    // ── About page ──────────────────────────────────────────────────────────
    "Über uns": "About Us",
    "Wer sind wir?": "Who are we?",
    "Kompetenzlabore: Wo Kreativität auf Strategie trifft": "Competence Labs: Where Creativity Meets Strategy",
    "Competence Labs ist eine in Frankfurt ansässige Full-Service-Agentur, die sich auf Talentakquise, digitales Marketing, Markenentwicklung und Beratung zur Organisationskultur spezialisiert hat.":
      "Competence Labs is a Frankfurt-based full-service agency specializing in talent acquisition, digital marketing, brand development, and organizational culture consulting.",
    "Competence Lab ist ein zukunftsorientiertes Studio für digitales Design und Branding, das mutige Lösungen entwickelt, die es Marken ermöglichen, Grenzen zu überschreiten und ihre eigenen Revolutionen voranzutreiben.":
      "Competence Lab is a forward-thinking studio for digital design and branding, developing bold solutions that empower brands to push boundaries and drive their own revolutions.",
    "Competence Labs ist Ihr integrierter, in Frankfurt ansässiger Partner für Organisationswachstum in ganz Europa.":
      "Competence Labs is your integrated, Frankfurt-based partner for organizational growth across Europe.",
    "Ein vielfältiges Kollektiv aus Kulturexperten, Strategen und Entwicklern, das sich dafür einsetzt, die Lücke zwischen leistungsstarker Talentakquise und wirkungsvollen digitalen Erlebnissen zu schließen.":
      "A diverse collective of cultural experts, strategists and developers dedicated to closing the gap between high-performance talent acquisition and impactful digital experiences.",
    "Ihre Ziele, unsere Mission": "Your goals, our mission",
    "Wir bauen Unternehmen auf, indem wir zuerst die richtigen Leute aufbauen.":
      "We build companies by first building the right people.",
    "Wir sind nicht nur ein Team;": "We are not just a team;",
    "Im letzten Jahrzehnt haben wir erfolgreich Kunden aus verschiedenen Branchen betreut, von dynamischen Startups und ambitionierten KMU bis hin zu etablierten Marken, die eine neue Perspektive suchen.":
      "Over the last decade we have successfully served clients from various industries, from dynamic startups and ambitious SMEs to established brands seeking a fresh perspective.",
    "Das Portfolio umfasst Startups, KMU und etablierte Marken": "The portfolio includes startups, SMEs and established brands",
    "Wenn Sie bereit sind, mit uns die Zukunft zu gestalten, könnte Ihre Reise hier beginnen.":
      "If you are ready to shape the future with us, your journey could begin here.",
    "Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen.": "Let's create something extraordinary together.",
    "Warum sollten Sie sich für uns entscheiden?": "Why choose us?",
    "Vollständig integrierte Ausführung": "Fully integrated execution",
    "Kein Outsourcing – alles funktioniert als ein System.": "No outsourcing — everything works as one system.",
    "Jede Entscheidung basiert auf Daten, nicht auf Annahmen.": "Every decision is based on data, not assumptions.",
    "Starke Kundenbeziehungen und Folgegeschäfte": "Strong client relationships and repeat business",
    "Jedes Projekt, das wir übernehmen, ist eine Gelegenheit zu lernen, zu wachsen und etwas zu bewirken.":
      "Every project we take on is an opportunity to learn, grow and make an impact.",
    "Eingespielte Teams sorgen für unaufhaltsame Dynamik.": "Cohesive teams create unstoppable momentum.",
    "Befähigte Teams": "Empowered Teams",
    "Strategie mit Erkenntnissen": "Strategy with insights",
    "Vielfältige, hochkarätige Kreative": "Diverse, high-calibre creatives",
    "Experten für berufliche Entwicklung und inklusive Einstellung": "Experts in professional development and inclusive hiring",
    "Support-Fenster: Ständige Sicht, entwickelt für langfristige Wirkung": "Support window: constant visibility, built for long-term impact",
    "Einzigartige Organisationskulturberatung unter der Leitung eines PSYCH-K-zertifizierten Praktikers, die neurowissenschaftlich fundierte Glaubensänderungen integriert, um eine dauerhafte Verhaltens- und strategische Ausrichtung sicherzustellen.":
      "Unique organizational culture consulting led by a PSYCH-K certified practitioner, integrating neuroscience-backed belief change to ensure lasting behavioral and strategic alignment.",
    "Die Agentur wird von CEO und Gründer Samy Seif geleitet, der über umfassende Fachkenntnisse in den Bereichen Personalbeschaffung, Kulturberatung und digitale Markenstrategie verfügt. Didem fungiert als Chief Marketing Officer (CMO) und überwacht das Marketing und die Kampagnendurchführung der Agentur.":
      "The agency is led by CEO and founder Samy Seif, who has extensive expertise in recruitment, culture consulting and digital brand strategy. Didem serves as Chief Marketing Officer (CMO), overseeing the agency's marketing and campaign execution.",
    "Wir haben Kunden aus allen Branchen erfolgreich betreut": "We have successfully served clients from all industries",

    // ── Services page ───────────────────────────────────────────────────────
    "Unsere Dienstleistungen richten sich an mittlere bis große Unternehmen und richten sich insbesondere an Personalmanager, Talentakquiseleiter und Marketingleiter. Wir sind spezialisiert auf Organisationsberatung und Talentakquise auf höchstem Niveau in Deutschland und Europa.":
      "Our services target medium to large companies, with a particular focus on HR managers, talent acquisition leads and marketing directors. We specialize in organizational consulting and talent acquisition at the highest level in Germany and Europe.",
    "Unsere Lösung: der Competence Labs Way": "Our Solution: The Competence Labs Way",
    "Von der Talentakquise bis hin zu digitalen Kampagnen, Websites und Anwendungen – wir realisieren wirkungsvolle Lösungen, die auf Leistung und Skalierbarkeit ausgelegt sind.":
      "From talent acquisition to digital campaigns, websites and applications — we deliver impactful solutions designed for performance and scalability.",
    "Umfassende Rekrutierungs- und Personaldienstleistungen, einschließlich Festanstellung und Suche nach Führungskräften, für qualifizierte Kandidaten aus allen Branchen.":
      "Comprehensive recruitment and staffing services, including permanent placement and executive search, for qualified candidates across all industries.",
    "Umfassende Talentakquisedienste für Unternehmen, die branchenübergreifend nach qualifizierten Kandidaten suchen.":
      "Comprehensive talent acquisition services for companies seeking qualified candidates across industries.",
    "Umfassendes Branding, maßgeschneiderte Web- und App-Entwicklung sowie strategische Beratung und Sichtbarkeit zur Stärkung Ihrer Marktposition.":
      "Comprehensive branding, tailored web and app development, and strategic consulting and visibility to strengthen your market position.",
    "Umfassendes Social-Media-Marketing und gezieltes Influencer- und Instagram-Marketing zur Förderung von Engagement und Konversion.":
      "Comprehensive social media marketing and targeted influencer and Instagram marketing to drive engagement and conversion.",
    "Beratung zur Entwicklung der Organisationskultur, basierend auf bewährten psychologischen und transformativen Rahmenbedingungen.":
      "Organizational culture development consulting, based on proven psychological and transformational frameworks.",
    "Rekrutierung und Personalbesetzung": "Recruitment and Staffing",
    "Web- und Mobilentwicklung": "Web and Mobile Development",
    "Social-Media-Marketing und -Management": "Social Media Marketing and Management",
    "Wir erstellen aufmerksamkeitsstarke Kampagnen und verwalten Ihre Social-Media-Profile.":
      "We create attention-grabbing campaigns and manage your social media profiles.",
    "Wir erstellen individuelle Websites und mobile Apps mit modernem, responsivem Design.":
      "We build custom websites and mobile apps with modern, responsive design.",
    "Wir führen zielgerichtete Werbekampagnen auf Google, Meta und anderen Plattformen durch.":
      "We run targeted advertising campaigns on Google, Meta and other platforms.",
    "Unsere SEO-Strategien helfen Ihrer Marke, das Suchranking zu verbessern.":
      "Our SEO strategies help your brand improve search rankings.",
    "Wir identifizieren und vermitteln hochkarätige Fachkräfte, die sich nahtlos in Ihr Team integrieren und Ihr Unternehmen voranbringen.":
      "We identify and place top-tier professionals who integrate seamlessly into your team and advance your business.",
    "Wir bieten umfassende Dienstleistungen zur Talentakquise, einschließlich Festanstellung, Vertragsbesetzung und Suche nach Führungskräften für qualifizierte Kandidaten in verschiedenen Branchen.":
      "We offer comprehensive talent acquisition services including permanent placement, contract staffing and executive search for qualified candidates across various industries.",
    "Wir bieten umfassende digitale Dienstleistungen an, darunter individuelles Website-Design und -Entwicklung (Responsive Design, SEO-Optimierung, CMS-Integration) und die Entwicklung mobiler/Webanwendungen, die auf die Geschäftsanforderungen unserer Kunden zugeschnitten sind.":
      "We offer comprehensive digital services including custom website design and development (responsive design, SEO optimization, CMS integration) and the development of mobile/web applications tailored to our clients' business needs.",
    "Wir bieten spezialisierte Dienstleistungen in vier Hauptbereichen an: Talentakquise (Rekrutierung und Personalbesetzung), digitales Marketing (Influencer-, Instagram- und Social-Media-Marketing), Markenentwicklung (Branding, Webdesign und App-Entwicklung) und Beratung zur Organisationskultur.1":
      "We offer specialized services in four main areas: talent acquisition (recruitment and staffing), digital marketing (influencer, Instagram and social media marketing), brand development (branding, web design and app development) and organizational culture consulting.",
    "Vom Gesundheitswesen bis zum Gastgewerbe, von Fintech bis Mode liefern unsere Strategien überall dort Ergebnisse, wo Marken ansässig sind.":
      "From healthcare to hospitality, from fintech to fashion, our strategies deliver results wherever brands operate.",
    "Vom Konzept bis zur Markteinführung setzen wir uns mit schnellen Reaktionszeiten und persönlicher Liebe zum Detail für Ihren Erfolg ein.":
      "From concept to launch, we are committed to your success with fast response times and personal attention to detail.",
    "Willkommen bei den zukünftigen Technologielösungen": "Welcome to Future Technology Solutions",

    // ── Contact / FAQ ───────────────────────────────────────────────────────
    "Wir würden uns freuen, von Ihnen zu hören.": "We'd love to hear from you.",
    "Wir haben alles gehört. Hier finden Sie alles, was Sie wissen müssen, bevor Sie mit uns zusammenarbeiten.":
      "We've heard it all. Here's everything you need to know before working with us.",
    "Wo befindet sich Competence Labs und welche Regionen bedienen Sie?":
      "Where is Competence Labs located and which regions do you serve?",
    "Welches Leistungsspektrum bietet Competence Labs umfassend an?":
      "What range of services does Competence Labs comprehensively offer?",
    "Was unterscheidet Ihre Culture Work-Leistungen von der Standardberatung?":
      "What distinguishes your Culture Work services from standard consulting?",
    "Konzentrieren Sie sich nur auf das Marketing oder bieten Sie auch Web- und App-Entwicklung an?":
      "Do you focus solely on marketing or do you also offer web and app development?",
    "Welche Branchen sind in Ihrem Kundenportfolio vertreten?":
      "Which industries are represented in your client portfolio?",
    "Welche Arten von Rollen übernehmen Sie in der Personalbeschaffung und Personalvermittlung?":
      "What types of roles do you handle in recruitment and staffing?",
    "Wer leitet Competence Labs und über welche Expertise verfügt das Team?":
      "Who leads Competence Labs and what expertise does the team have?",
    "Bieten Sie Unterstützung für zweisprachige Inhalte an?":
      "Do you offer support for bilingual content?",
    "Wir sind ein mittelständisches bis großes Unternehmen. Welche Ihrer Leistungen passen am besten zu uns?":
      "We are a medium to large company. Which of your services best suit us?",
    "Wir haben mit einem vielfältigen Portfolio von Marken aus verschiedenen Branchen zusammengearbeitet, darunter Gesundheitswesen, E-Commerce, Recht, Ästhetik/Schönheit, Lebensmittel und Getränke sowie professionelle Dienstleistungen.":
      "We have worked with a diverse portfolio of brands from various industries, including healthcare, e-commerce, law, aesthetics/beauty, food and beverage, and professional services.",
    "Die Agentur plant, die Fähigkeit zu zweisprachigen Inhalten (Deutsch und Englisch) durch Texterstellung oder Übersetzungsdienste zu bestätigen.1 F: Wie können wir ein Projekt mit Competence Labs beginnen?  Sie können CEO und Gründer Samy Seif direkt telefonisch unter +49 172 9213015 oder über die offizielle Kunden-E-Mail-Adresse (noch zu bestätigen) kontaktieren.":
      "The agency plans to confirm the ability to provide bilingual content (German and English) through copywriting or translation services. Q: How can we start a project with Competence Labs? You can contact CEO and founder Samy Seif directly by phone at +49 172 9213015 or via the official client email address (to be confirmed).",
    "Eine Frage stellen": "Ask a question",
    "Eine Frage stellen": "Ask a question",
    "e are Global": "We are Global",

    // ── Misc / late-found strings ────────────────────────────────────────────
    "Um": "About",
    "Selected work": "Selected work",
    "Point of Contact": "Point of Contact",
    "FAQ": "FAQ",
    "Services": "Services",
    "Unser": "Our",
    "Unsere": "Our",
    "Unsere Erfahrung": "Our Experience",
    "Wir konzipieren eine umfassende Geschäftstransformation, die über die Digitalisierung hinausgeht. Bei Competence Labs integrieren wir Talentakquise, Markenstrategie, digitales Marketing und Kulturentwicklung, um Unternehmen aufzubauen, die anziehen, Leistung erbringen und skalieren. Von der Einstellung der richtigen Leute bis zum Aufbau einer starken Marktpräsenz liefern wir messbare Auswirkungen – nicht nur Sichtbarkeit, sondern echtes Wachstum und dauerhafte Veränderungen.":
      "We design a comprehensive business transformation that goes beyond digitalization. At Competence Labs, we integrate talent acquisition, brand strategy, digital marketing and culture development to build companies that attract, perform and scale. From hiring the right people to building a strong market presence, we deliver measurable impact — not just visibility, but real growth and lasting change.",
    "Als CEO und Founder verantwortet Samy Seif seit über 15 Jahren die operativen und strategischen Bereiche der Personalbeschaffung, Unternehmensführung und Unternehmensberatung. Sein Fokus liegt auf dem Aufbau und der Weiterentwicklung moderner Sales- und Wachstumsstrukturen, die Unternehmen nachhaltig stärken und langfristig erfolgreich positionieren. Durch die Verbindung von datengetriebenem Growth, moderner Sales-Strategie und einem tiefen Verständnis für menschliche Psychologie schafft er messbare Ergebnisse, stärkt langfristige Kunden- und Mitarbeiterbindungen und entwickelt nachhaltige Strukturen für Wachstum, Vertrauen und unternehmerischen Erfolg.":
      "As CEO and Founder, Samy Seif has been responsible for the operational and strategic areas of recruitment, business management and consulting for over 15 years. His focus is on building and developing modern sales and growth structures that sustainably strengthen companies and position them for long-term success. By combining data-driven growth, modern sales strategy and a deep understanding of human psychology, he creates measurable results, strengthens long-term client and employee relationships, and develops sustainable structures for growth, trust and entrepreneurial success.",
    "Unsere SEO-Strategien helfen Ihrer Marke, das Suchranking zu verbessern.":
      "Our SEO strategies help your brand improve search rankings.",
    "Wir sind ein vielfältiges Kollektiv aus Kulturexperten, Strategen und Entwicklern, das sich der Überbrückung der Kluft zwischen leistungsstarker Talentakquise und wirkungsvollen digitalen Erlebnissen widmet.":
      "We are a diverse collective of cultural experts, strategists and developers dedicated to bridging the gap between high-performance talent acquisition and impactful digital experiences.",
    "Didem": "Didem",
  };

  // ── Utilities ──────────────────────────────────────────────────────────────
  const lang = localStorage.getItem('cl-lang') || 'en';

  /**
   * Walk all text nodes under root and replace German matches.
   * Trims surrounding whitespace before lookup so Framer's trailing-space
   * text nodes still match, then re-applies the original whitespace padding.
   */
  function translateNodes(root) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let n;
    while ((n = tw.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const raw = node.textContent;
      const trimmed = raw.trim();
      const en = DE_TO_EN[trimmed];
      if (en !== undefined) {
        // Re-apply any leading/trailing whitespace the original node had
        const leading  = raw.match(/^\s*/)[0];
        const trailing = raw.match(/\s*$/)[0];
        node.textContent = leading + en + trailing;
      }
    }
  }

  // ── Hide Framer built-in locale picker ─────────────────────────────────────
  const hideLocale = document.createElement('style');
  hideLocale.textContent = '.framer-locale-picker { display: none !important; }';
  document.head.appendChild(hideLocale);

  // ── Inject language switcher UI ────────────────────────────────────────────
  function injectSwitcher() {
    if (document.getElementById('cl-lang-switcher')) return;

    const style = document.createElement('style');
    style.textContent = `
      #cl-lang-switcher {
        position: fixed;
        top: 16px;
        right: 20px;
        z-index: 999999;
        font-family: Inter, sans-serif;
      }
      #cl-lang-select {
        appearance: none;
        -webkit-appearance: none;
        background: rgba(0,0,0,0.55);
        border: 1px solid rgba(255,255,255,0.35);
        color: #fff;
        padding: 5px 28px 5px 10px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.05em;
        cursor: pointer;
        border-radius: 6px;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        outline: none;
        transition: border-color 0.2s;
      }
      #cl-lang-select:hover { border-color: rgba(255,255,255,0.7); }
      #cl-lang-select option { background: #1a1a1a; color: #fff; }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.id = 'cl-lang-switcher';

    const select = document.createElement('select');
    select.id = 'cl-lang-select';
    select.setAttribute('aria-label', 'Language');

    const optEN = document.createElement('option');
    optEN.value = 'en';
    optEN.textContent = 'EN';
    if (lang === 'en') optEN.selected = true;

    const optDE = document.createElement('option');
    optDE.value = 'de';
    optDE.textContent = 'DE';
    if (lang === 'de') optDE.selected = true;

    select.appendChild(optEN);
    select.appendChild(optDE);
    wrapper.appendChild(select);
    document.body.appendChild(wrapper);

    select.addEventListener('change', function () {
      localStorage.setItem('cl-lang', this.value);
      location.reload();
    });
  }

  // ── Apply translations (only when lang = 'en') ─────────────────────────────
  function applyTranslations() {
    if (lang !== 'en') return;
    translateNodes(document.body);
  }

  // ── MutationObserver: catch text added by Framer after hydration ───────────
  let observerPaused = false;
  function startObserver() {
    if (lang !== 'en') return;
    const observer = new MutationObserver(function (mutations) {
      if (observerPaused) return;
      let hasText = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
            hasText = true; break;
          }
        }
        if (hasText) break;
      }
      if (!hasText) return;
      observerPaused = true;
      translateNodes(document.body);
      // Resume after a tick so we don't loop
      setTimeout(() => { observerPaused = false; }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ── Run on DOMContentLoaded, then again post-Framer hydration ──────────────
  function init() {
    injectSwitcher();
    applyTranslations();
    // Framer hydrates async — rerun after short delays to catch re-rendered nodes
    setTimeout(applyTranslations, 200);
    setTimeout(applyTranslations, 600);
    setTimeout(applyTranslations, 1500);
    setTimeout(applyTranslations, 3000);
    // MutationObserver for anything rendered after all timeouts
    setTimeout(startObserver, 3500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
