// imports
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Text } from '@ui-kitten/components'

import { AuthStackParamList } from '@/navigation/auth.navigator'
import { AppStatusBar } from '@/components'

// props
type Props = StackScreenProps<AuthStackParamList, 'Signup'>

// main
const SignupScreen: React.FC<Props> = ({ navigation }) => (
    <>
        <AppStatusBar color="background-basic-color-1" />
        <SafeAreaView style={styles.container}>
            <Text>in dev ...</Text>
            <Button onPress={() => navigation.goBack()}>Go Back</Button>
        </SafeAreaView>
    </>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

// exports
export default SignupScreen
