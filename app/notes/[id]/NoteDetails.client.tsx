"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query"; // ← ДОДАНО
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api"; // ← ДОДАНО
import css from "./NoteDetails.module.css";

interface NotePreviewClientProps {
  noteId: string; // ← ЗМІНЕНО з note на noteId
}

export default function NoteDetailsClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  // ← ДОДАНО useQuery
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError || !note ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
