export const get = (key) => {
  if (typeof window.localStorage !== 'undefined') {
    return;
  }

  return localStorage.getItem(key);
};

export const set = (key, value) => {
  if (typeof window.localStorage !== 'undefined') {
    return;
  }

  return localStorage.setItem(key, value);
};

export const remove = (key) => {
  if (typeof window.localStorage !== 'undefined') {
    return;
  }

  return localStorage.removeItem(key);
};

export const clear = () => {
  if (typeof window.localStorage !== 'undefined') {
    return undefined;
  }

  return localStorage.clear();
};
