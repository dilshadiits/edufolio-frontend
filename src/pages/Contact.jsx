import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        program: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post(`${API_BASE}/public/inquiries`, formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                program: '',
                message: ''
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactMethods = [
        {
            icon: 'fa-phone',
            title: 'Call Us',
            primary: '+91 98765 43210',
            secondary: '+91 98765 43211',
            action: 'tel:+919876543210',
            actionText: 'Call Now',
            colorType: 'maroon'
        },
        {
            icon: 'fa-envelope',
            title: 'Email Us',
            primary: 'info@edufolio.com',
            secondary: 'support@edufolio.com',
            action: 'mailto:info@edufolio.com',
            actionText: 'Send Email',
            colorType: 'blue'
        },
        {
            icon: 'fa-location-dot',
            title: 'Visit Us',
            primary: '123 Education Street',
            secondary: 'Mumbai, Maharashtra 400001',
            action: 'https://maps.google.com',
            actionText: 'Get Directions',
            colorType: 'maroon'
        },
        {
            icon: 'fa-clock',
            title: 'Working Hours',
            primary: 'Mon - Sat: 9:00 AM - 7:00 PM',
            secondary: 'Sunday: Closed',
            action: null,
            actionText: null,
            colorType: 'blue'
        }
    ];

    const faqs = [
        {
            question: 'How do I enroll in a program?',
            answer: 'You can enroll by filling out the inquiry form or calling our counselors. We\'ll guide you through the entire process.'
        },
        {
            question: 'Are the degrees UGC recognized?',
            answer: 'Yes, all our partner universities are UGC-DEB approved and NAAC accredited. Degrees are valid for government jobs and higher studies.'
        },
        {
            question: 'What payment options are available?',
            answer: 'We offer multiple payment options including one-time payment, semester-wise, and easy EMI options with 0% interest.'
        },
        {
            question: 'Can I transfer credits from another university?',
            answer: 'Credit transfer policies vary by university. Our counselors can help you understand the specific requirements for your case.'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section with Images - Maroon Theme */}
            <section style={styles.hero}>
                <div style={styles.heroPattern}></div>
                
                <div style={styles.heroContainer}>
                    {/* Left Content */}
                    <div style={styles.heroContent}>
                        <span style={styles.heroBadge}>
                            <i className="fa-solid fa-headset"></i> Get in Touch
                        </span>
                        <h1 style={styles.heroTitle}>
                            Let's Start Your <span style={styles.highlight}>Journey</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Have questions about our programs? Our expert counselors are here to help 
                            you find the perfect program and guide you through every step of your educational journey.
                        </p>
                        <div style={styles.tagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        
                        {/* Quick Contact Info */}
                        <div style={styles.heroQuickContact}>
                            <a href="tel:+919876543210" style={styles.heroQuickItem}>
                                <div style={styles.heroQuickIcon}>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <span style={styles.heroQuickLabel}>Call Us</span>
                                    <span style={styles.heroQuickValue}>+91 98765 43210</span>
                                </div>
                            </a>
                            <a href="mailto:info@edufolio.com" style={styles.heroQuickItem}>
                                <div style={styles.heroQuickIconBlue}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <span style={styles.heroQuickLabel}>Email Us</span>
                                    <span style={styles.heroQuickValue}>info@edufolio.com</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Images Section */}
                    <div style={styles.heroImages}>
                        {/* ============================================
                            MAIN IMAGE (Large - Center)
                            Recommended size: 380x420px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.mainImageContainer}>
                            <img 
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=380&h=420&fit=crop" 
                                alt="Customer support"
                                style={styles.mainImage}
                            />
                            <div style={styles.mainImageOverlay}></div>
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 1 (Small - Top Right)
                            Recommended size: 150x110px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage1}>
                            <img 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=110&fit=crop" 
                                alt="Team meeting"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 2 (Small - Bottom Left)
                            Recommended size: 140x100px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage2}>
                            <img 
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=140&h=100&fit=crop" 
                                alt="Online consultation"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Floating Response Time Card */}
                        <div style={styles.floatingResponseCard}>
                            <div style={styles.floatingResponseIcon}>
                                <i className="fa-solid fa-bolt"></i>
                            </div>
                            <div style={styles.floatingResponseContent}>
                                <span style={styles.floatingResponseNumber}>&lt; 24 hrs</span>
                                <span style={styles.floatingResponseLabel}>Response Time</span>
                            </div>
                        </div>

                        {/* Floating Happy Students Card */}
                        <div style={styles.floatingHappyCard}>
                            <div style={styles.floatingHappyIcon}>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            <div style={styles.floatingHappyContent}>
                                <span style={styles.floatingHappyNumber}>15K+</span>
                                <span style={styles.floatingHappyLabel}>Happy Students</span>
                            </div>
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 3 (Small - Middle Right)
                            Recommended size: 120x85px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage3}>
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=85&fit=crop" 
                                alt="Team collaboration"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div style={styles.decorCircle1}></div>
                        <div style={styles.decorCircle2}></div>
                        <div style={styles.decorDots}></div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section style={styles.contactMethodsSection}>
                <div style={styles.container}>
                    <div style={styles.methodsGrid}>
                        {contactMethods.map((method, index) => (
                            <div key={index} style={styles.methodCard}>
                                <div style={method.colorType === 'maroon' ? styles.methodIconMaroon : styles.methodIconBlue}>
                                    <i className={`fa-solid ${method.icon}`}></i>
                                </div>
                                <h3 style={styles.methodTitle}>{method.title}</h3>
                                <p style={styles.methodPrimary}>{method.primary}</p>
                                <p style={styles.methodSecondary}>{method.secondary}</p>
                                {method.action && (
                                    <a href={method.action} style={method.colorType === 'maroon' ? styles.methodBtnMaroon : styles.methodBtnBlue}>
                                        {method.actionText}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    <div style={styles.contactGrid}>
                        {/* Contact Form */}
                        <div style={styles.formWrapper}>
                            <div style={styles.formHeader}>
                                <span style={styles.formBadge}>
                                    <i className="fa-solid fa-paper-plane"></i> Send a Message
                                </span>
                                <h2 style={styles.formTitle}>Get Free Counseling</h2>
                                <p style={styles.formSubtitle}>
                                    Fill in your details and our expert counselors will contact you within 24 hours.
                                </p>
                            </div>

                            {success && (
                                <div style={styles.successMessage}>
                                    <i className="fa-solid fa-check-circle"></i>
                                    <div>
                                        <strong>Thank you!</strong>
                                        <p>Your inquiry has been submitted. We'll contact you soon.</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div style={styles.errorMessage}>
                                    <i className="fa-solid fa-exclamation-circle"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <i className="fa-solid fa-user"></i> Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <i className="fa-solid fa-phone"></i> Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your phone number"
                                            style={styles.input}
                                        />
                                    </div>
                                </div>

                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <i className="fa-solid fa-envelope"></i> Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your email address"
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            <i className="fa-solid fa-graduation-cap"></i> Program Interest
                                        </label>
                                        <select
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            style={styles.select}
                                        >
                                            <option value="">Select a program</option>
                                            <option value="MBA">MBA</option>
                                            <option value="MCA">MCA</option>
                                            <option value="BBA">BBA</option>
                                            <option value="BCA">BCA</option>
                                            <option value="B.Com">B.Com</option>
                                            <option value="M.Com">M.Com</option>
                                            <option value="BA">BA</option>
                                            <option value="MA">MA</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fa-solid fa-tag"></i> Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What can we help you with?"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fa-solid fa-message"></i> Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your requirements..."
                                        rows={5}
                                        style={styles.textarea}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    style={styles.submitBtn}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div style={styles.btnSpinner}></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane"></i>
                                            Submit Inquiry
                                        </>
                                    )}
                                </button>

                                <p style={styles.formNote}>
                                    <i className="fa-solid fa-shield-check"></i>
                                    Your information is secure and will never be shared.
                                </p>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div style={styles.sidebar}>
                            {/* WhatsApp Card */}
                            <div style={styles.whatsappCard}>
                                <div style={styles.whatsappIcon}>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <h3 style={styles.whatsappTitle}>Chat on WhatsApp</h3>
                                <p style={styles.whatsappText}>
                                    Get instant responses to your queries via WhatsApp
                                </p>
                                <a href="https://wa.me/919876543210" style={styles.whatsappBtn}>
                                    <i className="fa-brands fa-whatsapp"></i>
                                    Start Chat
                                </a>
                            </div>

                            {/* Callback Card */}
                            <div style={styles.callbackCard}>
                                <div style={styles.callbackIcon}>
                                    <i className="fa-solid fa-phone-volume"></i>
                                </div>
                                <h3 style={styles.callbackTitle}>Request a Callback</h3>
                                <p style={styles.callbackText}>
                                    Our counselor will call you at your preferred time
                                </p>
                                <a href="tel:+919876543210" style={styles.callbackBtn}>
                                    <i className="fa-solid fa-phone"></i>
                                    Call Now
                                </a>
                            </div>

                            {/* Social Media */}
                            <div style={styles.socialCard}>
                                <h3 style={styles.socialTitle}>Follow Us</h3>
                                <p style={styles.socialText}>Stay updated with latest programs and news</p>
                                <div style={styles.socialLinks}>
                                    <a href="#" style={{...styles.socialLink, background: '#1877F2'}}>
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="#" style={{...styles.socialLink, background: '#1DA1F2'}}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="#" style={{...styles.socialLink, background: '#0A66C2'}}>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" style={{...styles.socialLink, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'}}>
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" style={{...styles.socialLink, background: '#FF0000'}}>
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section style={styles.mapSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeaderCenter}>
                        <span style={styles.sectionBadgeBlue}>
                            <i className="fa-solid fa-map-marker-alt"></i> Our Location
                        </span>
                        <h2 style={styles.sectionTitleCenter}>Find Us Here</h2>
                        <p style={styles.sectionSubtitle}>Visit our office for in-person consultation</p>
                    </div>
                    
                    <div style={styles.mapContainer}>
                        {/* ============================================
                            MAP IMAGE
                            Replace with actual Google Maps embed or image
                            ============================================ */}
                        <div style={styles.mapPlaceholder}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755049217665!2d72.8272!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNDknMzguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '20px' }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Edufolio Office Location"
                            ></iframe>
                        </div>
                        
                        {/* Map Info Card */}
                        <div style={styles.mapInfoCard}>
                            <div style={styles.mapInfoIcon}>
                                <i className="fa-solid fa-building"></i>
                            </div>
                            <div>
                                <h4 style={styles.mapInfoTitle}>Edufolio Head Office</h4>
                                <p style={styles.mapInfoAddress}>
                                    123 Education Street, Andheri West,<br />
                                    Mumbai, Maharashtra 400001
                                </p>
                                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={styles.mapInfoBtn}>
                                    <i className="fa-solid fa-directions"></i>
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={styles.faqSection}>
                <div style={styles.faqPattern}></div>
                <div style={styles.container}>
                    <div style={styles.sectionHeaderCenter}>
                        <span style={styles.sectionBadgeLight}>
                            <i className="fa-solid fa-question-circle"></i> FAQs
                        </span>
                        <h2 style={styles.sectionTitleLight}>Frequently Asked Questions</h2>
                        <p style={styles.sectionSubtitleLight}>
                            Find quick answers to common questions
                        </p>
                    </div>

                    <div style={styles.faqGrid}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={styles.faqCard}>
                                <div style={styles.faqNumber}>{String(index + 1).padStart(2, '0')}</div>
                                <h4 style={styles.faqQuestion}>{faq.question}</h4>
                                <p style={styles.faqAnswer}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div style={styles.faqCta}>
                        <p style={styles.faqCtaText}>
                            Still have questions? We're here to help!
                        </p>
                        <a href="tel:+919876543210" style={styles.faqCtaBtn}>
                            <i className="fa-solid fa-phone"></i>
                            Talk to an Expert
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section - Blue Theme */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Ready to Transform Your Career?</h2>
                        <p style={styles.ctaText}>
                            Take the first step towards your dream career. Our expert counselors are 
                            here to guide you every step of the way.
                        </p>
                        <div style={styles.ctaTagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <div style={styles.ctaBtns}>
                            <Link to="/programs" style={styles.ctaPrimaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Explore Programs
                            </Link>
                            <Link to="/universities" style={styles.ctaSecondaryBtn}>
                                <i className="fa-solid fa-building-columns"></i>
                                View Universities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
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
    lightPink: '#E8B4C4',
    
    // Neutrals
    white: '#FFFFFF',
    lightGray: '#F5F7FA',
    gray: '#64748B',
    darkGray: '#1E293B',
    
    // Text Colors
    textDark: '#2D1B4E',
    textLight: '#FFFFFF',
    textMuted: '#94A3B8',
    
    // Other
    whatsappGreen: '#25D366',
    success: '#10B981',
    error: '#EF4444'
};

const styles = {
    // Hero Section - Maroon Background with Images
    hero: {
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
        padding: '100px 0 60px',
        position: 'relative',
        overflow: 'hidden'
    },
    heroPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    heroContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
    },
    heroContent: {
        maxWidth: '550px'
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.15)',
        color: colors.white,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)'
    },
    heroTitle: {
        color: colors.white,
        fontSize: '2.8rem',
        fontWeight: '800',
        lineHeight: 1.2,
        marginBottom: '20px'
    },
    highlight: {
        color: colors.lightBlue
    },
    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.1rem',
        lineHeight: 1.7,
        marginBottom: '20px'
    },
    tagline: {
        display: 'flex',
        gap: '15px',
        marginBottom: '30px',
        color: colors.lightBlue,
        fontSize: '1.1rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    heroQuickContact: {
        display: 'flex',
        gap: '20px'
    },
    heroQuickItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '15px 20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        textDecoration: 'none',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'all 0.3s ease'
    },
    heroQuickIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: colors.lightBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        fontSize: '1.1rem'
    },
    heroQuickIconBlue: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        fontSize: '1.1rem'
    },
    heroQuickLabel: {
        display: 'block',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.8rem',
        marginBottom: '2px'
    },
    heroQuickValue: {
        display: 'block',
        color: colors.white,
        fontWeight: '600',
        fontSize: '0.95rem'
    },

    // Hero Images Section
    heroImages: {
        position: 'relative',
        height: '500px'
    },
    mainImageContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px',
        height: '380px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        border: '5px solid rgba(255, 255, 255, 0.2)'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    mainImageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, rgba(107, 29, 58, 0.7), transparent)'
    },
    floatingImage1: {
        position: 'absolute',
        top: '10px',
        right: '20px',
        width: '145px',
        height: '100px',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float1 6s ease-in-out infinite'
    },
    floatingImage2: {
        position: 'absolute',
        bottom: '40px',
        left: '0',
        width: '135px',
        height: '95px',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float2 6s ease-in-out infinite'
    },
    floatingImage3: {
        position: 'absolute',
        top: '40%',
        right: '0',
        width: '115px',
        height: '80px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        animation: 'float1 5s ease-in-out infinite'
    },
    floatingImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    floatingResponseCard: {
        position: 'absolute',
        top: '25px',
        left: '10px',
        background: colors.white,
        padding: '14px 18px',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'float1 5s ease-in-out infinite'
    },
    floatingResponseIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: '#FEF3C7',
        color: '#D97706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem'
    },
    floatingResponseContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingResponseNumber: {
        color: colors.textDark,
        fontSize: '1rem',
        fontWeight: '800'
    },
    floatingResponseLabel: {
        color: colors.gray,
        fontSize: '0.7rem'
    },
    floatingHappyCard: {
        position: 'absolute',
        bottom: '50px',
        right: '10px',
        background: colors.white,
        padding: '14px 18px',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'float2 5s ease-in-out infinite'
    },
    floatingHappyIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem'
    },
    floatingHappyContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingHappyNumber: {
        color: colors.textDark,
        fontSize: '1rem',
        fontWeight: '800'
    },
    floatingHappyLabel: {
        color: colors.gray,
        fontSize: '0.7rem'
    },
    decorCircle1: {
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        border: `3px solid ${colors.lightBlue}40`,
        animation: 'pulse 3s ease-in-out infinite'
    },
    decorCircle2: {
        position: 'absolute',
        bottom: '20%',
        left: '8%',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: `${colors.lightBlue}20`,
        animation: 'pulse 4s ease-in-out infinite'
    },
    decorDots: {
        position: 'absolute',
        top: '55%',
        right: '5%',
        width: '50px',
        height: '50px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
        backgroundSize: '10px 10px'
    },

    // Contact Methods Section
    contactMethodsSection: {
        padding: '60px 20px',
        background: colors.white,
        marginTop: '-30px',
        position: 'relative',
        zIndex: 10
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    methodsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    methodCard: {
        background: colors.lightGray,
        padding: '30px 25px',
        borderRadius: '20px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.lightGray}`
    },
    methodIconMaroon: {
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        margin: '0 auto 20px'
    },
    methodIconBlue: {
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        margin: '0 auto 20px'
    },
    methodTitle: {
        color: colors.textDark,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    methodPrimary: {
        color: colors.textDark,
        fontSize: '0.95rem',
        fontWeight: '600',
        margin: '0 0 5px'
    },
    methodSecondary: {
        color: colors.gray,
        fontSize: '0.9rem',
        margin: '0 0 15px'
    },
    methodBtnMaroon: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: colors.maroon,
        color: colors.white,
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.3s ease'
    },
    methodBtnBlue: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: colors.darkBlue,
        color: colors.white,
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.3s ease'
    },

    // Main Contact Section
    mainSection: {
        padding: '80px 20px',
        background: colors.lightGray
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'start'
    },

    // Form Wrapper
    formWrapper: {
        background: colors.white,
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        border: `1px solid ${colors.lightGray}`
    },
    formHeader: {
        marginBottom: '30px'
    },
    formBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    formTitle: {
        color: colors.textDark,
        fontSize: '1.8rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    formSubtitle: {
        color: colors.gray,
        fontSize: '1rem',
        lineHeight: 1.6
    },
    successMessage: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        padding: '20px',
        background: `${colors.success}15`,
        borderRadius: '14px',
        marginBottom: '25px',
        color: colors.success,
        border: `1px solid ${colors.success}30`
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '15px 20px',
        background: `${colors.error}15`,
        borderRadius: '14px',
        marginBottom: '25px',
        color: colors.error,
        border: `1px solid ${colors.error}30`
    },
    form: {},
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
        color: colors.textDark,
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    input: {
        width: '100%',
        padding: '16px 20px',
        borderRadius: '12px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        background: colors.lightGray
    },
    select: {
        width: '100%',
        padding: '16px 20px',
        borderRadius: '12px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: colors.lightGray,
        color: colors.textDark
    },
    textarea: {
        width: '100%',
        padding: '16px 20px',
        borderRadius: '12px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box',
        resize: 'vertical',
        fontFamily: 'inherit',
        background: colors.lightGray,
        transition: 'all 0.3s ease'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '18px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        border: 'none',
        borderRadius: '14px',
        fontSize: '1.1rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: `0 8px 25px ${colors.maroon}30`,
        transition: 'all 0.3s ease'
    },
    btnSpinner: {
        width: '20px',
        height: '20px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTopColor: colors.white,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    formNote: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '20px',
        color: colors.gray,
        fontSize: '0.85rem',
        justifyContent: 'center'
    },

    // Sidebar
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    whatsappCard: {
        background: `linear-gradient(135deg, ${colors.whatsappGreen} 0%, #128C7E 100%)`,
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center'
    },
    whatsappIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        color: colors.white,
        margin: '0 auto 15px'
    },
    whatsappTitle: {
        color: colors.white,
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '8px'
    },
    whatsappText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.9rem',
        marginBottom: '20px',
        lineHeight: 1.5
    },
    whatsappBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 28px',
        background: colors.white,
        color: colors.whatsappGreen,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    },
    callbackCard: {
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center'
    },
    callbackIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(0, 153, 214, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: colors.lightBlue,
        margin: '0 auto 15px'
    },
    callbackTitle: {
        color: colors.white,
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '8px'
    },
    callbackText: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '0.9rem',
        marginBottom: '20px',
        lineHeight: 1.5
    },
    callbackBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 28px',
        background: colors.lightBlue,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1rem',
        boxShadow: `0 4px 15px ${colors.lightBlue}40`,
        transition: 'all 0.3s ease'
    },
    socialCard: {
        background: colors.white,
        padding: '25px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: `1px solid ${colors.lightGray}`
    },
    socialTitle: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    socialText: {
        color: colors.gray,
        fontSize: '0.85rem',
        marginBottom: '15px'
    },
    socialLinks: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    },
    socialLink: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    },

    // Map Section
    mapSection: {
        padding: '80px 20px',
        background: colors.white
    },
    sectionHeaderCenter: {
        textAlign: 'center',
        marginBottom: '40px'
    },
    sectionBadgeBlue: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionBadgeLight: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.15)',
        color: colors.white,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionTitleCenter: {
        color: colors.textDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionTitleLight: {
        color: colors.white,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionSubtitle: {
        color: colors.gray,
        fontSize: '1.05rem'
    },
    sectionSubtitleLight: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1.05rem',
        marginBottom: '40px'
    },
    mapContainer: {
        position: 'relative'
    },
    mapPlaceholder: {
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    },
    mapInfoCard: {
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        background: colors.white,
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        display: 'flex',
        gap: '15px',
        maxWidth: '350px'
    },
    mapInfoIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0
    },
    mapInfoTitle: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    mapInfoAddress: {
        color: colors.gray,
        fontSize: '0.9rem',
        lineHeight: 1.5,
        marginBottom: '12px'
    },
    mapInfoBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.darkBlue,
        fontWeight: '600',
        fontSize: '0.9rem',
        textDecoration: 'none'
    },

    // FAQ Section - Blue Theme
    faqSection: {
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        position: 'relative',
        overflow: 'hidden'
    },
    faqPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    faqGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '25px'
    },
    faqCard: {
        background: 'rgba(255, 255, 255, 0.08)',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
    },
    faqNumber: {
        display: 'inline-block',
        background: colors.lightBlue,
        color: colors.white,
        padding: '6px 14px',
        borderRadius: '10px',
        fontSize: '0.85rem',
        fontWeight: '700',
        marginBottom: '15px'
    },
    faqQuestion: {
        color: colors.white,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '12px',
        lineHeight: 1.4
    },
    faqAnswer: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        margin: 0
    },
    faqCta: {
        textAlign: 'center',
        marginTop: '50px'
    },
    faqCtaText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1.1rem',
        marginBottom: '20px'
    },
    faqCtaBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: colors.white,
        color: colors.darkBlue,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
    },

    // CTA Section - Maroon Theme
    ctaSection: {
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    ctaPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    ctaContent: {
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    ctaIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(0, 153, 214, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px',
        fontSize: '2rem',
        color: colors.lightBlue
    },
    ctaTitle: {
        color: colors.white,
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaText: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.15rem',
        marginBottom: '20px',
        lineHeight: 1.6
    },
    ctaTagline: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '35px',
        color: colors.lightBlue,
        fontSize: '1.1rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    ctaBtns: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    ctaPrimaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: colors.lightBlue,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: `0 4px 20px ${colors.lightBlue}40`,
        transition: 'all 0.3s ease'
    },
    ctaSecondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: 'transparent',
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease'
    }
};

// Add responsive styles, keyframes, and animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @keyframes float1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes float2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        body {
            font-family: 'Poppins', sans-serif;
        }
        
        input:focus, textarea:focus, select:focus {
            border-color: ${colors.maroon} !important;
            box-shadow: 0 0 0 3px ${colors.maroon}20 !important;
            background: ${colors.white} !important;
        }
        
        .method-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
            background: ${colors.white};
        }
        
        .faq-card:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-3px);
        }
        
        .social-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        
        .hero-quick-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .submit-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px ${colors.maroon}40;
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        @media (max-width: 1024px) {
            .hero-container {
                grid-template-columns: 1fr !important;
                text-align: center;
            }
            .hero-content {
                max-width: 100% !important;
            }
            .hero-images {
                display: none !important;
            }
            .hero-quick-contact {
                justify-content: center;
            }
            .tagline {
                justify-content: center;
            }
            .methods-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
            }
            .contact-grid { 
                grid-template-columns: 1fr !important; 
            }
            .faq-grid { 
                grid-template-columns: 1fr !important; 
            }
        }
        
        @media (max-width: 768px) {
            .hero-title { 
                font-size: 2rem !important; 
            }
            .cta-title { 
                font-size: 1.8rem !important; 
            }
            .methods-grid { 
                grid-template-columns: 1fr !important; 
            }
            .form-row { 
                grid-template-columns: 1fr !important; 
            }
            .hero-quick-contact { 
                flex-direction: column; 
                align-items: center;
            }
            .cta-btns {
                flex-direction: column;
                width: 100%;
            }
            .map-info-card {
                position: static !important;
                max-width: 100% !important;
                margin-top: 20px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Contact;
