<template>
    <div class="q-pa-md">
        <q-form @submit.prevent="saveNote">
            <q-input v-model="title" label="Заголовок" class="q-mb-md" />
            <q-editor v-model="description" label="Описание" class="q-mb-md" toolbar-outline
                :toolbar="toolbarForEditor" />
            <q-checkbox v-model="isTask" label="Является задачей" class="q-mb-md" />
            <div v-if="isTask" class="q-mb-md q-gutter-md row items-center">
                <q-date v-model="dueDate" mask="YYYY-MM-DD HH:mm" label="Дата выполнения" class="q-w-full" />
                <q-time v-model="dueDate" mask="YYYY-MM-DD HH:mm" label="Время выполнения" class="q-w-full" />
            </div>
            <q-input v-model="index" type="number" label="Индекс" class="q-mb-md" hide-bottom-space />
            <div class="q-mt-md">
                <q-btn type="submit" :label="route.query.id ? 'Изменить заметку' : 'Добавить заметку'"
                    color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotesStore } from 'stores/notes';
import { useRouter, useRoute } from 'vue-router';
import { getCurrentFormattedDate } from '../utils/dateUtils';

const title = ref('');
const description = ref('');
const isTask = ref(false);
const dueDate = ref(getCurrentFormattedDate()); // Default to current date and time
const index = ref<number>(0); // Ensure index is a number
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
        const noteData = {
            id: noteId || crypto.randomUUID(),
            title: title.value,
            description: description.value,
            isTask: isTask.value,
            taskData: {
                dueDate: isTask.value ? dueDate.value : '',
                isCompleted: false,
            },
            isArchive: false,
            index: Number(index.value), // Ensure index is saved as a number
        };

        if (noteId) {
            notesStore.editNote(noteData).catch((error) => {
                console.error('Error editing note:', error);
            });
        } else {
            notesStore.addNote(noteData).catch((error) => {
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
            isTask.value = note.isTask || false;
            dueDate.value = note.taskData?.dueDate || new Date().toISOString().slice(0, 16);
            index.value = note.index || 0; // Set index value for editing
        }
    }
});
</script>
