// frontend/umbraco-frontend/lib/umbracoApi.ts

const API_URL = process.env.NEXT_PUBLIC_UMBRACO_URL;

/**
 * Fetch a page or content item from Umbraco Delivery API
 * @param path - The content path or ID
 */
export async function getContent(path: string) {
    const res = await fetch(`${API_URL}/umbraco/delivery/api/v2/content/item/${path}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

/**
 * Fetch all root pages (optional)
 */
export async function getRootPages() {
    const res = await fetch(`${API_URL}/umbraco/delivery/api/v2/content/root`);

    if (!res.ok) {
        throw new Error(`Failed to fetch root pages: ${res.status} ${res.statusText}`);
    }

    return res.json();
}