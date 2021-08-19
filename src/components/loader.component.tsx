// imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Spinner } from '@ui-kitten/components'

// main
export const Loader = (): React.ReactElement => (
    <View style={styles.container}>
        <Spinner size="giant" />
    </View>
)

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

// exports
export default Loader
