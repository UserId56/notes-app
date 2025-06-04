<template>
  <router-view />
</template>

<script setup lang="ts">
import { useNotesStore } from 'stores/notes';

const notesStore = useNotesStore();
notesStore.loadNotes().catch((error) => {
  console.error('Error loading notes:', error);
});
</script>
