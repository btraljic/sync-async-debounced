export const debounce = (func, wait, immediate = false) => {
  let timeout;

  return (...args) => {
    const context = this;
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(() => func.apply(context, args), wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
