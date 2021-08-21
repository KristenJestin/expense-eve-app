// imports
import React from 'react'
import { View } from 'react-native'
import { Icon, IconProps, Spinner } from '@ui-kitten/components'

// main
export const BackIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="arrow-back" />
)

export const PlusIcon = (props: IconProps): React.ReactElement => <Icon {...props} name="plus" />

export const ThemeIcon = (props: IconProps, type: 'dark' | 'light'): React.ReactElement => (
    <Icon {...props} name={type === 'dark' ? 'sun' : 'moon'} />
)

export const EditIcon = (props: IconProps): React.ReactElement => <Icon {...props} name="edit" />

export const MenuIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="more-vertical" />
)

export const InfoIcon = (props: IconProps): React.ReactElement => <Icon {...props} name="info" />

export const LogoutIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="log-out" />
)

export const CalendarIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="calendar" />
)

export const LoadingIndicator = () => (
    <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Spinner size="small" status="basic" />
    </View>
)

export const ForwardIcon = (props: IconProps) => <Icon {...props} name="chevron-right" />
