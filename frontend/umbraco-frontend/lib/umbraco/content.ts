import { umbracoFetch } from "@/lib/umbraco/umbracoApi";

export async function getContentById(id: string) {
    return umbracoFetch(`/umbraco/delivery/api/v2/content/item/${id}`);
}

export async function getRootContent() {
    return umbracoFetch(`/umbraco/delivery/api/v2/content/root`);
}

export async function getContentByPath(path: string) {
    if (!path) {
        const root = await getRootContent();
        return root.items?.[0]; // first root item (homepage)
    }
    return umbracoFetch(`/umbraco/delivery/api/v2/content/item/${path}`);
}