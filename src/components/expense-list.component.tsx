// imports
import React, { useState } from 'react'
import { View } from 'react-native'
import {
    StyleService,
    useStyleSheet,
    Button,
    Icon,
    List,
    ListItem,
    IconProps,
    Text,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'

import ExpenseModel from '@/api/models/expense.model'
import Loader from './loader.component'

// props
interface ExpenseListProps {
    data: ExpenseModel[]
    loading: boolean
    refresh?: () => Promise<void>
    next?: () => Promise<void>
}

// main
export const ExpenseList: React.FC<ExpenseListProps> = ({ data, loading, refresh, next }) => {
    // refs
    const [refreshing, setRefreshing] = useState(false)
    const styles = useStyleSheet(themedStyles)

    // methods
    const handleRefreshing = async () => {
        setRefreshing(true)
        if (refresh) await refresh()
        setRefreshing(false)
    }

    const handleNextPage = async () => {
        if (next) await next()
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

    const renderFooter = () =>
        loading ? (
            <View style={styles.loading}>
                <Loader />
            </View>
        ) : null

    // render
    return (
        <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={handleRefreshing}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooter}
        />
    )
}

const themedStyles = StyleService.create({
    container: {
        // maxHeight: 192,
        backgroundColor: 'background-basic-color-1',
    },
    description: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    loading: {
        marginVertical: 15,
    },
})

// exports
export default ExpenseList
