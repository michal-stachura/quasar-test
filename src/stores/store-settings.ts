import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const show12HourTimeFormat = ref<boolean>(false);

  return {
    show12HourTimeFormat
  };
});
