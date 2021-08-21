// imports
import React, { useRef } from 'react'
import { View } from 'react-native'
import {
    StyleService,
    useStyleSheet,
    Icon,
    List,
    ListItem,
    IconProps,
    Text,
    Divider,
    Layout,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'

import ExpenseModel from '@/api/models/expense.model'
import Loader from './loader.component'

// props
interface ExpenseListProps {
    data: ExpenseModel[]
    loading: boolean
    refresh?: () => Promise<void>
    refreshing: boolean
    next?: () => Promise<void>
    onPress?: (item: ExpenseModel) => void
}

// main
export const ExpenseList: React.FC<ExpenseListProps> = ({
    data,
    loading,
    refresh,
    refreshing,
    next,
    onPress,
}) => {
    // refs
    const styles = useStyleSheet(themedStyles)
    const onEndReachedCalledDuringMomentum = useRef(true)

    // methods
    const handleRefreshing = async () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            if (refresh) await refresh()

            onEndReachedCalledDuringMomentum.current = true
        }
    }

    const handleNextPage = async () => {
        if (next) await next()
    }

    // components
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
            onPress={() => onPress && onPress(item)}
        />
    )

    const renderFooter = () =>
        loading ? (
            <Layout style={styles.loading}>
                <Loader />
            </Layout>
        ) : null

    // render
    return (
        <List
            style={styles.container}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={handleRefreshing}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={Divider}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() => (onEndReachedCalledDuringMomentum.current = false)}
        />
    )
}

const themedStyles = StyleService.create({
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
    loading: {
        marginVertical: 15,
    },
})

// exports
export default ExpenseList
