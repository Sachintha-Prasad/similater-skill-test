import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import logo from '../assets/similater long logo 1.png'
import LoginModal from './LoginModal'
import { useAuth } from '../context/authContext'
import { toast } from 'react-toastify'
import { FaBars } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

type NavLink = {
    name: string
    path: string
}

const navLinks: NavLink[] = [
    { name: 'location', path: '/location' },
    { name: 'standards', path: '/standards' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
]

const Navbar: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const { isAuthenticated, logout } = useAuth()

    const handleLoginModal = () => {
        setShowLoginModal((prevState) => !prevState)
    }

    const handleLogout = async () => {
        try {
            console.log(isAuthenticated)

            if (isAuthenticated) {
                await logout()
            }
        } catch (error) {
            toast.error('Logout failed. Please try again.')
            console.error('Logout failed:', error)
        }
    }

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState)
    }

    return (
        <>
            <nav className="container flex items-center justify-between gap-6 py-6">
                <Link to="/">
                    <img src={logo} alt="similater logo" />
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden items-center gap-6 sm:flex">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="custom-transition capitalize hover:text-gray-500 focus:text-gray-500"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {isAuthenticated ? (
                        <button
                            className="cta-btn custom-transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="cta-btn custom-transition"
                            onClick={handleLoginModal}
                        >
                            Login
                        </button>
                    )}

                    <div className="flex items-center text-lg sm:hidden">
                        <button onClick={toggleMenu} className="menu-btn">
                            {menuOpen ? <IoClose /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div className="flex flex-col items-start gap-4 bg-primary-dark p-4 text-white sm:hidden">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="custom-transition capitalize hover:text-gray-500 focus:text-gray-500"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}

            {showLoginModal &&
                createPortal(
                    <LoginModal onClose={handleLoginModal} />,
                    document.body
                )}
        </>
    )
}

export default Navbar
