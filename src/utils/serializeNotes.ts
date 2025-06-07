import type { Note } from '../models/note';

/**
 * Converts an array of Note objects into a plain serializable format.
 * @param notes - Array of Note objects.
 * @returns Array of plain Note objects.
 */
export function serializeNotes(notes: Note[]): Note[] {
  return notes.map((n) => ({
    id: n.id ?? '',
    title: n.title ?? '',
    description: n.description ?? '',
    isTask: n.isTask ?? false,
    isArchive: n.isArchive ?? false,
    taskData: {
      dueDate: n.taskData?.dueDate ?? '',
      isCompleted: n.taskData?.isCompleted ?? false,
    },
    index: n.index ?? 999, // Использован оператор nullish coalescing для всех полей
  }));
}
