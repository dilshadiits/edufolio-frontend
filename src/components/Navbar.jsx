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

    return (
        <>
            <nav style={{
                ...styles.navbar,
                background: isScrolled || isMobileMenuOpen ? colors.white : 'transparent',
                boxShadow: isScrolled || isMobileMenuOpen ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
            }}>
                <div style={styles.container}>
                    {/* Logo */}
                    <Link to="/" style={styles.logo}>
                        <div style={styles.logoIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3L20 7.5V9H4V7.5L12 3Z" fill="white"/>
                                <path d="M6 10H18V11L12 14L6 11V10Z" fill={colors.lightBlue}/>
                                <path d="M8 12V16L12 18L16 16V12" stroke="white" strokeWidth="1.5" fill="none"/>
                                <circle cx="12" cy="6" r="1.5" fill={colors.lightBlue}/>
                                <line x1="12" y1="18" x2="12" y2="21" stroke="white" strokeWidth="1.5"/>
                                <circle cx="12" cy="21" r="1" fill="white"/>
                            </svg>
                        </div>
                        <div style={styles.logoText}>
                            <span style={{
                                ...styles.logoEdu,
                                color: isScrolled || isMobileMenuOpen ? colors.maroon : colors.white
                            }}>edu</span>
                            <span style={{
                                ...styles.logoFolio,
                                color: isScrolled || isMobileMenuOpen ? colors.darkBlue : colors.lightBlue
                            }}>folio</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    {!isMobile && (
                        <div style={styles.navLinks}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        ...styles.navLink,
                                        color: isActive(link.path) 
                                            ? colors.maroon 
                                            : isScrolled ? colors.textDark : colors.white
                                    }}
                                >
                                    {link.name}
                                    {isActive(link.path) && <span style={styles.activeIndicator}></span>}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* CTA Buttons - Desktop */}
                    {!isMobile && (
                        <div style={styles.ctaContainer}>
                            {/* Login Button */}
                            <Link 
                                to="/admin/login" 
                                style={{
                                    ...styles.loginButton,
                                    color: isScrolled ? colors.darkBlue : colors.white,
                                    borderColor: isScrolled ? colors.darkBlue : 'rgba(255,255,255,0.5)',
                                    background: isScrolled ? `${colors.darkBlue}10` : 'rgba(255,255,255,0.1)'
                                }}
                            >
                                <i className="fa-solid fa-user"></i>
                                Login
                            </Link>
                            
                            {/* Get Started Button */}
                            <Link to="/contact" style={styles.ctaButton}>
                                <i className="fa-solid fa-paper-plane"></i>
                                Get Started
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            style={{
                                ...styles.mobileMenuBtn,
                                background: isMobileMenuOpen ? colors.lightGray : 'transparent'
                            }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <i 
                                className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
                                style={{ 
                                    color: isScrolled || isMobileMenuOpen ? colors.maroon : colors.white,
                                    fontSize: '1.3rem'
                                }}
                            ></i>
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMobile && isMobileMenuOpen && (
                    <div style={styles.mobileMenu}>
                        {/* Mobile Menu Header */}
                        <div style={styles.mobileMenuHeader}>
                            <span style={styles.mobileMenuTagline}>learn. grow. succeed.</span>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    ...styles.mobileNavLink,
                                    color: isActive(link.path) ? colors.maroon : colors.textDark,
                                    background: isActive(link.path) ? `${colors.maroon}10` : 'transparent',
                                    borderLeft: isActive(link.path) ? `3px solid ${colors.maroon}` : '3px solid transparent'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div style={styles.mobileNavLinkContent}>
                                    <i className={`fa-solid ${link.icon}`} style={{
                                        color: isActive(link.path) ? colors.maroon : colors.darkBlue,
                                        width: '20px'
                                    }}></i>
                                    <span>{link.name}</span>
                                </div>
                                {isActive(link.path) && (
                                    <i className="fa-solid fa-chevron-right" style={{ 
                                        fontSize: '0.75rem',
                                        color: colors.maroon 
                                    }}></i>
                                )}
                            </Link>
                        ))}
                        
                        {/* Mobile Buttons */}
                        <div style={styles.mobileButtons}>
                            <Link 
                                to="/admin/login" 
                                style={styles.mobileLoginBtn}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-user"></i>
                                Login to Dashboard
                            </Link>
                            <Link 
                                to="/contact" 
                                style={styles.mobileCta}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                Get Started Free
                            </Link>
                        </div>

                        {/* Mobile Contact Info */}
                        <div style={styles.mobileContact}>
                            <a href="tel:+919876543210" style={styles.mobileContactLink}>
                                <i className="fa-solid fa-phone"></i>
                                +91 98765 43210
                            </a>
                            <a href="mailto:info@edufolio.com" style={styles.mobileContactLink}>
                                <i className="fa-solid fa-envelope"></i>
                                info@edufolio.com
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Overlay for mobile menu */}
            {isMobile && isMobileMenuOpen && (
                <div 
                    style={styles.overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

// Edufolio Brand Colors from PDF
const colors = {
    // Primary Colors
    lightBlue: '#0099D6',
    darkBlue: '#00529D',
    maroon: '#8B2346',
    darkMaroon: '#6B1D3A',
    
    // Supporting Colors
    pink: '#C4567A',
    
    // Neutrals
    white: '#FFFFFF',
    lightGray: '#F5F7FA',
    gray: '#64748B',
    
    // Text Colors
    textDark: '#2D1B4E'
};

const styles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '12px 0',
        transition: 'all 0.3s ease'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        gap: '10px'
    },
    logoIcon: {
        width: '44px',
        height: '44px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 15px ${colors.maroon}40`
    },
    logoText: {
        display: 'flex',
        fontSize: '1.6rem',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    logoEdu: {
        fontWeight: '800',
        transition: 'color 0.3s ease'
    },
    logoFolio: {
        fontWeight: '400',
        transition: 'color 0.3s ease'
    },
    navLinks: {
        display: 'flex',
        gap: '32px',
        alignItems: 'center'
    },
    navLink: {
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '500',
        position: 'relative',
        transition: 'color 0.3s ease',
        padding: '8px 0'
    },
    activeIndicator: {
        position: 'absolute',
        bottom: '0',
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        borderRadius: '2px'
    },
    ctaContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    loginButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        border: '2px solid',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    },
    ctaButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 22px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        boxShadow: `0 4px 15px ${colors.maroon}40`,
        transition: 'all 0.3s ease'
    },
    mobileMenuBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        transition: 'all 0.2s ease'
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: colors.white,
        padding: '10px 20px 25px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        borderTop: `3px solid ${colors.maroon}`,
        animation: 'slideDown 0.3s ease'
    },
    mobileMenuHeader: {
        padding: '10px 0 15px',
        borderBottom: `1px solid ${colors.lightGray}`,
        marginBottom: '10px'
    },
    mobileMenuTagline: {
        color: colors.lightBlue,
        fontSize: '0.9rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    mobileNavLink: {
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        padding: '14px 16px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease'
    },
    mobileNavLinkContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    mobileButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: `1px solid ${colors.lightGray}`
    },
    mobileLoginBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 24px',
        background: `${colors.darkBlue}10`,
        color: colors.darkBlue,
        border: `2px solid ${colors.darkBlue}`,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease'
    },
    mobileCta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 24px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem',
        boxShadow: `0 4px 15px ${colors.maroon}30`
    },
    mobileContact: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: `1px solid ${colors.lightGray}`
    },
    mobileContactLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: colors.gray,
        textDecoration: 'none',
        fontSize: '0.9rem',
        padding: '8px 0'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999,
        backdropFilter: 'blur(4px)'
    }
};

// Add CSS animations and hover effects
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
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
        
        nav {
            font-family: 'Poppins', sans-serif;
        }
        
        nav a:hover {
            opacity: 0.9;
        }
        
        nav .nav-link:hover::after {
            width: 100%;
        }
        
        nav .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(139, 35, 70, 0.45);
        }
        
        nav .login-btn:hover {
            background: #00529D !important;
            color: #fff !important;
            border-color: #00529D !important;
        }
        
        nav .mobile-login-btn:hover {
            background: #00529D;
            color: #fff;
        }
        
        nav .mobile-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(139, 35, 70, 0.4);
        }
        
        nav .mobile-nav-link:hover {
            background: #F5F7FA;
        }
        
        nav .mobile-contact-link:hover {
            color: #8B2346;
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Navbar;
