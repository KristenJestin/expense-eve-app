// imports
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, StyleService, useStyleSheet } from '@ui-kitten/components'

import { AppTopNavigation } from '@/components'

// props
type Props = {
    title?: string
    children?: JSX.Element | JSX.Element[]
}

// main
const Container: React.FC<Props> = ({ title, children }) => {
    // refs
    const styles = useStyleSheet(themedStyles)

    // render
    return (
        <SafeAreaView style={styles.container}>
            <AppTopNavigation title={title} />
            <Divider />
            <Layout style={styles.container}>{children}</Layout>
        </SafeAreaView>
    )
}

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // backgroundColor: 'background-basic-color-2',
    },
})

// exports
export default Container
