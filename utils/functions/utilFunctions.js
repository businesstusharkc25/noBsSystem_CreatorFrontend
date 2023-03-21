export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) =>
  first === undefined ? "" : first.toLocaleUpperCase(locale) + rest.join("");

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
