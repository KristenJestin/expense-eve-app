// imports
import React from 'react'
import { Icon, IconProps } from '@ui-kitten/components'

// main
export const BackIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="arrow-back" />
)

export const PlusIcon = (props: IconProps): React.ReactElement => <Icon {...props} name="plus" />
