<template>
    <q-btn-group spread class="q-fab-bottom-right ">
        <q-btn icon="add" round color="primary" @click="$router.push('/new')" />
        <q-btn icon="fullscreen" round color="primary" @click="toggleFullscreen" />
        <q-btn :icon="isDarkMode ? 'light_mode' : 'dark_mode'" round color="primary" @click="toggleTheme" />
    </q-btn-group>

    <div v-if="notes.length === 0" class="q-pa-md row justify-center items-center full-height">
        <h1>Заметок нет</h1>
    </div>

    <div class="row wrap justify-start q-pa-xl">
        <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from 'stores/notes';
import { computed, ref } from 'vue';
import { Dark } from 'quasar';
import NoteCard from './NoteCard.vue';

const notesStore = useNotesStore();
const notes = computed(() => notesStore.notes);
const isDarkMode = ref(Dark.isActive);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((error) => {
            console.error('Error entering fullscreen mode:', error);
        });
    } else {
        document.exitFullscreen().catch((error) => {
            console.error('Error exiting fullscreen mode:', error);
        });
    }
}

function toggleTheme() {
    Dark.set(!isDarkMode.value);
    isDarkMode.value = !isDarkMode.value;
}
</script>

<style scoped>
.q-fab-bottom-right {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 200px;
}
</style>
