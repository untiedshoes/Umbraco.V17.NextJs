cat > README.md << 'EOF'
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
my-project/
│
├─ cms/                       # Umbraco 17 project (starter kit)
│   ├─ wwwroot/
│   │   ├─ css/               # Copy starter kit CSS here
│   │   └─ js/                # Copy starter kit JS here (optional)
│   ├─ Views/
│   │   ├─ Partials/          # Reference for component structure
│   │   └─ _Layout.cshtml     # Reference for layout
│   ├─ appsettings.json       # Enable Delivery API
│   └─ Program.cs
│
├─ frontend/                  # Next.js App
│   ├─ app/
│   │   ├─ layout.tsx         # Global layout (Header + Footer + main)
│   │   ├─ page.tsx           # Home page
│   │   └─ [...slug]/page.tsx # Dynamic pages
│   │
│   ├─ components/
│   │   ├─ layout/
│   │   │   ├─ Header.tsx
│   │   │   └─ Footer.tsx
│   │   │
│   │   └─ blocks/
│   │       ├─ Hero.tsx
│   │       ├─ RichText.tsx
│   │       ├─ Image.tsx
│   │       └─ ...other block components
│   │
│   ├─ lib/
│   │   ├─ umbracoApi.ts      # Central API client
│   │   ├─ blocksMapper.ts    # Map block content type → React component
│   │   └─ renderBlocks.tsx   # Dynamic block renderer
│   │
│   ├─ types/
│   │   └─ umbraco.d.ts       # Auto-generated TypeScript models
│   │
│   ├─ styles/
│   │   ├─ site.css           # Starter kit CSS
│   │   └─ tailwind.config.js # If using Tailwind
│   │
│   └─ env.local              # NEXT_PUBLIC_UMBRACO_URL=https://localhost:44300
│
├─ docker/                    # Optional dev/prod containers
│   └─ Dockerfile
│
└─ generate-umbraco-types.ts   # Script to auto-generate TypeScript models

```

---

## Author

Craig Richards  
.NET Developer