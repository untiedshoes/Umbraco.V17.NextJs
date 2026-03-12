import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { PageContent } from "@/lib/api-clean/model"; // Can import from Delivery API as well

export function PageRenderer({ content }: { content: PageContent[] }) {
    return (
        <>
            {content.map((block) => {
                switch (block.type) {
                    case "textBlock":
                        return <TextBlock key={block.id} {...block} />;
                    case "imageBlock":
                        return <ImageBlock key={block.id} {...block} />;
                    case "heroBlock":
                        return <HeroBlock key={block.id} {...block} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}