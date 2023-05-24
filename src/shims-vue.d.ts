/* eslint-disable */
import { ComponentCustomProperties } from 'vue';

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $niceDate: (value: string) => string;
    $searchHighlight: (search: string, text: string) => string;
  }
}
