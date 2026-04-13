"use client";

import css from "./NotesPage.module.css";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "react-hot-toast";

import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search: debouncedQuery }],
    queryFn: () => fetchNotes({ page, search: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCreated = () => toast.success("Note created");
  const handleDeleted = () => toast.success("Note deleted");

  useEffect(() => {
    if (debouncedQuery && notes.length === 0) {
      toast("No notes found");
    }
  }, [notes.length, debouncedQuery]);

  if (isLoading && !data) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={(e) => setPage(e.selected + 1)}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {notes.length > 0 && (
          <NoteList notes={notes} onDeleted={handleDeleted} />
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onCancel={() => setIsModalOpen(false)}
          onCreated={handleCreated}
        />
      </Modal>
    </div>
  );
}
