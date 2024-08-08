import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useAuth } from '../context/authContext'

type LoginModalProps = {
    onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(email, password)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative flex w-full max-w-md flex-col gap-6 rounded-md bg-white p-6 shadow-lg">
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <IoClose className="text-xl" />
                </button>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Sign In</h2>
                    <p className="text-gray-600">Welcome back</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        id="email"
                        type="email"
                        className="mt-1 w-full rounded-md border p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />

                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="mt-1 w-full rounded-md border p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() =>
                                    setShowPassword((prev) => !prev)
                                }
                            />
                            <label
                                htmlFor="showPassword"
                                className="text-sm text-gray-700"
                            >
                                Show Password
                            </label>
                        </div>

                        <a
                            href="#"
                            className="custom-transition text-sm hover:underline"
                        >
                            Lost Your Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="cta-btn custom-transition mt-3 w-fit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal
