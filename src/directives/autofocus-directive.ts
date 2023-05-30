import { Platform } from 'quasar';

interface Binding {
  value: {
    delayCordova: number;
  };
}

export const autofocusDirective = {
  mounted(el: HTMLElement, binding: Binding): void {
    console.log(binding);
    const inputElement = el.querySelector(
      '.q-field__native'
    ) as HTMLInputElement;
    const delay =
      Platform.is.cordova && binding.value ? binding.value.delayCordova : 0;
    setTimeout(() => {
      inputElement.focus();
    }, delay);
  }
};
