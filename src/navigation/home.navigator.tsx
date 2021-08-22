// imports
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, ExpenseDetailsScreen, ExpenseCreateScreen, ExpenseEditScreen } from '@/screens'

// props
type RootStackParamList = {
    Home: undefined
    ExpenseDetails: { id: string }
    ExpenseCreate: undefined
    ExpenseEdit: { id: string }
}

// config
const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
// main
const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="ExpenseCreate" component={ExpenseCreateScreen} />
        <Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
        <Screen name="ExpenseEdit" component={ExpenseEditScreen} />
    </Navigator>
)

// exports
export default HomeNavigator
export type { RootStackParamList }
