// imports
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, SignupScreen } from '@/screens'

// props
type AuthStackParamList = {
    Login: undefined
    Signup: undefined
}

// config
const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()
// main
const LoginNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Signup" component={SignupScreen} />
    </Navigator>
)

// exports
export default LoginNavigator
export type { AuthStackParamList }
