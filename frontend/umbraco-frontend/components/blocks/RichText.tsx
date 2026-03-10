export default function RichText({ body }: { body: string }) {
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
}