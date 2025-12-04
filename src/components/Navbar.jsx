import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoWhite from '../assets/images/white.png';
import logoBlack from '../assets/images/black.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll with throttle for performance
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Lock body scroll when mobile menu is open - IMPROVED with menu-open class
    useEffect(() => {
        if (isMobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.classList.add('menu-open');
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.classList.remove('menu-open');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        
        return () => {
            document.body.classList.remove('menu-open');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
        };
    }, [isMobileMenuOpen]);

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Close menu and scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/', icon: 'fa-home', description: 'Back to homepage' },
        { name: 'Programs', path: '/programs', icon: 'fa-graduation-cap', description: 'Explore our programs' },
        { name: 'Universities', path: '/universities', icon: 'fa-building-columns', description: 'Partner universities' },
        { name: 'About', path: '/about', icon: 'fa-info-circle', description: 'Learn about us' },
        { name: 'Contact', path: '/contact', icon: 'fa-envelope', description: 'Get in touch' }
    ];

    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    const handleNavClick = useCallback((e, path) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(path);
        setIsMobileMenuOpen(false);
    }, [navigate]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const showBlackLogo = isScrolled || isMobileMenuOpen;
    const navbarClass = `navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                /* ==================== CSS VARIABLES ==================== */
                :root {
                    --nav-height: 70px;
                    --nav-height-tablet: 65px;
                    --nav-height-mobile: 60px;
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
                    --nav-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    --nav-shadow-strong: 0 6px 25px rgba(139, 35, 70, 0.45);
                }

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
                    /* iOS safe area support */
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }

                .navbar.scrolled,
                .navbar.menu-open {
                    background: var(--nav-white);
                    box-shadow: var(--nav-shadow);
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
                    -webkit-tap-highlight-color: transparent;
                }

                .navbar-logo-img {
                    height: 180px;
                    width: auto;
                    max-width: 180px;
                    object-fit: contain;
                    display: block;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                .navbar-logo:hover .navbar-logo-img {
                    transform: scale(1.02);
                }

                .navbar-logo:active .navbar-logo-img {
                    transform: scale(0.98);
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
                    -webkit-tap-highlight-color: transparent;
                }

                .nav-link .nav-icon {
                    font-size: 0.85rem;
                    opacity: 0.85;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }

                .navbar.scrolled .nav-link {
                    color: var(--nav-text-dark);
                    text-shadow: none;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.15);
                }

                .nav-link:hover .nav-icon {
                    transform: scale(1.1);
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
                    -webkit-tap-highlight-color: transparent;
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

                .login-btn i {
                    transition: transform 0.3s ease;
                }

                .login-btn:hover i {
                    transform: scale(1.1);
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
                    -webkit-tap-highlight-color: transparent;
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
                    box-shadow: var(--nav-shadow-strong);
                }

                .cta-btn i {
                    transition: transform 0.3s ease;
                }

                .cta-btn:hover i {
                    transform: translateX(3px);
                }

                /* ==================== MOBILE MENU BUTTON ==================== */
                .mobile-menu-btn {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    width: 48px;
                    height: 48px;
                    border-radius: var(--nav-radius);
                    transition: all 0.2s ease;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10001;
                    -webkit-tap-highlight-color: transparent;
                }

                .mobile-menu-btn.menu-open {
                    background: var(--nav-light-gray);
                }

                .mobile-menu-btn i {
                    font-size: 1.4rem;
                    color: var(--nav-white);
                    transition: color 0.3s ease, transform 0.3s ease;
                }

                .navbar.scrolled .mobile-menu-btn i,
                .navbar.menu-open .mobile-menu-btn i {
                    color: var(--nav-maroon);
                }

                .mobile-menu-btn:active i {
                    transform: scale(0.9);
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
                    -webkit-backdrop-filter: blur(2px);
                    backdrop-filter: blur(2px);
                }

                .mobile-menu-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                /* ==================== MOBILE MENU ==================== */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;
                    background: var(--nav-white);
                    padding-top: calc(var(--nav-height) + 10px);
                    padding-left: max(20px, env(safe-area-inset-left));
                    padding-right: max(20px, env(safe-area-inset-right));
                    padding-bottom: max(25px, env(safe-area-inset-bottom));
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
                    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), 
                                opacity 0.35s ease, 
                                visibility 0.35s ease;
                    -webkit-transform: translateY(-100%);
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    will-change: transform, opacity;
                }

                .mobile-menu.active {
                    transform: translateY(0);
                    -webkit-transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
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
                    -webkit-tap-highlight-color: transparent;
                }

                .mobile-nav-link:hover,
                .mobile-nav-link:active {
                    background: var(--nav-light-gray);
                }

                .mobile-nav-link.active {
                    color: var(--nav-white);
                    background: linear-gradient(135deg, var(--nav-maroon) 0%, var(--nav-pink) 100%);
                    border-left-color: transparent;
                    border-radius: var(--nav-radius);
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.2);
                }

                .mobile-nav-link-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .mobile-nav-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--nav-dark-blue);
                    font-size: 0.9rem;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .mobile-nav-link:hover .mobile-nav-icon {
                    transform: scale(1.05);
                }

                .mobile-nav-link.active .mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2);
                    color: var(--nav-white);
                }

                .mobile-nav-text {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .mobile-nav-text-main {
                    font-weight: 600;
                    font-size: 1rem;
                }

                .mobile-nav-text-sub {
                    font-size: 0.75rem;
                    opacity: 0.7;
                    font-weight: 400;
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem;
                    color: var(--nav-maroon);
                    transition: transform 0.3s ease;
                }

                .mobile-nav-link:hover .chevron {
                    transform: translateX(3px);
                }

                .mobile-nav-link.active .chevron {
                    color: var(--nav-white);
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .mobile-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: auto;
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
                    transition: all 0.3s ease;
                    min-height: 52px;
                    -webkit-tap-highlight-color: transparent;
                }

                .mobile-login-btn:hover,
                .mobile-login-btn:active {
                    background: var(--nav-dark-blue);
                    color: var(--nav-white);
                }

                .mobile-login-btn i {
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                }

                .mobile-login-btn:active i {
                    transform: scale(1.1);
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
                    transition: all 0.3s ease;
                    border: none;
                    min-height: 54px;
                    -webkit-tap-highlight-color: transparent;
                    position: relative;
                    overflow: hidden;
                }

                .mobile-cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .mobile-cta-btn:active::before {
                    left: 100%;
                }

                .mobile-cta-btn:active {
                    transform: scale(0.98);
                    opacity: 0.95;
                }

                .mobile-cta-btn i {
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                }

                .mobile-cta-btn:active i {
                    transform: translateX(3px);
                }

                /* ==================== MOBILE CONTACT ==================== */
                .mobile-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--nav-light-gray);
                    flex-shrink: 0;
                }

                .mobile-contact-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--nav-gray);
                    margin-bottom: 5px;
                }

                .mobile-contact-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--nav-gray);
                    text-decoration: none;
                    font-size: 0.9rem;
                    padding: 10px 0;
                    transition: all 0.3s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .mobile-contact-link:hover,
                .mobile-contact-link:active {
                    color: var(--nav-maroon);
                }

                .mobile-contact-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--nav-light-gray);
                    color: var(--nav-maroon);
                    font-size: 0.85rem;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .mobile-contact-link:hover .mobile-contact-icon,
                .mobile-contact-link:active .mobile-contact-icon {
                    background: var(--nav-maroon);
                    color: var(--nav-white);
                }

                /* ==================== SOCIAL LINKS ==================== */
                .mobile-social {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--nav-light-gray);
                    flex-shrink: 0;
                }

                .mobile-social-link {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--nav-light-gray);
                    color: var(--nav-text-dark);
                    text-decoration: none;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .mobile-social-link:hover,
                .mobile-social-link:active {
                    transform: translateY(-2px);
                }

                .mobile-social-link.facebook:hover,
                .mobile-social-link.facebook:active {
                    background: #1877F2;
                    color: var(--nav-white);
                }

                .mobile-social-link.twitter:hover,
                .mobile-social-link.twitter:active {
                    background: #1DA1F2;
                    color: var(--nav-white);
                }

                .mobile-social-link.instagram:hover,
                .mobile-social-link.instagram:active {
                    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                    color: var(--nav-white);
                }

                .mobile-social-link.linkedin:hover,
                .mobile-social-link.linkedin:active {
                    background: #0A66C2;
                    color: var(--nav-white);
                }

                .mobile-social-link.youtube:hover,
                .mobile-social-link.youtube:active {
                    background: #FF0000;
                    color: var(--nav-white);
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
                    :root {
                        --nav-height: var(--nav-height-tablet);
                    }

                    .navbar {
                        height: var(--nav-height-tablet);
                    }

                    .navbar-container {
                        height: var(--nav-height-tablet);
                    }

                    .nav-links,
                    .cta-container {
                        display: none;
                    }

                    .mobile-menu-btn {
                        display: flex;
                    }

                    .navbar-logo-img {
                        height: 40px;
                        max-width: 150px;
                    }

                    .mobile-menu {
                        padding-top: calc(var(--nav-height-tablet) + 10px);
                    }
                }

                @media screen and (max-width: 480px) {
                    :root {
                        --nav-height: var(--nav-height-mobile);
                    }

                    .navbar {
                        height: var(--nav-height-mobile);
                    }

                    .navbar-container {
                        padding: 0 15px;
                        height: var(--nav-height-mobile);
                    }

                    .navbar-logo-img {
                        height: 34px;
                        max-width: 130px;
                    }

                    .mobile-menu {
                        padding: calc(var(--nav-height-mobile) + 5px) 15px 20px;
                        padding-bottom: max(20px, env(safe-area-inset-bottom));
                    }

                    .mobile-menu-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 5px;
                    }

                    .mobile-menu-logo {
                        height: 28px;
                    }

                    .mobile-nav-link {
                        padding: 12px 14px;
                    }

                    .mobile-nav-icon {
                        width: 32px;
                        height: 32px;
                    }

                    .mobile-login-btn,
                    .mobile-cta-btn {
                        padding: 14px 20px;
                        min-height: 50px;
                    }

                    .mobile-social-link {
                        width: 38px;
                        height: 38px;
                        font-size: 0.9rem;
                    }
                }

                @media screen and (max-width: 360px) {
                    .navbar-container {
                        padding: 0 12px;
                    }

                    .mobile-menu {
                        padding: calc(var(--nav-height-mobile) + 5px) 12px 15px;
                    }

                    .mobile-nav-link {
                        padding: 10px 12px;
                        font-size: 0.95rem;
                    }

                    .mobile-menu-tagline {
                        font-size: 0.8rem;
                    }
                }

                /* ==================== TOUCH & ACCESSIBILITY ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .login-btn:hover,
                    .cta-btn:hover,
                    .nav-link:hover {
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
                    .mobile-cta-btn,
                    .mobile-contact-link,
                    .mobile-social-link {
                        min-height: 48px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .navbar,
                    .nav-link,
                    .login-btn,
                    .cta-btn,
                    .mobile-menu,
                    .mobile-menu-overlay,
                    .cta-btn::before,
                    .mobile-cta-btn::before {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== FOCUS STYLES ==================== */
                .nav-link:focus-visible,
                .login-btn:focus-visible,
                .cta-btn:focus-visible,
                .mobile-nav-link:focus-visible,
                .mobile-login-btn:focus-visible,
                .mobile-cta-btn:focus-visible,
                .mobile-menu-btn:focus-visible,
                .navbar-logo:focus-visible,
                .mobile-contact-link:focus-visible,
                .mobile-social-link:focus-visible {
                    outline: 3px solid var(--nav-light-blue);
                    outline-offset: 2px;
                }

                /* Remove outline for mouse users */
                .nav-link:focus:not(:focus-visible),
                .login-btn:focus:not(:focus-visible),
                .cta-btn:focus:not(:focus-visible),
                .mobile-nav-link:focus:not(:focus-visible),
                .mobile-login-btn:focus:not(:focus-visible),
                .mobile-cta-btn:focus:not(:focus-visible),
                .mobile-menu-btn:focus:not(:focus-visible),
                .navbar-logo:focus:not(:focus-visible),
                .mobile-contact-link:focus:not(:focus-visible),
                .mobile-social-link:focus:not(:focus-visible) {
                    outline: none;
                }

                /* ==================== HIGH CONTRAST MODE ==================== */
                @media (prefers-contrast: high) {
                    .navbar.scrolled,
                    .navbar.menu-open {
                        border-bottom: 2px solid var(--nav-text-dark);
                    }

                    .nav-link.active,
                    .mobile-nav-link.active {
                        border: 2px solid var(--nav-white);
                    }

                    .mobile-menu {
                        border: 2px solid var(--nav-text-dark);
                    }
                }

                /* ==================== DARK MODE SUPPORT (Optional) ==================== */
                @media (prefers-color-scheme: dark) {
                    /* Add dark mode styles here if needed */
                }
            `}</style>

            <nav className={navbarClass} role="navigation" aria-label="Main navigation">
                <div className="navbar-container">
                    <a 
                        href="/" 
                        className="navbar-logo"
                        onClick={(e) => handleNavClick(e, '/')}
                        aria-label="EduFolio - Go to homepage"
                    >
                        <img 
                            src={showBlackLogo ? logoBlack : logoWhite} 
                            alt="EduFolio Logo" 
                            className="navbar-logo-img"
                            loading="eager"
                        />
                    </a>

                    <div className="nav-links" role="menubar">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.path)}
                                role="menuitem"
                                aria-current={isActive(link.path) ? 'page' : undefined}
                            >
                                <i className={`fa-solid ${link.icon} nav-icon`} aria-hidden="true"></i>
                                <span className="nav-text">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    <div className="cta-container">
                        <a 
                            href="/admin/login" 
                            className="login-btn"
                            onClick={(e) => handleNavClick(e, '/admin/login')}
                            aria-label="Login to dashboard"
                        >
                            <i className="fa-solid fa-user" aria-hidden="true"></i>
                            <span className="btn-text">Login</span>
                        </a>
                        <a 
                            href="/contact" 
                            className="cta-btn"
                            onClick={(e) => handleNavClick(e, '/contact')}
                            aria-label="Get started - Contact us"
                        >
                            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                            <span className="btn-text">Get Started</span>
                        </a>
                    </div>

                    <button
                        className={`mobile-menu-btn ${isMobileMenuOpen ? 'menu-open' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Mobile Menu */}
            <div 
                id="mobile-menu"
                className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                <div className="mobile-menu-header">
                    <img 
                        src={logoBlack} 
                        alt="EduFolio" 
                        className="mobile-menu-logo"
                    />
                    <span className="mobile-menu-tagline">learn. grow. succeed.</span>
                </div>

                <nav role="navigation" aria-label="Mobile navigation">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.path}
                            href={link.path}
                            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.path)}
                            aria-current={isActive(link.path) ? 'page' : undefined}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="mobile-nav-link-content">
                                <div className="mobile-nav-icon">
                                    <i className={`fa-solid ${link.icon}`} aria-hidden="true"></i>
                                </div>
                                <div className="mobile-nav-text">
                                    <span className="mobile-nav-text-main">{link.name}</span>
                                    <span className="mobile-nav-text-sub">{link.description}</span>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right chevron" aria-hidden="true"></i>
                        </a>
                    ))}
                </nav>
                
                <div className="mobile-buttons">
                    <a 
                        href="/admin/login" 
                        className="mobile-login-btn"
                        onClick={(e) => handleNavClick(e, '/admin/login')}
                    >
                        <i className="fa-solid fa-user" aria-hidden="true"></i>
                        Login to Dashboard
                    </a>
                    <a 
                        href="/contact" 
                        className="mobile-cta-btn"
                        onClick={(e) => handleNavClick(e, '/contact')}
                    >
                        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                        Get Started Free
                    </a>
                </div>

                <div className="mobile-contact">
                    <span className="mobile-contact-title">Contact Us</span>
                    <a href="tel:+919876543210" className="mobile-contact-link">
                        <div className="mobile-contact-icon">
                            <i className="fa-solid fa-phone" aria-hidden="true"></i>
                        </div>
                        <span>+91 98765 43210</span>
                    </a>
                    <a href="mailto:info@edufolio.com" className="mobile-contact-link">
                        <div className="mobile-contact-icon">
                            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                        </div>
                        <span>info@edufolio.com</span>
                    </a>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mobile-contact-link">
                        <div className="mobile-contact-icon">
                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        </div>
                        <span>Mumbai, India</span>
                    </a>
                </div>

                <div className="mobile-social">
                    <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mobile-social-link facebook"
                        aria-label="Follow us on Facebook"
                    >
                        <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mobile-social-link twitter"
                        aria-label="Follow us on Twitter"
                    >
                        <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mobile-social-link instagram"
                        aria-label="Follow us on Instagram"
                    >
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mobile-social-link linkedin"
                        aria-label="Follow us on LinkedIn"
                    >
                        <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mobile-social-link youtube"
                        aria-label="Subscribe on YouTube"
                    >
                        <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
