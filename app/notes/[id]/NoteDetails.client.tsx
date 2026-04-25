"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NotePreviewClientProps {
  note: Note | null;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {note ? (
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
      ) : (
        <p>Note not found</p>
      )}
    </Modal>
  );
}
