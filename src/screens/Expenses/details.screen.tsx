// imports
import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { DateTime } from 'luxon'
import { Button, Card, Layout, Text, Modal } from '@ui-kitten/components'

import { RootStackParamList } from '@/navigation/home.navigator'
import { Container, DetailsPart, Loader } from '@/components'
import { useFindExpense, useDeleteExpense } from '@/hooks/use-expense-queries.hook'

// props
type Props = StackScreenProps<RootStackParamList, 'ExpenseDetails'>

// main
const DetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    // data
    const { id } = route.params

    // refs
    const [modalVisible, setModalVisible] = useState(false)
    const { data: expense, loading: expenseLoading, fetch: expenseFetch } = useFindExpense(id)
    const { loading: expenseDestroyLoading, destroy } = useDeleteExpense(id)

    // effects
    useFocusEffect(
        useCallback(() => {
            expenseFetch()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    )

    // methods
    const handleDelete = async () => {
        await destroy()
        setModalVisible(false)
        navigation.goBack()
    }

    // render
    if (expenseLoading)
        return (
            <Container>
                <View style={styles.loadingContainer}>
                    <Loader />
                </View>
            </Container>
        )

    if (!expense)
        return (
            <Container>
                <Layout style={styles.headerContainer}>
                    <Text category="h2">Expense not found</Text>
                    <Button style={styles.backButton} onPress={() => navigation.goBack()}>
                        Go Back
                    </Button>
                </Layout>
            </Container>
        )

    return (
        <Container>
            <Layout style={styles.container}>
                <DetailsPart hint="Title" value={expense.title} />
                <DetailsPart hint="Cost" value={`${expense.cost}€`} />
                <DetailsPart hint="Date" value={DateTime.fromISO(expense.at).toISODate()} />
            </Layout>
            <Layout style={styles.buttonsContainer}>
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate('ExpenseEdit', { id })}
                >
                    EDIT
                </Button>
                <View style={styles.spacer} />
                <Button
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                    status="danger"
                    appearance="ghost"
                >
                    DELETE
                </Button>
            </Layout>

            <Modal
                visible={modalVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => !expenseDestroyLoading && setModalVisible(false)}
            >
                <Card disabled={true} style={styles.modalContainer}>
                    <Text>Are you sure you want to delete this item ?</Text>
                    <Layout style={styles.modalButtonsContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => setModalVisible(false)}
                            disabled={expenseDestroyLoading}
                        >
                            NOP
                        </Button>
                        <View style={styles.spacer} />
                        <Button
                            onPress={handleDelete}
                            style={styles.button}
                            status="danger"
                            appearance="ghost"
                            disabled={expenseDestroyLoading}
                        >
                            YEP, DELETE
                        </Button>
                    </Layout>
                </Card>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    buttonsContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    button: { flex: 1 },
    spacer: {
        paddingHorizontal: 15,
    },

    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    backButton: {
        marginTop: 25,
    },

    modalContainer: {
        marginHorizontal: 20,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    modalButtonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
})

// exports
export default DetailsScreen
