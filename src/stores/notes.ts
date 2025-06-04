import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<{ id: string; title: string; description: string }>,
  }),
  actions: {
    async loadNotes() {
      const notesFromFile = await window.notesAPI.getNotes();
      if (notesFromFile.length === 0) {
        const storedNotes = localStorage.getItem('notes');
        this.notes = storedNotes ? JSON.parse(storedNotes) : [];
      } else {
        this.notes = notesFromFile;
      }
    },
    async addNote(note: { title: string; description: string }) {
      const serializableNote = { ...note, id: crypto.randomUUID() };
      this.notes.push(serializableNote);
      console.log('Adding note:', this.notes);
      await window.notesAPI.saveNotes(this.notes.map((n) => ({ ...n })));
    },
    async editNote(note: { id: string; title: string; description: string }) {
      const index = this.notes.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
        await window.notesAPI.saveNotes(this.notes.map((n) => ({ ...n })));
      }
    },
    async deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
      await window.notesAPI.saveNotes(this.notes.map((n) => ({ ...n })));
    },
  },
});
