export const getStorageValuesByKey = (name: string) => {
  const value = localStorage.getItem(name);
  return value;
};

export const setStorageObject = (name: string) => {
  const value = localStorage.setItem('name', JSON.stringify(name));
  return value;
};
