import { fetchHomepage } from "@/lib/umbraco/umbracoApi";

export default async function Homepage() {
  const homepage = await fetchHomepage();
  console.log("Homepage:", homepage);

  return (
    <main>
      <h1>{homepage.name}</h1>
      <p>{homepage.properties.title}</p>
      <p>{homepage.properties.subtitle}</p>
    </main>
  );
}