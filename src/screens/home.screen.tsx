// imports
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Button, Divider, Layout } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { AppTopNavigation } from '../components'
import { ThemeContext } from '../contexts/theme.context'

// main
const HomeScreen = () => {
    // refs
    const themeContext = React.useContext(ThemeContext)
    const navigation = useNavigation()

    // methods
    const navigateDetails = () => {
        navigation.navigate('Details')
    }

    // render
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppTopNavigation />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={navigateDetails}>OPEN DETAILS</Button>
                <Button onPress={themeContext.toggleTheme}>CHANGE THEME</Button>
            </Layout>
        </SafeAreaView>
    )
}

// exports
export default HomeScreen
