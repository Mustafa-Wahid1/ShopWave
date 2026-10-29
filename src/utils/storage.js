// Small wrapper around localStorage with JSON parsing and safe fallbacks.
// Keeping this in one place means every context persists data the same way.

const PREFIX = 'shopwave:'

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw ? JSON.parse(raw) : fallback
    } catch (err) {
      console.error(`storage.get failed for "${key}"`, err)
      return fallback
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch (err) {
      console.error(`storage.set failed for "${key}"`, err)
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch (err) {
      console.error(`storage.remove failed for "${key}"`, err)
    }
  },
}

export default storage
