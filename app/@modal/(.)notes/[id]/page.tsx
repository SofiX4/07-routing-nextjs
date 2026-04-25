import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface NotePreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params;

  let note = null;

  try {
    note = await fetchNoteById(id);
  } catch (error) {
    console.error("Failed to load note:", error);
  }

  return <NotePreviewClient note={note} />;
}
