// imports
import { useState } from 'react'

import * as service from '@/api/services/auth.service'
import { LoginInputs } from '@/api/models/auth.model'

// main
const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const login = async (inputs: LoginInputs) => {
        setLoading(true)
        try {
            const result = await service.login(inputs)
            return result
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

// exports
export { useLogin }
