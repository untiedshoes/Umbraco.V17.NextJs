"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNavigation } from "@/lib/umbraco/umbracoApi";

interface NavItem {
  id: string;
  name: string;
  url: string;
}

export function Navigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    async function loadNav() {
      try {
        const items = await fetchNavigation();
        setNavItems(items);
      } catch (error) {
        console.error("Failed to load navigation:", error);
      }
    }

    loadNav();

    // Track current path for active styling
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem" }}>
        {navItems.map((item) => {
          const isActive =
            currentPath === item.url || (item.url !== "/" && currentPath.startsWith(item.url));

          return (
            <li
              key={item.id}
              style={{
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              }}
            >
              <Link href={item.url}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}