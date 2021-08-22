// imports
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Datepicker, Input, Button, Layout } from '@ui-kitten/components'
import { DateTime } from 'luxon'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { RootStackParamList } from '@/navigation/home.navigator'
import { CreateInputs, createSchema } from '@/api/models/expense.model'
import { Container, ErrorMessage } from '@/components'
import { CalendarIcon, LoadingIndicator } from '@/components/icons'
import { useStoreExpense } from '@/hooks/use-expense-queries.hook'

// props
type Props = StackScreenProps<RootStackParamList, 'ExpenseCreate'>

// config
const now = DateTime.local().toJSDate()

// main
const CreateScreen: React.FC<Props> = ({ navigation }) => {
    // refs
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateInputs>({
        resolver: yupResolver(createSchema),
    })
    const { loading, store } = useStoreExpense()

    // methods
    const onSubmit: SubmitHandler<CreateInputs> = async (data) => {
        await store(data)
        navigation.goBack()
    }

    // render
    return (
        <Container>
            <Layout style={styles.formContainer} level="1">
                <View style={styles.formGroup}>
                    <Controller
                        control={control}
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
                        defaultValue=""
                    />
                    {errors.title && errors.title.message && (
                        <ErrorMessage message={errors.title.message} />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Controller
                        control={control}
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
                    />
                    {errors.cost && errors.cost.message && (
                        <ErrorMessage message={errors.cost.message} />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Controller
                        control={control}
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
                        defaultValue={now}
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
export default CreateScreen
