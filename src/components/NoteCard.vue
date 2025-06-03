<template>
    <q-card class="note-card">
        <q-card-section>
            <div class="text-h6">{{ note.title }}</div>
            <q-separator />
            <div v-html="note.description"></div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat round dense icon="more_vert" @click="menu = !menu" />
            <q-menu v-model="menu">
                <q-list>
                    <q-item clickable v-ripple @click="editNote">
                        <q-item-section>Редактировать</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="deleteNote">
                        <q-item-section>Удалить</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
// Renamed component to `NoteCard` to comply with multi-word naming convention.
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotesStore } from 'stores/notes';

const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});

const menu = ref(false);
const router = useRouter();
const notesStore = useNotesStore();

function editNote() {
    router.push(`/edit?id=${props.note.id}`).catch((error) => {
        console.error('Navigation error:', error);
    });
}

function deleteNote() {
    notesStore.notes = notesStore.notes.filter(n => n.id !== props.note.id);
    notesStore.saveNotes();
}
</script>

<style scoped>
.note-card {
    width: 335px;
    margin: 8px;
}
</style>
