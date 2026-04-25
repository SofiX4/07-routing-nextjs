import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0];

  return <NotesClient initialTag={currentTag} />;
}
