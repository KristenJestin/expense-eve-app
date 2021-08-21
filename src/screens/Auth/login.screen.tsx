// imports
import React from 'react'
import { Animated, Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components'

import { RootStackParamList } from '@/navigation/home.navigator'
import { AppStatusBar } from '@/components'

// props
type Props = StackScreenProps<RootStackParamList, 'Home'>

// config
const { width } = Dimensions.get('window')

// main
const LoginScreen: React.FC<Props> = ({ navigation }) => {
    // render
    const styles = useStyleSheet(themedStyles)

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
                    <Input label="Username" status="control" style={styles.input} />
                    <Input label="Password" status="control" style={styles.input} />
                </View>
                <Button status="control">LOGIN</Button>
                <Button status="control" appearance="ghost">
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
    input: {
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
    // dot: {
    //     position: 'absolute',
    //     top: '10%',
    //     right: '20%',
    //     justifyContent: 'center',
    //     alignItems: 'center',

    //     backgroundColor: 'color-primary-default',
    //     width: 1200,
    //     height: 1200,
    //     borderRadius: 1200,
    // },
})

const imageStyles = StyleSheet.create({
    headerImage: {
        width: '100%',
        resizeMode: 'contain',
    },
})

// exports
export default LoginScreen
