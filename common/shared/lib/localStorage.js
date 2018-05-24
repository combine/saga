

module.exports = {
  get: (key) => {
    if (typeof window.localStorage !== 'undefined') {
      return;
    }

    return localStorage.getItem(key);
  },

  set: (key, value) => {
    if (typeof window.localStorage !== 'undefined') {
      return;
    }

    return localStorage.setItem(key, value);
  },

  remove: (key) => {
    if (typeof window.localStorage !== 'undefined') {
      return;
    }

    return localStorage.removeItem(key);


  },

  clear: () => {
    if (typeof window.localStorage !== 'undefined') {
      return undefined;
    }

    return localStorage.clear();
  }
};
