// Interests Radar Data - Hassen Arkab Portfolio
// Bilingual content (EN / FR) for all items, categories, mood blocks, and tracklists.
// Easy to modify, extend, and reorder.

export const interestsMeta = {
  en: {
    tag: "/ CURRENT OBSESSIONS / VISUAL WORLDS / SOUND & CULTURE",
    title: "INTERESTS RADAR",
    subtitle: "A personal space gathering the games, sounds, visual worlds and cultural references that inspire me at the moment.",
    intro: "Not everything here is professional — but everything feeds the way I look at design, interfaces and digital experiences.",
    filterAll: "All",
    statusBadge: "Now in focus",
    readNote: "Read note",
    closeNote: "Close note",
    designerNoteLabel: "Designer Note",
    placeholderText: "GIF to add",
    placeholderSub: "Drop file in public/assets/interests/",
    nowPlayingTitle: "Now in rotation",
    currentMoodTitle: "CURRENT MOOD",
    currentMoodTag: "/ REAL-TIME RADAR",
    moodItems: [
      {
        id: "playing",
        label: "Playing",
        value: "Music that feels atmospheric, rhythmic and visual."
      },
      {
        id: "watching",
        label: "Watching",
        value: "Game cinematics, animated worlds and strong visual universes."
      },
      {
        id: "exploring",
        label: "Exploring",
        value: "Motion, creative coding and AI-assisted design."
      }
    ]
  },
  fr: {
    tag: "/ OBSESSIONS DU MOMENT / UNIVERS VISUELS / SON & CULTURE",
    title: "RADAR D’INTÉRÊTS",
    subtitle: "Un espace personnel qui rassemble les jeux, les sons, les univers visuels et les références culturelles qui m’inspirent en ce moment.",
    intro: "Tout ici n’est pas professionnel — mais tout nourrit ma manière de regarder le design, les interfaces et les expériences digitales.",
    filterAll: "Tout",
    statusBadge: "En ce moment",
    readNote: "Lire la note",
    closeNote: "Fermer",
    designerNoteLabel: "Regard Designer",
    placeholderText: "GIF à ajouter",
    placeholderSub: "Déposer le fichier dans public/assets/interests/",
    nowPlayingTitle: "En rotation",
    currentMoodTitle: "MOOD DU MOMENT",
    currentMoodTag: "/ RADAR EN TEMPS RÉEL",
    moodItems: [
      {
        id: "playing",
        label: "J’écoute",
        value: "Des sons atmosphériques, rythmés et très visuels."
      },
      {
        id: "watching",
        label: "Je regarde",
        value: "Des cinématiques de jeux, des mondes animés et des univers visuels forts."
      },
      {
        id: "exploring",
        label: "J’explore",
        value: "Le motion, le creative coding et le design assisté par IA."
      }
    ]
  }
};

export const categoriesMap = [
  { id: "all", labelEn: "All", labelFr: "Tout" },
  { id: "games", labelEn: "Games", labelFr: "Jeux" },
  { id: "music", labelEn: "Music", labelFr: "Musique" },
  { id: "design", labelEn: "Design", labelFr: "Design" },
  { id: "culture", labelEn: "Culture", labelFr: "Culture" },
  { id: "tech", labelEn: "Tech", labelFr: "Tech" },
];

export const interestsData = [
  {
    id: "league-of-legends",
    number: "01",
    category: "games",
    status: {
      en: "Current Obsession",
      fr: "Obsession du moment"
    },
    title: {
      en: "League of Legends — Worlds, champions and visual identity",
      fr: "League of Legends — Univers, champions et identité visuelle"
    },
    description: {
      en: "League of Legends is one of the gaming universes that interests me the most because of its scale, its characters and the way each region has its own visual identity. I like how the game builds strong atmospheres through champions, factions, music, cinematics and storytelling.",
      fr: "League of Legends fait partie des univers de jeu qui m’intéressent le plus par son ampleur, ses personnages et la manière dont chaque région possède sa propre identité visuelle. J’aime la façon dont le jeu construit des atmosphères fortes à travers les champions, les factions, la musique, les cinématiques et le storytelling."
    },
    designerNote: {
      en: "What inspires me here is the connection between lore, visual systems and emotional attachment. Each champion feels like a small brand with its own codes, silhouette, color palette and narrative.",
      fr: "Ce qui m’inspire ici, c’est le lien entre lore, système visuel et attachement émotionnel. Chaque champion ressemble presque à une mini-marque, avec ses propres codes, sa silhouette, sa palette et son récit."
    },
    tags: [
      "Gaming universe",
      "Lore",
      "Visual identity",
      "Character design",
      "Cinematics"
    ],
    asset: "/assets/interests/league-of-legends.gif",
    alt: {
      en: "GIF illustrating League of Legends champions, lore and visual atmosphere",
      fr: "GIF illustrant l’univers visuel et les champions de League of Legends"
    },
    bentoSize: "large-wide" // Spans across two columns on desktop bento
  },
  {
    id: "honkai-star-rail",
    number: "02",
    category: "games",
    status: {
      en: "UI & Visuals",
      fr: "UI & Univers"
    },
    title: {
      en: "Honkai: Star Rail — Sci-fi, rhythm and character-driven worlds",
      fr: "Honkai: Star Rail — Science-fiction, rythme et univers de personnages"
    },
    description: {
      en: "Honkai: Star Rail interests me for its mix of science fiction, anime aesthetics, character design and polished interfaces. The game creates a strong sense of universe through its environments, music, menus, transitions and visual storytelling.",
      fr: "Honkai: Star Rail m’intéresse pour son mélange de science-fiction, d’esthétique anime, de character design et d’interfaces très soignées. Le jeu crée un vrai sentiment d’univers à travers ses environnements, sa musique, ses menus, ses transitions et sa narration visuelle."
    },
    designerNote: {
      en: "I like the way the interface supports the fantasy without becoming invisible. Menus, cards, icons and animations all contribute to the feeling of being inside a complete digital universe.",
      fr: "J’aime la manière dont l’interface accompagne l’univers sans disparaître totalement. Les menus, les cartes, les icônes et les animations participent à l’impression d’être dans un monde digital complet."
    },
    tags: [
      "Sci-fi",
      "Anime aesthetics",
      "UI design",
      "Motion",
      "Worldbuilding"
    ],
    asset: "/assets/interests/honkai-star-rail.gif",
    alt: {
      en: "GIF illustrating the sci-fi universe, anime aesthetics and polished interfaces of Honkai: Star Rail",
      fr: "GIF illustrant l’univers science-fiction et l’interface soignée de Honkai: Star Rail"
    },
    bentoSize: "tall-vertical" // Tall card
  },
  {
    id: "music-rotation",
    number: "03",
    category: "music",
    status: {
      en: "In Rotation",
      fr: "En rotation"
    },
    title: {
      en: "Music rotation — Sounds that shape my mood",
      fr: "Rotation musicale — Les sons qui influencent mon mood"
    },
    description: {
      en: "Music plays a big role in the way I imagine visuals. Some tracks create colors, rhythm, movement and atmosphere in my mind. This section gathers the sounds I am listening to at the moment.",
      fr: "La musique joue beaucoup dans ma manière d’imaginer des visuels. Certains morceaux créent des couleurs, du rythme, du mouvement et des ambiances dans ma tête. Cette section rassemble les sons que j’écoute en ce moment."
    },
    designerNote: {
      en: "I see music as a design input: tempo can influence motion, textures can inspire interfaces, and moods can shape an entire visual direction.",
      fr: "Je vois la musique comme une matière de design : le tempo peut influencer le motion, les textures peuvent inspirer des interfaces, et les ambiances peuvent guider toute une direction artistique."
    },
    tags: [
      "Music",
      "Mood",
      "Motion",
      "Visual rhythm",
      "Sound design"
    ],
    asset: "/assets/interests/music-mood.gif",
    alt: {
      en: "Visual mood representing atmospheric music and rhythm exploration",
      fr: "Visuel d’ambiance représentant les rythmes et ambiances sonores"
    },
    tracklist: [
      { id: "t1", title: "Heavy Waves", artist: "Kavinsky", duration: "3:42" },
      { id: "t2", title: "Star Walkin'", artist: "Lil Nas X & Riot Games", duration: "3:30" },
      { id: "t3", title: "Wildfire", artist: "HOYO-MiX", duration: "3:56" },
      { id: "t4", title: "Resonance", artist: "HOME", duration: "3:32" }
    ],
    bentoSize: "large-wide"
  },
  {
    id: "design-motion",
    number: "04",
    category: "design",
    status: {
      en: "Design Practice",
      fr: "Pratique Design"
    },
    title: {
      en: "Motion & interactive design — Interfaces that feel alive",
      fr: "Motion & design interactif — Des interfaces qui semblent vivantes"
    },
    description: {
      en: "I am increasingly interested in interfaces that react, move and create a feeling of presence. Motion design can transform a simple layout into an experience, as long as it supports clarity instead of distracting from it.",
      fr: "Je m’intéresse de plus en plus aux interfaces qui réagissent, bougent et créent une sensation de présence. Le motion design peut transformer une simple mise en page en expérience, à condition de servir la clarté plutôt que de distraire."
    },
    designerNote: {
      en: "What I like is the balance between visual impact and usability: transitions, hover states, page reveals, audio-reactive visuals and small details that make a product feel more intentional.",
      fr: "Ce que j’aime, c’est l’équilibre entre impact visuel et utilisabilité : transitions, hover states, révélations de page, visuels audio-réactifs et petits détails qui rendent un produit plus intentionnel."
    },
    tags: [
      "Motion",
      "Interaction",
      "UI details",
      "Creative coding",
      "Experience design"
    ],
    asset: "/assets/interests/design-motion.gif",
    alt: {
      en: "Animation demonstrating UI motion, fluid layouts and micro-interactions",
      fr: "Animation démontrant le motion design d’interfaces et les micro-interactions"
    },
    bentoSize: "medium"
  },
  {
    id: "ai-tools",
    number: "05",
    category: "tech",
    status: {
      en: "Exploration",
      fr: "Exploration"
    },
    title: {
      en: "AI & creative tools — Designing with new workflows",
      fr: "IA & outils créatifs — Designer avec de nouveaux workflows"
    },
    description: {
      en: "AI tools are changing the way ideas are generated, tested and refined. I am interested in how they can support creativity without replacing intention, taste and design thinking.",
      fr: "Les outils IA changent la manière de générer, tester et affiner des idées. Ce qui m’intéresse, c’est la façon dont ils peuvent accompagner la créativité sans remplacer l’intention, le goût et la réflexion design."
    },
    designerNote: {
      en: "For me, AI is useful when it accelerates exploration, helps prototype faster or opens visual directions — but the designer still needs to frame, select and refine.",
      fr: "Pour moi, l’IA est utile lorsqu’elle accélère l’exploration, aide à prototyper plus vite ou ouvre des directions visuelles — mais le designer doit toujours cadrer, choisir et affiner."
    },
    tags: [
      "AI tools",
      "Workflow",
      "Prototyping",
      "Design process",
      "Exploration"
    ],
    asset: "/assets/interests/ai-tools.gif",
    alt: {
      en: "Visual exploration of creative coding, AI workflows and generative design",
      fr: "Exploration visuelle d’outils d’intelligence artificielle et design génératif"
    },
    bentoSize: "medium"
  },
  {
    id: "fashion-identity",
    number: "06",
    category: "culture",
    status: {
      en: "Visual Language",
      fr: "Langage Visuel"
    },
    title: {
      en: "Fashion & digital identity — Style as a visual language",
      fr: "Mode & identité digitale — Le style comme langage visuel"
    },
    description: {
      en: "Fashion interests me because it works like a visual system: silhouettes, textures, colors and details communicate identity before words. This way of thinking also connects with interface and brand design.",
      fr: "La mode m’intéresse parce qu’elle fonctionne comme un système visuel : silhouettes, textures, couleurs et détails communiquent une identité avant même les mots. Cette logique rejoint aussi l’interface et le branding."
    },
    designerNote: {
      en: "I like how style can become a language. A good visual identity, like a good outfit, is about balance, contrast, rhythm and attitude.",
      fr: "J’aime la façon dont le style peut devenir un langage. Une bonne identité visuelle, comme une bonne tenue, repose sur l’équilibre, le contraste, le rythme et l’attitude."
    },
    tags: [
      "Fashion",
      "Identity",
      "Styling",
      "Visual culture",
      "Branding"
    ],
    asset: "/assets/interests/fashion-identity.gif",
    bentoSize: "medium"
  }
];
