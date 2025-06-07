import { defineStore } from 'pinia';
import type { Note } from '../models/note';
import { serializeNotes } from '../utils/serializeNotes';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<Note>,
  }),
  actions: {
    async loadNotes() {
      const notesFromFile = await window.notesAPI.getNotes();
      // @ts-expect-error: Partial note objects are being serialized, missing properties will be handled by serializeNotes
      this.notes = serializeNotes(notesFromFile);
    },
    async addNote(note: Note) {
      this.notes.push(note);
      await window.notesAPI.saveNotes(serializeNotes(this.notes));
    },
    async editNote(note: Note) {
      const index = this.notes.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
        await window.notesAPI.saveNotes(serializeNotes(this.notes));
      }
    },
    async deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
      await window.notesAPI.saveNotes(serializeNotes(this.notes));
    },
    async completeTask(id: string) {
      const note = this.notes.find((n) => n.id === id);
      if (!note) {
        console.error(`Note with id ${id} not found.`);
        return;
      }
      if (note.isTask && note.taskData) {
        note.taskData.isCompleted = true;
        note.isArchive = true;
        await window.notesAPI.saveNotes(serializeNotes(this.notes));
      }
    },
    async revertTask(id: string) {
      const note = this.notes.find((n) => n.id === id);
      if (!note) {
        console.error(`Note with id ${id} not found.`);
        return;
      }
      if (note.isTask && note.taskData) {
        note.taskData.isCompleted = false;
        note.isArchive = false;
        await window.notesAPI.saveNotes(serializeNotes(this.notes));
      }
    },
    async archiveNote(id: string) {
      const note = this.notes.find((n) => n.id === id);
      if (!note) {
        console.error(`Note with id ${id} not found.`);
        return;
      }
      if (note.isArchive === false) {
        note.isArchive = true;
        await window.notesAPI.saveNotes(serializeNotes(this.notes));
      }
    },
    async unarchiveNote(id: string) {
      const note = this.notes.find((n) => n.id === id);
      if (!note) {
        console.error(`Note with id ${id} not found.`);
        return;
      }
      if (note.isArchive === true) {
        note.isArchive = false;
        await window.notesAPI.saveNotes(serializeNotes(this.notes));
      }
    },
    getActiveNotes() {
      return this.notes.filter((note) => !note.isArchive).sort((a, b) => a.index - b.index); // Сортировка по полю index
    },
    getArchivedNotes() {
      return this.notes.filter((note) => note.isArchive).sort((a, b) => a.index - b.index); // Сортировка по полю index
    },
  },
});
