import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoWhite from '../assets/images/white.png';
import logoBlack from '../assets/images/black.png';

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
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Lock body scroll when mobile menu is open - IMPROVED
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
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

    const showBlackLogo = isScrolled || isMobileMenuOpen;
    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                /* ==================== NAVBAR BASE ==================== */
                .navbar,
                .navbar *,
                .navbar *::before,
                .navbar *::after,
                .mobile-menu-overlay,
                .mobile-menu,
                .mobile-menu *,
                .mobile-menu *::before,
                .mobile-menu *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .navbar {
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

                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    height: var(--nav-height);
                    display: flex;
                    align-items: center;
                    transition: background 0.3s ease, box-shadow 0.3s ease;
                    background: transparent;
                    width: 100%;
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
                    height: var(--nav-height);
                    position: relative;
                }

                /* ==================== LOGO ==================== */
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    flex-shrink: 0;
                    height: var(--nav-height);
                    position: relative;
                    z-index: 10;
                }

                .navbar-logo-img {
                    height: 180px;
                    width: auto;
                    max-width: 180px;
                    object-fit: contain;
                    display: block;
                    transition: transform 0.3s ease;
                }

                .navbar-logo:hover .navbar-logo-img {
                    transform: scale(1.02);
                }

                /* ==================== NAV LINKS ==================== */
                .nav-links {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .nav-link {
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    position: relative;
                    transition: all 0.3s ease;
                    padding: 10px 16px;
                    color: var(--nav-white);
                    border-radius: var(--nav-radius);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    white-space: nowrap;
                    background: transparent;
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
                    color: var(--nav-white);
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    text-shadow: none;
                }

                .nav-link.active .nav-icon {
                    opacity: 1;
                }

                /* ==================== CTA BUTTONS ==================== */
                .cta-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
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
                    transition: all 0.3s ease;
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
                    background: var(--nav-dark-blue);
                    color: var(--nav-white);
                    border-color: var(--nav-dark-blue);
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
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                    border: none;
                }

                .cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
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
                    position: relative;
                    z-index: 10001;
                }

                .mobile-menu-btn.menu-open {
                    background: var(--nav-light-gray);
                }

                .mobile-menu-btn i {
                    font-size: 1.3rem;
                    color: var(--nav-white);
                    transition: color 0.3s ease;
                }

                .navbar.scrolled .mobile-menu-btn i,
                .navbar.menu-open .mobile-menu-btn i {
                    color: var(--nav-maroon);
                }

                /* ==================== MOBILE MENU OVERLAY ==================== */
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 9997;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }

                .mobile-menu-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                /* ==================== MOBILE MENU - FIXED ==================== */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100vh;
                    height: 100dvh; /* Dynamic viewport height for mobile */
                    background: #FFFFFF;
                    padding-top: 75px; /* Space for navbar */
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 25px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    z-index: 9998;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
                    /* iOS Safari fix */
                    -webkit-transform: translateY(-100%);
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                }

                .mobile-menu.active {
                    transform: translateY(0);
                    -webkit-transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }

                .mobile-menu-header {
                    padding: 10px 0 15px;
                    border-bottom: 1px solid #F5F7FA;
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
                    color: #0099D6;
                    font-size: 0.9rem;
                    font-weight: 600;
                    font-style: italic;
                }

                .mobile-nav-link {
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    padding: 14px 16px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s ease;
                    color: #2D1B4E;
                    background: transparent;
                    border-left: 3px solid transparent;
                    flex-shrink: 0;
                }

                .mobile-nav-link:hover,
                .mobile-nav-link:active {
                    background: #F5F7FA;
                }

                .mobile-nav-link.active {
                    color: #FFFFFF;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%);
                    border-left-color: transparent;
                    border-radius: 10px;
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
                    color: #00529D;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .mobile-nav-link.active .mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2);
                    color: #FFFFFF;
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem;
                    color: #8B2346;
                }

                .mobile-nav-link.active .chevron {
                    color: #FFFFFF;
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .mobile-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: auto;
                    padding-top: 15px;
                    border-top: 1px solid #F5F7FA;
                    flex-shrink: 0;
                }

                .mobile-login-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 24px;
                    background: rgba(0, 82, 157, 0.1);
                    color: #00529D;
                    border: 2px solid #00529D;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    min-height: 50px;
                }

                .mobile-login-btn:hover,
                .mobile-login-btn:active {
                    background: #00529D;
                    color: #FFFFFF;
                }

                .mobile-cta-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%);
                    color: #FFFFFF;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3);
                    transition: all 0.3s ease;
                    border: none;
                    min-height: 50px;
                }

                .mobile-cta-btn:active {
                    transform: scale(0.98);
                    opacity: 0.9;
                }

                /* ==================== MOBILE CONTACT ==================== */
                .mobile-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #F5F7FA;
                    flex-shrink: 0;
                }

                .mobile-contact-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #64748B;
                    text-decoration: none;
                    font-size: 0.9rem;
                    padding: 8px 0;
                    transition: color 0.3s ease;
                }

                .mobile-contact-link:hover {
                    color: #8B2346;
                }

                .mobile-contact-link i {
                    width: 20px;
                    text-align: center;
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
                    .login-btn .btn-text,
                    .cta-btn .btn-text {
                        display: none;
                    }

                    .login-btn,
                    .cta-btn {
                        padding: 10px 12px;
                        gap: 0;
                    }
                }

                @media screen and (max-width: 768px) {
                    .navbar {
                        --nav-height: 65px;
                    }

                    .nav-links,
                    .cta-container {
                        display: none;
                    }

                    .mobile-menu-btn {
                        display: flex;
                    }

                    .navbar-logo-img {
                        height: 38px;
                    }

                    .mobile-menu {
                        padding-top: 70px;
                    }
                }

                @media screen and (max-width: 480px) {
                    .navbar {
                        --nav-height: 60px;
                    }

                    .navbar-container {
                        padding: 0 15px;
                    }

                    .navbar-logo-img {
                        height: 32px;
                    }

                    .mobile-menu {
                        padding: 65px 15px 20px;
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
                    .cta-btn:hover {
                        transform: none;
                    }

                    .login-btn:active,
                    .cta-btn:active {
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
                    .cta-btn::before {
                        animation: none;
                        transition-duration: 0.01ms;
                    }
                }

                /* Focus styles */
                .nav-link:focus,
                .login-btn:focus,
                .cta-btn:focus,
                .mobile-nav-link:focus,
                .mobile-login-btn:focus,
                .mobile-cta-btn:focus,
                .mobile-menu-btn:focus,
                .navbar-logo:focus {
                    outline: 3px solid #0099D6;
                    outline-offset: 2px;
                }
            `}</style>

            <nav className={navbarClass}>
                <div className="navbar-container">
                    <a 
                        href="/" 
                        className="navbar-logo"
                        onClick={(e) => handleNavClick(e, '/')}
                    >
                        <img 
                            src={showBlackLogo ? logoBlack : logoWhite} 
                            alt="EduFolio" 
                            className="navbar-logo-img"
                        />
                    </a>

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

                    <div className="cta-container">
                        <a 
                            href="/admin/login" 
                            className="login-btn"
                            onClick={(e) => handleNavClick(e, '/admin/login')}
                        >
                            <i className="fa-solid fa-user"></i>
                            <span className="btn-text">Login</span>
                        </a>
                        <a 
                            href="/contact" 
                            className="cta-btn"
                            onClick={(e) => handleNavClick(e, '/contact')}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            <span className="btn-text">Get Started</span>
                        </a>
                    </div>

                    <button
                        className={`mobile-menu-btn ${isMobileMenuOpen ? 'menu-open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu - Always rendered, visibility controlled by CSS */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
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
        </>
    );
};

export default Navbar;
