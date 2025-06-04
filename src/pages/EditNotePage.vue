<template>
    <div class="q-pa-md">
        <q-form @submit.prevent="saveNote">
            <q-input v-model="title" label="Заголовок" class="q-mb-md" />
            <q-editor v-model="description" label="Описание" class="q-mb-md" toolbar-outline
                :toolbar="toolbarForEditor" />
            <q-btn type="submit" :label="route.query.id ? 'Изменить заметку' : 'Добавить заметку'" color="primary" />
        </q-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotesStore } from 'stores/notes';
import { useRouter, useRoute } from 'vue-router';

const title = ref('');
const description = ref('');
const notesStore = useNotesStore();
const router = useRouter();
const route = useRoute();
const toolbarConfig = [
    {
        label: 'Formatting',
        commands: ['bold', 'italic', 'strike', 'underline'],
    },
    {
        label: 'Alignment',
        commands: ['left', 'center', 'right', 'justify'],
    },
    {
        label: 'Lists',
        commands: ['unordered', 'ordered'],
    },
    {
        label: 'Headers',
        commands: ['h1', 'h2', 'h3'],
    },
    {
        label: 'Actions',
        commands: ['undo', 'redo', 'fullscreen'],
    },
];

const toolbarForEditor = toolbarConfig.map(group => group.commands);

function saveNote() {
    if (title.value.trim() && description.value.trim()) {
        const noteId = route.query.id as string;
        if (noteId) {
            notesStore.editNote({ id: noteId, title: title.value, description: description.value }).catch((error) => {
                console.error('Error editing note:', error);
            });
        } else {
            notesStore.addNote({ title: title.value, description: description.value }).catch((error) => {
                console.error('Error adding note:', error);
            });
        }
        router.push('/').catch((error) => {
            console.error('Navigation error:', error);
        });
    }
}

onMounted(() => {
    const noteId = route.query.id as string;
    if (noteId) {
        const note = notesStore.notes.find(n => n.id === noteId);
        if (note) {
            title.value = note.title;
            description.value = note.description;
        }
    }
});
</script>
