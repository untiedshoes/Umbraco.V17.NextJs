# Umbraco.V17.NextJs

> A headless CMS project using **Umbraco 17** with **Next.js** for frontend rendering. Designed as a starter template for **.NET 10 + Umbraco 17 headless development**.

---

## Overview

**Umbraco.V17.NextJs:** This repository contains a **starter project** demonstrating a **modern Umbraco 17 headless setup** integrated with a **Next.js frontend**. It includes best practices for:

- Content API integration via **Umbraco Delivery API**
- Next.js rendering with dynamic blocks
- ASP.NET Core backend configuration
- Development workflow using **.NET 10 SDK** and **Node.js**
- Headless CMS architecture

The project is intended as a foundation for building **dynamic, maintainable websites** with Umbraco as a backend CMS.

---

## Purpose

This repository serves as a **practical template** for developers who want to:

- Start a **headless Umbraco 17 project**
- Connect Umbraco content via **REST APIs** to a **Next.js frontend**
- Use **.NET 10 SDK** with modern C# features
- Experiment with **headless CMS workflows** in a structured project

---

## Folder Structure

```
Umbraco.V17.NextJs/
│
├─ cms/
│   └─ umbraco-cms/               # Umbraco 17 CMS (starter kit)
│       ├─ wwwroot/               # Static assets for the CMS
│       │   ├─ css/               # Starter CSS (optional copy)
│       │   └─ js/                # Starter JS (optional copy)
│       │
│       ├─ Views/                 # Razor views (reference)
│       │   └─ Partials/          # Partial view templates
│       │
│       ├─ appsettings.json       # CMS settings (Delivery API config)
│       └─ Program.cs             # .NET startup
│
├─ frontend/
│   └─ umbraco-frontend/          # Next.js frontend app
│       ├─ app/
│       │   ├─ layout.tsx         # Global layout (Header, Footer)
│       │   ├─ page.tsx           # Home page
│       │   └─ [...slug]/page.tsx # Dynamic pages from Delivery API
│       │
│       ├─ components/
│       │   ├─ layout/            # Common layout components
│       │   │   ├─ Header.tsx
│       │   │   └─ Footer.tsx
│       │   │
│       │   └─ blocks/            # Block components
│       │       ├─ Hero.tsx
│       │       ├─ RichText.tsx
│       │       ├─ Image.tsx
│       │       └─ ...other blocks
│       │
│       ├─ lib/
│       │   ├─ umbracoApi.ts      # API client (Content Delivery API)
│       │   ├─ blocksMapper.ts    # Map block type → React component
│       │   └─ renderBlocks.tsx   # Render logic for blocks
│       │
│       ├─ types/
│       │   └─ umbraco.d.ts       # Auto‑generated TypeScript models
│       │
│       ├─ styles/
│       │   ├─ site.css           # Starter kit / custom CSS
│       │   └─ tailwind.config.js # Tailwind config (if used)
│       │
│       └─ .env.local             # Local env vars (NEXT_PUBLIC_UMBRACO_URL)
│
│
├─ Umbraco.V17.NextJs.sln         # .NET solution file
├─ .gitignore                     # Files/folders to ignore in git
└─ README.md                      # Project documentation

```

---

## Getting Started

Prerequisites (Make sure the following tools are installed:)

- .NET 10 SDK (required for Umbraco 17)
- Node.js 20+
- npm (comes with Node.js)
- Optional: Visual Studio 2022 or VS Code

---

## 1. Run the Umbraco 17 CMS

Navigate to the CMS project:
```bash
cd cms/umbraco-cms
```

Restore dependencies:
```bash
dotnet restore
```

Run the CMS:
```bash
dotnet run
```

Open the site in your browser:
```
https://localhost:44300
```
Complete the Umbraco installer:
- Choose SQLite for local development
- Install the Starter Kit
- Ensure the Content Delivery API is enabled

---

## 2. Run the Next.js Frontend
Open a new terminal and navigate to the frontend:
```bash
cd frontend/umbraco-frontend
```

Install dependencies:
```bash
npm install
```

Create an environment file .env.local in frontend/umbraco-frontend:
```
NEXT_PUBLIC_UMBRACO_URL=https://localhost:44300
```

Start the development server:
```bash
npm run dev
```

Open the frontend:
```
http://localhost:3000
```

The Next.js app should now fetch and render content from the Umbraco CMS.

---

## 3. Generate TypeScript Models (Optional but Recommended)

Whenever you add or modify Document Types or Blocks in Umbraco, regenerate the frontend models:

```bash
cd frontend/umbraco-frontend
npm run generate:umbraco-types
```

This updates:

```
types/umbraco.d.ts
```
Providing:
- Type safety
- Autocomplete
- Strong typing for API responses

---

## 4. Development Notes
### Dynamic Pages

The frontend uses a dynamic route:
```
app/[...slug]/page.tsx
```
This automatically fetches content from the Umbraco Delivery API based on the page URL.

### Block Rendering
Umbraco **Block List / Block Grid** components are rendered through:
```
lib/renderBlocks.tsx
```
Block types are mapped to React components in:
```
lib/blocksMapper.ts
```
Example:
```
HeroBlock → components/blocks/Hero.tsx
RichTextBlock → components/blocks/RichText.tsx
```

### Block Rendering
The global layout is defined in:
```
app/layout.tsx
```
This mirrors the structure of the Razor _Layout.cshtml used in the Starter Kit:
- Header
- Main content
- Footer

### Styling
Styling can be handled in two ways:

- Reuse Starter Kit CSS
  - Copy styles from cms/wwwroot/css into frontend/styles/site.css

- Tailwind CSS
  - Configure styles in frontend/styles/tailwind.config.js if you prefer utility-first styling.

---

## Author

Craig Richards  
.NET Developer