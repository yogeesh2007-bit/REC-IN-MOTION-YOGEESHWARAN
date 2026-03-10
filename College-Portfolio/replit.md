# REC in Motion

A premium, cinematic one-page college portfolio website for REC (Rajalakshmi Engineering College), built with React + TypeScript + Tailwind CSS.

## Overview

"REC in Motion" is an AI-enhanced visual storytelling portfolio built from original campus photography. The website presents the college as a vibrant space of learning, collaboration, nature, focus, and movement.

## Design

- **Theme**: Dark cinematic — near-black background with purple/gold accents
- **Color palette**: Deep purple (hsl 270), gold/yellow (hsl 42), charcoal, off-white
- **Typography**: Playfair Display (headings), Plus Jakarta Sans (body), Space Grotesk (labels)
- **Style**: Glassmorphism cards, smooth scroll animations, parallax hero, hover gallery reveals

## Sections

1. **Hero** — Full-screen image with parallax, overlay text, CTA buttons, floating glass card
2. **About the Story** — Two-column layout with campus entrance image and tags
3. **Signature Moments** — 3 premium full-height cards (Mentorship, Study Culture, Campus Rhythm)
4. **Smart Gallery** — Masonry grid with category filter chips and hover captions
5. **Highlights** — 4 metric/statement cards (Learning Spaces, Community, Green Corners, Energy)
6. **Closing** — Full-width emotional photo with closing line and footer

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion (animations)
- **Backend**: Express.js (minimal, static serving)
- **Routing**: Wouter
- **Build**: Vite

## Campus Photos Used

All 8 original campus photos from REC are used across sections:
- Student studying in front of "R" mural → Hero
- Campus entrance with R logo → About
- Teacher with students → Mentorship card
- Library scene → Study Culture card
- Football match → Campus Rhythm card
- Buddha garden → Gallery / Nature
- Meditating mascot (purple tracksuit) → Closing section
- Students in circle discussion → Gallery / Community

## Architecture

- Single page app (`/`) — `client/src/pages/home.tsx`
- No database needed — pure static portfolio
- All images imported via Vite's `@assets` alias from `attached_assets/`
