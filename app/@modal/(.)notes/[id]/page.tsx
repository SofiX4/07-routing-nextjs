"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NotePreview({ params }: NotePreviewProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNote() {
      const { id } = await params;
      try {
        const data = await fetchNoteById(id);
        setNote(data);
      } catch (error) {
        console.error("Failed to load note:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNote();
  }, [params]);

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        {loading ? (
          <p>Loading...</p>
        ) : note ? (
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
