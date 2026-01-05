# SkillScope

SkillScope is a React dashboard that helps software developers understand which technical skills and education requirements are most common in UK job postings. It includes interactive charts and a UK region map, plus an About landing page.

---

## What it does

- **Landing / About page** (`/about`)
  - Project intro, branding, and “Get Started” link to the dashboard
  - Decorative animated wave background (uses `wave.png`)

- **Dashboard** (`/dashboard`)
  - Filters:
    - Role (e.g., Software Engineering, Frontend, Full Stack, DevOps)
    - Region (England, Scotland, Wales, Northern Ireland)
  - Visualizations:
    - **Bar chart**: Top technical tools (Top 5)
    - **Doughnut chart**: Education level distribution
    - **UK map**: Job distribution across UK regions

---

## Tech stack

- **React** (with `createRoot`)
- **React Router** (routing between `/about` and `/dashboard`)
- **Tailwind CSS** (styling + responsive layout)
- **Chart.js + react-chartjs-2** (Bar + Doughnut charts)
- **react-simple-maps + d3-geo** (UK map rendering)
- **Vite** (typical dev/build workflow for this setup)

---

## Routes

Your router is defined in `src/main.jsx`:

- `/` → redirects to `/about`
- `/about` → About page
- `/dashboard` → Dashboard with charts and filters

---

## Getting started

### Install
```bash
npm install
