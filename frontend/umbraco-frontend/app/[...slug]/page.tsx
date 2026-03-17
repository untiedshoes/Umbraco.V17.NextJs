import { ContentContentResponseModel, SEocontrolsContentResponseModel } from "@/lib/api/model";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/pageHeader";
import { getContentPages, getPage } from "@/lib/umbraco";

import { GetComponent } from "@/components/FetchComponent";
import { getMeta } from "@/helpers/metaHelper";

interface PageParams {
    page: string[];
}

export async function generateStaticParams() {
    const pages = await getContentPages();
    const allSegments = pages.map((page) => ({
        page: page.route?.path?.split('/').filter((segment) => segment !== '') || [],
    }))

    return allSegments;
}

export async function generateMetadata({ params }: { params: PageParams }) {
    const path = `/${params.page.join("/")}/`;
    const metaContent = await getPage<SEocontrolsContentResponseModel>(path);

    if (!metaContent) return notFound();

    return getMeta(metaContent);
}

export default async function Page({ params }: { params: Promise<{ page: string[] }> }) {
    
    const path = `/${(await params).page.join("/")}/`;
    const pageContent = await getPage<ContentContentResponseModel>(path);

    if (!pageContent) return <div>Page not found</div>;

    return (
        <>
            {pageContent && <PageHeader content={pageContent} />}
            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {pageContent?.properties?.contentRows?.items?.map((item, index) => {
                                return GetComponent(item, index);
                            })}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}