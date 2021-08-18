// imports
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, List, ListItem, IconProps, Text } from '@ui-kitten/components'
import { DateTime } from 'luxon'

import ExpenseModel from '@/api/models/expense.model'

// props
interface ExpenseListProps {
    data: ExpenseModel[]
    refresh?: () => Promise<void>
}

// main
export const ExpenseList: React.FC<ExpenseListProps> = ({ data, refresh }) => {
    // refs
    const [refreshing, setRefreshing] = useState(false)

    // methods
    const handleRefreshing = async () => {
        setRefreshing(true)
        if (refresh) await refresh()
        setRefreshing(false)
    }

    const handleNextPage = async () => {
        console.log('end page')
    }

    // renders
    const renderItemAccessory = () => <Button size="tiny">DETAILS</Button>

    const renderItemIcon = (props: IconProps) => <Icon {...props} name="person" />

    const renderDescription = (item: ExpenseModel) => (
        <>
            <View style={styles.description}>
                <Text category="c2" appearance="hint">
                    {item.cost}€
                </Text>
                <Text category="c2" appearance="hint">
                    {DateTime.fromISO(item.updated_at).toRelative() || ''}
                </Text>
            </View>
        </>
    )

    const renderItem = ({ item }: { item: ExpenseModel; index: number }) => (
        <ListItem
            title={item.title}
            description={renderDescription(item)}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemAccessory}
        />
    )

    // render
    return (
        <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={handleRefreshing}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.25}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        // maxHeight: 192,
    },
    description: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
})

// exports
export default ExpenseList
