// imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Text } from '@ui-kitten/components'

import { RootStackParamList } from '@/navigation/home.navigator'
import { Container, Loader } from '@/components'
import { useFindExpense } from '@/hooks/use-queries'

// props
type Props = StackScreenProps<RootStackParamList, 'ExpenseDetails'>

// main
const DetailsScreen: React.FC<Props> = ({ route }) => {
    // data
    const { id } = route.params

    // refs
    const { data: expense, loading: expenseLoading } = useFindExpense(id)

    // render
    if (expenseLoading)
        return (
            <Container>
                <View style={styles.loadingContainer}>
                    <Loader />
                </View>
            </Container>
        )

    return (
        <Container>
            <Text category="h2">DETAILS</Text>
            <Text category="h2">{expense?.title}</Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
})

// exports
export default DetailsScreen
