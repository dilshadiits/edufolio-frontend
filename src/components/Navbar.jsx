import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Import logo images with correct file names
import logoWhite from '../assets/images/edufolio-logo-white.png.png';
import logoBlack from '../assets/images/edufolio-logo-black.png.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Check initial scroll position
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
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

    const handleNavClick = (e, path) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                /* ==================== CSS VARIABLES ==================== */
                .navbar-wrapper {
                    --nav-height: 70px;
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

                /* ==================== NAVBAR BASE ==================== */
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    height: var(--nav-height);
                    display: flex;
                    align-items: center;
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
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                }

                /* ==================== LOGO STYLES ==================== */
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    flex-shrink: 0;
                    height: 100%;
                }

                .logo-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 45px;
                    transition: transform 0.3s ease;
                }

                .logo-white,
                .logo-black {
                    height: 100%;
                    width: auto;
                    max-width: 180px;
                    transition: opacity var(--nav-transition);
                    object-fit: contain;
                }

                .logo-white {
                    opacity: 1;
                }

                .logo-black {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    opacity: 0;
                }

                .navbar.scrolled .logo-white,
                .navbar.menu-open .logo-white {
                    opacity: 0;
                }

                .navbar.scrolled .logo-black,
                .navbar.menu-open .logo-black {
                    opacity: 1;
                }

                .navbar-logo:hover .logo-wrapper {
                    transform: scale(1.02);
                }

                /* ==================== NAV LINKS ==================== */
                .nav-links {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    height: 100%;
                }

                .nav-link {
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    position: relative;
                    transition: all var(--nav-transition);
                    padding: 10px 16px;
                    color: var(--nav-white);
                    border-radius: var(--nav-radius);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    white-space: nowrap;
                }

                .nav-link .nav-icon {
                    font-size: 0.85rem;
                    opacity: 0.85;
                }

                .navbar.scrolled .nav-link {
                    color: var(--nav-text-dark);
                    text-shadow: none;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.15);
                }

                .navbar.scrolled .nav-link:hover {
                    background: var(--nav-light-gray);
                }

                .nav-link.active {
                    color: var(--nav-white) !important;
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%) !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    text-shadow: none !important;
                }

                .nav-link.active .nav-icon {
                    opacity: 1;
                }

                /* ==================== CTA CONTAINER ==================== */
                .cta-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
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
                    white-space: nowrap;
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
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.3);
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
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .cta-btn:hover::before {
                    left: 100%;
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
                    flex-shrink: 0;
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
                    position: fixed;
                    top: var(--nav-height);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--nav-white);
                    padding: 10px 20px 25px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    border-top: 3px solid var(--nav-maroon);
                    animation: slideDown 0.3s ease;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    z-index: 999;
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
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                }

                .mobile-menu-logo {
                    height: 30px;
                    width: auto;
                    object-fit: contain;
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
                    flex-shrink: 0;
                }

                .mobile-nav-link:hover {
                    background: var(--nav-light-gray);
                }

                .mobile-nav-link.active {
                    color: var(--nav-white);
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    border-left-color: transparent;
                    border-radius: var(--nav-radius);
                }

                .mobile-nav-link-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .mobile-nav-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--nav-dark-blue);
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .mobile-nav-link.active .mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2);
                    color: var(--nav-white);
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem;
                    color: var(--nav-maroon);
                }

                .mobile-nav-link.active .chevron {
                    color: var(--nav-white);
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .mobile-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--nav-light-gray);
                    flex-shrink: 0;
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
                    flex-shrink: 0;
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
                    display: none;
                }

                /* ==================== SPACER ==================== */
                .navbar-spacer {
                    height: var(--nav-height);
                    flex-shrink: 0;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1100px) {
                    .nav-links {
                        gap: 4px;
                    }

                    .nav-link {
                        padding: 8px 12px;
                        font-size: 0.85rem;
                    }

                    .nav-link .nav-icon {
                        display: none;
                    }

                    .cta-container {
                        gap: 8px;
                    }

                    .login-btn {
                        padding: 8px 14px;
                        font-size: 0.85rem;
                    }

                    .cta-btn {
                        padding: 10px 16px;
                        font-size: 0.85rem;
                    }
                }

                @media screen and (max-width: 900px) {
                    .login-btn span,
                    .cta-btn span {
                        display: none;
                    }

                    .login-btn,
                    .cta-btn {
                        padding: 10px 12px;
                    }

                    .login-btn i,
                    .cta-btn i {
                        margin: 0;
                    }
                }

                @media screen and (max-width: 768px) {
                    .navbar-wrapper {
                        --nav-height: 65px;
                    }

                    .nav-links,
                    .cta-container {
                        display: none !important;
                    }

                    .mobile-menu-btn {
                        display: flex !important;
                    }

                    .logo-wrapper {
                        height: 38px;
                    }
                }

                @media screen and (max-width: 480px) {
                    .navbar-wrapper {
                        --nav-height: 60px;
                    }

                    .navbar-container {
                        padding: 0 15px;
                    }

                    .logo-wrapper {
                        height: 32px;
                    }

                    .mobile-menu {
                        padding: 10px 15px 20px;
                    }

                    .mobile-menu-logo {
                        height: 25px;
                    }

                    .mobile-nav-link {
                        padding: 12px 14px;
                    }

                    .mobile-login-btn,
                    .mobile-cta-btn {
                        padding: 14px 20px;
                    }
                }

                /* ==================== TOUCH & ACCESSIBILITY ==================== */
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

                @media (prefers-reduced-motion: reduce) {
                    .navbar,
                    .nav-link,
                    .login-btn,
                    .cta-btn,
                    .mobile-menu,
                    .logo-white,
                    .logo-black,
                    .cta-btn::before {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

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
            `}</style>

            <div className="navbar-wrapper">
                {/* Spacer to prevent content from going under fixed navbar */}
                <div className="navbar-spacer"></div>
                
                <nav className={navbarClass}>
                    <div className="navbar-container">
                        {/* Logo */}
                        <a 
                            href="/" 
                            className="navbar-logo"
                            onClick={(e) => handleNavClick(e, '/')}
                        >
                            <div className="logo-wrapper">
                                <img 
                                    src={logoWhite} 
                                    alt="EduFolio" 
                                    className="logo-white"
                                />
                                <img 
                                    src={logoBlack} 
                                    alt="EduFolio" 
                                    className="logo-black"
                                />
                            </div>
                        </a>

                        {/* Desktop Nav Links */}
                        <div className="nav-links">
                            {navLinks.map((link) => (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    <i className={`fa-solid ${link.icon} nav-icon`}></i>
                                    <span className="nav-text">{link.name}</span>
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons - Desktop */}
                        <div className="cta-container">
                            <a 
                                href="/admin/login" 
                                className="login-btn"
                                onClick={(e) => handleNavClick(e, '/admin/login')}
                            >
                                <i className="fa-solid fa-user"></i>
                                <span>Login</span>
                            </a>
                            <a 
                                href="/contact" 
                                className="cta-btn"
                                onClick={(e) => handleNavClick(e, '/contact')}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                <span>Get Started</span>
                            </a>
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
                                <img 
                                    src={logoBlack} 
                                    alt="EduFolio" 
                                    className="mobile-menu-logo"
                                />
                                <span className="mobile-menu-tagline">learn. grow. succeed.</span>
                            </div>

                            {navLinks.map((link) => (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    <div className="mobile-nav-link-content">
                                        <div className="mobile-nav-icon">
                                            <i className={`fa-solid ${link.icon}`}></i>
                                        </div>
                                        <span>{link.name}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-right chevron"></i>
                                </a>
                            ))}
                            
                            <div className="mobile-buttons">
                                <a 
                                    href="/admin/login" 
                                    className="mobile-login-btn"
                                    onClick={(e) => handleNavClick(e, '/admin/login')}
                                >
                                    <i className="fa-solid fa-user"></i>
                                    Login to Dashboard
                                </a>
                                <a 
                                    href="/contact" 
                                    className="mobile-cta-btn"
                                    onClick={(e) => handleNavClick(e, '/contact')}
                                >
                                    <i className="fa-solid fa-paper-plane"></i>
                                    Get Started Free
                                </a>
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
            </div>
        </>
    );
};

export default Navbar;
