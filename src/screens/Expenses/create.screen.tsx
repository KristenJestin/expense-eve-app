// imports
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, Input } from '@ui-kitten/components'

import { RootStackParamList } from '@/navigation/home.navigator'
import { Container } from '@/components'

// props
type Props = StackScreenProps<RootStackParamList, 'ExpenseCreate'>

// main
const CreateScreen: React.FC<Props> = () => {
    // refs
    const [value, setValue] = React.useState('')

    // render
    return (
        <Container>
            <Text category="h2">CREATE</Text>
            <Input
                placeholder="Title"
                value={value}
                onChangeText={(nextValue) => setValue(nextValue)}
            />
        </Container>
    )
}

// exports
export default CreateScreen
