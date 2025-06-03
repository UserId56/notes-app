<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="$router.options.history.state.back" flat dense round icon="arrow_back" aria-label="Back"
          @click="$router.back()" />

        <q-toolbar-title>
          {{ $route.meta.title || 'Notes App' }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// No additional script logic is needed as the title is derived from the route meta and back button is conditionally rendered.
</script>
