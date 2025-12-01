import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            {/* Footer Pattern */}
            <div style={styles.footerPattern}></div>

            <div style={styles.container}>
                {/* Main Footer Content */}
                <div style={styles.grid}>
                    {/* Brand Section */}
                    <div style={styles.brand}>
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
                                <span style={styles.logoEdu}>edu</span>
                                <span style={styles.logoFolio}>folio</span>
                            </div>
                        </Link>
                        <p style={styles.tagline}>learn. grow. succeed.</p>
                        <p style={styles.brandDesc}>
                            Your gateway to quality online education. Explore programs from top universities and advance your career with us.
                        </p>
                        <div style={styles.social}>
                            <a href="#" style={{...styles.socialLink, background: '#1877F2'}} title="Facebook">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" style={{...styles.socialLink, background: '#1DA1F2'}} title="Twitter">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" style={{...styles.socialLink, background: '#0A66C2'}} title="LinkedIn">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" style={{...styles.socialLink, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'}} title="Instagram">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" style={{...styles.socialLink, background: '#FF0000'}} title="YouTube">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>
                            Quick Links
                            <span style={styles.columnTitleUnderline}></span>
                        </h4>
                        <div style={styles.linksList}>
                            <Link to="/" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconMaroon}></i>
                                Home
                            </Link>
                            <Link to="/programs" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconBlue}></i>
                                Programs
                            </Link>
                            <Link to="/universities" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconMaroon}></i>
                                Universities
                            </Link>
                            <Link to="/about" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconBlue}></i>
                                About Us
                            </Link>
                            <Link to="/contact" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconMaroon}></i>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Popular Programs */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>
                            Popular Programs
                            <span style={styles.columnTitleUnderline}></span>
                        </h4>
                        <div style={styles.linksList}>
                            <Link to="/programs?category=MBA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconBlue}></i>
                                MBA Programs
                            </Link>
                            <Link to="/programs?category=MCA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconMaroon}></i>
                                MCA Programs
                            </Link>
                            <Link to="/programs?category=BBA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconBlue}></i>
                                BBA Programs
                            </Link>
                            <Link to="/programs?category=BCA" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconMaroon}></i>
                                BCA Programs
                            </Link>
                            <Link to="/programs?category=B.Com" style={styles.footerLink}>
                                <i className="fa-solid fa-chevron-right" style={styles.linkIconBlue}></i>
                                B.Com Programs
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.column}>
                        <h4 style={styles.columnTitle}>
                            Contact Us
                            <span style={styles.columnTitleUnderline}></span>
                        </h4>
                        <div style={styles.contactList}>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconMaroon}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div style={styles.contactText}>
                                    <span>123 Education Street,</span>
                                    <span>Mumbai, Maharashtra 400001</span>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconBlue}>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div style={styles.contactText}>
                                    <a href="tel:+919876543210" style={styles.contactLink}>+91 98765 43210</a>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconMaroon}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div style={styles.contactText}>
                                    <a href="mailto:info@edufolio.com" style={styles.contactLink}>info@edufolio.com</a>
                                </div>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIconBlue}>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div style={styles.contactText}>
                                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div style={styles.newsletter}>
                    <div style={styles.newsletterContent}>
                        <div style={styles.newsletterText}>
                            <div style={styles.newsletterIcon}>
                                <i className="fa-solid fa-envelope-open-text"></i>
                            </div>
                            <div>
                                <h4 style={styles.newsletterTitle}>Subscribe to Our Newsletter</h4>
                                <p style={styles.newsletterDesc}>Stay updated with latest programs and educational news</p>
                            </div>
                        </div>
                        <div style={styles.newsletterForm}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                style={styles.newsletterInput}
                            />
                            <button style={styles.newsletterBtn}>
                                <i className="fa-solid fa-paper-plane"></i>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accreditation Badges */}
                <div style={styles.accreditation}>
                    <span style={styles.accreditationText}>Our programs are recognized by:</span>
                    <div style={styles.accreditationBadges}>
                        <span style={styles.accreditationBadge}>
                            <i className="fa-solid fa-award"></i> UGC-DEB
                        </span>
                        <span style={styles.accreditationBadge}>
                            <i className="fa-solid fa-certificate"></i> NAAC
                        </span>
                        <span style={styles.accreditationBadge}>
                            <i className="fa-solid fa-shield-halved"></i> AICTE
                        </span>
                        <span style={styles.accreditationBadge}>
                            <i className="fa-solid fa-building-columns"></i> AIU
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={styles.bottom}>
                    <p style={styles.copyright}>
                        © {currentYear} <span style={styles.copyrightBrand}>Edufolio</span>. All rights reserved. Made with <i className="fa-solid fa-heart" style={{color: colors.maroon}}></i> in India
                    </p>
                    <div style={styles.bottomLinks}>
                        <Link to="/privacy" style={styles.bottomLink}>Privacy Policy</Link>
                        <span style={styles.bottomDivider}>•</span>
                        <Link to="/terms" style={styles.bottomLink}>Terms of Service</Link>
                        <span style={styles.bottomDivider}>•</span>
                        <Link to="/refund" style={styles.bottomLink}>Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
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
    
    // Text Colors
    textLight: 'rgba(255, 255, 255, 0.8)',
    textMuted: 'rgba(255, 255, 255, 0.6)'
};

const styles = {
    footer: {
        background: `linear-gradient(180deg, ${colors.darkBlue} 0%, #003366 100%)`,
        color: colors.textLight,
        paddingTop: '70px',
        position: 'relative',
        overflow: 'hidden'
    },
    footerPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5,
        pointerEvents: 'none'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
        gap: '50px',
        marginBottom: '50px'
    },
    brand: {},
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        marginBottom: '10px'
    },
    logoIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 15px ${colors.maroon}50`
    },
    logoText: {
        display: 'flex',
        fontSize: '1.7rem',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    logoEdu: {
        color: colors.white,
        fontWeight: '800'
    },
    logoFolio: {
        color: colors.lightBlue,
        fontWeight: '400'
    },
    tagline: {
        color: colors.lightBlue,
        fontSize: '0.95rem',
        fontStyle: 'italic',
        fontWeight: '600',
        marginBottom: '18px'
    },
    brandDesc: {
        fontSize: '0.95rem',
        lineHeight: '1.8',
        marginBottom: '25px',
        color: colors.textLight
    },
    social: {
        display: 'flex',
        gap: '10px'
    },
    socialLink: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        color: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    },
    column: {},
    columnTitle: {
        color: colors.white,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '25px',
        position: 'relative',
        paddingBottom: '12px'
    },
    columnTitleUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '40px',
        height: '3px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        borderRadius: '2px'
    },
    linksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
    },
    footerLink: {
        color: colors.textLight,
        textDecoration: 'none',
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease'
    },
    linkIconMaroon: {
        fontSize: '0.7rem',
        color: colors.pink
    },
    linkIconBlue: {
        fontSize: '0.7rem',
        color: colors.lightBlue
    },
    contactList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        fontSize: '0.95rem'
    },
    contactIconMaroon: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: `${colors.maroon}30`,
        color: colors.pink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    contactIconBlue: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: `${colors.lightBlue}20`,
        color: colors.lightBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    contactText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        paddingTop: '6px'
    },
    contactLink: {
        color: colors.textLight,
        textDecoration: 'none',
        transition: 'color 0.3s ease'
    },
    newsletter: {
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.darkMaroon} 100%)`,
        borderRadius: '20px',
        padding: '35px 40px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
    },
    newsletterContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap'
    },
    newsletterText: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    newsletterIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.15)',
        color: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        flexShrink: 0
    },
    newsletterTitle: {
        color: colors.white,
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    newsletterDesc: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '0.95rem'
    },
    newsletterForm: {
        display: 'flex',
        gap: '12px',
        flex: 1,
        maxWidth: '480px'
    },
    newsletterInput: {
        flex: 1,
        padding: '16px 20px',
        borderRadius: '12px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: colors.white,
        fontSize: '0.95rem',
        outline: 'none',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
    },
    newsletterBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 28px',
        background: colors.lightBlue,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: `0 4px 15px ${colors.lightBlue}40`,
        whiteSpace: 'nowrap'
    },
    accreditation: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '25px',
        flexWrap: 'wrap',
        padding: '25px 0',
        marginBottom: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    accreditationText: {
        color: colors.textMuted,
        fontSize: '0.9rem'
    },
    accreditationBadges: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
    },
    accreditationBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        color: colors.white,
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    bottom: {
        paddingTop: '25px',
        paddingBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
    },
    copyright: {
        fontSize: '0.9rem',
        color: colors.textMuted
    },
    copyrightBrand: {
        color: colors.lightBlue,
        fontWeight: '600'
    },
    bottomLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px'
    },
    bottomLink: {
        color: colors.textMuted,
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.3s ease'
    },
    bottomDivider: {
        color: 'rgba(255, 255, 255, 0.3)'
    }
};

// Add hover styles and responsive CSS
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        footer {
            font-family: 'Poppins', sans-serif;
        }
        
        footer a:hover {
            color: ${colors.lightBlue} !important;
            transform: translateX(5px);
        }
        
        footer .social-link:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        
        footer .contact-link:hover {
            color: ${colors.lightBlue} !important;
        }
        
        footer input:focus {
            border-color: rgba(255, 255, 255, 0.5) !important;
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        footer input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        footer .newsletter-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px ${colors.lightBlue}50;
        }
        
        footer .bottom-link:hover {
            color: ${colors.lightBlue} !important;
        }
        
        @media (max-width: 1024px) {
            footer .grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 40px !important;
            }
        }
        
        @media (max-width: 768px) {
            footer .grid {
                grid-template-columns: 1fr !important;
                gap: 35px !important;
            }
            footer .newsletter-content {
                flex-direction: column;
                text-align: center;
            }
            footer .newsletter-text {
                flex-direction: column;
                text-align: center;
            }
            footer .newsletter-form {
                flex-direction: column;
                width: 100%;
                max-width: 100%;
            }
            footer .accreditation {
                flex-direction: column;
                gap: 15px;
            }
            footer .bottom {
                flex-direction: column;
                text-align: center;
            }
            footer .bottom-links {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Footer;
