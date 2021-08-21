// imports
import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '@/navigation/home.navigator'
import { useGetExpenses } from '@/hooks/use-queries'
import { ExpenseList, Container, FloatingActionButton } from '@/components'
import ExpenseModel from '@/api/models/expense.model'

// props
type Props = StackScreenProps<RootStackParamList, 'Home'>

// main
const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // refs
    const {
        data: expenses,
        loading: expensesLoading,
        refresh: expensesRefresh,
        refreshing: expensesRefreshing,
        next: expensesNext,
    } = useGetExpenses()
    useFocusEffect(
        useCallback(() => {
            expensesRefresh()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    )

    // methods
    const itemPressed = (item: ExpenseModel) => {
        navigation.navigate('ExpenseDetails', { id: item.id })
    }

    // render
    return (
        <Container>
            <ExpenseList
                data={expenses}
                loading={expensesLoading}
                refresh={expensesRefresh}
                refreshing={expensesRefreshing}
                next={expensesNext}
                onPress={itemPressed}
            />
            <FloatingActionButton onPress={() => navigation.navigate('ExpenseCreate')} />
        </Container>
    )
}

// exports
export default HomeScreen
