import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/', icon: 'fa-home' },
        { name: 'Programs', path: '/programs', icon: 'fa-graduation-cap' },
        { name: 'Universities', path: '/universities', icon: 'fa-building-columns' },
        { name: 'About', path: '/about', icon: 'fa-info-circle' },
        { name: 'Contact', path: '/contact', icon: 'fa-envelope' }
    ];

    const isActive = (path) => location.pathname === path;

    // Dynamic classes based on state
    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                /* ==================== NAVBAR STYLES ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== CSS VARIABLES ==================== */
                :root {
                    --nav-light-blue: #0099D6;
                    --nav-dark-blue: #00529D;
                    --nav-maroon: #8B2346;
                    --nav-dark-maroon: #6B1D3A;
                    --nav-pink: #C4567A;
                    --nav-white: #FFFFFF;
                    --nav-light-gray: #F5F7FA;
                    --nav-gray: #64748B;
                    --nav-text-dark: #2D1B4E;
                    --nav-transition: 0.3s ease;
                    --nav-radius: 10px;
                    --nav-radius-lg: 12px;
                }

                /* ==================== BASE NAVBAR ==================== */
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 12px 0;
                    transition: all var(--nav-transition);
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: transparent;
                }

                .navbar.scrolled,
                .navbar.menu-open {
                    background: var(--nav-white);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .navbar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* ==================== LOGO ==================== */
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    gap: 10px;
                }

                .logo-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    border-radius: var(--nav-radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.4);
                    flex-shrink: 0;
                }

                .logo-text {
                    display: flex;
                    font-size: 1.6rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .logo-edu {
                    font-weight: 800;
                    transition: color var(--nav-transition);
                    color: var(--nav-white);
                }

                .logo-folio {
                    font-weight: 400;
                    transition: color var(--nav-transition);
                    color: var(--nav-light-blue);
                }

                .navbar.scrolled .logo-edu,
                .navbar.menu-open .logo-edu {
                    color: var(--nav-maroon);
                }

                .navbar.scrolled .logo-folio,
                .navbar.menu-open .logo-folio {
                    color: var(--nav-dark-blue);
                }

                /* ==================== NAV LINKS ==================== */
                .nav-links {
                    display: flex;
                    gap: 32px;
                    align-items: center;
                }

                .nav-link {
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    position: relative;
                    transition: color var(--nav-transition);
                    padding: 8px 0;
                    color: var(--nav-white);
                }

                .navbar.scrolled .nav-link {
                    color: var(--nav-text-dark);
                }

                .nav-link:hover {
                    opacity: 0.85;
                }

                .nav-link.active {
                    color: var(--nav-maroon) !important;
                }

                .active-indicator {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    border-radius: 2px;
                }

                /* ==================== CTA CONTAINER ==================== */
                .cta-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .login-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 18px;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: var(--nav-radius);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all var(--nav-transition);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    color: var(--nav-white);
                    background: rgba(255, 255, 255, 0.1);
                }

                .navbar.scrolled .login-btn {
                    color: var(--nav-dark-blue);
                    border-color: var(--nav-dark-blue);
                    background: rgba(0, 82, 157, 0.1);
                }

                .login-btn:hover {
                    background: var(--nav-dark-blue) !important;
                    color: var(--nav-white) !important;
                    border-color: var(--nav-dark-blue) !important;
                    transform: translateY(-1px);
                }

                .cta-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 22px;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    color: var(--nav-white);
                    border-radius: var(--nav-radius);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.4);
                    transition: all var(--nav-transition);
                }

                .cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(139, 35, 70, 0.45);
                }

                /* ==================== MOBILE MENU BUTTON ==================== */
                .mobile-menu-btn {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    width: 44px;
                    height: 44px;
                    border-radius: var(--nav-radius);
                    transition: all 0.2s ease;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-menu-btn.menu-open {
                    background: var(--nav-light-gray);
                }

                .mobile-menu-btn i {
                    font-size: 1.3rem;
                    color: var(--nav-white);
                    transition: color var(--nav-transition);
                }

                .navbar.scrolled .mobile-menu-btn i,
                .navbar.menu-open .mobile-menu-btn i {
                    color: var(--nav-maroon);
                }

                /* ==================== MOBILE MENU ==================== */
                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--nav-white);
                    padding: 10px 20px 25px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    border-top: 3px solid var(--nav-maroon);
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .mobile-menu-header {
                    padding: 10px 0 15px;
                    border-bottom: 1px solid var(--nav-light-gray);
                    margin-bottom: 10px;
                }

                .mobile-menu-tagline {
                    color: var(--nav-light-blue);
                    font-size: 0.9rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .mobile-nav-link {
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    padding: 14px 16px;
                    border-radius: var(--nav-radius);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s ease;
                    color: var(--nav-text-dark);
                    background: transparent;
                    border-left: 3px solid transparent;
                }

                .mobile-nav-link:hover {
                    background: var(--nav-light-gray);
                }

                .mobile-nav-link.active {
                    color: var(--nav-maroon);
                    background: rgba(139, 35, 70, 0.1);
                    border-left-color: var(--nav-maroon);
                }

                .mobile-nav-link-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .mobile-nav-link-content i {
                    color: var(--nav-dark-blue);
                    width: 20px;
                    text-align: center;
                }

                .mobile-nav-link.active .mobile-nav-link-content i {
                    color: var(--nav-maroon);
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem;
                    color: var(--nav-maroon);
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .mobile-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--nav-light-gray);
                }

                .mobile-login-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 24px;
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--nav-dark-blue);
                    border: 2px solid var(--nav-dark-blue);
                    border-radius: var(--nav-radius-lg);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all var(--nav-transition);
                }

                .mobile-login-btn:hover {
                    background: var(--nav-dark-blue);
                    color: var(--nav-white);
                }

                .mobile-cta-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    color: var(--nav-white);
                    border-radius: var(--nav-radius-lg);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    transition: all var(--nav-transition);
                }

                .mobile-cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(139, 35, 70, 0.4);
                }

                /* ==================== MOBILE CONTACT ==================== */
                .mobile-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--nav-light-gray);
                }

                .mobile-contact-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--nav-gray);
                    text-decoration: none;
                    font-size: 0.9rem;
                    padding: 8px 0;
                    transition: color var(--nav-transition);
                }

                .mobile-contact-link:hover {
                    color: var(--nav-maroon);
                }

                .mobile-contact-link i {
                    width: 20px;
                    text-align: center;
                }

                /* ==================== OVERLAY ==================== */
                .navbar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 999;
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1024px) {
                    .nav-links {
                        gap: 24px;
                    }
                }

                @media screen and (max-width: 768px) {
                    .nav-links,
                    .cta-container {
                        display: none !important;
                    }

                    .mobile-menu-btn {
                        display: flex !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    .navbar-container {
                        padding: 0 15px;
                    }

                    .logo-text {
                        font-size: 1.4rem;
                    }

                    .logo-icon {
                        width: 40px;
                        height: 40px;
                    }

                    .mobile-menu {
                        padding: 10px 15px 20px;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .login-btn:hover,
                    .cta-btn:hover,
                    .mobile-login-btn:hover,
                    .mobile-cta-btn:hover {
                        transform: none;
                    }

                    .login-btn:active,
                    .cta-btn:active,
                    .mobile-login-btn:active,
                    .mobile-cta-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .mobile-menu-btn,
                    .mobile-nav-link,
                    .mobile-login-btn,
                    .mobile-cta-btn {
                        min-height: 48px;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .navbar,
                    .nav-link,
                    .login-btn,
                    .cta-btn,
                    .mobile-menu,
                    .navbar-overlay {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== FOCUS STATES ==================== */
                .nav-link:focus,
                .login-btn:focus,
                .cta-btn:focus,
                .mobile-nav-link:focus,
                .mobile-login-btn:focus,
                .mobile-cta-btn:focus,
                .mobile-menu-btn:focus,
                .navbar-logo:focus {
                    outline: 3px solid var(--nav-light-blue);
                    outline-offset: 2px;
                }

                .mobile-menu-btn:focus {
                    outline-offset: 0;
                }
            `}</style>

            <nav className={navbarClass}>
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3L20 7.5V9H4V7.5L12 3Z" fill="white"/>
                                <path d="M6 10H18V11L12 14L6 11V10Z" fill="#0099D6"/>
                                <path d="M8 12V16L12 18L16 16V12" stroke="white" strokeWidth="1.5" fill="none"/>
                                <circle cx="12" cy="6" r="1.5" fill="#0099D6"/>
                                <line x1="12" y1="18" x2="12" y2="21" stroke="white" strokeWidth="1.5"/>
                                <circle cx="12" cy="21" r="1" fill="white"/>
                            </svg>
                        </div>
                        <div className="logo-text">
                            <span className="logo-edu">edu</span>
                            <span className="logo-folio">folio</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.name}
                                {isActive(link.path) && <span className="active-indicator"></span>}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons - Desktop */}
                    <div className="cta-container">
                        <Link to="/admin/login" className="login-btn">
                            <i className="fa-solid fa-user"></i>
                            Login
                        </Link>
                        <Link to="/contact" className="cta-btn">
                            <i className="fa-solid fa-paper-plane"></i>
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`mobile-menu-btn ${isMobileMenuOpen ? 'menu-open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <span className="mobile-menu-tagline">learn. grow. succeed.</span>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="mobile-nav-link-content">
                                    <i className={`fa-solid ${link.icon}`}></i>
                                    <span>{link.name}</span>
                                </div>
                                {isActive(link.path) && (
                                    <i className="fa-solid fa-chevron-right chevron"></i>
                                )}
                            </Link>
                        ))}
                        
                        <div className="mobile-buttons">
                            <Link 
                                to="/admin/login" 
                                className="mobile-login-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-user"></i>
                                Login to Dashboard
                            </Link>
                            <Link 
                                to="/contact" 
                                className="mobile-cta-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                Get Started Free
                            </Link>
                        </div>

                        <div className="mobile-contact">
                            <a href="tel:+919876543210" className="mobile-contact-link">
                                <i className="fa-solid fa-phone"></i>
                                +91 98765 43210
                            </a>
                            <a href="mailto:info@edufolio.com" className="mobile-contact-link">
                                <i className="fa-solid fa-envelope"></i>
                                info@edufolio.com
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    className="navbar-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default Navbar;
