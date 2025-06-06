import type { Note } from '../models/note';

/**
 * Converts an array of Note objects into a plain serializable format.
 * @param notes - Array of Note objects.
 * @returns Array of plain Note objects.
 */
export function serializeNotes(notes: Note[]): Note[] {
  return notes.map((n) => ({
    id: n.id,
    title: n.title,
    description: n.description,
    isTask: n.isTask,
    isArchive: n.isArchive,
    taskData: {
      dueDate: n.taskData.dueDate,
      isCompleted: n.taskData.isCompleted,
    },
  }));
}
