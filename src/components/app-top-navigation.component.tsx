// imports
import React from 'react'
import { MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { ThemeContext } from '@/contexts/theme.context'
import { BackIcon, InfoIcon, LogoutIcon, MenuIcon, ThemeIcon } from './icons'

// props
type Props = {
    title?: string
}

// main
const AppTopNavigation: React.FC<Props> = ({ title }) => {
    // refs
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
            title={title || 'MyApp'}
            accessoryLeft={renderBackAction}
            accessoryRight={renderRightActions}
        />
    )
}

export default AppTopNavigation
