// imports
import React from 'react'
import { Icon, IconProps } from '@ui-kitten/components'

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
