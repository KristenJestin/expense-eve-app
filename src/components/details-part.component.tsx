// imports
import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Layout, LayoutProps, Text } from '@ui-kitten/components'

// props
type Props = {
    hint: string
    value: string
} & LayoutProps

// main
const DetailsPart: React.FC<Props> = (props) => {
    // data
    const { style, hint, value, ...layoutProps } = props

    // render
    return (
        <React.Fragment>
            <Layout level="1" {...layoutProps} style={[styles.container, style]}>
                <Text appearance="hint" category="s1">
                    {hint}
                </Text>
                <Text category="s1">{value}</Text>
            </Layout>
            <Divider />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: 16,
    },
})

// exports
export default DetailsPart
