<template>
    <div class="q-pa-md">
        <q-form @submit.prevent="addNote">
            <q-input v-model="title" label="Заголовок" class="q-mb-md" />
            <q-editor v-model="description" label="Описание" class="q-mb-md" toolbar-outline
                :toolbar="toolbarForEditor" />
            <q-btn type="submit" label="Добавить заметку" color="primary" />
        </q-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotesStore } from 'stores/notes';
import { useRouter } from 'vue-router';

const title = ref('');
const description = ref('');
const notesStore = useNotesStore();
const router = useRouter();
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

function addNote() {
    if (title.value.trim() && description.value.trim()) {
        notesStore.addNote({ title: title.value, description: description.value });
        router.push('/').catch((error) => {
            console.error('Navigation error:', error);
        });
    }
}
</script>
