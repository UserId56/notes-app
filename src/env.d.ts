declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

interface Window {
  notesAPI: {
    getNotes: () => Promise<Array<{ id: string; title: string; description: string }>>;
    addNote: (
      note: { title: string; description: string },
      notes: Array<{ id: string; title: string; description: string }>,
    ) => Promise<void>;
    editNote: (
      note: { id: string; title: string; description: string },
      notes: Array<{ id: string; title: string; description: string }>,
    ) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    saveNotes: (notes: Array<{ id: string; title: string; description: string }>) => Promise<void>;
  };
}
