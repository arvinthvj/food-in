const getLocalValue = (key, defaultValue = {}) => {
  try {
    // read value from local storage
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
const setLocalValue = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

const removeDuplicates = (arr, type) =>
  arr.filter((v, i, a) => a.findIndex((v2) => v2[type] === v[type]) === i);

export { setLocalValue, getLocalValue, removeDuplicates };
