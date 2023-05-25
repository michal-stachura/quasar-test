<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> Todo app </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Login"
        />
        <q-btn
          v-else
          @click="signOut"
          class="absolute-right"
          flat
          icon-right="account_circle"
          label="Logout"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs class="bg-primary text-white shadow-2">
        <template v-for="link in essentialLinks">
          <q-route-tab
            v-if="link.inFooter"
            :key="link.title"
            :name="link.title"
            :icon="link.icon"
            :label="link.title"
            :to="link.link"
          />
        </template>
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      :width="220"
      class="bg-primary"
      show-if-above
      bordered
    >
      <q-list dark>
        <q-item-label header> Navigation </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import EssentialLink from 'components/EssentialLink.vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from 'src/stores/store-auth';

  const authStore = useAuthStore();

  const { loggedIn } = storeToRefs(authStore);
  const { signOut } = authStore;

  const essentialLinks = [
    {
      title: 'Todo',
      caption: 'Dashboard',
      icon: 'space_dashboard',
      link: '/',
      inFooter: true
    },
    {
      title: 'Settings',
      icon: 'tune',
      link: '/settings',
      inFooter: true
    }
  ];
</script>
