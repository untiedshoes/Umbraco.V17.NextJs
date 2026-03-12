import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRenderer } from "@/components/PageRenderer";
import { getPage } from "@/lib/umbraco";
import { getDictionaryItems } from "@/helpers/dictionary";
import { getMeta } from "@/helpers/metaHelper";
import type { ContentContentResponseModel } from "@/lib/api/model";

interface PageParams {
    page: string[];
}

export async function generateStaticParams() {
    // Example: fetch all pages if needed for dynamic routing
    // You could use getContentItems20() here if you want
    return [];
}

export async function generateMetadata({ params }: { params: PageParams }) {
    const path = `/${params.page.join("/")}/`;
    const metaContent = await getPage<ContentContentResponseModel>(path);

    if (!metaContent) return notFound();

    return getMeta(metaContent);
}

export default async function Page({ params }: { params: PageParams }) {
    const path = `/${params.page.join("/")}/`;

    const dictionaryItems = await getDictionaryItems();
    const pageContent = await getPage<ContentContentResponseModel>(path);

    if (!pageContent) return <div>Page not found</div>;

    return (
        <>
            {pageContent.name && <h1>{pageContent.name}</h1>}

            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {pageContent?.properties?.contentRows?.items?.map((item, index) => (
                                <PageRenderer key={index} content={item} dictionary={dictionaryItems} />
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}