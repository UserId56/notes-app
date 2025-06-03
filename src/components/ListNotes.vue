<template>
    <div>
        <q-btn icon="add" round color="primary" class="q-fab-bottom-right" @click="$router.push('/new')" />

        <div v-if="notes.length === 0" class="q-pa-md row justify-center items-center"
            style="min-height: calc(100vh - 56px);">
            <h1>Заметок нет</h1>
        </div>

        <q-card v-for="note in notes" :key="note.title" class="q-mb-md">
            <q-card-section>
                <div class="text-h6">{{ note.title }}</div>
            </q-card-section>
            <q-card-section>
                <div v-html="note.description"></div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from 'stores/notes';
import { computed } from 'vue';

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
