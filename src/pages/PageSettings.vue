<template>
  <q-page padding>
    <q-list bordered padding class="q-mb-md">
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="settings.show12HourTimeFormat" color="blue" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="settings.showTasksInOneList" color="blue" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
  import { useSettingsStore } from 'src/stores/store-settings';
  import { openURL } from 'quasar';
  import { Platform } from 'quasar';
  const $p = Platform;

  const store = useSettingsStore();
  const { settings } = store;

  const visitOurWebsite = () => {
    if ($p.is.android && $p.is.cordova) {
      cordova.InAppBrowser.open('https://santri.pl', '_blank', 'location=yes');
    } else {
      openURL('https://santri.pl');
    }
  };

  const emailUs = () => {
    if ($p.is.android && $p.is.cordova) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cordova.plugins.email.open({
        to: 'michal.stachura@santri.pl',
        subject: 'Todo App Feedback'
      });
    } else {
      window.location.href =
        'mailto:michal.stachura@santri.pl?subject=Todo App Feedback';
    }
  };
</script>
