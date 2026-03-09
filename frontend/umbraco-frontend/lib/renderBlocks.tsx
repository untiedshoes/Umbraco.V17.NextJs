import { blocksMapper } from "./blocksMapper";  
export function renderBlocks(blocks: any[]) {
    return blocks.map((block, index) => {
        const BlockComponent = blocksMapper[block.type];
        if (!BlockComponent) {
            console.warn(`No component found for block type: ${block.type}`);
            return null;
        }
        return <BlockComponent key={index} {...block} />;
    });
}
