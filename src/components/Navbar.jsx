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

    // Lock body scroll when mobile menu is open
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
        { name: 'Home', path: '/', icon: 'fa-house', description: 'Back to homepage' },
        { name: 'Programs', path: '/programs', icon: 'fa-graduation-cap', description: 'Explore our programs' },
        { name: 'Universities', path: '/universities', icon: 'fa-building-columns', description: 'Partner universities' },
        { name: 'About', path: '/about', icon: 'fa-circle-info', description: 'Learn about us' },
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
    const navbarClass = `edufolio-navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <style>{`
                /* ==================== NAVBAR SCOPED STYLES ==================== */
                .edufolio-navbar {
                    --navbar-height: 70px;
                    --navbar-light-blue: #0099D6;
                    --navbar-dark-blue: #00529D;
                    --navbar-maroon: #8B2346;
                    --navbar-dark-maroon: #6B1D3A;
                    --navbar-pink: #C4567A;
                    --navbar-white: #FFFFFF;
                    --navbar-light-gray: #F5F7FA;
                    --navbar-gray: #64748B;
                    --navbar-text-dark: #2D1B4E;
                    --navbar-transition: 0.3s ease;
                    --navbar-radius: 10px;
                    --navbar-radius-lg: 12px;
                    --navbar-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    --navbar-shadow-strong: 0 6px 25px rgba(139, 35, 70, 0.45);
                }

                /* ==================== NAVBAR BASE ==================== */
                .edufolio-navbar,
                .edufolio-navbar *,
                .edufolio-navbar *::before,
                .edufolio-navbar *::after,
                .edufolio-mobile-overlay,
                .edufolio-mobile-menu,
                .edufolio-mobile-menu *,
                .edufolio-mobile-menu *::before,
                .edufolio-mobile-menu *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .edufolio-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    height: var(--navbar-height);
                    display: flex;
                    align-items: center;
                    transition: background 0.3s ease, box-shadow 0.3s ease;
                    background: transparent;
                    width: 100%;
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }

                .edufolio-navbar.scrolled,
                .edufolio-navbar.menu-open {
                    background: var(--navbar-white);
                    box-shadow: var(--navbar-shadow);
                }

                .edufolio-navbar-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: var(--navbar-height);
                    position: relative;
                }

                /* ==================== LOGO - FIXED SIZE ==================== */
                .edufolio-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    flex-shrink: 0;
                    height: var(--navbar-height);
                    position: relative;
                    z-index: 10;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-logo-img {
                    height: 45px;
                    width: auto;
                    max-width: 160px;
                    object-fit: contain;
                    display: block;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                .edufolio-logo:hover .edufolio-logo-img {
                    transform: scale(1.03);
                }

                .edufolio-logo:active .edufolio-logo-img {
                    transform: scale(0.98);
                }

                /* ==================== NAV LINKS WITH ICONS ==================== */
                .edufolio-nav-links {
                    display: flex;
                    gap: 6px;
                    align-items: center;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    list-style: none;
                }

                .edufolio-nav-link {
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    position: relative;
                    transition: all 0.3s ease;
                    padding: 10px 16px;
                    color: var(--navbar-white);
                    border-radius: var(--navbar-radius);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                    white-space: nowrap;
                    background: transparent;
                    -webkit-tap-highlight-color: transparent;
                }

                /* NAV LINK ICONS - ALWAYS VISIBLE */
                .edufolio-nav-link .edufolio-nav-icon {
                    font-size: 0.95rem;
                    opacity: 0.9;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                    height: 18px;
                }

                .edufolio-navbar.scrolled .edufolio-nav-link {
                    color: var(--navbar-text-dark);
                    text-shadow: none;
                }

                .edufolio-nav-link:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-1px);
                }

                .edufolio-nav-link:hover .edufolio-nav-icon {
                    transform: scale(1.15);
                    opacity: 1;
                }

                .edufolio-navbar.scrolled .edufolio-nav-link:hover {
                    background: var(--navbar-light-gray);
                    color: var(--navbar-maroon);
                }

                .edufolio-nav-link.active {
                    color: var(--navbar-white);
                    background: linear-gradient(135deg, var(--navbar-maroon) 0%, var(--navbar-pink) 100%);
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.35);
                    text-shadow: none;
                }

                .edufolio-nav-link.active .edufolio-nav-icon {
                    opacity: 1;
                }

                /* Underline effect for non-active links */
                .edufolio-nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: currentColor;
                    transition: width 0.3s ease;
                    border-radius: 2px;
                }

                .edufolio-nav-link:not(.active):hover::after {
                    width: calc(100% - 32px);
                }

                .edufolio-navbar.scrolled .edufolio-nav-link:not(.active):hover::after {
                    background: var(--navbar-maroon);
                }

                /* ==================== CTA BUTTONS ==================== */
                .edufolio-cta-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10;
                }

                .edufolio-login-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    border-radius: var(--navbar-radius);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    color: var(--navbar-white);
                    background: rgba(255, 255, 255, 0.1);
                    white-space: nowrap;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-login-btn .edufolio-btn-icon {
                    font-size: 0.9rem;
                    transition: transform 0.3s ease;
                }

                .edufolio-navbar.scrolled .edufolio-login-btn {
                    color: var(--navbar-dark-blue);
                    border-color: var(--navbar-dark-blue);
                    background: rgba(0, 82, 157, 0.08);
                }

                .edufolio-login-btn:hover {
                    background: var(--navbar-dark-blue);
                    color: var(--navbar-white);
                    border-color: var(--navbar-dark-blue);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.35);
                }

                .edufolio-login-btn:hover .edufolio-btn-icon {
                    transform: scale(1.1);
                }

                .edufolio-cta-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, var(--navbar-maroon) 0%, var(--navbar-pink) 100%);
                    color: var(--navbar-white);
                    border-radius: var(--navbar-radius);
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

                .edufolio-cta-btn .edufolio-btn-icon {
                    font-size: 0.9rem;
                    transition: transform 0.3s ease;
                }

                .edufolio-cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
                    transition: left 0.5s ease;
                }

                .edufolio-cta-btn:hover::before {
                    left: 100%;
                }

                .edufolio-cta-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--navbar-shadow-strong);
                }

                .edufolio-cta-btn:hover .edufolio-btn-icon {
                    transform: translateX(3px);
                }

                /* ==================== MOBILE MENU BUTTON ==================== */
                .edufolio-mobile-btn {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    width: 48px;
                    height: 48px;
                    border-radius: var(--navbar-radius);
                    transition: all 0.2s ease;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 10001;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-mobile-btn.menu-open {
                    background: var(--navbar-light-gray);
                }

                .edufolio-mobile-btn i {
                    font-size: 1.5rem;
                    color: var(--navbar-white);
                    transition: color 0.3s ease, transform 0.3s ease;
                }

                .edufolio-navbar.scrolled .edufolio-mobile-btn i,
                .edufolio-navbar.menu-open .edufolio-mobile-btn i {
                    color: var(--navbar-maroon);
                }

                .edufolio-mobile-btn:active i {
                    transform: scale(0.9);
                }

                /* ==================== MOBILE MENU OVERLAY ==================== */
                .edufolio-mobile-overlay {
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
                    -webkit-backdrop-filter: blur(3px);
                    backdrop-filter: blur(3px);
                }

                .edufolio-mobile-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                /* ==================== MOBILE MENU ==================== */
                .edufolio-mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;
                    background: var(--navbar-white);
                    padding-top: 80px;
                    padding-left: max(20px, env(safe-area-inset-left));
                    padding-right: max(20px, env(safe-area-inset-right));
                    padding-bottom: max(25px, env(safe-area-inset-bottom));
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
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

                .edufolio-mobile-menu.active {
                    transform: translateY(0);
                    -webkit-transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }

                .edufolio-mobile-header {
                    padding: 12px 0 18px;
                    border-bottom: 1px solid var(--navbar-light-gray);
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                }

                .edufolio-mobile-logo {
                    height: 32px;
                    width: auto;
                    object-fit: contain;
                }

                .edufolio-mobile-tagline {
                    color: var(--navbar-light-blue);
                    font-size: 0.9rem;
                    font-weight: 600;
                    font-style: italic;
                }

                /* Mobile Nav Links */
                .edufolio-mobile-nav-link {
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    padding: 14px 16px;
                    border-radius: var(--navbar-radius);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s ease;
                    color: var(--navbar-text-dark);
                    background: transparent;
                    flex-shrink: 0;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-mobile-nav-link:hover,
                .edufolio-mobile-nav-link:active {
                    background: var(--navbar-light-gray);
                }

                .edufolio-mobile-nav-link.active {
                    color: var(--navbar-white);
                    background: linear-gradient(135deg, var(--navbar-maroon) 0%, var(--navbar-pink) 100%);
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.25);
                }

                .edufolio-mobile-nav-content {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .edufolio-mobile-nav-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 82, 157, 0.1);
                    color: var(--navbar-dark-blue);
                    font-size: 1rem;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .edufolio-mobile-nav-link:hover .edufolio-mobile-nav-icon {
                    transform: scale(1.05);
                }

                .edufolio-mobile-nav-link.active .edufolio-mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2);
                    color: var(--navbar-white);
                }

                .edufolio-mobile-nav-text {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .edufolio-mobile-nav-main {
                    font-weight: 600;
                    font-size: 1rem;
                }

                .edufolio-mobile-nav-sub {
                    font-size: 0.75rem;
                    opacity: 0.7;
                    font-weight: 400;
                }

                .edufolio-mobile-nav-link .edufolio-chevron {
                    font-size: 0.8rem;
                    color: var(--navbar-maroon);
                    transition: transform 0.3s ease;
                }

                .edufolio-mobile-nav-link:hover .edufolio-chevron {
                    transform: translateX(4px);
                }

                .edufolio-mobile-nav-link.active .edufolio-chevron {
                    color: var(--navbar-white);
                }

                /* ==================== MOBILE BUTTONS ==================== */
                .edufolio-mobile-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: auto;
                    padding-top: 18px;
                    border-top: 1px solid var(--navbar-light-gray);
                    flex-shrink: 0;
                }

                .edufolio-mobile-login {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 24px;
                    background: rgba(0, 82, 157, 0.08);
                    color: var(--navbar-dark-blue);
                    border: 2px solid var(--navbar-dark-blue);
                    border-radius: var(--navbar-radius-lg);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    min-height: 54px;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-mobile-login:hover,
                .edufolio-mobile-login:active {
                    background: var(--navbar-dark-blue);
                    color: var(--navbar-white);
                }

                .edufolio-mobile-login i {
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                }

                .edufolio-mobile-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, var(--navbar-maroon) 0%, var(--navbar-pink) 100%);
                    color: var(--navbar-white);
                    border-radius: var(--navbar-radius-lg);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.35);
                    transition: all 0.3s ease;
                    border: none;
                    min-height: 56px;
                    -webkit-tap-highlight-color: transparent;
                    position: relative;
                    overflow: hidden;
                }

                .edufolio-mobile-cta::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .edufolio-mobile-cta:active::before {
                    left: 100%;
                }

                .edufolio-mobile-cta:active {
                    transform: scale(0.98);
                }

                .edufolio-mobile-cta i {
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                }

                /* ==================== MOBILE CONTACT ==================== */
                .edufolio-mobile-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 18px;
                    padding-top: 18px;
                    border-top: 1px solid var(--navbar-light-gray);
                    flex-shrink: 0;
                }

                .edufolio-mobile-contact-title {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--navbar-gray);
                    margin-bottom: 5px;
                }

                .edufolio-mobile-contact-link {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: var(--navbar-gray);
                    text-decoration: none;
                    font-size: 0.9rem;
                    padding: 10px 0;
                    transition: all 0.3s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-mobile-contact-link:hover,
                .edufolio-mobile-contact-link:active {
                    color: var(--navbar-maroon);
                }

                .edufolio-mobile-contact-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--navbar-light-gray);
                    color: var(--navbar-maroon);
                    font-size: 0.9rem;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .edufolio-mobile-contact-link:hover .edufolio-mobile-contact-icon,
                .edufolio-mobile-contact-link:active .edufolio-mobile-contact-icon {
                    background: var(--navbar-maroon);
                    color: var(--navbar-white);
                }

                /* ==================== SOCIAL LINKS ==================== */
                .edufolio-mobile-social {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                    margin-top: 18px;
                    padding-top: 18px;
                    border-top: 1px solid var(--navbar-light-gray);
                    flex-shrink: 0;
                }

                .edufolio-social-link {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--navbar-light-gray);
                    color: var(--navbar-text-dark);
                    text-decoration: none;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .edufolio-social-link:hover,
                .edufolio-social-link:active {
                    transform: translateY(-3px);
                }

                .edufolio-social-link.facebook:hover,
                .edufolio-social-link.facebook:active {
                    background: #1877F2;
                    color: var(--navbar-white);
                    box-shadow: 0 4px 15px rgba(24, 119, 242, 0.4);
                }

                .edufolio-social-link.twitter:hover,
                .edufolio-social-link.twitter:active {
                    background: #1DA1F2;
                    color: var(--navbar-white);
                    box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
                }

                .edufolio-social-link.instagram:hover,
                .edufolio-social-link.instagram:active {
                    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                    color: var(--navbar-white);
                    box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
                }

                .edufolio-social-link.linkedin:hover,
                .edufolio-social-link.linkedin:active {
                    background: #0A66C2;
                    color: var(--navbar-white);
                    box-shadow: 0 4px 15px rgba(10, 102, 194, 0.4);
                }

                .edufolio-social-link.youtube:hover,
                .edufolio-social-link.youtube:active {
                    background: #FF0000;
                    color: var(--navbar-white);
                    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1100px) {
                    .edufolio-nav-links {
                        gap: 4px;
                    }

                    .edufolio-nav-link {
                        padding: 8px 12px;
                        font-size: 0.85rem;
                        gap: 6px;
                    }

                    .edufolio-nav-link .edufolio-nav-icon {
                        font-size: 0.85rem;
                        width: 16px;
                        height: 16px;
                    }

                    .edufolio-cta-container {
                        gap: 8px;
                    }

                    .edufolio-login-btn {
                        padding: 8px 16px;
                        font-size: 0.85rem;
                    }

                    .edufolio-cta-btn {
                        padding: 10px 18px;
                        font-size: 0.85rem;
                    }
                }

                @media screen and (max-width: 950px) {
                    .edufolio-nav-link .edufolio-nav-icon {
                        display: none;
                    }

                    .edufolio-nav-link {
                        padding: 8px 10px;
                    }
                }

                @media screen and (max-width: 900px) {
                    .edufolio-login-btn .edufolio-btn-text,
                    .edufolio-cta-btn .edufolio-btn-text {
                        display: none;
                    }

                    .edufolio-login-btn,
                    .edufolio-cta-btn {
                        padding: 10px 14px;
                        gap: 0;
                    }
                }

                @media screen and (max-width: 768px) {
                    .edufolio-navbar {
                        --navbar-height: 65px;
                    }

                    .edufolio-navbar-container {
                        height: 65px;
                    }

                    .edufolio-nav-links,
                    .edufolio-cta-container {
                        display: none;
                    }

                    .edufolio-mobile-btn {
                        display: flex;
                    }

                    .edufolio-logo-img {
                        height: 38px;
                        max-width: 140px;
                    }

                    .edufolio-mobile-menu {
                        padding-top: 75px;
                    }
                }

                @media screen and (max-width: 480px) {
                    .edufolio-navbar {
                        --navbar-height: 60px;
                    }

                    .edufolio-navbar-container {
                        padding: 0 16px;
                        height: 60px;
                    }

                    .edufolio-logo-img {
                        height: 34px;
                        max-width: 120px;
                    }

                    .edufolio-mobile-menu {
                        padding: 70px 16px 20px;
                        padding-bottom: max(20px, env(safe-area-inset-bottom));
                    }

                    .edufolio-mobile-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                    }

                    .edufolio-mobile-logo {
                        height: 28px;
                    }

                    .edufolio-mobile-nav-link {
                        padding: 12px 14px;
                    }

                    .edufolio-mobile-nav-icon {
                        width: 36px;
                        height: 36px;
                    }

                    .edufolio-mobile-login,
                    .edufolio-mobile-cta {
                        padding: 14px 20px;
                        min-height: 52px;
                    }

                    .edufolio-social-link {
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }
                }

                @media screen and (max-width: 360px) {
                    .edufolio-navbar-container {
                        padding: 0 12px;
                    }

                    .edufolio-mobile-menu {
                        padding: 68px 12px 15px;
                    }

                    .edufolio-mobile-nav-link {
                        padding: 10px 12px;
                        font-size: 0.95rem;
                    }

                    .edufolio-mobile-tagline {
                        font-size: 0.8rem;
                    }
                }

                /* ==================== TOUCH DEVICES ==================== */
                @media (hover: none) and (pointer: coarse) {
                    .edufolio-login-btn:hover,
                    .edufolio-cta-btn:hover,
                    .edufolio-nav-link:hover {
                        transform: none;
                    }

                    .edufolio-login-btn:active,
                    .edufolio-cta-btn:active {
                        transform: scale(0.98);
                        opacity: 0.9;
                    }

                    .edufolio-mobile-btn,
                    .edufolio-mobile-nav-link,
                    .edufolio-mobile-login,
                    .edufolio-mobile-cta,
                    .edufolio-mobile-contact-link,
                    .edufolio-social-link {
                        min-height: 48px;
                    }
                }

                /* ==================== REDUCED MOTION ==================== */
                @media (prefers-reduced-motion: reduce) {
                    .edufolio-navbar,
                    .edufolio-nav-link,
                    .edufolio-login-btn,
                    .edufolio-cta-btn,
                    .edufolio-mobile-menu,
                    .edufolio-mobile-overlay,
                    .edufolio-cta-btn::before,
                    .edufolio-mobile-cta::before {
                        animation: none !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* ==================== FOCUS STYLES ==================== */
                .edufolio-nav-link:focus-visible,
                .edufolio-login-btn:focus-visible,
                .edufolio-cta-btn:focus-visible,
                .edufolio-mobile-nav-link:focus-visible,
                .edufolio-mobile-login:focus-visible,
                .edufolio-mobile-cta:focus-visible,
                .edufolio-mobile-btn:focus-visible,
                .edufolio-logo:focus-visible,
                .edufolio-mobile-contact-link:focus-visible,
                .edufolio-social-link:focus-visible {
                    outline: 3px solid var(--navbar-light-blue);
                    outline-offset: 2px;
                }

                .edufolio-nav-link:focus:not(:focus-visible),
                .edufolio-login-btn:focus:not(:focus-visible),
                .edufolio-cta-btn:focus:not(:focus-visible),
                .edufolio-mobile-nav-link:focus:not(:focus-visible),
                .edufolio-mobile-login:focus:not(:focus-visible),
                .edufolio-mobile-cta:focus:not(:focus-visible),
                .edufolio-mobile-btn:focus:not(:focus-visible),
                .edufolio-logo:focus:not(:focus-visible),
                .edufolio-mobile-contact-link:focus:not(:focus-visible),
                .edufolio-social-link:focus:not(:focus-visible) {
                    outline: none;
                }

                /* ==================== HIGH CONTRAST ==================== */
                @media (prefers-contrast: high) {
                    .edufolio-navbar.scrolled,
                    .edufolio-navbar.menu-open {
                        border-bottom: 2px solid var(--navbar-text-dark);
                    }

                    .edufolio-nav-link.active,
                    .edufolio-mobile-nav-link.active {
                        border: 2px solid var(--navbar-white);
                    }

                    .edufolio-mobile-menu {
                        border: 2px solid var(--navbar-text-dark);
                    }
                }
            `}</style>

            <nav className={navbarClass} role="navigation" aria-label="Main navigation">
                <div className="edufolio-navbar-container">
                    <a 
                        href="/" 
                        className="edufolio-logo"
                        onClick={(e) => handleNavClick(e, '/')}
                        aria-label="EduFolio - Go to homepage"
                    >
                        <img 
                            src={showBlackLogo ? logoBlack : logoWhite} 
                            alt="EduFolio Logo" 
                            className="edufolio-logo-img"
                            loading="eager"
                        />
                    </a>

                    <div className="edufolio-nav-links" role="menubar">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className={`edufolio-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.path)}
                                role="menuitem"
                                aria-current={isActive(link.path) ? 'page' : undefined}
                            >
                                <i className={`fa-solid ${link.icon} edufolio-nav-icon`} aria-hidden="true"></i>
                                <span className="edufolio-nav-text">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    <div className="edufolio-cta-container">
                        <a 
                            href="/admin/login" 
                            className="edufolio-login-btn"
                            onClick={(e) => handleNavClick(e, '/admin/login')}
                            aria-label="Login to dashboard"
                        >
                            <i className="fa-solid fa-right-to-bracket edufolio-btn-icon" aria-hidden="true"></i>
                            <span className="edufolio-btn-text">Login</span>
                        </a>
                        <a 
                            href="/contact" 
                            className="edufolio-cta-btn"
                            onClick={(e) => handleNavClick(e, '/contact')}
                            aria-label="Get started - Contact us"
                        >
                            <i className="fa-solid fa-rocket edufolio-btn-icon" aria-hidden="true"></i>
                            <span className="edufolio-btn-text">Get Started</span>
                        </a>
                    </div>

                    <button
                        className={`edufolio-mobile-btn ${isMobileMenuOpen ? 'menu-open' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="edufolio-mobile-menu"
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`edufolio-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Mobile Menu */}
            <div 
                id="edufolio-mobile-menu"
                className={`edufolio-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                <div className="edufolio-mobile-header">
                    <img 
                        src={logoBlack} 
                        alt="EduFolio" 
                        className="edufolio-mobile-logo"
                    />
                    <span className="edufolio-mobile-tagline">learn. grow. succeed.</span>
                </div>

                <nav role="navigation" aria-label="Mobile navigation">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.path}
                            href={link.path}
                            className={`edufolio-mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.path)}
                            aria-current={isActive(link.path) ? 'page' : undefined}
                        >
                            <div className="edufolio-mobile-nav-content">
                                <div className="edufolio-mobile-nav-icon">
                                    <i className={`fa-solid ${link.icon}`} aria-hidden="true"></i>
                                </div>
                                <div className="edufolio-mobile-nav-text">
                                    <span className="edufolio-mobile-nav-main">{link.name}</span>
                                    <span className="edufolio-mobile-nav-sub">{link.description}</span>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right edufolio-chevron" aria-hidden="true"></i>
                        </a>
                    ))}
                </nav>
                
                <div className="edufolio-mobile-buttons">
                    <a 
                        href="/admin/login" 
                        className="edufolio-mobile-login"
                        onClick={(e) => handleNavClick(e, '/admin/login')}
                    >
                        <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
                        Login to Dashboard
                    </a>
                    <a 
                        href="/contact" 
                        className="edufolio-mobile-cta"
                        onClick={(e) => handleNavClick(e, '/contact')}
                    >
                        <i className="fa-solid fa-rocket" aria-hidden="true"></i>
                        Get Started Free
                    </a>
                </div>

                <div className="edufolio-mobile-contact">
                    <span className="edufolio-mobile-contact-title">Contact Us</span>
                    <a href="tel:+919876543210" className="edufolio-mobile-contact-link">
                        <div className="edufolio-mobile-contact-icon">
                            <i className="fa-solid fa-phone" aria-hidden="true"></i>
                        </div>
                        <span>+91 98765 43210</span>
                    </a>
                    <a href="mailto:info@edufolio.com" className="edufolio-mobile-contact-link">
                        <div className="edufolio-mobile-contact-icon">
                            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                        </div>
                        <span>info@edufolio.com</span>
                    </a>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="edufolio-mobile-contact-link">
                        <div className="edufolio-mobile-contact-icon">
                            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        </div>
                        <span>Mumbai, India</span>
                    </a>
                </div>

                <div className="edufolio-mobile-social">
                    <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="edufolio-social-link facebook"
                        aria-label="Follow us on Facebook"
                    >
                        <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="edufolio-social-link twitter"
                        aria-label="Follow us on Twitter"
                    >
                        <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="edufolio-social-link instagram"
                        aria-label="Follow us on Instagram"
                    >
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="edufolio-social-link linkedin"
                        aria-label="Follow us on LinkedIn"
                    >
                        <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                    </a>
                    <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="edufolio-social-link youtube"
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
