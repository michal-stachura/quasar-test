<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show12HourTimeFormat" color="blue" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
  import { useSettingsStore } from 'src/stores/store-settings';
  import { storeToRefs } from 'pinia';

  const store = useSettingsStore();
  const { show12HourTimeFormat } = storeToRefs(store);
</script>
