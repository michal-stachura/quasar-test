import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { LocalStorage } from 'quasar';

interface Settings {
  show12HourTimeFormat: boolean;
  showTasksInOneList: boolean;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive<Settings>({
    show12HourTimeFormat: false,
    showTasksInOneList: false
  });

  watch(
    () => settings,
    (newValue) => {
      LocalStorage.set('settings', newValue);
    },
    { deep: true }
  );

  const getSettings = () => {
    const localStorageSettings = LocalStorage.getItem('settings');

    if (isRecord(localStorageSettings)) {
      for (const key in localStorageSettings) {
        const value = localStorageSettings[key];
        if (
          localStorageSettings.hasOwnProperty(key) &&
          settings.hasOwnProperty(key) &&
          isBoolean(value)
        ) {
          settings[key as keyof Settings] = value;
        }
      }
    }
  };

  return {
    settings,
    getSettings
  };
});
