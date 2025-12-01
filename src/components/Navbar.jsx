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

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

                .navbar,
                .navbar *,
                .navbar *::before,
                .navbar *::after,
                .mobile-menu,
                .mobile-menu *,
                .mobile-menu *::before,
                .mobile-menu *::after {
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                }

                .navbar {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    height: 70px !important;
                    z-index: 99999 !important;
                    background: transparent !important;
                    transition: background 0.3s ease, box-shadow 0.3s ease !important;
                    font-family: 'Poppins', sans-serif !important;
                    display: block !important;
                }

                .navbar.scrolled,
                .navbar.menu-open {
                    background: #FFFFFF !important;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                }

                .navbar-container {
                    width: 100% !important;
                    max-width: 1200px !important;
                    height: 70px !important;
                    margin: 0 auto !important;
                    padding: 0 20px !important;
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    position: relative !important;
                }

                /* ==================== LOGO ==================== */
                .navbar-logo {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    text-decoration: none !important;
                    height: 70px !important;
                    flex-shrink: 0 !important;
                    position: relative !important;
                    z-index: 10 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                .logo-wrapper {
                    position: relative !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    height: 50px !important;
                    width: 180px !important;
                    flex-shrink: 0 !important;
                }

                .logo-white,
                .logo-black {
                    height: 170px !important;
                    width: auto !important;
                    max-width: 180px !important;
                    object-fit: contain !important;
                    display: block !important;
                    transition: opacity 0.3s ease !important;
                }

                .logo-white {
                    opacity: 1 !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                }

                .logo-black {
                    opacity: 0 !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                }

                .navbar.scrolled .logo-white,
                .navbar.menu-open .logo-white {
                    opacity: 0 !important;
                }

                .navbar.scrolled .logo-black,
                .navbar.menu-open .logo-black {
                    opacity: 1 !important;
                }

                /* ==================== NAV LINKS - CENTER ==================== */
                .nav-links {
                    position: absolute !important;
                    left: 50% !important;
                    top: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    height: auto !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                .nav-link {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    text-decoration: none !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    padding: 10px 16px !important;
                    margin: 0 !important;
                    color: #FFFFFF !important;
                    border-radius: 10px !important;
                    background: transparent !important;
                    transition: all 0.3s ease !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
                    white-space: nowrap !important;
                }

                .nav-link .nav-icon {
                    font-size: 0.85rem !important;
                    opacity: 0.85 !important;
                }

                .navbar.scrolled .nav-link {
                    color: #2D1B4E !important;
                    text-shadow: none !important;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
                }

                .navbar.scrolled .nav-link:hover {
                    background: #F5F7FA !important;
                }

                .nav-link.active {
                    color: #FFFFFF !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3) !important;
                    text-shadow: none !important;
                }

                /* ==================== CTA BUTTONS - RIGHT ==================== */
                .cta-container {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: flex-end !important;
                    gap: 12px !important;
                    flex-shrink: 0 !important;
                    height: 70px !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    position: relative !important;
                    z-index: 10 !important;
                }

                .login-btn {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    padding: 10px 18px !important;
                    margin: 0 !important;
                    border: 2px solid rgba(255, 255, 255, 0.5) !important;
                    border-radius: 10px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.9rem !important;
                    color: #FFFFFF !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(10px) !important;
                    transition: all 0.3s ease !important;
                    white-space: nowrap !important;
                }

                .navbar.scrolled .login-btn {
                    color: #00529D !important;
                    border-color: #00529D !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                }

                .login-btn:hover {
                    background: #00529D !important;
                    color: #FFFFFF !important;
                    border-color: #00529D !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 15px rgba(0, 82, 157, 0.3) !important;
                }

                .cta-btn {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    padding: 12px 22px !important;
                    margin: 0 !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                    color: #FFFFFF !important;
                    border: none !important;
                    border-radius: 10px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.9rem !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.4) !important;
                    transition: all 0.3s ease !important;
                    white-space: nowrap !important;
                    position: relative !important;
                    overflow: hidden !important;
                }

                .cta-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 25px rgba(139, 35, 70, 0.45) !important;
                }

                /* ==================== MOBILE MENU BUTTON ==================== */
                .mobile-menu-btn {
                    display: none !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: transparent !important;
                    border: none !important;
                    cursor: pointer !important;
                    padding: 10px !important;
                    margin: 0 !important;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 10px !important;
                    transition: all 0.2s ease !important;
                    flex-shrink: 0 !important;
                }

                .mobile-menu-btn i {
                    font-size: 1.3rem !important;
                    color: #FFFFFF !important;
                    transition: color 0.3s ease !important;
                }

                .navbar.scrolled .mobile-menu-btn i,
                .navbar.menu-open .mobile-menu-btn i {
                    color: #8B2346 !important;
                }

                /* ==================== MOBILE MENU ==================== */
                .mobile-menu {
                    position: fixed !important;
                    top: 70px !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100% !important;
                    background: #FFFFFF !important;
                    padding: 10px 20px 25px 20px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 5px !important;
                    border-top: 3px solid #8B2346 !important;
                    overflow-y: auto !important;
                    z-index: 99998 !important;
                    animation: slideDown 0.3s ease !important;
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
                    padding: 10px 0 15px 0 !important;
                    border-bottom: 1px solid #F5F7FA !important;
                    margin-bottom: 10px !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                }

                .mobile-menu-logo {
                    height: 30px !important;
                    width: auto !important;
                    object-fit: contain !important;
                }

                .mobile-menu-tagline {
                    color: #0099D6 !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    font-style: italic !important;
                }

                .mobile-nav-link {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    text-decoration: none !important;
                    font-size: 1rem !important;
                    font-weight: 500 !important;
                    padding: 14px 16px !important;
                    margin: 0 !important;
                    border-radius: 10px !important;
                    color: #2D1B4E !important;
                    background: transparent !important;
                    transition: all 0.2s ease !important;
                }

                .mobile-nav-link:hover {
                    background: #F5F7FA !important;
                }

                .mobile-nav-link.active {
                    color: #FFFFFF !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                }

                .mobile-nav-link-content {
                    display: flex !important;
                    align-items: center !important;
                    gap: 12px !important;
                }

                .mobile-nav-icon {
                    width: 32px !important;
                    height: 32px !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                    color: #00529D !important;
                    font-size: 0.85rem !important;
                }

                .mobile-nav-link.active .mobile-nav-icon {
                    background: rgba(255, 255, 255, 0.2) !important;
                    color: #FFFFFF !important;
                }

                .mobile-nav-link .chevron {
                    font-size: 0.75rem !important;
                    color: #8B2346 !important;
                }

                .mobile-nav-link.active .chevron {
                    color: #FFFFFF !important;
                }

                .mobile-buttons {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 10px !important;
                    margin-top: 15px !important;
                    padding-top: 15px !important;
                    border-top: 1px solid #F5F7FA !important;
                }

                .mobile-login-btn {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    padding: 14px 24px !important;
                    margin: 0 !important;
                    background: rgba(0, 82, 157, 0.1) !important;
                    color: #00529D !important;
                    border: 2px solid #00529D !important;
                    border-radius: 12px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.95rem !important;
                    transition: all 0.3s ease !important;
                }

                .mobile-cta-btn {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    padding: 16px 24px !important;
                    margin: 0 !important;
                    background: linear-gradient(135deg, #8B2346 0%, #C4567A 100%) !important;
                    color: #FFFFFF !important;
                    border: none !important;
                    border-radius: 12px !important;
                    text-decoration: none !important;
                    font-weight: 600 !important;
                    font-size: 0.95rem !important;
                    box-shadow: 0 4px 15px rgba(139, 35, 70, 0.3) !important;
                    transition: all 0.3s ease !important;
                }

                .mobile-contact {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 10px !important;
                    margin-top: 15px !important;
                    padding-top: 15px !important;
                    border-top: 1px solid #F5F7FA !important;
                }

                .mobile-contact-link {
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    color: #64748B !important;
                    text-decoration: none !important;
                    font-size: 0.9rem !important;
                    padding: 8px 0 !important;
                    margin: 0 !important;
                }

                .mobile-contact-link i {
                    width: 20px !important;
                    text-align: center !important;
                }

                /* ==================== RESPONSIVE ==================== */
                @media screen and (max-width: 1100px) {
                    .nav-links {
                        gap: 4px !important;
                    }

                    .nav-link {
                        padding: 8px 12px !important;
                        font-size: 0.85rem !important;
                    }

                    .nav-link .nav-icon {
                        display: none !important;
                    }

                    .login-btn {
                        padding: 8px 14px !important;
                        font-size: 0.85rem !important;
                    }

                    .cta-btn {
                        padding: 10px 16px !important;
                        font-size: 0.85rem !important;
                    }
                }

                @media screen and (max-width: 900px) {
                    .login-btn .btn-text,
                    .cta-btn .btn-text {
                        display: none !important;
                    }

                    .login-btn,
                    .cta-btn {
                        padding: 10px 12px !important;
                        gap: 0 !important;
                    }
                }

                @media screen and (max-width: 768px) {
                    .navbar {
                        height: 65px !important;
                    }

                    .navbar-container {
                        height: 65px !important;
                    }

                    .navbar-logo {
                        height: 65px !important;
                    }

                    .logo-wrapper {
                        height: 38px !important;
                        width: 150px !important;
                    }

                    .logo-white,
                    .logo-black {
                        height: 38px !important;
                    }

                    .nav-links {
                        display: none !important;
                    }

                    .cta-container {
                        display: none !important;
                    }

                    .mobile-menu-btn {
                        display: flex !important;
                    }

                    .mobile-menu {
                        top: 65px !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    .navbar {
                        height: 60px !important;
                    }

                    .navbar-container {
                        height: 60px !important;
                        padding: 0 15px !important;
                    }

                    .navbar-logo {
                        height: 60px !important;
                    }

                    .logo-wrapper {
                        height: 32px !important;
                        width: 130px !important;
                    }

                    .logo-white,
                    .logo-black {
                        height: 32px !important;
                    }

                    .mobile-menu {
                        top: 60px !important;
                        padding: 10px 15px 20px 15px !important;
                    }
                }
            `}</style>

            <nav className={navbarClass}>
                <div className="navbar-container">
                    {/* Logo - Left */}
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

                    {/* Nav Links - Center (Absolute positioned) */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.path}
                                href={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.path)}
                            >
                                <i className={`fa-solid ${link.icon} nav-icon`}></i>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons - Right */}
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

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </nav>

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
        </>
    );
};

export default Navbar;
