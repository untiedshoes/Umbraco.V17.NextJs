import Image from "next/image";

export function ImageBlock({ url, alt }: { url: string; alt?: string }) {
    return <Image src={url} alt={alt || ""} width={800} height={600} />;
}