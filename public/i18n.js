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
    // Pre-existing duplicate-letter bug in the English source content for the
    // footer "We are Global" heading (split <a>W</a> + sibling text node).
    "WWe are Global": "We are Global",
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
    "Führung": "Leaders",
    "Chief Marketing Officer, der die Marketingstrategie, die Kampagnendurchführung und die kundenorientierte Kommunikation der Agentur überwacht.":
      "Chief Marketing Officer overseeing the agency's marketing strategy, campaign execution, and client-facing communications.",
    "Vinzent Samuel Kirchberger verbindet als Chief Operations Officer operative Effizienz mit einem starken Verständnis für modernes Marketing. Durch klare Prozesse und strukturierte Abläufe sorgt er für eine professionelle und skalierbare Umsetzung von Kundenprojekten.":
      "As Chief Operations Officer, Vinzent Samuel Kirchberger combines operational efficiency with a strong understanding of modern marketing. Through clear processes and structured workflows, he ensures professional and scalable delivery of client projects.",

    // ── Selected work ───────────────────────────────────────────────────────
    "Designstudio": "Design Studio",
    "Zahnklinik": "Kids brand",
    "Derma-Firma": "Cosmetics company",
    "Facility Management und Reinigung": "Facility Management and Cleaning",
    "Dr.med. dent. Imre Jancsecz Zahnarztpraxis": "Maniya Kids",
    "m-Aktas": "m-Aktas",
    "MS-thetik": "Kamira",
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
    "Unternehmen transformieren": "Transform Companies",
    "Leistungen": "Services",
    "Kulturarbeit": "Culture Work",
    "Marketingstrategien": "Marketing Strategies",
    "Für Sichtbarkeit und Wachstum": "For Visibility and Growth",
    "Verändern Sie, wie Ihre Mitarbeiter denken und Höchstleistungen erbringen":
      "Transform how your people think & perform",
    "Suchmaschinenoptimierung (SEO)": "Search Engine Optimization (SEO)",
    "Bezahlte Werbung": "Paid Advertising",
    "Verfahren": "Process",
    "Talent-First-Ansatz": "Talent-First Approach",
    "Kulturgetriebenes Wachstum": "Culture-Driven Growth",
    "Kulturorientierte Teambildung": "Culture-oriented team building",
    "Partnerorientiert": "Partner-oriented",
    "WACHSTUM IN BEWEGUNG": "GROWTH IN MOTION",
    "Die Zahlen hinter unseren Strategien sagen mehr als Worte.":
      "The numbers behind our strategies speak louder than words.",
    "Was uns antreibt": "What drives us",
    "Der Mensch zuerst": "People first",
    "Strategische Beschaffung": "Strategic Sourcing",
    "Kulturorientiert": "Culture-oriented",

    // ── Contact / FAQ ───────────────────────────────────────────────────────
    "Lass uns reden": "Let's talk",
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

  // ── English strings hardcoded into the (German) source content ─────────────
  // A handful of text layers were authored in English and never localized —
  // some live directly in the page HTML, others are baked into compiled
  // Framer chunks as static fallback values, so they show up in both
  // languages unless we translate them back to German on the 'de' pass.
  const EN_TO_DE = {
    "Move your mouse across the Screen":
      "Bewegen Sie Ihre Maus über den Bildschirm",
    "Marketing campaigns": "Marketingkampagnen",
    "Our Culture Work services are grounded in proven psychological and transformational frameworks. We integrate various workshops to help organizations align subconscious beliefs with strategic goals for lasting cultural change":
      "Unsere Culture-Work-Leistungen basieren auf bewährten psychologischen und transformativen Rahmenwerken. Wir integrieren verschiedene Workshops, die Organisationen dabei helfen, unbewusste Überzeugungen mit strategischen Zielen in Einklang zu bringen, um einen nachhaltigen kulturellen Wandel zu erreichen",
    "Our team and what we believe in": "Unser Team und woran wir glauben",
    "25+ years of collective experience in design and marketing":
      "25+ Jahre gemeinsame Erfahrung in Design und Marketing",
    "We needed a full rebranding, and this agency delivered beyond our expectations. From the new logo to the website design, everything feels cohesive and professional.":
      "Wir brauchten ein komplettes Rebranding, und diese Agentur hat unsere Erwartungen übertroffen. Vom neuen Logo bis zum Website-Design wirkt alles stimmig und professionell.",
    "Working with this team was a pleasure! Our sales increased by 30% in the first month. Thank you for the amazing job!":
      "Die Zusammenarbeit mit diesem Team war eine Freude! Unser Umsatz stieg im ersten Monat um 30 %. Vielen Dank für die großartige Arbeit!",
    "Contact Us": "Kontakt aufnehmen",
    "Contact us": "Kontaktieren Sie uns",
    "Point of Contact": "Ansprechpartner",
    "Branding & Design": "Branding und Design",
    "We are in talks to bring a great CMO. Will update you people soon":
      "Wir sind im Gespräch, um eine großartige CMO zu gewinnen. Wir halten Sie auf dem Laufenden.",
    "We develop comprehensive brand identities, including logo design, visual language, messaging architecture, and brand guidelines, for both new and rebranding clients.":
      "Wir entwickeln umfassende Markenidentitäten – einschließlich Logodesign, visueller Sprache, Botschaftsarchitektur und Markenrichtlinien – für neue Kunden und für Kunden im Rebranding-Prozess.",

    // ── Selected work renames (apply regardless of language) ─────────────────
    "MS-thetik": "Kamira",
    "Derma-Firma": "Cosmetics company",
    "Dr.med. dent. Imre Jancsecz Zahnarztpraxis": "Maniya Kids",
    "Zahnklinik": "Kids brand",

    // ── "WACHSTUM IN BEWEGUNG" award/stat cards (services page) ───────────────
    "2.5x ROAS": "2,5x ROAS",
    "Paid Media ROI": "ROI bezahlter Medien",
    "3M+ Impressions": "3 Mio.+ Impressionen",
    "Reach & Visibility": "Reichweite & Sichtbarkeit",
    "85% Repeat Rate": "85 % Wiederholungsrate",
    "Retention & Relationships": "Kundenbindung & Beziehungen",
    "Engagement Performance": "Engagement-Leistung",

    // ── Footer ─────────────────────────────────────────────────────────────
    "We are Global": "Wir sind global",

    // ── Homepage eyebrow labels / CTA ──────────────────────────────────────
    "Selected work": "Ausgewählte Arbeiten",
    "Services": "Dienstleistungen",
    "Meet our team": "Unser Team kennenlernen",

    // ── Contact form (homepage CTA + /contact) ────────────────────────────
    "Get in touch": "Nehmen Sie Kontakt auf",

    // ── services.html testimonials (English fallback for layers that show
    //    correct German on the homepage's equivalent cards) ───────────────
    "Our work speaks for itself, but our clients say it even better.":
      "Unsere Arbeit spricht für sich, aber unsere Kunden sagen es noch besser.",
    "They helped us shape our brand identity from scratch, giving us a website that perfectly reflects our values.":
      "Vom Logo bis zur Markteinführung haben sie jedes Detail auf den Punkt gebracht.",

    // ── /contact page ──────────────────────────────────────────────────────
    "Fill out the form below or reach out via email we’ll get back to you as soon as possible. Let’s create something great together.":
      "Füllen Sie das Formular unten aus oder schreiben Sie uns eine E-Mail – wir melden uns so schnell wie möglich bei Ihnen. Lassen Sie uns gemeinsam etwas Großartiges erschaffen.",
    "We’ve heard it all. Here’s everything you need to know before working with us.":
      "Wir haben alles gehört. Hier finden Sie alles, was Sie wissen müssen, bevor Sie mit uns zusammenarbeiten.",

    // ── /404 page ───────────────────────────────────────────────────────────
    "The page you are looking for could not be found":
      "Die gesuchte Seite konnte nicht gefunden werden",
    "Back to Homepage": "Zurück zur Startseite",
  };

  // ── Form placeholder text (English source, only swapped for lang='de') ───
  const PLACEHOLDER_DE = {
    "E-mail *": "E-Mail *",
    "Phone": "Telefon",
    "Message (Tell us about your project)": "Nachricht (Erzählen Sie uns von Ihrem Projekt)",
  };

  // ── Utilities ──────────────────────────────────────────────────────────────
  const lang = localStorage.getItem('cl-lang') || 'en';

  /**
   * Some Framer headings split each letter into its own <span> for a
   * scroll-reveal animation (e.g. "Unsere" / "Leistungen"). translateNodes
   * can't match those — each text node is a single character — so detect
   * the whole-word span groups, look up the combined word, and collapse
   * them to a plain text node with the translation.
   */
  function translateLetterSpanHeadings(root, dict) {
    root.querySelectorAll('span').forEach(function (el) {
      const kids = el.children;
      if (kids.length < 2) return;
      for (let i = 0; i < kids.length; i++) {
        const k = kids[i];
        if (k.tagName !== 'SPAN' || k.children.length > 0 || k.textContent.length > 2) return;
      }
      const combined = el.textContent;
      const translated = dict[combined.trim()];
      if (translated !== undefined) {
        el.textContent = translated;
      }
    });
  }

  /**
   * Walk all text nodes under root and replace matches from the given dict
   * (DE_TO_EN for the 'en' pass, EN_TO_DE for the 'de' pass — same machinery,
   * opposite direction). Trims surrounding whitespace before lookup so
   * Framer's trailing-space text nodes still match, then re-applies the
   * original whitespace padding.
   */
  function translateNodes(root, dict) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let n;
    while ((n = tw.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const raw = node.textContent;
      const trimmed = raw.trim();
      const translated = dict[trimmed];
      if (translated !== undefined) {
        // Re-apply any leading/trailing whitespace the original node had
        const leading  = raw.match(/^\s*/)[0];
        const trailing = raw.match(/\s*$/)[0];
        node.textContent = leading + translated + trailing;
      }
    }
  }

  /**
   * The footer "We are Global" heading is split by Framer into a one-letter
   * <a class="framer-text framer-styles-preset-bq16ho"> ("W") followed by a
   * sibling text node ("e are Global") — translateNodes only ever sees the
   * "e are Global" half, so the dict lookup for the full phrase never hits.
   * Recombine the two, look up the whole phrase, then split the translation
   * back across the same two nodes (only when the translation still starts
   * with the same first character, so the link element keeps its content).
   */
  function translateSplitFirstLetter(root, dict) {
    root.querySelectorAll('a.framer-styles-preset-bq16ho').forEach(function (a) {
      if (a.children.length > 0 || a.textContent.length !== 1) return;
      const next = a.nextSibling;
      if (!next || next.nodeType !== Node.TEXT_NODE) return;
      const combined = a.textContent + next.textContent;
      const translated = dict[combined.trim()];
      if (translated && translated[0] === a.textContent) {
        const trailing = next.textContent.match(/\s*$/)[0];
        next.textContent = translated.slice(1) + trailing;
      }
    });
  }

  /**
   * Footer "About" link: in the German source content this layer's text is
   * the bare word "Um" — a leftover translation slip in the Framer project
   * itself, not an English fallback our dicts can catch. "Um" is far too
   * common a German word to safely rewrite via translateNodes, so relabel
   * just this one link (identified by its href) to "Über".
   */
  function fixFooterAboutLink(root) {
    if (lang !== 'de') return;
    root.querySelectorAll('a.framer-styles-preset-bq16ho[href$="/about"]').forEach(function (a) {
      if (a.textContent.trim() === 'Um') a.textContent = 'Über';
    });
  }

  /**
   * Contact-form placeholders ("E-mail *", "Phone", etc.) live in the
   * `placeholder` attribute, which translateNodes' text-node walk never
   * touches — translate them separately for the 'de' pass.
   */
  function translatePlaceholders(root) {
    if (lang !== 'de') return;
    root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      const translated = PLACEHOLDER_DE[el.placeholder];
      if (translated !== undefined) el.placeholder = translated;
    });
  }

  // ── Hide Framer built-in locale picker ─────────────────────────────────────
  const hideLocale = document.createElement('style');
  hideLocale.textContent = '.framer-locale-picker { display: none !important; }';
  document.head.appendChild(hideLocale);

  // ── Re-center the Kamira portfolio image ────────────────────────────────────
  // Framer's compiled bundle hardcodes object-position on this image, re-applying
  // it on every hydration pass — an !important rule is the only override that sticks.
  const kamiraImageFix = document.createElement('style');
  kamiraImageFix.textContent = 'img[src="/assets/images/portfolio-8.png"] { object-position: center !important; }';
  document.head.appendChild(kamiraImageFix);

  // ── Build the switcher DOM element ────────────────────────────────────────
  function buildSwitcher() {
    const style = document.createElement('style');
    style.textContent = `
      #cl-lang-switcher {
        position: fixed;
        display: inline-flex;
        align-items: center;
        z-index: 999999;
        font-family: Inter, sans-serif;
      }
      #cl-lang-select {
        appearance: none;
        -webkit-appearance: none;
        padding: 5px 26px 5px 10px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        cursor: pointer;
        /* Match the pill-shaped wrapper's radius and leave bordering to it —
           the wrapper (#cl-lang-switcher, styled in inject-custom.js) already
           draws the outline; giving the select its own border too produced a
           doubled "outline within an outline" look. */
        border-radius: 20px;
        border: none;
        background-repeat: no-repeat;
        background-position: right 7px center;
        outline: none;
        transition: background-color 0.2s, color 0.2s;
        white-space: nowrap;
        /* Sensible defaults for pages where MENU can't be located to sample
           a theme from (e.g. minimal placeholder pages with no header) —
           dark-on-translucent matches the majority of this site's sections.
           themeSwitcher() overrides these once a header is found. */
        color: #fff;
        background-color: rgba(255,255,255,0.06);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      #cl-lang-select option { background: #1a1a1a; color: #fff; }

      /* Mobile (≤809px, this site's "Phone" breakpoint): the switcher can't
         sit beside MENU without overlapping the logo at that width, so it
         floats as its own pill in the bottom-right corner instead. Needs a
         solid background + shadow (rather than the translucent, header-themed
         look used beside MENU) since it now sits over arbitrary page content
         that scrolls beneath it, not a fixed header. */
      #cl-lang-switcher.cl-floating #cl-lang-select {
        color: #fff !important;
        background-color: rgba(22,22,22,0.9) !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") !important;
        box-shadow: 0 6px 20px rgba(0,0,0,0.28);
        padding: 9px 30px 9px 14px;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.id = 'cl-lang-switcher';

    const select = document.createElement('select');
    select.id = 'cl-lang-select';
    select.setAttribute('aria-label', 'Language');

    const optEN = document.createElement('option');
    optEN.value = 'en';
    optEN.textContent = 'English';
    if (lang === 'en') optEN.selected = true;

    const optDE = document.createElement('option');
    optDE.value = 'de';
    optDE.textContent = 'German';
    if (lang === 'de') optDE.selected = true;

    select.appendChild(optEN);
    select.appendChild(optDE);
    wrapper.appendChild(select);

    select.addEventListener('change', function () {
      localStorage.setItem('cl-lang', this.value);
      location.reload();
    });

    return wrapper;
  }

  // ── Theme the switcher to match the header it's sitting next to ────────────
  // Some pages (e.g. Contact) have a light/white header, others (Home) have a
  // dark hero. We sample MENU's live text colour and derive a matching
  // light-on-dark or dark-on-light style so the switcher is always legible —
  // a hardcoded white-on-transparent style disappears on white headers.
  const CHEVRON_LIGHT = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")";
  const CHEVRON_DARK  = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23161616' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")";

  function themeSwitcher(select, menuEl) {
    if (!menuEl) return;
    const computed = window.getComputedStyle(menuEl).color; // e.g. "rgb(255, 255, 255)"
    const nums = computed.match(/[\d.]+/g);
    if (!nums || nums.length < 3) return;
    const [r, g, b] = nums.map(Number);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const isLightHeader = luminance < 128; // dark MENU text → light header background

    if (isLightHeader) {
      select.style.color           = '#161616';
      select.style.backgroundColor = 'rgba(0,0,0,0.04)';
      select.style.backgroundImage = CHEVRON_DARK;
    } else {
      select.style.color           = '#fff';
      select.style.backgroundColor = 'rgba(255,255,255,0.06)';
      select.style.backgroundImage = CHEVRON_LIGHT;
    }
  }

  // ── Inject language switcher beside the MENU button ────────────────────────
  // Always appends to document.body as position:fixed — never modifies Framer's
  // DOM tree (which would trigger unintended re-renders / flyouts).
  // Position is computed from MENU's live getBoundingClientRect().
  function injectSwitcher() {
    if (document.getElementById('cl-lang-switcher')) return;
    const wrapper = buildSwitcher();
    const select  = wrapper.querySelector('#cl-lang-select');
    document.body.appendChild(wrapper);
    // Stay invisible until we've computed a real position beside MENU — a
    // freshly-appended `position:fixed` element with no top/right yet would
    // otherwise flash at its static (end-of-body) layout spot for a frame.
    wrapper.style.visibility = 'hidden';

    // ── Track MENU's live position and mirror it ────────────────────────────
    // Framer's header uses `position: relative` (it scrolls away with the
    // page rather than staying sticky), so a one-time placement would drift
    // out of alignment as the user scrolls — this needs continuous tracking.
    // The standard way to do that is `window.addEventListener('scroll', ...)`
    // — but THIS SITE RUNS LENIS (`<html class="lenis ...">`, a virtual/
    // smooth-scroll library), and instrumenting window/document/body confirms
    // it dispatches ZERO native `scroll` events while the page visibly
    // scrolls. That listener was therefore silently dead code: it never
    // fired, so the switcher froze at its last computed viewport position
    // while MENU scrolled away beneath it — precisely the "floating
    // disconnected from the logo/menu, stuck in the middle of the page"
    // symptom being reported.
    //
    // Fix: drive tracking from requestAnimationFrame instead. rAF fires every
    // rendered frame no matter *what* moved the page — native scroll, Lenis,
    // a programmatic `scrollTo`, a resize, anything — so the switcher can
    // never drift more than one frame out of sync. Kept cheap by caching the
    // found button (no DOM re-querying in the hot loop) and only writing to
    // styles when the computed position actually changed.

    function findMenu() {
      const textEl = [...document.querySelectorAll('*')]
        .find(e => e.children.length === 0 && e.textContent.trim() === 'MENU');

      // The bare "MENU" text node sits inside a padded button whose clickable
      // hit-area is wider than the text alone (room for an icon + padding to
      // its left). Positioning relative to the text made the switcher overlap
      // part of that wider hit-area — climb up through cursor:pointer
      // ancestors to find the actual button container and sit beside *it*.
      let btn = textEl;
      if (textEl) {
        let el = textEl;
        while (el.parentElement && getComputedStyle(el.parentElement).cursor === 'pointer') {
          el = el.parentElement;
        }
        btn = el;
      }
      return { textEl: textEl, btn: btn };
    }

    let menu = findMenu();
    let lastPositionKey = '';

    // This site's own Framer breakpoint cutoff for "Phone" layout — see the
    // mediaQuery values baked into the page's data-framer-hydrate-v2 JSON
    // ("(max-width: 809.98px)" / "(min-width: 810px)..."). Below it, MENU
    // sits close enough to the logo that a beside-MENU switcher overlaps the
    // logo text — so on phones it floats bottom-right instead.
    const MOBILE_MAX_WIDTH = 809;

    function applyFloatingPosition() {
      if (!wrapper.classList.contains('cl-floating')) {
        wrapper.classList.add('cl-floating');
        // Clear desktop-mode placement so it doesn't fight the floating spot
        wrapper.style.top  = 'auto';
        wrapper.style.left = 'auto';
      }
      wrapper.style.right    = '20px';
      wrapper.style.bottom   = 'calc(20px + env(safe-area-inset-bottom, 0px))';
      wrapper.style.visibility = 'visible';
    }

    function applyPosition() {
      if (window.innerWidth <= MOBILE_MAX_WIDTH) {
        applyFloatingPosition();
        return;
      }
      if (wrapper.classList.contains('cl-floating')) {
        // Crossed back over the breakpoint (resize/rotation) — drop the
        // floating styles so the beside-MENU placement below takes over clean.
        wrapper.classList.remove('cl-floating');
        wrapper.style.bottom = 'auto';
        lastPositionKey = '';
      }

      const r = menu.btn ? menu.btn.getBoundingClientRect() : null;
      // `> 1` rather than `> 0` on purpose: this site plays an intro/splash
      // animation and Framer fades/scales the header in on top of that — a
      // button mid entrance-animation can report a 1px sliver rather than a
      // clean zero. Either way it's "not a real anchor yet".
      const ready = r && r.width > 1 && r.height > 1 && window.innerWidth > 100;

      if (!ready) {
        // MENU isn't laid out yet — still hydrating, mid entrance-animation,
        // or (at some breakpoint/locale) rendered icon-only without the
        // literal text "MENU". Stay hidden and let the search loop below keep
        // looking, rather than jumping to a hardcoded corner: a switcher
        // sitting at a fixed spot disconnected from the real button is
        // exactly the bug this replaces.
        if (wrapper.style.visibility !== 'hidden') wrapper.style.visibility = 'hidden';
        return;
      }

      // Skip redundant style writes when nothing has actually moved since the
      // last frame — keeps an idle page's rAF loop a cheap no-op past here.
      const key = r.top + '|' + r.left + '|' + r.height + '|' + window.innerWidth + '|' + window.innerHeight;
      if (key !== lastPositionKey) {
        lastPositionKey = key;
        // Place switcher just to the LEFT of the menu button, vertically centred with it
        const wh = wrapper.offsetHeight || 30;
        wrapper.style.top   = Math.round(r.top + (r.height - wh) / 2) + 'px';
        wrapper.style.right = Math.round(window.innerWidth - r.left + 12) + 'px';
        // Hide while MENU is scrolled out of the viewport so the switcher
        // doesn't appear to float disconnected from it.
        const offscreen = r.bottom < 0 || r.top > window.innerHeight;
        wrapper.style.visibility = offscreen ? 'hidden' : 'visible';
      }
      // Re-sample MENU's colour every frame too — some headers change colour
      // per section as the page scrolls past them, and (per above) there's no
      // `scroll` event to tell us when that happens here. themeSwitcher only
      // writes styles when the derived theme actually differs, so this is a
      // cheap no-op on the frames where nothing changed.
      themeSwitcher(select, menu.textEl);
    }

    // Runs for the life of the page: continuously mirrors MENU's position.
    (function trackLoop() {
      applyPosition();
      requestAnimationFrame(trackLoop);
    })();

    // Belt-and-suspenders for rAF: browsers fully suspend
    // requestAnimationFrame in backgrounded/hidden tabs (verified — zero
    // callbacks fire while `document.hidden` is true), so if the visitor
    // alt-tabs away mid-scroll and back, the tracker would otherwise sit
    // frozen at a stale position until the next frame *after* the tab
    // regains visibility. `setInterval` keeps running (throttled, but it
    // runs) even while hidden, so this guarantees `applyPosition` re-syncs
    // shortly after the tab becomes visible again — and costs nothing extra
    // while rAF is already keeping things in sync (the dedupe in
    // applyPosition makes a redundant call a same-frame no-op).
    setInterval(applyPosition, 200);

    // Re-locate MENU in the DOM periodically — NOT every frame, that would be
    // a full `querySelectorAll('*')` walk of the page 60x/sec. This catches
    // what the cached reference can't: MENU not present yet at injection time
    // (Framer renders it async), Framer re-rendering the header during
    // hydration, or a locale switch swapping the element outright. Quick at
    // first — covering hydration/intro-animation timing (this used to be a
    // fixed 0/500/1500ms schedule that could all land before MENU was ready
    // and stick the switcher in a hardcoded fallback corner forever) — then
    // settles into a light steady-state cadence.
    let searchAttempts = 0;
    (function searchLoop() {
      menu = findMenu();
      searchAttempts++;
      setTimeout(searchLoop, searchAttempts < 20 ? 250 : 2000);
    })();

    // Native listeners too, in case Lenis is ever removed from the site —
    // then these fire immediately rather than waiting for the next animation
    // frame (which, in practice, is ≤ ~16ms later, so this is mostly just
    // future-proofing rather than something we depend on today).
    window.addEventListener('scroll', applyPosition, { passive: true });
    window.addEventListener('resize', function () { menu = findMenu(); applyPosition(); });
  }

  // ── Apply translations: DE → EN when lang='en', EN → DE cleanup when lang='de'
  function currentDict() {
    if (lang === 'en') return DE_TO_EN;
    if (lang === 'de') return EN_TO_DE;
    return null;
  }

  function applyTranslations() {
    const dict = currentDict();
    if (!dict) return;
    translateNodes(document.body, dict);
    translateLetterSpanHeadings(document.body, dict);
    translateSplitFirstLetter(document.body, dict);
    fixFooterAboutLink(document.body);
    translatePlaceholders(document.body);
  }

  // ── MutationObserver: catch text added by Framer after hydration ───────────
  let observerPaused = false;
  function startObserver() {
    const dict = currentDict();
    if (!dict) return;
    const observer = new MutationObserver(function (mutations) {
      if (observerPaused) return;
      let hasText = false;
      for (const m of mutations) {
        // Framer's hover/active-state transitions (e.g. the homepage services
        // ticker) overwrite an existing text node's data in place rather than
        // swapping in new nodes — childList alone misses these.
        if (m.type === 'characterData') { hasText = true; break; }
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
            hasText = true; break;
          }
        }
        if (hasText) break;
      }
      if (!hasText) return;
      observerPaused = true;
      translateNodes(document.body, dict);
      translateSplitFirstLetter(document.body, dict);
      fixFooterAboutLink(document.body);
      translatePlaceholders(document.body);
      // Resume after a tick so we don't loop
      setTimeout(() => { observerPaused = false; }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  // ── Run on DOMContentLoaded, then again post-Framer hydration ──────────────
  function init() {
    applyTranslations();

    // Framer hydrates async — rerun translations after short delays.
    // Some components (e.g. the rotating hero caption) mount as late as
    // ~3.3s, right at the edge of the old final pass, so extend coverage
    // a bit further out to reliably catch them too.
    setTimeout(applyTranslations, 200);
    setTimeout(applyTranslations, 600);
    setTimeout(applyTranslations, 1500);
    setTimeout(applyTranslations, 3000);
    setTimeout(applyTranslations, 4000);
    setTimeout(applyTranslations, 5500);

    // Switcher injection: retry until MENU is in the DOM (Framer renders it async)
    let switcherAttempts = 0;
    function trySwitcher() {
      const menuText = [...document.querySelectorAll('*')]
        .find(e => e.children.length === 0 && e.textContent.trim() === 'MENU');
      if (menuText || switcherAttempts >= 20) {
        injectSwitcher();
      } else {
        switcherAttempts++;
        setTimeout(trySwitcher, 150);
      }
    }
    trySwitcher();

    // Start observing immediately rather than after the fixed-delay passes —
    // some Framer components (e.g. the rotating hero caption) mount at a
    // variable time that can land in the gap between the last scheduled
    // applyTranslations() and a late observer start, permanently missing
    // the translation. observerPaused already guards against feedback loops
    // from our own writes, so an early start is safe.
    startObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
