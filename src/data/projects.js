/**
 * Single source of truth for all portfolio projects.
 *
 * Promoting or demoting a project = flip `featured`.
 * The "Explore more creations (N)" button label is computed from the
 * non-featured count.
 */

// ── project assets ───────────────────────────────────────────────────
import muleMatrixImg from "../assets/projects/Mule-matrix.png";
import vppVideo from "../assets/projects/vpp-demo.mp4";
import vppCover from "../assets/projects/vpp-cover.png";
import farmmateImg from "../assets/projects/Farmmate-dashboard.png";
import wellnessImg from "../assets/projects/ai-mental-dashboard.png";
import dsaVaultImg from "../assets/projects/DSA-Vault.png";
import scrollmapImg from "../assets/projects/ScrollMap.png";
import flutterNewsImg from "../assets/projects/flutter-news.png";
import rateLimiterImg from "../assets/projects/rate-limiter architecture.png";

// ── accent → CSS RGB triplet (for --glow-color) ──────────────────────
export const ACCENT_RGB = {
  teal: "47, 230, 217",   // var(--circuit)
  pink: "255, 46, 126",   // var(--signal)
  yellow: "255, 198, 61",  // var(--solder)
};

export const ACCENT_CSS = {
  teal: "var(--circuit)",
  pink: "var(--signal)",
  yellow: "var(--solder)",
};

// ── project list ─────────────────────────────────────────────────────
const projects = [
  /* ───────────────────── FEATURED ───────────────────── */
  {
    slug: "adaptive-rate-limiter",
    title: "ADAPTIVE SELF-HEALING RATE LIMITER",
    badge: "BACKEND · RELIABILITY",
    status: "Active",
    tagline: "Rate limiting that notices when its own backend is failing and recovers on its own.",
    summary:
      "Distributed rate limiter that detects its own degradation and recovers without a human paging in, built around a 4-state health machine (HEALTHY → WARNING → DEGRADED → RECOVERY) instead of a static threshold.",
    overview:
      "A distributed rate limiter built with Spring Boot and Redis. Every request is checked against Redis, and a health state machine watches Redis latency and errors. When Redis degrades, it switches to cached or local algorithms, then ramps traffic back once Redis is stable, with no human intervention. It runs on Kubernetes with Prometheus and Grafana and was chaos-tested with LitmusChaos.",
    problem:
      "A static rate limit either fails open or blocks everything when its datastore degrades. This system treats degradation as a normal state to handle.",
    built: [
      "Four-state machine (HEALTHY, WARNING, DEGRADED, RECOVERY) driven by a probe that samples Redis every 3s and tracks P50/P95/P99 and error rate over a 20-sample window.",
      "Sliding Window and GCRA as atomic Lua scripts on Redis; local Caffeine token bucket as the fallback.",
      "Per-endpoint degradation policy: FAIL_OPEN, FAIL_CLOSED or FAIL_STRICT (limit divided by pod count).",
      "Resilience4j circuit breaker around Redis calls; optional adaptive quota leasing (EWMA) to cut Redis round trips, off by default.",
      "12-panel Grafana dashboard and Prometheus metrics for requests, latency, health state and state transitions.",
      "Kubernetes deployment with HPA (2 to 5 replicas, 70% CPU target).",
    ],
    architecture:
      "Interceptor → RateLimiterService (state-aware routing) → Redis (Lua) or local fallback; probe → state machine → routing.",
    decisions: [
      {
        title: "Two algorithms",
        why: "Sliding Window gives an exact ceiling for payment and SMS endpoints; GCRA gives O(1) memory and burst-tolerant pacing for search and AI inference.",
      },
      {
        title: "Redis server time in Lua",
        why: "No app clock is passed, so clock skew between pods cannot affect decisions.",
      },
      {
        title: "Hysteresis + stabilization windows",
        why: "Enter WARNING at P99 > 50 ms, exit at < 20 ms — prevents the system from flapping between states.",
      },
      {
        title: "Shared recovery signal in Redis (SETNX)",
        why: "All pods measure recovery stability from the same moment.",
      },
    ],
    bullets: [
      "Sliding Window and GCRA as atomic Redis Lua scripts using Redis server time; Caffeine token-bucket fallback with per-endpoint FAIL_OPEN, FAIL_CLOSED and FAIL_STRICT policies.",
      "Hysteresis and stabilization windows prevent state flapping; a health probe tracks P50/P95/P99 latency every 3 seconds.",
      "Kubernetes (HPA, 2–5 pods) with Prometheus and Grafana; LitmusChaos: 8 experiments defined, 3 verified passing (pod delete, Redis failure, forced pod kill).",
    ],
    proof: [
      "8 LitmusChaos experiments defined; 3 verified passing (pod delete, Redis failure, forced pod kill).",
      "The other 5 are configured but need kernel-level access that local KIND clusters don't provide.",
      "23 test classes, including Testcontainers against a real Redis.",
    ],
    proofLine: "3 of 8 chaos experiments verified · 23 test classes",
    tags: [
      "Java 21", "Spring Boot", "Redis", "Lua", "Resilience4j",
      "Caffeine", "Kubernetes", "Prometheus", "Grafana", "LitmusChaos",
    ],
    repoUrl: "https://github.com/Kumaran-NK/adaptive-rate-limiter",
    featured: true,
    visual: {
      type: "image",
      src: rateLimiterImg,
      filename: "rate_limiter_architecture.png",
      width: 1536,
      height: 1024,
      alt: "Adaptive Self-Healing Rate Limiter architecture diagram",
      fsm: true,
    },
    accent: "teal",
  },

  {
    slug: "vpp-simulation",
    title: "VIRTUAL POWER PLANT: RL ENVIRONMENT + 3D ORCHESTRATOR",
    badge: "NEW · SIMULATION",
    status: "Active",
    tagline: "An RL environment for grid-scale battery control, with a live 3D view of the fleet.",
    summary:
      "Simulation where an AI agent manages 100 home batteries, solar panels and EV chargers over 48-step episodes, with a real-time 3D visualization of the fleet.",
    overview:
      "A simulation where an AI agent manages 100 home batteries, solar panels and EV chargers over 48-step episodes. The environment is exposed as a typed API (reset/step/state) deployed on Hugging Face Spaces. A separate Next.js and Three.js frontend streams the simulation over WebSocket so you can watch the agent's decisions play out.",
    problem:
      "RL agents for energy systems are usually judged on terminal logs. This makes their behavior visible and debuggable.",
    built: [
      "Weighted scoring across 5 objectives (profit, safety, carbon, battery health, demand response) and 5 scenarios from easy arbitrage to islanding emergency.",
      "Both rule-based and LLM-driven agents, benchmarked against each other.",
      "3D scene with 100 houses, color-coded by battery and power state, plus an animated sun, weather and power-grid lines.",
      "Two-zone layout (standard and EV chargers) with peer-to-peer trading shown between zones.",
      "Live dashboard: Pareto score, profit/carbon/battery-health charts, last agent action, demand-response bids, grid status.",
    ],
    architecture:
      "Next.js (Three.js) ↔ WebSocket ↔ FastAPI simulation server (500 ms broadcast) ↔ VPP environment server.",
    decisions: [
      {
        title: "Three separate services",
        why: "The visualization can change without touching the environment that gets evaluated.",
      },
      {
        title: "500 ms broadcast throttle",
        why: "Keeps the client responsive with 100 animated houses.",
      },
    ],
    bullets: [
      "Weighted scoring across 5 objectives (profit, safety, carbon, battery health, demand response) and 5 task scenarios, from arbitrage to islanding emergency.",
      "Typed API server (reset/step/state) deployed to Hugging Face Spaces; rule-based and LLM agents benchmarked against each other.",
      "Next.js + Three.js frontend streams state over WebSocket (FastAPI, 500 ms updates): animated sun, weather, power-grid lines, P2P trading.",
    ],
    proof: [
      "100 houses, 5 scenarios, 5 objectives, 48-step episodes.",
    ],
    proofLine: "100 houses · 5 scenarios · 5 objectives",
    tags: [
      "Python", "FastAPI", "WebSocket", "Next.js", "Three.js",
      "Tailwind", "Docker", "Hugging Face Spaces",
    ],
    repoUrl: "https://github.com/Kumaran-NK/VPP-Simulation",
    featured: true,
    visual: {
      type: "video",
      src: vppVideo,
      poster: vppCover,
      filename: "vpp_simulation.mp4",
      alt: "Virtual Power Plant 3D simulation demo",
    },
    accent: "pink",
  },

  {
    slug: "mule-matrix",
    title: "MULE MATRIX",
    badge: "HACKATHON · FINTECH",
    status: "Active",
    tagline: "Follow stolen money across banks, without exposing anyone's identity by default.",
    summary:
      "CBDC-inspired fund provenance and cross-bank mule-network investigation system, built on synthetic banking data.",
    overview:
      "A CBDC-inspired investigation platform on synthetic banking data across six simulated banks. Given a reported suspicious transaction, it traces where the funds moved, estimates how much suspicious value reached each account, and flags likely mule accounts. Investigators see only pseudonyms; real identities are released through a compliance-reviewer approval step.",
    problem:
      "Mule networks spread funds across accounts and banks, and alert feeds only show the first hop. Investigators need the downstream chain without presuming guilt.",
    built: [
      "Fund-lot provenance engine that splits and merges lots under FIFO or proportional accounting, with a conservation invariant (nothing created or lost).",
      "Time-respecting temporal graph (NetworkX) for multi-hop tracing and cycle detection.",
      "Five-dimension evidence scoring that separates suspicious exposure from culpability; merchants are classified as merchants, not mules.",
      "Detection of five typologies: rapid pass-through, fan-in, fan-out, layering chain, circular flow.",
      "Off-ramp classification (ATM, merchant, external bank, retained balance) with explicit evidence boundaries.",
      "Role-based demo: investigator submits a de-anonymisation request with a statutory ground; compliance reviewer approves specific fields; an audit trail records every action.",
    ],
    architecture:
      "React Flow dashboard → FastAPI + Pydantic v2 → provenance, graph and assessment engines → PostgreSQL/SQLite; separate bank identity store.",
    decisions: [
      {
        title: "Decimal and NUMERIC(18,2) everywhere",
        why: "No floating-point money.",
      },
      {
        title: "Invariant errors on over-allocation",
        why: "A wrong attribution fails loudly instead of silently.",
      },
      {
        title: "Only POSTED transactions move funds; reversals append compensating events",
        why: "History stays intact.",
      },
      {
        title: "Pseudonyms by default, reviewer-gated disclosure with field-level masking",
        why: "Least privilege.",
      },
    ],
    bullets: [
      "Fund-lot provenance engine with FIFO and proportional allocation and a 100% conservation invariant (exact Decimal money, no floats).",
      "Time-respecting temporal graph traversal finds multi-hop intermediaries and cycles; 5-dimension evidence scoring separates suspicious exposure from account culpability (merchants are never auto-classed as mules).",
      "Privacy-first: pseudonymous investigation layer plus an audited, reviewer-gated de-anonymisation workflow.",
    ],
    proof: [
      "21 of 21 tests passing.",
      "Demo case reconciles to a 0.00 discrepancy (100,000 introduced; 95,000 at off-ramps; 5,000 retained).",
      "Synthetic data only; no integration with real banking systems.",
    ],
    proofLine: "21 of 21 tests passing",
    note: "Synthetic data only. No integration with real banking systems.",
    tags: [
      "Python", "FastAPI", "SQLAlchemy", "NetworkX", "React",
      "TypeScript", "React Flow", "PostgreSQL",
    ],
    repoUrl: "https://github.com/Kumaran-NK/Mule-Matrix",
    featured: true,
    visual: {
      type: "image",
      src: muleMatrixImg,
      filename: "mule_matrix_graph.png",
      alt: "Mule Matrix fund-provenance graph visualization",
    },
    accent: "yellow",
  },

  /* ───────────────── MORE CREATIONS ───────────────── */
  {
    slug: "farmmate",
    title: "FARMMATE",
    badge: "AI · FULL-STACK",
    status: "Active",
    filename: "farmmate.sh",
    tagline: "Soil, weather and market data turned into plain advice for farmers.",
    summary:
      "Agricultural decision-support platform combining ML models, live weather data and an LLM assistant.",
    overview:
      "A full-stack agricultural decision-support platform. It combines ML models for crops, fertilizer, frost, rain, yield and market prices with live weather data and an LLM assistant that answers in English and Tamil. The React frontend changes its background to match the current weather.",
    problem:
      "Soil readings and model probabilities don't help a farmer unless they're translated into a clear next step.",
    built: [
      "Six models: crop recommendation (RandomForest), fertilizer advice (ML plus safety rules), frost risk and rain probability (XGBoost), yield (DecisionTree), mandi price forecast (stacking ensemble).",
      "Daily water requirement from FAO-56 Penman-Monteith evapotranspiration.",
      "AI assistant that receives the farmer's current crop, location and weather as context.",
      "Interactive Leaflet map for location selection.",
      "Downloadable PDF advisory report (soil, crop match, weather and irrigation).",
      "Weather-aware SVG animations (sun, clouds, rain, fog).",
    ],
    architecture:
      "React 19 → FastAPI → Redis cache → ONNX Runtime models; OpenWeatherMap and Groq called server-side.",
    decisions: [
      {
        title: "ONNX Runtime",
        why: "Fast CPU inference without locking to Python package versions.",
      },
      {
        title: "Redis with graceful fallback",
        why: "Computes directly if Redis is down.",
      },
      {
        title: "Server-side API keys",
        why: "Never exposed in the browser bundle.",
      },
    ],
    bullets: [
      "ML pipelines for crop recommendation, fertilizer advice, frost risk, rain probability, yield and mandi price forecasting; FAO-56 Penman-Monteith evapotranspiration for irrigation guidance.",
      "ONNX Runtime inference with Redis caching (falls back gracefully if Redis is down); Groq-powered assistant in English and Tamil.",
      "Dockerized, GitHub Actions CI, PDF advisory reports.",
    ],
    proof: [
      "Dockerized, with GitHub Actions running backend tests and frontend type checks.",
    ],
    proofLine: "Dockerized · GitHub Actions CI",
    tags: [
      "React 19", "TypeScript", "FastAPI", "XGBoost", "ONNX",
      "Redis", "Docker", "Groq",
    ],
    repoUrl: "https://github.com/Kumaran-NK/FarmMate",
    featured: false,
    visual: {
      type: "image",
      src: farmmateImg,
      filename: "farmmate_dashboard.png",
      width: 1908,
      height: 1080,
      alt: "FarmMate agricultural decision-support dashboard",
    },
    accent: "teal",
  },

  {
    slug: "youth-mental-wellness",
    title: "YOUTH MENTAL WELLNESS PLATFORM",
    badge: "MICROSERVICES · AI",
    status: "Prototype",
    filename: "wellness.sh",
    tagline: "Journaling and a grounded AI chatbot, built with crisis safety first.",
    summary:
      "Journaling, mood tracking and a grounded RAG chatbot, built as six services behind an API gateway.",
    overview:
      "A microservice platform: a React front end, an Express API gateway, and five FastAPI services (identity, journal, RAG chatbot, recommendations, activity sessions) sharing PostgreSQL with pgvector. The chatbot answers from curated wellness content using retrieval, and detects crisis language before replying.",
    problem:
      "Young people need accessible support, and an AI in this space must fail safe and keep data private.",
    built: [
      "Mood journaling with AI reflections and weekly summaries.",
      "RAG chatbot over a pgvector knowledge base.",
      "Layered crisis detection that shows support resources instead of normal output, and fails safe if checks are unavailable.",
      "Recommendations for videos, podcasts and playlists based on mood.",
      "Wellness games with session tracking.",
      "JWT auth, bcrypt, per-user isolation, data export and deletion.",
    ],
    architecture:
      "React apps → Express gateway (JWT, validation, rate limiting) → 5 FastAPI services → PostgreSQL + pgvector.",
    decisions: [
      {
        title: "Gateway handles auth and rate limiting",
        why: "Services stay simple and isolated.",
      },
      {
        title: "Crisis check runs before normal AI output",
        why: "Safety takes priority over helpfulness.",
      },
    ],
    bullets: [
      "Express gateway (JWT, rate limiting) in front of five FastAPI services on PostgreSQL + pgvector.",
      "RAG chatbot with layered crisis detection that surfaces support resources instead of normal AI output, and fails safe if checks are down.",
      "Privacy by design: bcrypt, per-user isolation, data export and deletion.",
    ],
    proof: [
      "Prototype only. It supports reflection and is not a substitute for professional care.",
    ],
    proofLine: "Prototype · microservice architecture",
    note: "Prototype that supports reflection. Not a substitute for professional care.",
    tags: [
      "FastAPI", "Express", "React", "PostgreSQL", "pgvector",
      "Gemini", "Docker",
    ],
    repoUrl: "https://github.com/Kumaran-NK/AI_For_Youth_Mental_Wellness",
    featured: false,
    visual: {
      type: "image",
      src: wellnessImg,
      filename: "wellness_dashboard.png",
      width: 1915,
      height: 1086,
      alt: "Youth Mental Wellness platform dashboard",
    },
    accent: "pink",
  },

  {
    slug: "dsa-vault",
    title: "DSA VAULT",
    badge: "EXTENSION · v0.1",
    status: "Early development",
    filename: "dsa_vault.sh",
    tagline: "A private, searchable archive of every LeetCode attempt you make.",
    summary:
      "Private, searchable archive of LeetCode submissions, stored locally in the browser.",
    overview:
      "A Chrome extension that saves your LeetCode submissions locally, including failed ones. Everything is grouped by problem so you can compare attempts, write notes and queue problems for review. Data stays in IndexedDB in your browser.",
    problem:
      "LeetCode shows a history but not a useful personal reference: no search across code, no side-by-side comparison, no notes.",
    built: [
      "Automatic capture of accepted and rejected submissions; sync of past attempts from a problem page.",
      "Line-by-line diff between any two attempts, with syntax highlighting.",
      "Notes, custom tags and a revision queue per problem.",
      "Search syntax (e.g. \"java + sliding window + medium\", \"code:hashmap\") and keyboard shortcuts (/, j, k, Alt+Shift+V).",
      "Dashboard of solved counts by difficulty, language and topic.",
      "JSON export and import for backups.",
    ],
    architecture:
      "Page-context script detects submissions → isolated content script relays → service worker validates → IndexedDB.",
    decisions: [
      {
        title: "Local-first storage",
        why: "No server; the user's code and notes never leave the browser.",
      },
      {
        title: "Retries on LeetCode GraphQL requests",
        why: "Handles transient failures.",
      },
    ],
    bullets: [
      "Captures accepted and rejected attempts automatically; history sync, line-by-line diff between attempts, per-problem notes, tags and a revision queue.",
      "Local-first (IndexedDB) with JSON backup and restore, search syntax and keyboard shortcuts.",
    ],
    proof: [
      "Early development (v0.1.0). Unit tests with Vitest. Not affiliated with LeetCode.",
    ],
    proofLine: "v0.1.0 · local-first · Vitest",
    note: "Not affiliated with LeetCode.",
    tags: [
      "TypeScript", "React", "Vite", "Chrome MV3", "IndexedDB", "Vitest",
    ],
    repoUrl: "https://github.com/Kumaran-NK/DSA-VAULT",
    featured: false,
    visual: {
      type: "image",
      src: dsaVaultImg,
      filename: "dsa_vault.png",
      width: 1917,
      height: 1081,
      alt: "DSA Vault Chrome extension interface",
    },
    accent: "yellow",
  },

  {
    slug: "scrollmap",
    title: "SCROLLMAP",
    badge: "EXTENSION · VANILLA JS",
    status: "Active",
    filename: "scrollmap.sh",
    tagline: "Save your exact place on any page and come back to it.",
    summary:
      "Browser extension that saves exact scroll positions, notes and sticky overlays so you can return to important parts of any page.",
    overview:
      "A Chrome extension for long articles, docs, chats and videos. It saves scroll-position bookmarks with screenshot previews, lets you attach notes, and pins draggable sticky notes directly on the page. It is plain JavaScript with no build step and no backend.",
    problem:
      "Browser bookmarks save a page, not where you were on it.",
    built: [
      "Scroll-position bookmarks via a floating button or Ctrl+Shift+B, with resume on single-page apps.",
      "Page notes with search and filtering.",
      "Draggable, color-coded sticky notes pinned on the page.",
      "Screenshot previews and reading history across sessions.",
      "Saved sessions, JSON export/import, and storage quota protection.",
    ],
    architecture:
      "Manifest V3 service worker (storage, messaging) + content script (overlay UI) + popup/options pages; Chrome storage and IndexedDB.",
    decisions: [
      {
        title: "Vanilla JS, no bundler",
        why: "Load unpacked and iterate immediately.",
      },
      {
        title: "IndexedDB for screenshots",
        why: "Keeps large data out of Chrome storage quotas.",
      },
    ],
    bullets: [
      "Scroll-position bookmarks with one-click or Ctrl+Shift+B capture, screenshot previews, and resume on single-page apps.",
      "Page notes and draggable, color-coded sticky notes pinned directly on the page.",
      "Local storage (Chrome storage + IndexedDB), JSON export/import, no build step or backend.",
    ],
    proof: [
      "Runs on Chromium browsers (Chrome 109+). Local-only data.",
    ],
    proofLine: "Chrome 109+ · local-only data",
    tags: [
      "JavaScript", "Chrome MV3", "IndexedDB", "Chrome Storage API", "CSS",
    ],
    repoUrl: "https://github.com/Kumaran-NK/ScrollMap-Extension",
    featured: false,
    visual: {
      type: "image",
      src: scrollmapImg,
      filename: "scrollmap_overlay.png",
      width: 1916,
      height: 1091,
      alt: "ScrollMap extension sticky notes overlay",
    },
    accent: "teal",
  },

  {
    slug: "flutter-news",
    title: "FLUTTER NEWS APP",
    badge: "MOBILE · LEARNING",
    status: "Active",
    filename: "flutter_news.sh",
    tagline: "A clean cross-platform news reader built to learn Flutter properly.",
    summary:
      "Cross-platform news reader on the NewsAPI.org API.",
    overview:
      "A Flutter app that pulls live headlines from NewsAPI.org, with 8 category feeds, an auto-playing breaking-news carousel, infinite scrolling and in-app article reading. On web, articles open in a new tab.",
    problem:
      "Built as a learning project to practice API integration, pagination and cross-platform behavior.",
    built: [
      "10 articles per request with automatic load-more and pull-to-refresh.",
      "Filtering that drops articles missing an image, description or URL.",
      "Breaking-news carousel with page indicators.",
      "Category browsing (business, entertainment, politics, science, sports, climate, technology, general).",
      "In-app WebView with progress bar, reload and open-in-browser.",
    ],
    architecture: "models → services (API calls) → pages (UI).",
    decisions: [
      {
        title: "Validate articles before rendering",
        why: "The UI only shows complete, readable content.",
      },
      {
        title: "Separate models, services and pages",
        why: "Easier to maintain and extend.",
      },
    ],
    bullets: [
      "Category filtering, auto-playing breaking-news carousel, infinite pagination, pull-to-refresh and in-app WebView reading.",
      "Filters out articles with missing images, descriptions or URLs.",
    ],
    proof: [
      "Uses NewsAPI.org free tier; requires your own API key.",
    ],
    proofLine: "NewsAPI.org · cross-platform",
    tags: ["Flutter", "Dart", "REST API", "WebView"],
    repoUrl: "https://github.com/Kumaran-NK/Flutter_News",
    featured: false,
    visual: {
      type: "image",
      src: flutterNewsImg,
      filename: "flutter_news.png",
      width: 623,
      height: 1054,
      alt: "Flutter News app mobile reader screens",
    },
    accent: "pink",
  },
];

export default projects;

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
