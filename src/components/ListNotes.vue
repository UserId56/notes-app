<template>
    <q-btn-group spread class="q-fab-bottom-right ">
        <q-btn icon="add" round color="primary" @click="$router.push('/new')" />
        <q-btn icon="fullscreen" round color="primary" @click="toggleFullscreen" />
        <q-btn :icon="isDarkMode ? 'light_mode' : 'dark_mode'" round color="primary" @click="toggleTheme" />
        <q-btn :icon="route.path === '/Archive' ? 'home' : 'archive'" round color="primary" @click="$router.push(route.path === '/Archive' ? '/' : '/Archive')" />
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
import { computed, ref, onMounted } from 'vue';
import { Dark } from 'quasar';
import NoteCard from './NoteCard.vue';
import { useRoute } from 'vue-router';

const notesStore = useNotesStore();
const route = useRoute();
const notes = computed(() => {
    if (route.path === '/') {
        return notesStore.getActiveNotes();
    } else if (route.path === '/Archive') {
        return notesStore.getArchivedNotes();
    }
    return [];
});
const isDarkMode = ref(Dark.isActive);

onMounted(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        const isDark = storedTheme === 'dark';
        Dark.set(isDark);
        isDarkMode.value = isDark;
    }
});

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
    const newTheme = !isDarkMode.value ? 'dark' : 'light';
    Dark.set(!isDarkMode.value);
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', newTheme);
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
