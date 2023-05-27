<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted } from 'vue';
  import { useSettingsStore } from './stores/store-settings';
  import { useAuthStore } from './stores/store-auth';
  import { useRouter } from 'vue-router';
  const settingsStore = useSettingsStore();
  const authStore = useAuthStore();

  const { getSettings } = settingsStore;
  const { handleAuthStateChange } = authStore;
  const router = useRouter();

  onMounted(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on('show-settings', (event, arg) => {
        // Tutaj wykonaj coś, kiedy otrzymasz komendę 'show-settings'
        console.log(`Otrzymano komendę show-settings: ${event} - ${arg}`);
        router.push('/settings');
      });
    }
    getSettings();
    handleAuthStateChange();
  });

  onBeforeUnmount(() => {
    if (window.electron) {
      // Pamiętaj, aby usunąć nasłuchiwanie na wiadomości, kiedy komponent jest niszczony
      window.electron.ipcRenderer.removeAllListeners('show-settings');
    }
  });
</script>
