import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<{ id: string; title: string; description: string }>,
  }),
  actions: {
    loadNotes() {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        this.notes = JSON.parse(storedNotes);
      }
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    addNote(note: { title: string; description: string }) {
      this.notes.push({ ...note, id: uuidv4() });
      this.saveNotes();
    },
  },
});
