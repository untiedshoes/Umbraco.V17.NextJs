# Umbraco.V17.NextJs

> A modern headless CMS starter using **Umbraco 17** (.NET 10) and **Next.js**, featuring fully typed APIs via **Swagger** + **Orval**.

---

## Overview

This project demonstrates a **production-ready headless architecture** using:

- **Umbraco 17** as a CMS backend
- **Umbraco Delivery API** for content access
- **Delivery API Extensions** for typed responses
- **Swagger / OpenAPI** for schema generation
- **Orval** for TypeScript API client generation
- **Next.js (App Router)** for frontend rendering

It provides a strong foundation for building **scalable, type-safe, and maintainable headless applications**.

---

## Purpose

This repository is designed to help developers:

- Build a **headless Umbraco 17** project
- Use **typed APIs end-to-end**
- Integrate Umbraco with **Next.js**
- Leverage **OpenAPI-driven development**
- Follow **real-world architecture patterns**

---

## Folder Structure

```
Umbraco.V17.NextJs/
│
├─ cms/
│   └─ umbraco-cms/                        # Umbraco 17 CMS (backend)
│       ├─ Program.cs                      # Application entry point
│       ├─ appsettings.json                # Core configuration (Delivery API, etc.)
│       ├─ appsettings.Development.json
│       ├─ appsettings-schema*.json
│       ├─ umbraco-cms.csproj
│       │
│       ├─ umbraco/
│       │   ├─ Data/                       # SQLite DB, indexes, temp files
│       │   └─ Logs/                       # Umbraco logs
│       │
│       ├─ Views/                          # Razor views (reference only)
│       │   ├─ Partials/
│       │   ├─ Components/
│       │   └─ *.cshtml
│       │
│       └─ wwwroot/                        # Static assets (media, css, js)
│           ├─ css/
│           ├─ assets/
│           └─ media/
│
├─ frontend/
│   └─ umbraco-frontend/                   # Next.js frontend
│       ├─ app/                            # App Router (Next.js)
│       │   ├─ [...slug]/page.tsx          # Dynamic routing (Umbraco pages)
│       │   ├─ layout.tsx                  # Global layout
│       │   ├─ not-found.tsx
│       │   └─ globals.css
│       │
│       ├─ src/
│       │   ├─ components/                 # React components
│       │   │   ├─ blocks/                 # Block List / Grid renderers
│       │   │   └─ layout/                 # Header, Footer, Navigation
│       │   │
│       │   ├─ helpers/                    # Utility helpers
│       │   │   ├─ dictionary.ts
│       │   │   ├─ image.ts
│       │   │   ├─ links.ts
│       │   │   ├─ metaHelper.ts
│       │   │   ├─ spacing.ts
│       │   │   └─ youtube.ts
│       │   │
│       │   ├─ lib/
│       │   │   ├─ api/                    # Orval-generated API client
│       │   │   │   ├─ content/
│       │   │   │   ├─ media/
│       │   │   │   └─ model/              # Typed models (Delivery API)
│       │   │   │
│       │   │   ├─ api-clean/              # Clean starter kit API (optional)
│       │   │   │   ├─ content/
│       │   │   │   ├─ media/
│       │   │   │   └─ model/
│       │   │   │
│       │   │   └─ umbraco/
│       │   │       └─ index.ts            # Custom API wrappers (getArticles, etc.)
│       │   │
│       │   ├─ config/                     # Project config (if used)
│       │   └─ custom-fetch.ts             # Custom fetch wrapper
│       │
│       ├─ styles/
│       │   ├─ site.css
│       │   └─ tailwind.config.js
│       │
│       ├─ public/                         # Static assets
│       ├─ orval.config.js                 # Orval config (OpenAPI → TS client)
│       ├─ next.config.ts
│       ├─ tsconfig.json
│       ├─ package.json
│       └─ README.md
│
├─ Umbraco.V17.NextJs.sln                  # .NET solution
└─ README.md

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

```bash
cd cms/umbraco-cms
dotnet restore
dotnet run
```

Open:
```bash
https://localhost:5101
```

Complete setup:

- Use SQLite
- Install Starter Kit
- Enable Delivery API

---

## 2. Install Delivery API Extensions

```bash
dotnet add package Umbraco.Community.DeliveryApiExtensions
```

Enable Delivery API:
```js
{
  "Umbraco": {
    "DeliveryApi": {
      "Enabled": true
    }
  }
}
```
---

## 3. Run Frontend

```bash
cd frontend/umbraco-frontend
npm install
npm run dev
```

Create .env.local:
```
NEXT_PUBLIC_UMBRACO_URL=https://localhost:5101
```
---

## Architecture
```
Umbraco CMS
     ↓
Delivery API
     ↓
Swagger / OpenAPI
     ↓
Orval (code generation)
     ↓
Typed API Client (TS)
     ↓
Custom API Layer (lib/umbraco)
     ↓
Next.js Frontend
```
---

## Data Flow
```
Next.js page request
        ↓
Custom API (index.ts)
        ↓
Orval client (typed)
        ↓
Umbraco Delivery API
        ↓
Typed response models
        ↓
React components render UI
```
---

## Typed API (Delivery API Extensions)

Using:
```
Umbraco.Community.DeliveryApiExtensions
```
You get:
- Strongly typed responses per Document Type
- Swagger-generated schemas
- Models like:
  - ArticleContentResponseModel
  - AuthorContentResponseModel
  - AuthorContentResponseModel

---

## Example: Typed Navigation

```ts
import { getContent20 } from "@/lib/api/content/content";
import { PagedIApiContentResponseModel, VisibilityControlsContentResponseModel } from "@/api/model";

/**
 * Fetch top-level navigation items from Umbraco Delivery API
 */

export async function getNavigation(): Promise<VisibilityControlsContentResponseModel[]> {
  const response = await getContent20(
    {
      fetch: "children:/",        // Fetch top-level pages
      sort: ["sortOrder:asc"],    // Sort by order
    },
    {
      next: {
        tags: ["navigation"],     // Cache key for Next.js
      },
    }
  );

  if (response.status === 200) {
    // TypeScript knows the type of `data.items` thanks to PagedIApiContentResponseModel
    const data: PagedIApiContentResponseModel = response.data as PagedIApiContentResponseModel;

    // Filter out pages hidden from navigation
    return data.items.filter(
      (item: VisibilityControlsContentResponseModel) =>
        item.properties?.hideFromTopNavigation === false
    );
  } else {
    console.error("Error fetching navigation items:", response.status, response.data);
    return [];
  }
}
```
---

## 3. Block Rendering

```
Umbraco Blocks
     ↓
JSON (Delivery API)
     ↓
renderBlocks.tsx
     ↓
blocksMapper.ts
     ↓
React Components
```

---

## Why Orval?

**Orval** transforms the Swagger/OpenAPI schema into a fully typed API client.
**Without Orval**
- Manual fetch calls
- any types everywhere
- Fragile integrations

**With Orval**
- ✅ Auto-generated API functions
- ✅ Fully typed responses
- ✅ End-to-end type safety
- ✅ Zero manual mapping
- ✅ Keeps frontend in sync with CMS

**Example:**

```ts
const response = await getContent20({ filter: ["contentType:article"] });
```
👉 Fully typed response — no guessing, no casting.

---

## Why This Setup?

- Type-safe from CMS → UI
- Scalable architecture
- Clean separation of concerns
- CMS flexibility preserved
- Modern frontend (Next.js App Router)

---

## Author

Craig Richards  
.NET Developer