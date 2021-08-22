// imports
import React, { useRef } from 'react'
import { SectionList, SectionListData, View } from 'react-native'
import {
    StyleService,
    useStyleSheet,
    Icon,
    ListItem,
    IconProps,
    Text,
    Divider,
    Layout,
} from '@ui-kitten/components'
import { DateTime } from 'luxon'

import ExpenseModel from '@/api/models/expense.model'
import { Loader } from '.'
import { ForwardIcon } from './icons'
import { groupBy } from '@/utils/array'

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
        if (refresh) await refresh()
    }

    const handleNextPage = async () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            if (next) await next()

            onEndReachedCalledDuringMomentum.current = true
        }
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
            accessoryRight={ForwardIcon}
            onPress={() => onPress && onPress(item)}
        />
    )

    const renderSectionHeader = ({
        section: { title },
    }: {
        section: SectionListData<ExpenseModel, { title: string; data: ExpenseModel[] }>
    }) => (
        <Layout level="3">
            <Text category="p2" appearance="hint" style={styles.section}>
                {title}
            </Text>
        </Layout>
    )

    const renderFooter = () =>
        loading ? (
            <Layout style={styles.loading}>
                <Loader />
            </Layout>
        ) : null

    // render
    return (
        <SectionList
            style={styles.container}
            sections={Object.entries(groupBy(data, (d) => DateTime.fromISO(d.at).toISODate())).map(
                ([key, items]) => ({
                    title: key,
                    data: items,
                })
            )}
            keyExtractor={({ id }) => id}
            renderSectionHeader={renderSectionHeader}
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
    section: {
        paddingVertical: 4,
        paddingHorizontal: 15,
    },
})

// exports
export default ExpenseList
