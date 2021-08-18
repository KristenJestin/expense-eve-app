// imports
import React from 'react'
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { BackIcon } from './icons'

// props
interface AppTopNavigationProps {
    title?: string
}

// main
const AppTopNavigation: React.FC<AppTopNavigationProps> = ({ title }) => {
    // refs
    const navigation = useNavigation()

    // methods
    const navigateBack = () => {
        navigation.goBack()
    }

    // components
    const BackAction = () =>
        navigation.canGoBack() ? (
            <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
        ) : (
            <></>
        )

    // render
    return <TopNavigation title={title || 'MyApp'} alignment="center" accessoryLeft={BackAction} />
}

export default AppTopNavigation
