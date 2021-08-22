// imports
import React, { useState } from 'react'
import { Alert, Animated, Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosError } from 'axios'

import { AuthStackParamList } from '@/navigation/auth.navigator'
import { AppStatusBar, ErrorBanner, ErrorMessage } from '@/components'
import { LoadingIndicator } from '@/components/icons'
import { LoginInputs, loginSchema } from '@/api/models/auth.model'
import { login as loginDispatch } from '@/store/modules/auth/actions'
import { useLogin } from '@/hooks/use-auth-queries.hook'
import ErrorResult from '@/api/models/error.model'

// props
type Props = StackScreenProps<AuthStackParamList, 'Login'>

// config
const { width } = Dimensions.get('window')

// main
const LoginScreen: React.FC<Props> = ({ navigation }) => {
    // refs
    const styles = useStyleSheet(themedStyles)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: yupResolver(loginSchema),
    })
    const [error, setError] = useState<string | undefined>()
    const { loading, login } = useLogin()
    const dispatch = useDispatch()

    // methods
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const result = await login(data)
            dispatch(loginDispatch(result))
        } catch (err: Error | AxiosError<ErrorResult> | any) {
            if (axios.isAxiosError(err)) {
                const resultError = err as AxiosError<ErrorResult>
                if (
                    resultError.response &&
                    resultError.response.data &&
                    resultError.response.data.errors
                )
                    setError(resultError.response.data.errors[0].message)
                else setError('an unknown error has occurred')
            } else {
                console.error(err)
                Alert.alert('an unknown error has occurred')
            }
        }
    }

    // render
    return (
        <>
            <AppStatusBar color="background-basic-color-1" />
            <SafeAreaView style={styles.container}>
                <Animated.View style={styles.dot} />
                <View style={styles.headerContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={imageStyles.headerImage}
                    />
                </View>
                <View style={styles.inputsContainer}>
                    {error && <ErrorBanner message={error} />}
                    <View style={styles.formGroup}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Email"
                                    keyboardType="email-address"
                                    status="control"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                />
                            )}
                            name="email"
                        />
                        {errors.email && errors.email.message && (
                            <ErrorMessage message={errors.email.message} />
                        )}
                    </View>
                    <View style={styles.formGroup}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Password"
                                    secureTextEntry
                                    status="control"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                />
                            )}
                            name="password"
                        />
                        {errors.password && errors.password.message && (
                            <ErrorMessage message={errors.password.message} />
                        )}
                    </View>
                </View>
                <Button
                    status="control"
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}
                    accessoryLeft={loading ? LoadingIndicator : <></>}
                >
                    LOGIN
                </Button>
                <Button
                    status="control"
                    appearance="ghost"
                    disabled={loading}
                    onPress={() => navigation.navigate('Signup')}
                >
                    SIGNUP
                </Button>
            </SafeAreaView>
        </>
    )
}

const dotWidth = width * 2.8
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // backgroundColor: 'color-primary-default',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 50,
    },
    headerContainer: {
        marginBottom: 100,
        alignItems: 'center',
    },

    inputsContainer: {
        marginBottom: 50,
    },
    formGroup: {
        marginBottom: 15,
    },

    dot: {
        position: 'absolute',
        top: '10%',
        right: '20%',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'color-primary-default',
        width: dotWidth,
        height: dotWidth,
        borderRadius: dotWidth,
    },
})

const imageStyles = StyleSheet.create({
    headerImage: {
        width: '100%',
        resizeMode: 'contain',
    },
})

// exports
export default LoginScreen
