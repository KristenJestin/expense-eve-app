// imports
import React from 'react'
import {
    MenuItem,
    OverflowMenu,
    StyleService,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { ThemeContext } from '@/hooks/contexts/theme.context'
import { BackIcon, InfoIcon, LogoutIcon, MenuIcon, ThemeIcon } from './icons'

// props
type Props = {
    title?: string
}

// main
const AppTopNavigation: React.FC<Props> = ({ title }) => {
    // refs
    const styles = useStyleSheet(themedStyles)
    const navigation = useNavigation()
    const themeContext = React.useContext(ThemeContext)
    const [menuVisible, setMenuVisible] = React.useState(false)

    // methods
    const navigateBack = () => {
        navigation.goBack()
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    const changeTheme = () => {
        themeContext.toggleTheme()
    }

    // components
    const renderBackAction = () =>
        navigation.canGoBack() ? (
            <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
        ) : (
            <></>
        )

    const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction
                icon={(props) => ThemeIcon(props, themeContext.theme)}
                onPress={changeTheme}
            />
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}
            >
                <MenuItem accessoryLeft={InfoIcon} title="About" />
                <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
            </OverflowMenu>
        </React.Fragment>
    )

    // render
    return (
        <TopNavigation
            alignment="center"
            title={title || 'ExpenseEve'}
            accessoryLeft={renderBackAction}
            accessoryRight={renderRightActions}
            style={styles.bar}
        />
    )
}

const themedStyles = StyleService.create({
    bar: {
        backgroundColor: 'background-basic-color-2',
    },
})

export default AppTopNavigation
