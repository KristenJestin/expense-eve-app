// imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '@ui-kitten/components'

import { ThemeContext } from '@/contexts/theme.context'
import { Container } from '@/components'

// main
const SettingsScreen: React.FC = () => {
    // refs
    const themeContext = React.useContext(ThemeContext)

    // render
    return (
        <Container>
            <View style={styles.container}>
                <Button onPress={themeContext.toggleTheme}>CHANGE THEME</Button>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

// exports
export default SettingsScreen
