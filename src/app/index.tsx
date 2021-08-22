// imports
import 'intl'
import 'intl/locale-data/jsonp/en'

import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'
import { dark, light, mapping } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { default as appTheme } from './theme.json'
import { ThemeContext } from '@/hooks/contexts/theme.context'
import { AppNavigator } from '@/navigation'
import { createStore } from '@/store'
import { setupInterceptors } from '@/api/modules/client'

// main
export default () => {
    // data
    const store = createStore()

    // refs
    const [theme, setTheme] = React.useState<'dark' | 'light'>(useColorScheme() || 'light')
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    // effects
    useEffect(() => {
        setupInterceptors(store)
    }, [store])

    // data
    const themes = {
        dark,
        light,
    }

    // render
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider mapping={mapping} theme={{ ...themes[theme], ...appTheme }}>
                    <StoreProvider store={store}>
                        <AppNavigator />
                    </StoreProvider>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </>
    )
}
