<template>
    <q-card class="note-card">
        <q-card-section>
            <div class="text-h6 q-my-md">{{ note.title }}</div>
            <q-separator />
            <div class="q-my-md" v-html="note.description"></div>
            <div v-if="note.isTask" :class="taskDeadlineColor">
                Выполнить до {{ note.taskData?.dueDate }}
            </div>
        </q-card-section>
        <q-card-actions align="right">
            <div>
                <q-btn-dropdown flat round dense class="menu-btn" auto-close no-icon>
                    <q-list>
                        <q-item v-if="note.isTask && !note.taskData?.isCompleted" clickable v-ripple
                            @click="completeTask">
                            <q-item-section>Завершить</q-item-section>
                        </q-item>
                        <q-item v-if="note.isTask && note.taskData?.isCompleted" clickable v-ripple @click="revertTask">
                            <q-item-section>Вернуть</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="editNote">

                            <q-item-section>Редактировать</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="deleteNote">
                            <q-item-section>Удалить</q-item-section>
                        </q-item>
                        <q-item v-if="!note.isArchive" clickable v-ripple @click="archiveNote">
                            <q-item-section>В архив</q-item-section>
                        </q-item>
                        <q-item v-if="note.isArchive" clickable v-ripple @click="unarchiveNote">
                            <q-item-section>Из архива</q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
// Renamed component to `NoteCard` to comply with multi-word naming convention.
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotesStore } from 'stores/notes';
import type { Note } from '../models/note';
import type { PropType } from 'vue';
import getTaskDeadlineColor from '../utils/taskUtils';

const props = defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true,
    },
});

const router = useRouter();
const notesStore = useNotesStore();

const currentDate = ref(new Date().toISOString());

const taskDeadlineColor = computed(() => {
    return getTaskDeadlineColor(props.note.taskData?.dueDate || '', currentDate.value);
});

let intervalId: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
    intervalId = setInterval(() => {
        currentDate.value = new Date().toISOString();
    }, 60000); // Обновление каждую минуту
});

onUnmounted(() => {
    if (intervalId !== undefined) {
        clearInterval(intervalId);
    }
});

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

function completeTask() {
    notesStore.completeTask(props.note.id).catch((error: unknown) => {
        console.error('Error completing task:', error);
    });
}

function revertTask() {
    notesStore.revertTask(props.note.id).catch((error: unknown) => {
        console.error('Error reverting task:', error);
    });
}

function archiveNote() {
    notesStore.archiveNote(props.note.id).catch((error: unknown) => {
        console.error('Error archiving note:', error);
    });
}

function unarchiveNote() {
    notesStore.unarchiveNote(props.note.id).catch((error: unknown) => {
        console.error('Error unarchiving note:', error);
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
