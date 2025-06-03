import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<{ title: string; description: string }>,
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
      this.notes.push(note);
      this.saveNotes();
    },
  },
});
