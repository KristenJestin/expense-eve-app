// imports
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'

import { PlusIcon } from './icons'

// props
type Props = {
    onPress: () => void
}

// main
const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
    // refs
    const styles = useStyleSheet(themedStyles)
    const theme = useTheme()

    // render
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
            <PlusIcon style={styles.icon} fill={theme['text-basic-color']} />
        </TouchableOpacity>
    )
}

const themedStyles = StyleService.create({
    container: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: 'color-primary-default',
        borderColor: '#000000',
        borderRadius: 200 / 2,
    },
    icon: {
        width: 32,
        height: 32,
    },
})

// exports
export default FloatingActionButton
