// imports
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from '@ui-kitten/components'

import { AppStatusBar } from '@/components'
import HomeNavigator from './home.navigator'

const AppNavigator = () => {
    // refs
    const uiTheme = useTheme()

    // data
    const navigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            // prevent layout blinking when performing navigation
            background: uiTheme['background-basic-color-1'],
        },
    }

    // render
    return (
        <>
            <AppStatusBar />
            <NavigationContainer theme={navigationTheme}>
                <HomeNavigator />
            </NavigationContainer>
        </>
    )
}

// exports
export default AppNavigator
