<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useSettingsStore } from './stores/store-settings';
  import { useAuthStore } from './stores/store-auth';
  const settingsStore = useSettingsStore();
  const authStore = useAuthStore();

  const { getSettings } = settingsStore;
  const { handleAuthStateChange } = authStore;

  onMounted(() => {
    getSettings();
    handleAuthStateChange();
  });
</script>
