// imports
import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '@ui-kitten/components'

import { ThemeContext } from '@/contexts/theme.context'

// main
const AppStatusBar = () => {
    // refs
    const themeContext = React.useContext(ThemeContext)
    const uiTheme = useTheme()

    const barStyle = themeContext.theme === 'dark' ? 'light-content' : 'dark-content'

    // render
    return <StatusBar backgroundColor={uiTheme['background-basic-color-2']} barStyle={barStyle} />
}

export default AppStatusBar
