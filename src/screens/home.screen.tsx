// imports
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '@/navigation/home.navigator'
import { useGetExpenses } from '@/hooks/use-queries'
import { ExpenseList, Container, FloatingActionButton } from '@/components'

// props
type Props = StackScreenProps<RootStackParamList, 'Home'>

// main
const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // refs
    const {
        data: expenses,
        loading: expensesLoading,
        fetch: expensesRefresh,
        next: expensesNext,
    } = useGetExpenses()

    // render
    return (
        <Container>
            <ExpenseList
                data={expenses}
                loading={expensesLoading}
                refresh={expensesRefresh}
                next={expensesNext}
            />
            <FloatingActionButton onPress={() => navigation.navigate('ExpenseCreate')} />
        </Container>
    )
}

// exports
export default HomeScreen
