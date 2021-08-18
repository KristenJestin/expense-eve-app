// imports
import { createContext } from 'react'

// exports
export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
})
