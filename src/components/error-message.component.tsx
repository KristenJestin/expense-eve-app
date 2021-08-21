// imports
import React from 'react'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'

// props
type Props = {
    message: string
}

// main
const ErrorMessage: React.FC<Props> = ({ message }) => {
    // refs
    const styles = useStyleSheet(themedStyles)

    // render
    return (
        <Text style={styles.text} category="p2">
            {message}
        </Text>
    )
}

const themedStyles = StyleService.create({
    text: {
        color: 'color-danger-default',
    },
})

// exports
export default ErrorMessage
