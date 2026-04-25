import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface FilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const currentTag = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentTag || "all"],
    queryFn: async () => {
      const queryParams =
        currentTag && currentTag !== "all" ? { tag: currentTag } : {};
      return fetchNotes(queryParams);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={currentTag} />
    </HydrationBoundary>
  );
}
