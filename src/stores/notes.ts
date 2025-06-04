import { defineStore } from 'pinia';
import type { Note } from '../models/note';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<Note>,
  }),
  actions: {
    async loadNotes() {
      const notesFromFile = await window.notesAPI.getNotes();
      this.notes = notesFromFile;
    },
    async addNote(note: Note) {
      const serializableNote: Note = { ...note, id: crypto.randomUUID() };
      this.notes.push(serializableNote);
      await window.notesAPI.saveNotes(this.notes.map((n) => ({ ...n })));
    },
    async editNote(note: Note) {
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
