// Define a reusable type for notes
export type Note = {
  id: string;
  title: string;
  description: string;
  isTask: boolean;
  isArchive: boolean;
  isCompleted?: boolean;
};
