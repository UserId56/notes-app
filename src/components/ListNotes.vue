<template>
    <div>
        <q-btn icon="add" round color="primary" class="q-fab-bottom-right" @click="$router.push('/new')" />

        <div v-if="notes.length === 0" class="q-pa-md row justify-center items-center"
            style="min-height: calc(100vh - 56px);">
            <h1>Заметок нет</h1>
        </div>

        <div class="row wrap justify-center">
            <NoteCard v-for="note in notes" :key="note.id" :note="note" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from 'stores/notes';
import { computed } from 'vue';
import NoteCard from './NoteCard.vue';

const notesStore = useNotesStore();
const notes = computed(() => notesStore.notes);
</script>

<style scoped>
.q-fab-bottom-right {
    position: fixed;
    bottom: 16px;
    right: 16px;
}
</style>
