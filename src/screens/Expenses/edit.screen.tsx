// imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Datepicker, Input, Button, Layout, Text } from '@ui-kitten/components'
import { DateTime } from 'luxon'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { RootStackParamList } from '@/navigation/home.navigator'
import { CreateInputs, createSchema } from '@/api/models/expense.model'
import { Container, ErrorMessage, Loader } from '@/components'
import { CalendarIcon, LoadingIndicator } from '@/components/icons'
import { useFindExpense, useUpdateExpense } from '@/hooks/use-queries'

// props
type Props = StackScreenProps<RootStackParamList, 'ExpenseEdit'>

// config
const now = DateTime.local().toJSDate()

// main
const EditScreen: React.FC<Props> = ({ navigation, route }) => {
    // data
    const { id } = route.params

    // refs
    const { data: expense, loading: expenseLoading } = useFindExpense(id)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateInputs>({
        resolver: yupResolver(createSchema),
    })
    const { loading, update } = useUpdateExpense(id)

    // methods
    const onSubmit: SubmitHandler<CreateInputs> = async (data) => {
        await update(data)
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
            <Layout style={styles.formContainer} level="1">
                <View style={styles.formGroup}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Title"
                                placeholder="Sandwich 🥪"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                style={styles.formElement}
                            />
                        )}
                        name="title"
                        defaultValue={expense.title}
                    />
                    {errors.title && errors.title.message && (
                        <ErrorMessage message={errors.title.message} />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Cost"
                                placeholder="3.95"
                                value={value?.toString()}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                style={styles.formElement}
                            />
                        )}
                        name="cost"
                        defaultValue={Number(expense.cost)}
                    />
                    {errors.cost && errors.cost.message && (
                        <ErrorMessage message={errors.cost.message} />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Datepicker
                                label="Date"
                                max={now}
                                date={value}
                                onSelect={onChange}
                                onBlur={onBlur}
                                style={styles.formElement}
                                accessoryRight={CalendarIcon}
                            />
                        )}
                        name="date"
                        defaultValue={DateTime.fromISO(expense.at).toJSDate()}
                    />
                    {errors.date && errors.date.message && (
                        <ErrorMessage message={errors.date.message} />
                    )}
                </View>
            </Layout>
            <View style={styles.buttonsContainer}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    style={styles.signUpButton}
                    disabled={loading}
                    accessoryLeft={loading ? LoadingIndicator : <></>}
                >
                    {!loading ? 'SUBMIT' : 'LOADING'}
                </Button>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },

    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    backButton: {
        marginTop: 25,
    },

    formContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    formElement: {},
    buttonsContainer: {
        marginHorizontal: 16,
        marginVertical: 32,
    },
    signUpButton: {},
})

// exports
export default EditScreen
