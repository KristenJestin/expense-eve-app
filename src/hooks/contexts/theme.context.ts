// imports
import { createContext } from 'react'

// exports
export const ThemeContext = createContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>({
    theme: 'dark',
    toggleTheme: () => {},
})
