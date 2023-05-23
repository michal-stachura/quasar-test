/* eslint-disable */

// Mocks all files ending in `.vue` showing them as plain Vue instances
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

import { ComponentCustomProperties } from 'vue';
import { Task } from 'src/types/Task';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $niceDate: (value: string) => string;
    $searchHighlight: (search: string, text: string) => string;
  }
}

declare module '*.vue' {
  import { App, defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}
