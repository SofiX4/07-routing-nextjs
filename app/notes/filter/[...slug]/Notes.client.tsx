// app/notes/filter/[...slug]/Notes.client.tsx
"use client";

import { fetchNotes } from "@/lib/api";
import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { useEffect, useState } from "react";

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      const queryParams =
        initialTag && initialTag !== "all" ? { tag: initialTag } : {};

      try {
        const { notes: fetchedNotes } = await fetchNotes(queryParams);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, [initialTag]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className={css.title}>
        {initialTag && initialTag !== "all"
          ? `${initialTag} Notes`
          : "All Notes"}
      </h1>

      {notes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6c757d", padding: "40px 0" }}>
          No notes found for this filter.
        </p>
      ) : (
        <ul className={css.list}>
          {notes.map((note: Note) => (
            <li key={note.id} className={css.listItem}>
              <Link
                href={`/notes/${note.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 className={css.title}>{note.title}</h3>
                <p className={css.content}>{note.content}</p>

                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
