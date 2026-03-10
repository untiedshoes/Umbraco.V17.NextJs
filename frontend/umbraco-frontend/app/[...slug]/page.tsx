// app/[...slug]/page.tsx

import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { fetchHomepage, fetchContentByPath } from "@/lib/umbraco/umbracoApi";

interface PageProps {
    params: { slug?: string[] } | Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug?.join("/") || "";

    let page;

    try {
        if (!slugPath || slugPath === "home") {
            // Fetch homepage dynamically from root
            page = await fetchHomepage();
        } else {
            // Fetch page by path
            page = await fetchContentByPath(slugPath);
        }
    } catch (err) {
        console.error("Failed to fetch page:", err);
        return <div>Page not found</div>;
    }

    return (
        <main>
            <h1>{page.name}</h1>
            {page.properties?.contentRows?.items && (
                <BlockRenderer blocks={page.properties.contentRows.items} />
            )}
        </main>
    );
}