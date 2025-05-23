const STORAGE_KEY = 'form_table_data';

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : undefined;
  //   return state? localStorage.clear(): undefined;
};