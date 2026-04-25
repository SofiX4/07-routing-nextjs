import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface FilterPageProps {
  params: Promise<{
    tag?: string[];
  }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag } = await params;
  const currentTag = tag?.[0];

  const queryParams =
    currentTag && currentTag !== "all" ? { tag: currentTag } : {};

  const { notes } = await fetchNotes(queryParams);

  return (
    <div>
      <h1 className={css.title}>
        {currentTag && currentTag !== "all"
          ? `${currentTag} Notes`
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
              <h3 className={css.title}>{note.title}</h3>
              <p className={css.content}>{note.content}</p>

              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
