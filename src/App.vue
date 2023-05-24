<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useSettingsStore } from './stores/store-settings';
  const settingsStore = useSettingsStore();

  const { getSettings } = settingsStore;

  onMounted(() => {
    getSettings();
  });
</script>
