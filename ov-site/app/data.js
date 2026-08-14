export const PORTFOLIO_DATA = {
  fr: {
    name: "OV",
    role: "Développeur freelance & expert en vibe coding",
    location: "",
    title: ["Expert", "en vibe coding"],
    titleIt: "en vibe coding",
    sub: "J'orchestre des IA. Je livre des produits. Seul, je pilote une flotte d'agents IA et d'outils pour concevoir, construire et publier des applications complètes, du prototype aux stores.",
    metrics: ["Automatisation", "Applications mobiles", "Sites internet", "Image & vidéo IA", "Accompagnement", "Formation"],
    ctaTitle: "Une idée en tête ?",
    cta1: "Démarrer un projet",
    cta2: "Discuter de votre projet",
    contactForm: {
      heading: "Lancez votre projet",
      intro: "Décrivez votre besoin, je reviens vers vous rapidement.",
      headingTalk: "Échangeons",
      introTalk: "Une question, une idée ? Écrivez-moi, je vous réponds au plus vite.",
      typeLabel: "Votre besoin",
      types: ["Site internet", "Application mobile", "Automatisation", "Accompagnement", "Formation", "Autre"],
      projectLabel: "Nom du projet (optionnel)",
      projectPlaceholder: "Si vous en avez déjà un",
      budgetLabel: "Budget indicatif (optionnel)",
      budgetPlaceholder: "Non précisé",
      budgets: ["À définir", "Moins de 1 000 €", "1 000 à 5 000 €", "5 000 à 15 000 €", "Plus de 15 000 €"],
      nameLabel: "Nom",
      namePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "vous@exemple.com",
      messageLabel: "Votre message",
      messagePlaceholder: "Parlez-moi de votre projet, vos objectifs, vos délais…",
      submit: "Envoyer",
      sending: "Envoi…",
      success: "Message envoyé. Je reviens vers vous rapidement.",
      error: "Envoi impossible pour le moment. Écrivez-moi à contact@ovlabs.fr.",
      required: "Merci de remplir les champs obligatoires.",
      close: "Fermer",
      socialsLabel: "Ou retrouvez-moi sur"
    },
    nav: { home: "Accueil", work: "Projets", services: "Services", contact: "Contact" },
    reviewsCluster: { count: 32, rating: "4.9", label: "sur 32 avis clients" },
    trustLabel: "Mes réalisations",
    services: {
      tag: "Services",
      title: ["Ce que je", "construis."],
      titleIt: "construis.",
      items: [
        { num: "01", title: "Automatisation", text: "J'automatise vos tâches répétitives avec l'IA et des scripts sur-mesure : traitement de données, agents, intégrations.", tags: ["IA", "Agents", "Scripts"] },
        { num: "02", title: "Applications mobiles", text: "Des apps iOS et Android, du prototype à la publication sur l'App Store et Google Play.", tags: ["iOS", "Android", "Stores"] },
        { num: "03", title: "Sites internet", text: "Sites vitrines et applications web modernes, rapides et sur-mesure. Design soigné et performance.", tags: ["Next.js", "Web", "Design"] },
        { num: "04", title: "Image & vidéo IA", text: "Génération d'images et de vidéos par IA : visuels de marque, illustrations, contenus courts. Du prompt au rendu final.", tags: ["Image", "Vidéo", "Prompt"] },
        { num: "05", title: "Accompagnement", text: "Conseil et suivi technique : cadrage du projet, choix de la stack, mise en production. Je vous guide à chaque étape.", tags: ["Conseil", "Stack", "Suivi"] },
        { num: "06", title: "Formation", text: "Je vous apprends à construire avec l'IA : vibe coding, orchestration d'outils, bonnes pratiques. Individuel ou en équipe.", tags: ["Vibe coding", "IA", "1:1"] }
      ]
    },
    projects: {
      tag: "Projets",
      title: ["Mes derniers", "projets."],
      titleIt: "projets.",
      items: [
        { year: "2025", type: "Messagerie chiffrée", title: "OV Message", desc: "Messagerie chiffrée de bout en bout, 100% hors ligne par SMS. Chiffrement post-quantique.", tags: ["iOS", "Android", "Chiffrement"], href: "/ov-message", image: "/ovm/feature.jpg" },
        { year: "2026", type: "Jeu mobile", title: "OV Jungle", desc: "Jeu de cartes multijoueur en temps réel, où deux à quatre joueurs s'affrontent en ligne.", tags: ["React Native", "Node", "Temps réel"], href: "/ov-jungle", image: "/ovj/icon.png" },
        { year: "2026", type: "Studio vidéo IA", title: "OV Lab IA", desc: "Chaîne de cours vidéo sur l'IA au niveau praticien, produits par un studio automatisé : voix, montage et sous-titres générés.", tags: ["Python", "FFmpeg", "TTS IA"], href: "/ov-lab", image: "/ovlab/banner.jpg" },
        { year: "2026", type: "Robotique & IA", title: "Reachy Mini", desc: "Robot de bureau open source transformé en assistant vocal : il tient une conversation en français et déclenche de vraies actions sur l'ordinateur.", tags: ["Python", "Voix", "SDK"], href: "/reachy", image: "/reachy/reachy.jpg" }
      ]
    },
    experience: {
      tag: "Parcours",
      title: ["Du copier-coller", "à l'orchestration."],
      titleIt: "à l'orchestration.",
      items: [
        { date: "Aujourd'hui", role: "Claude Code", co: "Mon outil principal", desc: "Je pilote des agents IA de bout en bout, du prototype à la publication sur les stores. C'est avec Claude Code que je construis au quotidien." },
        { date: "2026", role: "opencode", co: "En complément", desc: "Depuis quelques mois, opencode complète Claude Code : un agent open source qui fonctionne avec presque tous les modèles (GPT, Gemini, DeepSeek et les autres)." },
        { date: "2025", role: "Cursor", co: "Un an pour comprendre", desc: "Pendant environ un an, Cursor me fait vraiment entrer dans le code. Je commence à comprendre ce que je construis." },
        { date: "2024", role: "Les débuts", co: "ChatGPT 3.5 & DeepSeek", desc: "Au départ, du copier-coller avec ChatGPT 3.5 et les premières versions de DeepSeek, sans comprendre une ligne. Tout est parti de là." }
      ]
    },
    skills: {
      tag: "Compétences",
      title: ["Outils et", "IA."],
      titleIt: "IA.",
      sub: ""
    },
    cta: {
      tag: "Prêt à démarrer ?",
      title: ["Donnons vie à", "votre projet."],
      titleIt: "votre projet.",
      sub: "Disponible dès maintenant.",
      btn: "Télécharger mon CV"
    },
    projectVisual: "visuel projet",
    // Footer d'ovlabs.fr, transposé. Structure et textes repris AU MOT PRÈS du
    // footer des pages statiques (cf. ov-message.html), pas réinventés :
    // un copyright et trois cartes légales.
    // Les `icon` correspondent aux fa-user-shield / fa-file-contract /
    // fa-balance-scale d'origine, redessinés dans Icons.jsx.
    footer: {
      copyright: "© 2026   OV. Tous droits réservés.",
      legalCards: [
        {
          icon: "shield",
          title: "Confidentialité OV Message",
          lines: ["Protection de vos données personnelles"],
          href: "/confidentialite.html",
          cta: "En savoir plus"
        },
        {
          icon: "shield",
          title: "Confidentialité OV Jungle",
          lines: ["Le jeu et vos données"],
          href: "/ov-jungle-confidentialite.html",
          cta: "En savoir plus"
        },
        {
          icon: "contract",
          title: "Conditions OV Message",
          lines: ["Modalités d'utilisation d'OV Message"],
          href: "/conditions.html",
          cta: "En savoir plus"
        },
        {
          icon: "contract",
          title: "Conditions OV Jungle",
          lines: ["Modalités d'utilisation d'OV Jungle"],
          href: "/ov-jungle-conditions.html",
          cta: "En savoir plus"
        },
        {
          icon: "shield",
          title: "Assistance OV Jungle",
          lines: ["Nous contacter, signaler un joueur", "Compte, OV Coins, problèmes techniques"],
          href: "/ov-jungle-assistance.html",
          cta: "En savoir plus"
        },
        {
          icon: "scale",
          title: "Mentions légales",
          lines: ["Informations juridiques", "Éditeur et hébergement du site"],
          href: "/mentions-legales.html",
          cta: "En savoir plus"
        }
      ]
    }
  },
  en: {
    name: "OV",
    role: "Freelance developer & vibe coding expert",
    location: "",
    title: ["Vibe coding", "expert"],
    titleIt: "expert",
    sub: "I orchestrate AI. I ship products. Solo, I drive a fleet of AI agents and tools to design, build and ship complete applications, from prototype to the app stores.",
    metrics: ["Automation", "Mobile apps", "Websites", "AI image & video", "Support", "Training"],
    ctaTitle: "Got an idea?",
    cta1: "Start a project",
    cta2: "Discuss your project",
    contactForm: {
      heading: "Start your project",
      intro: "Tell me what you need, I'll get back to you soon.",
      headingTalk: "Let's talk",
      introTalk: "A question, an idea? Drop me a line, I'll reply as soon as I can.",
      typeLabel: "What you need",
      types: ["Website", "Mobile app", "Automation", "Support", "Training", "Other"],
      projectLabel: "Project name (optional)",
      projectPlaceholder: "If you already have one",
      budgetLabel: "Indicative budget (optional)",
      budgetPlaceholder: "Not specified",
      budgets: ["To be defined", "Under €1,000", "€1,000 to €5,000", "€5,000 to €15,000", "Over €15,000"],
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Your message",
      messagePlaceholder: "Tell me about your project, your goals, your timeline…",
      submit: "Send",
      sending: "Sending…",
      success: "Message sent. I'll get back to you soon.",
      error: "Could not send right now. Email me at contact@ovlabs.fr.",
      required: "Please fill in the required fields.",
      close: "Close",
      socialsLabel: "Or find me on"
    },
    nav: { home: "Home", work: "Work", services: "Services", contact: "Contact" },
    reviewsCluster: { count: 32, rating: "4.9", label: "based on 32 client reviews" },
    trustLabel: "My work",
    services: {
      tag: "Services",
      title: ["What I", "build."],
      titleIt: "build.",
      sub: "Five pillars, one promise: a fast, accessible web product designed to grow your business.",
      items: [
        { num: "01", title: "Automation", text: "I automate your repetitive tasks with AI and custom scripts: data processing, agents, integrations.", tags: ["AI", "Agents", "Scripts"] },
        { num: "02", title: "Mobile apps", text: "iOS and Android apps, from prototype to publishing on the App Store and Google Play.", tags: ["iOS", "Android", "Stores"] },
        { num: "03", title: "Websites", text: "Modern, fast, tailor-made showcase sites and web apps. Clean design and performance.", tags: ["Next.js", "Web", "Design"] },
        { num: "04", title: "AI image & video", text: "AI image and video generation: brand visuals, illustrations, short-form content. From prompt to final render.", tags: ["Image", "Video", "Prompt"] },
        { num: "05", title: "Support", text: "Technical guidance and follow-up: project scoping, stack choices, going live. I guide you at every step.", tags: ["Consulting", "Stack", "Follow-up"] },
        { num: "06", title: "Training", text: "I teach you to build with AI: vibe coding, tool orchestration, best practices. 1:1 or team.", tags: ["Vibe coding", "AI", "1:1"] }
      ]
    },
    projects: {
      tag: "Work",
      title: ["My latest", "projects."],
      titleIt: "projects.",
      sub: "",
      items: [
        { year: "2025", type: "Encrypted messaging", title: "OV Message", desc: "End-to-end encrypted messaging, 100% offline over SMS. Post-quantum encryption.", tags: ["iOS", "Android", "Encryption"], href: "/ov-message", image: "/ovm/feature.jpg" },
        { year: "2026", type: "Mobile game", title: "OV Jungle", desc: "Real-time multiplayer card game where two to four players compete online.", tags: ["React Native", "Node", "Real-time"], href: "/ov-jungle", image: "/ovj/icon.png" },
        { year: "2026", type: "AI video studio", title: "OV Lab IA", desc: "A channel of practitioner-level AI video courses, produced by an automated studio: generated voice, editing and subtitles.", tags: ["Python", "FFmpeg", "AI TTS"], href: "/ov-lab", image: "/ovlab/banner.jpg" },
        { year: "2026", type: "Robotics & AI", title: "Reachy Mini", desc: "Open-source desktop robot turned into a voice assistant: it holds a conversation in French and triggers real actions on the computer.", tags: ["Python", "Voice", "SDK"], href: "/reachy", image: "/reachy/reachy.jpg" }
      ]
    },
    experience: {
      tag: "Path",
      title: ["From copy-paste", "to orchestration."],
      titleIt: "to orchestration.",
      items: [
        { date: "Today", role: "Claude Code", co: "My main tool", desc: "I drive AI agents end to end, from prototype to publishing on the stores. Claude Code is what I build with every day." },
        { date: "2026", role: "opencode", co: "A complement", desc: "For the past few months, opencode has complemented Claude Code: an open-source agent that works with almost any model (GPT, Gemini, DeepSeek and the rest)." },
        { date: "2025", role: "Cursor", co: "A year to understand", desc: "For about a year, Cursor really got me into the code. I started to understand what I was building." },
        { date: "2024", role: "The beginnings", co: "ChatGPT 3.5 & DeepSeek", desc: "At first, copy-pasting with ChatGPT 3.5 and the early DeepSeek versions, without understanding a single line. It all started there." }
      ]
    },
    skills: {
      tag: "Skills",
      title: ["Tools &", "AI."],
      titleIt: "AI.",
      sub: ""
    },
    cta: {
      tag: "Ready to start?",
      title: ["Let's bring your", "project to life."],
      titleIt: "project to life.",
      sub: "Available right now.",
      btn: "Download my CV"
    },
    projectVisual: "project visual",
    // Les pages légales n'existent qu'en français : les libellés sont traduits,
    // les cibles restent les mêmes fichiers.
    footer: {
      copyright: "© 2026   OV. All rights reserved.",
      legalCards: [
        {
          icon: "shield",
          title: "OV Message Privacy",
          lines: ["How your personal data is protected"],
          href: "/confidentialite.html",
          cta: "Read more"
        },
        {
          icon: "shield",
          title: "OV Jungle Privacy",
          lines: ["The game and your data"],
          href: "/ov-jungle-confidentialite.html",
          cta: "Read more"
        },
        {
          icon: "contract",
          title: "OV Message Terms",
          lines: ["Terms governing OV Message"],
          href: "/conditions.html",
          cta: "Read more"
        },
        {
          icon: "contract",
          title: "OV Jungle Terms",
          lines: ["Terms governing OV Jungle"],
          href: "/ov-jungle-conditions.html",
          cta: "Read more"
        },
        {
          icon: "scale",
          title: "Legal Notice",
          lines: ["Legal information", "Publisher and hosting"],
          href: "/mentions-legales.html",
          cta: "Read more"
        }
      ]
    }
  },
  skills: [
    { name: "Gemini", value: 0.9 },
    { name: "ChatGPT", value: 0.88 },
    { name: "Grok", value: 0.85 },
    { name: "DeepSeek", value: 0.85 },
    { name: "Kimi K3", value: 0.8 },
    { name: "Claude Code", value: 0.95 },
    { name: "Cursor", value: 0.9 },
    { name: "opencode", value: 0.85 }
  ],
  trustLogos: ["OV Message", "OV Jungle", "OV Crypto SDK", "OV Secure AI", "OV Rec", "OV Chat AI", "OV Lab Studio", "Robot Reachy Mini", "Agent IA", "Fine-tuning", "Pentests", "ovlabs.fr"],
  serviceKinds: ["ai", "mobile", "dev", "media", "support", "training"]
};
