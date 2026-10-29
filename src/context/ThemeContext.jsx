import { createContext, useContext, useEffect, useState } from 'react'
import storage from '../utils/storage'

const ThemeContext = createContext(null)
const THEME_KEY = 'theme'

// The brief specifies a light theme UI. This context still tracks a
// theme value (and toggler) so the app is structured for future dark-mode
// support, while defaulting to — and visually shipping — light only.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storage.get(THEME_KEY, 'light'))

  useEffect(() => {
    storage.set(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
