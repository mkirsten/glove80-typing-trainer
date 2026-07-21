"use strict";

// localStorage throws when the browser blocks site data (e.g. "block all
// cookies") — fall back to an in-memory map so the app still runs
const store = (() => {
  try {
    localStorage.setItem("tangent-probe", "1");
    localStorage.removeItem("tangent-probe");
    return localStorage;
  } catch (e) {
    const m = new Map();
    return {
      getItem: k => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: k => m.delete(k)
    };
  }
})();

