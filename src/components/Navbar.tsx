import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import logo from '../assets/similater long logo 1.png'
import LoginModal from './LoginModal'

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

    const handleLoginModal = () => {
        setShowLoginModal((prevState) => !prevState)
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

                    <button
                        className="cta-btn custom-transition"
                        onClick={handleLoginModal}
                    >
                        login
                    </button>
                </div>
            </nav>

            {showLoginModal &&
                createPortal(
                    <LoginModal onClose={handleLoginModal} />,
                    document.body
                )}
        </>
    )
}

export default Navbar
