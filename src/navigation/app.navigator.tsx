// imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from '@ui-kitten/components'

import { AppStatusBar } from '@/components'
import HomeNavigator from './home.navigator'
import LoginNavigator from './auth.navigator'
import { RootStates } from '@/store'
import { AuthState } from '@/store/modules/auth'

const AppNavigator = () => {
    // refs
    const uiTheme = useTheme()
    const auth = useSelector<RootStates, AuthState>((state) => state.auth)

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
                {auth.loggedIn ? <HomeNavigator /> : <LoginNavigator />}
            </NavigationContainer>
        </>
    )
}

// exports
export default AppNavigator
