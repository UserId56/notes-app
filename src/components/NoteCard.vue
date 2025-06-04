<template>
    <q-card class="note-card">
        <q-card-section>
            <div class="text-h6 q-my-md">{{ note.title }}</div>
            <q-separator />
            <div class="q-my-md" v-html="note.description"></div>
        </q-card-section>
        <q-card-actions align="right">
            <div>
                <q-btn-dropdown flat round dense class="menu-btn" auto-close no-icon>
                    <q-list>
                        <q-item clickable v-ripple @click="editNote">
                            <q-item-section>Редактировать</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="deleteNote">
                            <q-item-section>Удалить</q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
// Renamed component to `NoteCard` to comply with multi-word naming convention.
import { useRouter } from 'vue-router';
import { useNotesStore } from 'stores/notes';
import type { Note } from '../models/note';
import type { PropType } from 'vue';

const props = defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true,
    },
});

const router = useRouter();
const notesStore = useNotesStore();

function editNote() {
    router.push(`/edit?id=${props.note.id}`).catch((error) => {
        console.error('Navigation error:', error);
    });
}

function deleteNote() {
    notesStore.deleteNote(props.note.id).catch((error) => {
        console.error('Error deleting note:', error);
    });
}
</script>

<style scoped>
.note-card {
    width: 335px;
    margin: 8px;
}

.menu-btn {
    position: absolute;
    top: 8px;
    right: 8px;
}
</style>
