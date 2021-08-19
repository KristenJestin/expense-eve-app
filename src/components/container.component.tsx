// imports
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Divider, Layout } from '@ui-kitten/components'

import { AppTopNavigation } from '@/components'

// props
type Props = {
    title?: string
    children?: JSX.Element | JSX.Element[]
}

// main
const Container: React.FC<Props> = ({ title, children }) => (
    <SafeAreaView style={styles.container}>
        <AppTopNavigation title={title} />
        <Divider />
        <Layout style={styles.container}>{children}</Layout>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

// exports
export default Container
