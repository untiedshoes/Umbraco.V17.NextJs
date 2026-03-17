import { ApiBlockItemModel } from "@/lib/api/model";
import { RichTextRow } from "@/components/blocks/richTextRow";
import { LatestArticles } from "@/components/blocks/latestArticles";
import { ImageRow } from "@/components/blocks/imageRow";
import { ImageCarouselRow } from "@/components/blocks/imageCarouselRow";
import { VideoRow } from "@/components/blocks/videoRow";
import { CodeSnippetRow } from "@/components/s/codeSnippetRow";

const components = [
    { contentType: "codeSnippetRow", component: CodeSnippetRow },
    { contentType: "latestArticlesRow", component: LatestArticles },
    { contentType: "imageRow", component: ImageRow },
    { contentType: "imageCarouselRow", component: ImageCarouselRow },
    { contentType: "richTextRow", component: RichTextRow },
    { contentType: "videoRow", component: VideoRow },
];

export function GetComponent(item: ApiBlockItemModel, index: number, pageNo?: number) {

    const matchedComponent = components.find(c => c.contentType === item.content?.contentType);

    if (matchedComponent === undefined) console.log(`Component ${item.content?.contentType} not found`)

    return matchedComponent ? <matchedComponent.component key={index} content={item.content} settings={item.settings} pageNo={pageNo} /> : null;
}