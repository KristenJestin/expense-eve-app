// imports
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Button, Divider, Layout } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { ThemeContext } from '@/contexts/theme.context'
import { AppTopNavigation, ExpenseList, Loader } from '@/components'
import { useGetExpenses } from '@/hooks/use-queries'

// main
const HomeScreen = () => {
    // refs
    const themeContext = React.useContext(ThemeContext)
    const navigation = useNavigation()
    const [expenses, expensesloading, expensesRefresh] = useGetExpenses()

    // methods
    const navigateDetails = () => {
        navigation.navigate('Details')
    }

    // render
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppTopNavigation />
            <Divider />
            <Layout>
                {/* <Button onPress={navigateDetails}>OPEN DETAILS</Button>
                <Button onPress={themeContext.toggleTheme}>CHANGE THEME</Button> */}
                {!expensesloading ? (
                    <ExpenseList data={expenses} refresh={expensesRefresh} />
                ) : (
                    <Loader />
                )}
            </Layout>
        </SafeAreaView>
    )
}

// exports
export default HomeScreen
