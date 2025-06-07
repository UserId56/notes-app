// Define a reusable type for notes
export type Note = {
  id: string;
  title: string;
  description: string;
  isTask: boolean;
  isArchive: boolean;
  taskData: {
    dueDate: string;
    isCompleted: boolean;
  };
  index: number; // Добавлено поле index
};
