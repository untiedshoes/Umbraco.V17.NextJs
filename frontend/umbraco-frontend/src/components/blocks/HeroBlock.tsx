import Image from "next/image";

export function HeroBlock({ title, subtitle, imageUrl }: { title: string; subtitle?: string; imageUrl?: string }) {
    return (
        <section className="hero-block">
            {imageUrl && <Image src={imageUrl} alt={title} width={1200} height={500} />}
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </section>
    );
}