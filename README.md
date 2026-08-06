# Korean Marine Collagen Peptides Store

An interactive, premium Single Page Application (SPA) landing page for a wellness supplement brand selling **Korean Marine Collagen Peptides**. Built with **React 19**, **Vite 8**, **TypeScript 5.7**, and **Tailwind CSS v4**, this application is designed to run seamlessly inside **Figma Make** and is optimized for production deployment on **Vercel**.

---

## ✨ Features

- **🛒 Interactive Shopping Cart Drawer**: Slides out from the right on cart click or product additions. Calculates subtotal, estimated tax (8%), shipping fees, and grand total in real-time. Allows incrementing, decrementing, and removing items.
- **📅 Customizable Subscription Intervals**: Toggle between one-time purchase or "Subscribe & Save" with flexible delivery frequency dropdown selectors (30, 45, or 60 days). Separate interval options are tracked as distinct line items in the cart.
- **🖼️ Mobile-Friendly Image Carousel**: Tap or click chevron navigation overlays to cycle through product photos. Features a sliding dot indicator layout on mobile viewports.
- **🔍 Full-Screen Lightbox**: Click any gallery image to open a zoomable, full-screen lightbox modal. Supports Arrow Key navigation and Escape Key dismissals, alongside body scroll locking.
- **✍️ Stateful Reviews & Ratings Form**: Interactive 5-star form with hover indicators that appends custom reviews to the grid instantly. Recalculates total review count, global average rating, and updates the star distribution chart percentages dynamically.
- **💳 Simulated Checkout Wizard**: Embedded billing, shipping address, and mock credit card form that runs authorization loads and confirms order placement before flushing cart state.

---

## 🛠️ Technology Stack

- **Framework**: React 19 & React DOM 19
- **Bundler**: Vite 8 & TypeScript 5.7
- **Styling**: Tailwind CSS v4 (using the `@tailwindcss/vite` compiler plugin)
- **Icons**: Lucide React
- **Hosting Configs**: Vercel SPA routing configurations

---

## 🚀 Getting Started

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
This project uses `pnpm` for package management:
```bash
pnpm install
```

### 2. Run Development Server
Start the local Vite server:
```bash
pnpm run dev
```
Open `http://localhost:8443` (or the terminal output URL) to run the preview locally.

### 3. Build for Production
Bundle assets and generate static distribution files:
```bash
pnpm run build
```
Production assets are outputted to the `dist/` directory.

---

## 🌎 Deploying to Vercel

This repository is pre-configured and 100% Vercel-ready:

1. Push your code changes to a Git provider (GitHub, GitLab, or Bitbucket).
2. Log in to [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import this repository.
4. Vercel will automatically detect **Vite** as the framework preset and configure build paths.
5. Click **Deploy**.

*Note: The included `vercel.json` file guarantees that sub-path loads are correctly rewritten to `index.html` to prevent routing errors in SPA deployments, and configures cache policy headers for static assets.*

---

## 📐 Figma Make Integration

The build contains custom dev-plugins in `vite.config.ts` supporting Figma Make layout mounting. Page metadata matches the properties configured in `.figma/make/site.json` dynamically at build time.
