import { getContentById } from "@/lib/umbraco/content";

export const HOMEPAGE_ID = "dcf18a51-6919-4cf8-89d1-36b94ce4d963";

export async function fetchHomepage() {
    return getContentById(HOMEPAGE_ID);
}