import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

type AuthContextType = {
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    userCheck: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => {},
    userCheck: async () => {},
    logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(
                'https://skill-test.similater.website/api/v1/user/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                }
            )

            if (response.status === 200) {
                const data = await response.json()

                if (data.status) {
                    console.log('authenticated')
                    const accessToken = data.data.accessToken
                    const expirationMinutes = 15
                    const expirationDate = new Date(
                        new Date().getTime() + expirationMinutes * 60 * 1000
                    )

                    Cookies.set('accessToken', accessToken, {
                        expires: expirationDate,
                    })

                    setIsAuthenticated(true)
                    toast.success('Successfully logged in!')

                    // automaticaly check the user
                    await userCheck()
                } else {
                    console.log('not authenticated')
                    toast.error('Login failed! Invalid credentials.')
                }
            } else {
                const data = await response.json()
                console.log(data)
                console.error('Login failed:', data.message)
                throw new Error(data.message || 'Invalid credentials')
            }
        } catch (error) {
            console.error('Login failed:', error)
            toast.error('Invalid credentials')
        }
    }

    const userCheck = async () => {
        const accessToken = Cookies.get('accessToken')

        if (!accessToken) {
            toast.error('No access token found!')
            setIsAuthenticated(false)
            return
        }

        try {
            const response = await fetch(
                'https://skill-test.similater.website/api/v1/user/check',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            if (response.status === 200) {
                const data = await response.json()
                console.log('User is valid:', data)
                toast.success('User is validation successfull!!')
            } else {
                console.log('User check failed')
                setIsAuthenticated(false)
                Cookies.remove('accessToken')
                toast.error('User check failed! Logging out...')
            }
        } catch (error) {
            console.error('Not a valid user:', error)
            setIsAuthenticated(false)
            Cookies.remove('accessToken')
            toast.error('User check failed! Logging out...')
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(
                'https://skill-test.similater.website/api/v1/user/logout',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            )

            if (response.ok) {
                Cookies.remove('accessToken')
                setIsAuthenticated(false)
                toast.success('Successfully logged out!')
            } else {
                const data = await response.json()
                console.error('Logout failed:', data.message)
                throw new Error(data.message || 'Logout failed')
            }
        } catch (error) {
            console.error('Logout failed:', error)
            toast.error('Logout failed!')
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, userCheck, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)
