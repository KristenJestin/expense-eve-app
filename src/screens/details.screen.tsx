import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Text } from '@ui-kitten/components'

import { AppTopNavigation } from '@/components'

const DetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppTopNavigation title="test" />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category="h2">DETAILS</Text>
            </Layout>
        </SafeAreaView>
    )
}

export default DetailsScreen
