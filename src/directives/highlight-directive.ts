export const highlightDirective = {
  mounted(el: HTMLElement) {
    const inputElement = el.querySelector(
      '.q-field__native'
    ) as HTMLInputElement;

    inputElement.addEventListener('focus', () => {
      if (inputElement && inputElement.value.length) {
        inputElement.select();
      }
    });
  }
};
