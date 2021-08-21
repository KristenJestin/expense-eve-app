// imports
import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '@ui-kitten/components'

import { ThemeContext } from '@/contexts/theme.context'

// props
type Props = {
    color?: string
}

// main
const AppStatusBar: React.FC<Props> = ({ color }) => {
    // refs
    const themeContext = React.useContext(ThemeContext)
    const uiTheme = useTheme()

    const barStyle = themeContext.theme === 'dark' ? 'light-content' : 'dark-content'

    // render
    return (
        <StatusBar
            backgroundColor={uiTheme[color || 'background-basic-color-3']}
            barStyle={barStyle}
        />
    )
}

export default AppStatusBar
