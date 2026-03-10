import Hero from "./Hero";
import RichText from "./RichText";

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  return blocks.map((block, i) => {
    const type = block.content.contentType;

    switch (type) {
      case "hero":
        return <Hero key={i} {...block.content.properties} />;

      case "richText":
        return <RichText key={i} {...block.content.properties} />;

      default:
        return null;
    }
  });
}