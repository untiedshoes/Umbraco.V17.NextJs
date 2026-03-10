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