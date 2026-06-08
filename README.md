# Nerasala Mohan — Personal Portfolio Website

A world-class, premium, and fully responsive personal portfolio website built for **Nerasala Mohan** — AI Application Developer & Full Stack Engineer. 

This project features modern styling, seamless animations, and state-of-the-art interactive details.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Navigation**: React Router (hash & section routing)
- **Icons**: Lucide React + custom inline SVGs for brand logos

---

## 🎨 Design System & Features

- **Theme**: Ultra dark (`#0a0a0f`) background with bold purple-to-cyan gradient accents.
- **Card Styling**: Sleek background (`#13131f`) cards with custom borders (`#2a2a3e`) that light up with a glowing gradient border on hover.
- **Typography**: Sleek geometric sans-serif typeface (Inter) imported from Google Fonts.
- **Custom Cursor**: Interactive glowing cursor dot that follows the mouse using high-performance Framer Motion spring physics (automatically hidden on mobile/touch screens).
- **Hero Typing Subtitle**: Dynamically typed loop cycling through roles: *"AI Application Developer"*, *"Full Stack Engineer"*, *"React Developer"*, and *"Spring Boot Developer"*.
- **Staggered Animations**: Staggered word-by-word reveal of the Hero header on load and scroll-active element pop-ins.
- **Scroll Effects**: Slide up + fade in on scroll for section headers utilizing IntersectionObserver. Smooth sticky navigation bar that hides when scrolling down and slides back down when scrolling up.
- **AI Tool Chips**: Looping horizontal marquee for development tools (Claude AI, Cursor IDE, Vercel, Render, etc.).
- **Terminal Integration**: Code-styled simulated JSON developer profile card and click-to-copy interactive terminal email prompt (`mohan@dev.build`).

---

## 📂 Component Structure

```text
src/
├── components/
│   ├── AIWorkflow.tsx      # AI Tools scrolling row
│   ├── About.tsx           # Terminal JSON and stat cards
│   ├── BrandIcons.tsx      # Custom SVG brand icons (GitHub, LinkedIn)
│   ├── Contact.tsx         # CTAs & click-to-copy email
│   ├── CustomCursor.tsx    # Smooth spring-following mouse cursor
│   ├── Footer.tsx          # Copyright & social icons
│   ├── Hero.tsx            # Pulsing badge, staggered titles & typing subtitle
│   ├── Navbar.tsx          # Sticky glassmorphic navbar
│   ├── Projects.tsx        # Projects grid with memoized cards
│   └── Skills.tsx          # Tech stack tags grouped by category
├── data/
│   ├── projects.ts         # Main projects data
│   └── skills.ts           # Skill categories and tools data
├── hooks/
│   └── useScrollAnimation.ts # IntersectionObserver scroll hook
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main layout & lazy-load Suspense boundaries
├── main.tsx                # Entry point
└── index.css               # Global base styles & scrollbar setup
```

---

## 🛠️ Setup and Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
This compiles TypeScript and outputs optimized production assets into the `/dist` folder.

---

## ⚡ Performance Optimizations

- **Lazy Loading**: Below-the-fold components are loaded asynchronously using `React.lazy` and `React.Suspense` to improve Initial Page Load (LCP).
- **Rendering Optimization**: Project cards are wrapped in `React.memo` to prevent redundant re-renders.
- **Clean SVG Assets**: Custom inline SVG elements are used to render brand logos without loading heavy font files or third-party asset packs.
