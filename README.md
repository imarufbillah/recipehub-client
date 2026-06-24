# RecipeHub

A premium culinary publishing platform where home cooks and food enthusiasts share, discover, and unlock recipes. Built with a quiet editorial confidence — closer to a curated food journal than a generic recipe app.

---

## Live Demo

**[recipehub-by-marufbillah.vercel.app](https://recipehub-by-marufbillah.vercel.app)**

---

## Features

### Public Experience

- **Home** — Full-bleed editorial hero, featured recipe showcase, popular recipes ranked by likes, cuisine browser, and a magazine-style trust section — all with smooth Framer Motion scroll reveals
- **Browse Recipes** — Paginated card gallery with server-side filtering by category, cuisine, and difficulty; real-time search and sort
- **Recipe Details** — Full recipe content with like/favorite/report actions and Stripe-powered recipe unlocking for premium listings

### Authentication

- Email & password registration with complexity enforcement (min 6 chars, uppercase + lowercase required)
- Google OAuth single sign-on
- JWT tokens stored in **HTTPOnly cookies** (XSS-safe) via better-auth
- Post-login redirect to the originally intended route

### User Dashboard

| Page           | What it does                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Overview**   | Personal stats — total recipes, favorites, total likes received, and premium tier badge                                            |
| **My Recipes** | Full CRUD management of your authored recipes                                                                                      |
| **Add Recipe** | Rich form with imgbb image upload, ingredient/step repeaters, category, cuisine, difficulty, prep time, and premium pricing toggle |
| **Favorites**  | Saved recipes table with quick remove and View Details actions                                                                     |
| **Purchased**  | Library of recipes unlocked via purchase, with Stripe transaction references                                                       |
| **Profile**    | Edit display name, avatar (imgbb upload), and bio                                                                                  |

> **Free tier limit:** Normal users can publish up to 2 recipes. Upgrade to Premium to unlock unlimited publishing.

### Premium Membership

- One-click Stripe Checkout upgrade flow
- Payment success page with animated confirmation and transaction reference
- Instant unlock of unlimited recipe publishing and a premium badge across the UI

### Admin Dashboard

| Page               | What it does                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Overview**       | Platform-wide stats — total users, recipes, premium members, and open reports                                                |
| **Manage Users**   | Block / unblock accounts; paginated user table with plan and status badges                                                   |
| **Manage Recipes** | Edit, delete, and feature/unfeature any recipe; server-side paginated table                                                  |
| **Reports**        | Review user-submitted reports (Spam, Offensive Content, Copyright); resolve by deleting the recipe or dismissing the report  |
| **Transactions**   | Full payment history with user identity, amount, status, type, date, and Stripe transaction IDs; filterable and downloadable |

### System

- Light / Dark theme toggle with seamless transitions
- Skeleton loading states on every route
- Custom 404 page with a back-home action
- Server-side pagination throughout

---

## Tech Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| Framework      | Next.js 16 (App Router)              |
| Language       | JavaScript (JSX)                     |
| Styling        | Tailwind CSS v4                      |
| UI Components  | shadcn/ui + Radix UI                 |
| Animation      | Framer Motion                        |
| Authentication | better-auth (JWT, Google OAuth)      |
| Database       | MongoDB (via MongoDB Node.js driver) |
| Payments       | Stripe (Checkout Sessions)           |
| Image Hosting  | imgbb CDN                            |
| Icons          | Lucide React + React Icons           |
| Theme          | next-themes                          |
| Toasts         | Sonner                               |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Login, Register, Payment Success
│   ├── (public)/             # Home, Browse Recipes, Recipe Detail, Premium
│   ├── (dashboard)/
│   │   └── dashboard/        # Overview, My Recipes, Add/Edit Recipe,
│   │                         # Favorites, Purchased, Profile,
│   │                         # Manage Users, Manage Recipes, Reports, Transactions
│   ├── api/                  # Stripe checkout API routes
│   ├── not-found.jsx         # Custom 404 page
│   └── error.js              # Error boundary
├── components/               # All UI components, one file per component
├── hooks/                    # Custom React hooks
├── lib/                      # API clients (server + client), auth, utilities
└── providers/                # Theme and session context providers
```

---

## Design System

RecipeHub uses a bespoke design system built around an editorial food publication aesthetic — not a SaaS template. Key principles:

- **Two typefaces only:** Bodoni Moda (display/headings) + Geist Sans (body/UI), never mixed in the same element
- **Strict color tokens:** `oklch`-based CSS variables; no hardcoded hex/rgb values anywhere. Primary (burnt sienna) and accent (deep olive) are used at under 10% visual weight combined — restraint is the point
- **Spacing:** 4px base unit; generous 96–160px section padding on public pages for an air-rich, editorial feel
- **Motion:** Smooth deceleration easing (250–450ms), subtle 8–16px fade-up reveals on scroll, staggered card entrances — no spring bounce or rotation gimmicks
- **Imagery:** Sharp or barely-rounded edges (`radius-sm` max) for images; heavy rounding is explicitly avoided as a "generic template" signal

---

## Backend

This repository contains the frontend client only. The backend API (Express + MongoDB) is a separate service expected to run on `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`). All backend requirements — authentication middleware, JWT validation, recipe CRUD, Stripe webhook handling, and admin endpoints — are implemented and fulfilled in that service.

**Backend repository:** [github.com/imarufbillah/recipehub-server](https://github.com/imarufbillah/recipehub-server)

---

## License

This project is for educational purposes. All rights reserved.
