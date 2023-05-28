<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted } from 'vue';
  import { useSettingsStore } from './stores/store-settings';
  import { useAuthStore } from './stores/store-auth';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  const settingsStore = useSettingsStore();
  const authStore = useAuthStore();
  const $q = useQuasar();

  const { getSettings } = settingsStore;
  const { handleAuthStateChange } = authStore;
  const router = useRouter();

  onMounted(() => {
    if ($q.platform.is.electron) {
      window.electron.ipcRenderer.on('show-settings', () => {
        router.push('/settings');
      });
      window.electron.ipcRenderer.on('show-todo', () => {
        router.push('/');
      });
    }
    getSettings();
    handleAuthStateChange();
  });

  onBeforeUnmount(() => {
    if ($q.platform.is.electron) {
      window.electron.ipcRenderer.removeAllListeners('show-settings');
    }
  });
</script>
