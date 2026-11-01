# Arin Sharma — Space Portfolio

A React + Vite portfolio with a dark, space-inspired theme.

## Run locally

```bash
npm install
npm run dev
```

## Responsive layout

Mobile-first with Tailwind's default breakpoints (sm 640, md 768, lg 1024, xl 1280).

- Header: hamburger menu below 768px, inline links above.
- Hero: below 1024px everything is centred, with a compact floating profile photo on top; from 1024px the text is left-aligned beside a photo card.
- Skills: 3 rows that drift sideways and can be swiped on every screen size (4 columns visible on phones, 5 on tablets, 7 on laptops).
- Projects: one row that drifts sideways and can be swiped. Phones show the first 3 projects, 768px+ shows up to 6 (`projects` in `src/data/portfolioData.js`).
- Auto-scroll pauses on hover/touch and is off for visitors who prefer reduced motion (`src/hooks/useAutoScroll.js`).
