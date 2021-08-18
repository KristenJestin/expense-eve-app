import 'intl'
import 'intl/locale-data/jsonp/en'

import React from 'react'
import { useColorScheme } from 'react-native'
import { dark, light, mapping } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { default as appTheme } from './theme.json'
import { ThemeContext } from '@/contexts/theme.context'
import { AppNavigator } from '@/navigation'

export default () => {
    // refs
    const [theme, setTheme] = React.useState<'dark' | 'light'>(useColorScheme() || 'light')
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

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
                    <AppNavigator />
                </ApplicationProvider>
            </ThemeContext.Provider>
        </>
    )
}
