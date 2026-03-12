import { Metadata } from "next";
import type { ApiContentResponseModel } from "@/lib/api/model";

/**
 * Converts a CMS content item into Next.js Metadata
 */
export function getMeta(content: ApiContentResponseModel): Metadata {
    return {
        title: content?.properties?.title || content?.name || "Untitled Page",
        description: content?.properties?.metaDescription || "",
        openGraph: {
            title: content?.properties?.title || content?.name,
            description: content?.properties?.metaDescription || "",
            url: content?.route?.path || "",
            images: content?.properties?.ogImage
                ? [
                    {
                        url: content.properties.ogImage.url,
                        width: content.properties.ogImage.width,
                        height: content.properties.ogImage.height,
                    },
                ]
                : [],
        },
    };
}