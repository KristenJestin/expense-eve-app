// imports
import React from 'react'
import { View } from 'react-native'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'

// props
type Props = {
    message: string
}

// main
const ErrorBanner: React.FC<Props> = ({ message }) => {
    // refs
    const styles = useStyleSheet(themedStyles)

    // render
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'color-danger-default',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 25,
    },
    text: {},
})

// exports
export default ErrorBanner
