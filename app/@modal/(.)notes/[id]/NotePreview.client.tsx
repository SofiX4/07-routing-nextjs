"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

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
      <div className={css.container}>
        {note ? (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>

            <p className={css.content}>{note.content}</p>

            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>

            <button className={css.backBtn} onClick={handleClose}>
              ← Back to notes
            </button>
          </div>
        ) : (
          <p>Note not found</p>
        )}
      </div>
    </Modal>
  );
}
