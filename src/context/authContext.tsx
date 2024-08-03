import React, { createContext, useState } from 'react'

type AuthContextType = {
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => {},
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

            if (response.ok) {
                setIsAuthenticated(true)
            } else {
                const data = await response.json()
                console.error('Login failed:', data.message)
                throw new Error(data.message || 'Invalid credentials')
            }
        } catch (error) {
            console.error('Login failed:', error)
            throw new Error('Invalid credentials')
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(
                'https://skill-test.similater.website/api/v1/user/logout',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )

            if (response.ok) {
                setIsAuthenticated(false)
            } else {
                const data = await response.json()
                console.error('Logout failed:', data.message)
                throw new Error(data.message || 'Logout failed')
            }
        } catch (error) {
            console.error('Logout failed:', error)
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)
