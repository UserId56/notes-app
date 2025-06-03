<template>
    <div class="q-pa-md">
        <q-form @submit.prevent="addNote">
            <q-input v-model="title" label="Title" outlined class="q-mb-md" />
            <q-input v-model="description" label="Description" outlined type="textarea" class="q-mb-md" />
            <q-btn type="submit" label="Add Note" color="primary" />
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

function addNote() {
    if (title.value.trim() && description.value.trim()) {
        notesStore.addNote({ title: title.value, description: description.value });
        router.push('/').catch((error) => {
            console.error('Navigation error:', error);
        });
    }
}
</script>
