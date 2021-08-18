// imports
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@ui-kitten/components'

import { HomeScreen, DetailsScreen } from '@/screens'
import { AppStatusBar } from '@/components'

// config
const { Navigator, Screen } = createStackNavigator()
// main
const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Details" component={DetailsScreen} />
    </Navigator>
)

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
