import Hero from "../components/blocks/Hero";
import RichText from "../components/blocks/RichText";
import Image from "../components/blocks/Image";

export const blocksMapper: Record<string, React.ComponentType<any>> = {
    HeroBlock: Hero,
    RichTextBlock: RichText,
    ImageBlock: Image,
};