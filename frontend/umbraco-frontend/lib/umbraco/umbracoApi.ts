// lib/umbraco/umbracoApi.ts

export const UM_BRACO_URL = process.env.NEXT_PUBLIC_UMBRACO_URL || "https://localhost:5101";

export async function fetchContentById(id: string) {
    const res = await fetch(`${UM_BRACO_URL}/umbraco/delivery/api/v2/content/item/${id}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch content by ID "${id}": ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function fetchContentByPath(path: string) {
    const res = await fetch(`${UM_BRACO_URL}/umbraco/delivery/api/v2/content/item/${path}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch content by path "${path}": ${res.status} ${res.statusText}`);
    }

    return res.json();
}

/**
 * Fetch homepage dynamically
 * Uses the first item from /content as root
 */
export async function fetchHomepage() {
    const res = await fetch(`${UM_BRACO_URL}/umbraco/delivery/api/v2/content`);

    if (!res.ok) {
        throw new Error(`Failed to fetch content list: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
        throw new Error("No content found in delivery API");
    }

    // Return first item as homepage
    return data.items[0];
}

// Fetch top-level navigation items (root children)
export async function fetchNavigationOld() {
    const res = await fetch(`${UM_BRACO_URL}/umbraco/delivery/api/v2/content`);
    if (!res.ok) {
        throw new Error(`Failed to fetch navigation items: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    //only show pages where hideFromTopNavigation is false
    return data.items?.filter((item: any) => item.properties?.hideFromTopNavigation === false) || [];
}

// lib/umbraco/umbracoApi.ts
export async function fetchNavigation() {
    const res = await fetch(`${UM_BRACO_URL}/umbraco/delivery/api/v2/content`);
    if (!res.ok) throw new Error(`Failed to fetch navigation items: ${res.status} ${res.statusText}`);

    const data = await res.json();

    // Homepage (first allowedAtRoot item)
    const homepage = data.items?.find((item: any) => item.allowedAtRoot) || data.items?.[0];

    if (!homepage) throw new Error("No homepage found");

    // Other items: not homepage, not hidden
    const otherItems = data.items
        .filter((item: any) => item.id !== homepage.id && item.properties?.hideFromTopNavigation !== true)
        .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map((item: any) => ({
            id: item.id,
            name: item.name,
            // Use route.path if it exists, otherwise fallback to slug, otherwise item ID
            url: item.route?.path || item.slug || `item/${item.id}`,
        }));

    return [
        {
            id: homepage.id,
            name: "Home",
            url: "/",
        },
        ...otherItems,
    ];
}
