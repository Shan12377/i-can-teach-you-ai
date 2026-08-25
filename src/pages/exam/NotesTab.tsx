import { useEffect, useState } from 'react';
import styles from './Exam.module.css';

interface Note {
  id: string;
  title: string;
  tag: string;
  body: string;
  updatedAt: number;
}

const STORAGE_KEY = 'ictai_ccaf_notes_v1';
const TAGS = ['', 'D1', 'D2', 'D3', 'D4', 'D5', 'Anti-Patterns', 'General'];

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Storage unavailable (private mode, quota) — notes just won't persist.
  }
}

function formatMeta(updatedAt: number): string {
  const diffMs = Date.now() - updatedAt;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(updatedAt).toLocaleDateString();
}

export default function NotesTab() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const active = notes.find((n) => n.id === activeId) ?? null;

  function addNote() {
    const note: Note = { id: crypto.randomUUID(), title: '', tag: '', body: '', updatedAt: Date.now() };
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
  }

  function updateActive(patch: Partial<Note>) {
    if (!activeId) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === activeId ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function exportNote() {
    if (!active) return;
    const blob = new Blob([`${active.title || 'Untitled note'}\n\n${active.body}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(active.title || 'note').replace(/[^a-z0-9-]+/gi, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1 className={styles.reviewH1}>My Study Notes</h1>
      <p className={`${styles.menuSub} ${styles.tabIntro}`}>
        Write, tag by domain, auto-saved to your browser. Export as .txt anytime.
      </p>
      <div className={styles.notesLayout}>
        <div className={styles.notesSidebar}>
          <div className={styles.notesSidebarHead}>Saved notes</div>
          {notes.map((n) => (
            <div
              key={n.id}
              className={`${styles.noteItem} ${n.id === activeId ? styles.noteItemActive : ''}`}
              onClick={() => setActiveId(n.id)}
            >
              <div className={styles.noteItemText}>
                <div className={styles.noteItemTitle}>{n.title || 'Untitled note'}</div>
                <div className={styles.noteItemPreview}>{n.body || 'No content yet'}</div>
              </div>
              <button
                className={styles.noteDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(n.id);
                }}
                aria-label="Delete note"
              >
                &times;
              </button>
            </div>
          ))}
          <button className={styles.addNoteBtn} onClick={addNote}>+ New note</button>
        </div>

        {active ? (
          <div className={styles.notesEditor}>
            <div className={styles.noteEditorTop}>
              <input
                className={styles.noteTitleInput}
                type="text"
                placeholder="Note title..."
                value={active.title}
                onChange={(e) => updateActive({ title: e.target.value })}
              />
              <select
                className={styles.noteTagSelect}
                value={active.tag}
                onChange={(e) => updateActive({ tag: e.target.value })}
              >
                {TAGS.map((t) => (
                  <option key={t || 'none'} value={t}>{t || 'No tag'}</option>
                ))}
              </select>
            </div>
            <div className={styles.noteEditorBody}>
              <textarea
                className={styles.noteTextarea}
                placeholder="Start typing..."
                value={active.body}
                onChange={(e) => updateActive({ body: e.target.value })}
              />
            </div>
            <div className={styles.noteEditorFooter}>
              <span className={styles.noteMeta}>Saved {formatMeta(active.updatedAt)}</span>
              <button className={styles.reportBtn} onClick={exportNote}>Export .txt</button>
            </div>
          </div>
        ) : (
          <div className={styles.notesEmpty}>
            <p>Create a note to get started.</p>
            <button className={styles.addNoteBtn} onClick={addNote}>Create first note</button>
          </div>
        )}
      </div>
    </div>
  );
}
