import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseFinder from '../components/CourseFinder';
import EnrollModal from '../components/EnrollModal';

const Home = () => {
    const [universities, setUniversities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [uniRes, progRes] = await Promise.all([
                axios.get(`${API_BASE}/public/universities`),
                axios.get(`${API_BASE}/public/programs`)
            ]);
            setUniversities(uniRes.data.filter(u => u.featured).slice(0, 4));
            setPrograms(progRes.data.filter(p => p.featured).slice(0, 6));
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEnrollClick = (program) => {
        setSelectedProgram(program);
        setShowEnrollModal(true);
    };

    const stats = [
        { number: '50+', label: 'Partner Universities', icon: 'fa-building-columns' },
        { number: '200+', label: 'Programs', icon: 'fa-graduation-cap' },
        { number: '15000+', label: 'Students Enrolled', icon: 'fa-users' },
        { number: '95%', label: 'Placement Rate', icon: 'fa-briefcase' }
    ];

    const features = [
        {
            icon: 'fa-certificate',
            title: 'UGC Approved',
            description: 'All programs are approved by UGC-DEB and recognized nationwide'
        },
        {
            icon: 'fa-laptop',
            title: '100% Online',
            description: 'Study from anywhere with flexible online learning'
        },
        {
            icon: 'fa-wallet',
            title: 'Affordable Fees',
            description: 'Quality education at competitive prices with EMI options'
        },
        {
            icon: 'fa-headset',
            title: '24/7 Support',
            description: 'Dedicated student support throughout your journey'
        }
    ];

    const testimonials = [
        {
            name: 'Rahul Sharma',
            program: 'MBA - Finance',
            university: 'Amity University',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'The online MBA program helped me advance my career while working full-time. The flexibility and quality of education exceeded my expectations.'
        },
        {
            name: 'Priya Patel',
            program: 'MCA',
            university: 'LPU Online',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'Excellent curriculum and supportive faculty. I landed my dream job at a top tech company right after completing my degree.'
        },
        {
            name: 'Amit Kumar',
            program: 'BBA',
            university: 'Manipal University',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            text: 'The practical approach to learning and industry-relevant projects made all the difference. Highly recommend Edufolio!'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section with Images */}
            <section style={styles.hero}>
                <div style={styles.heroPattern}></div>
                
                <div style={styles.heroContainer}>
                    {/* Left Content */}
                    <div style={styles.heroContent}>
                        <span style={styles.heroBadge}>
                            <i className="fa-solid fa-star"></i> India's #1 Online Education Platform
                        </span>
                        <h1 style={styles.heroTitle}>
                            Transform Your Career with{' '}
                            <span style={styles.highlight}>Online Degrees</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Get UGC-approved degrees from India's top universities. 
                            Study at your own pace, from anywhere in the world.
                        </p>
                        <div style={styles.tagline}>
                            <span style={styles.taglineItem}>learn.</span>
                            <span style={styles.taglineItem}>grow.</span>
                            <span style={styles.taglineItem}>succeed.</span>
                        </div>
                        <div style={styles.heroButtons}>
                            <Link to="/programs" style={styles.primaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Explore Programs
                            </Link>
                            <Link to="/universities" style={styles.secondaryBtn}>
                                <i className="fa-solid fa-building-columns"></i>
                                View Universities
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div style={styles.trustBadges}>
                            <div style={styles.trustBadge}>
                                <i className="fa-solid fa-shield-check"></i>
                                <span>UGC-DEB Approved</span>
                            </div>
                            <div style={styles.trustBadge}>
                                <i className="fa-solid fa-award"></i>
                                <span>NAAC Accredited</span>
                            </div>
                            <div style={styles.trustBadge}>
                                <i className="fa-solid fa-medal"></i>
                                <span>AICTE Recognized</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Images Section */}
                    <div style={styles.heroImages}>
                        {/* Main Image */}
                        <div style={styles.mainImageContainer}>
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=700&fit=crop" 
                                alt="Students studying online"
                                style={styles.mainImage}
                            />
                            <div style={styles.mainImageOverlay}></div>
                        </div>

                        {/* Floating Image 1 - Top Right */}
                        <div style={styles.floatingImage1}>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop" 
                                alt="Team collaboration"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Floating Image 2 - Bottom Left */}
                        <div style={styles.floatingImage2}>
                            <img 
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop" 
                                alt="Online learning"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Stats Card - Floating */}
                        <div style={styles.floatingStatsCard}>
                            <div style={styles.floatingStatsIcon}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div style={styles.floatingStatsContent}>
                                <span style={styles.floatingStatsNumber}>15,000+</span>
                                <span style={styles.floatingStatsLabel}>Active Students</span>
                            </div>
                        </div>

                        {/* Success Card - Floating */}
                        <div style={styles.floatingSuccessCard}>
                            <div style={styles.floatingSuccessIcon}>
                                <i className="fa-solid fa-trophy"></i>
                            </div>
                            <div style={styles.floatingSuccessContent}>
                                <span style={styles.floatingSuccessNumber}>95%</span>
                                <span style={styles.floatingSuccessLabel}>Placement Rate</span>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div style={styles.decorCircle1}></div>
                        <div style={styles.decorCircle2}></div>
                        <div style={styles.decorDots}></div>
                    </div>
                </div>

                {/* Stats Section at Bottom of Hero */}
                <div style={styles.heroStats}>
                    <div style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <div key={index} style={styles.statItem}>
                                <div style={styles.statIconWrapper}>
                                    <i className={`fa-solid ${stat.icon}`} style={styles.statIcon}></i>
                                </div>
                                <span style={styles.statNumber}>{stat.number}</span>
                                <span style={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.featuresSection}>
                <div style={styles.container}>
                    <div style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} style={styles.featureCard}>
                                <div style={styles.featureIcon}>
                                    <i className={`fa-solid ${feature.icon}`}></i>
                                </div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureDesc}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Programs Section */}
            <section style={styles.programsSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-fire"></i> Trending
                        </span>
                        <h2 style={styles.sectionTitle}>Featured Programs</h2>
                        <p style={styles.sectionSubtitle}>
                            Most popular programs chosen by our students
                        </p>
                    </div>

                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <span>Loading programs...</span>
                        </div>
                    ) : programs.length > 0 ? (
                        <div style={styles.programsGrid}>
                            {programs.map((program) => (
                                <div key={program._id} style={styles.programCard}>
                                    {program.featured && (
                                        <span style={styles.featuredBadge}>
                                            <i className="fa-solid fa-star"></i> Featured
                                        </span>
                                    )}
                                    
                                    <div style={styles.programHeader}>
                                        <span style={styles.categoryBadge}>{program.category}</span>
                                        <span style={styles.modeBadge}>{program.mode}</span>
                                    </div>
                                    
                                    <h3 style={styles.programTitle}>{program.name}</h3>
                                    
                                    <p style={styles.programUniversity}>
                                        <i className="fa-solid fa-building-columns"></i>
                                        {program.universityId?.name || 'University'}
                                    </p>
                                    
                                    <div style={styles.programMeta}>
                                        <span style={styles.metaItem}>
                                            <i className="fa-solid fa-clock"></i> {program.duration}
                                        </span>
                                        <span style={styles.metaItem}>
                                            <i className="fa-solid fa-layer-group"></i> {program.level}
                                        </span>
                                    </div>
                                    
                                    <div style={styles.programFee}>
                                        <div>
                                            <span style={styles.feeLabel}>Total Fee</span>
                                            <span style={styles.feeAmount}>
                                                ₹{Number(program.fee).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <span style={styles.emiText}>EMI Available</span>
                                    </div>
                                    
                                    <div style={styles.programActions}>
                                        <Link 
                                            to={`/programs/${program.slug}`} 
                                            style={styles.viewDetailsBtn}
                                        >
                                            View Details
                                        </Link>
                                        <button 
                                            style={styles.enrollNowBtn}
                                            onClick={() => handleEnrollClick(program)}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i> Enroll Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.noData}>
                            <i className="fa-solid fa-graduation-cap" style={styles.noDataIcon}></i>
                            <p>No programs available</p>
                        </div>
                    )}

                    <div style={styles.viewAllContainer}>
                        <Link to="/programs" style={styles.viewAllBtn}>
                            View All Programs <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Universities Section */}
            <section style={styles.universitiesSection}>
                <div style={styles.universitiesPattern}></div>
                <div style={styles.container}>
                    <div style={styles.sectionHeaderLight}>
                        <span style={styles.sectionBadgeLight}>
                            <i className="fa-solid fa-award"></i> Top Rated
                        </span>
                        <h2 style={styles.sectionTitleLight}>Partner Universities</h2>
                        <p style={styles.sectionSubtitleLight}>
                            Learn from India's most prestigious institutions
                        </p>
                    </div>

                    {loading ? (
                        <div style={styles.loadingLight}>
                            <div style={styles.spinnerLight}></div>
                            <span>Loading universities...</span>
                        </div>
                    ) : universities.length > 0 ? (
                        <div style={styles.universitiesGrid}>
                            {universities.map((university) => (
                                <Link
                                    key={university._id}
                                    to={`/universities/${university.slug}`}
                                    style={styles.universityCard}
                                >
                                    {university.featured && (
                                        <span style={styles.universityFeaturedBadge}>Featured</span>
                                    )}
                                    <div style={styles.universityLogo}>
                                        <img
                                            src={university.logo || 'https://placehold.co/100x100?text=Logo'}
                                            alt={university.name}
                                            style={styles.logoImg}
                                            onError={(e) => {
                                                e.target.src = 'https://placehold.co/100x100?text=Logo';
                                            }}
                                        />
                                    </div>
                                    <h3 style={styles.universityName}>{university.name}</h3>
                                    <p style={styles.universityLocation}>
                                        <i className="fa-solid fa-location-dot"></i>
                                        {university.location}
                                    </p>
                                    <div style={styles.universityMeta}>
                                        {university.rating && (
                                            <span style={styles.ratingBadge}>
                                                <i className="fa-solid fa-star"></i> NAAC {university.rating}
                                            </span>
                                        )}
                                    </div>
                                    <div style={styles.universityPrograms}>
                                        <span>10+ Programs</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.noDataLight}>
                            <i className="fa-solid fa-building-columns" style={styles.noDataIcon}></i>
                            <p>No universities available</p>
                        </div>
                    )}

                    <div style={styles.viewAllContainer}>
                        <Link to="/universities" style={styles.viewAllBtnLight}>
                            View All Universities <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={styles.whySection}>
                <div style={styles.container}>
                    <div style={styles.whyContent}>
                        <div style={styles.whyLeft}>
                            <span style={styles.sectionBadgeBlue}>
                                <i className="fa-solid fa-question"></i> Why Edufolio
                            </span>
                            <h2 style={styles.whyTitle}>
                                Why Students Choose Us?
                            </h2>
                            <p style={styles.whyDesc}>
                                We partner with India's top universities to bring you 
                                quality education at your doorstep. Our platform makes 
                                it easy to find, compare, and enroll in the perfect program.
                            </p>
                            
                            <div style={styles.whyFeatures}>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Expert Counseling</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Free guidance from education experts
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Easy Application</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Simple enrollment process with full support
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.whyFeature}>
                                    <div style={styles.whyFeatureIcon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h4 style={styles.whyFeatureTitle}>Scholarship Support</h4>
                                        <p style={styles.whyFeatureDesc}>
                                            Help with scholarships and financial aid
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={styles.whyRight}>
                            <div style={styles.whyCard}>
                                <div style={styles.whyCardIcon}>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <h3 style={styles.whyCardTitle}>Need Help Choosing?</h3>
                                <p style={styles.whyCardDesc}>
                                    Talk to our expert counselors for free guidance
                                </p>
                                <a href="tel:+919999999999" style={styles.whyCardBtn}>
                                    <i className="fa-solid fa-phone"></i>
                                    Call Now: +91 99999 99999
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.testimonialsSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-quote-left"></i> Testimonials
                        </span>
                        <h2 style={styles.sectionTitle}>What Our Students Say</h2>
                        <p style={styles.sectionSubtitle}>
                            Success stories from our alumni
                        </p>
                    </div>

                    <div style={styles.testimonialsGrid}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} style={styles.testimonialCard}>
                                <div style={styles.testimonialQuote}>
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <p style={styles.testimonialText}>{testimonial.text}</p>
                                <div style={styles.testimonialAuthor}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        style={styles.testimonialImage}
                                    />
                                    <div>
                                        <h4 style={styles.testimonialName}>{testimonial.name}</h4>
                                        <p style={styles.testimonialProgram}>{testimonial.program}</p>
                                        <p style={styles.testimonialUniversity}>{testimonial.university}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                        <p style={styles.ctaDesc}>
                            Take the first step towards your dream career. 
                            Our counselors are here to help you choose the right path.
                        </p>
                        <div style={styles.ctaTagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <div style={styles.ctaButtons}>
                            <Link to="/programs" style={styles.ctaPrimaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Browse Programs
                            </Link>
                            <Link to="/contact" style={styles.ctaSecondaryBtn}>
                                <i className="fa-solid fa-phone"></i>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Finder Floating Button */}
            <CourseFinder />

            {/* Enroll Modal */}
            <EnrollModal
                isOpen={showEnrollModal}
                onClose={() => setShowEnrollModal(false)}
                program={selectedProgram}
                university={selectedProgram?.universityId}
            />

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
    textMuted: '#94A3B8'
};

const styles = {
    // Hero Section - Maroon Background with Images
    hero: {
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
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
        padding: '140px 20px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        flex: 1
    },
    heroContent: {
        maxWidth: '600px'
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
        marginBottom: '25px',
        backdropFilter: 'blur(10px)'
    },
    heroTitle: {
        color: colors.white,
        fontSize: '3.2rem',
        fontWeight: '800',
        lineHeight: 1.2,
        marginBottom: '20px'
    },
    highlight: {
        color: colors.lightBlue
    },
    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.15rem',
        lineHeight: 1.7,
        marginBottom: '20px'
    },
    tagline: {
        display: 'flex',
        gap: '15px',
        marginBottom: '30px'
    },
    taglineItem: {
        color: colors.lightBlue,
        fontSize: '1.1rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    heroButtons: {
        display: 'flex',
        gap: '15px',
        marginBottom: '35px',
        flexWrap: 'wrap'
    },
    primaryBtn: {
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
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    },
    trustBadges: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
    },
    trustBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.85rem',
        fontWeight: '500'
    },

    // Hero Images Section
    heroImages: {
        position: 'relative',
        height: '550px'
    },
    mainImageContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '380px',
        height: '480px',
        borderRadius: '30px',
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
        height: '150px',
        background: 'linear-gradient(to top, rgba(107, 29, 58, 0.8), transparent)'
    },
    floatingImage1: {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '180px',
        height: '120px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float1 6s ease-in-out infinite'
    },
    floatingImage2: {
        position: 'absolute',
        bottom: '30px',
        left: '0',
        width: '160px',
        height: '110px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float2 6s ease-in-out infinite'
    },
    floatingImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    floatingStatsCard: {
        position: 'absolute',
        top: '60px',
        left: '-20px',
        background: colors.white,
        padding: '18px 22px',
        borderRadius: '16px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        animation: 'float1 5s ease-in-out infinite'
    },
    floatingStatsIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: `${colors.lightBlue}20`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem'
    },
    floatingStatsContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingStatsNumber: {
        color: colors.darkBlue,
        fontSize: '1.4rem',
        fontWeight: '800'
    },
    floatingStatsLabel: {
        color: colors.gray,
        fontSize: '0.8rem'
    },
    floatingSuccessCard: {
        position: 'absolute',
        bottom: '80px',
        right: '-10px',
        background: colors.white,
        padding: '18px 22px',
        borderRadius: '16px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        animation: 'float2 5s ease-in-out infinite'
    },
    floatingSuccessIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: `${colors.maroon}20`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem'
    },
    floatingSuccessContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingSuccessNumber: {
        color: colors.maroon,
        fontSize: '1.4rem',
        fontWeight: '800'
    },
    floatingSuccessLabel: {
        color: colors.gray,
        fontSize: '0.8rem'
    },
    decorCircle1: {
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid rgba(0, 153, 214, 0.3)',
        animation: 'pulse 3s ease-in-out infinite'
    },
    decorCircle2: {
        position: 'absolute',
        bottom: '25%',
        left: '10%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(0, 153, 214, 0.1)',
        animation: 'pulse 4s ease-in-out infinite'
    },
    decorDots: {
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '60px',
        height: '60px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
        backgroundSize: '12px 12px'
    },

    // Hero Stats at Bottom
    heroStats: {
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '30px 0',
        position: 'relative',
        zIndex: 2
    },
    statsContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '30px'
    },
    statItem: {
        textAlign: 'center'
    },
    statIconWrapper: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: 'rgba(0, 153, 214, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 10px'
    },
    statIcon: {
        fontSize: '1.3rem',
        color: colors.lightBlue
    },
    statNumber: {
        display: 'block',
        color: colors.white,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '5px'
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem'
    },

    // Rest of the styles (Features, Programs, Universities, etc.)
    // ... keep all the other existing styles from before
    
    // Features Section
    featuresSection: {
        padding: '80px 20px',
        background: colors.white
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    featureCard: {
        textAlign: 'center',
        padding: '30px 20px',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.lightGray}`,
        background: colors.white
    },
    featureIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '20px',
        background: `linear-gradient(135deg, ${colors.maroon}15, ${colors.pink}15)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem',
        color: colors.maroon
    },
    featureTitle: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    featureDesc: {
        color: colors.gray,
        fontSize: '0.95rem',
        lineHeight: 1.6,
        margin: 0
    },

    // Programs Section
    programsSection: {
        padding: '80px 20px',
        background: colors.lightGray
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionBadge: {
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
    sectionBadgeBlue: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionTitle: {
        color: colors.textDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionSubtitle: {
        color: colors.gray,
        fontSize: '1.05rem',
        margin: 0
    },
    loading: {
        textAlign: 'center',
        padding: '60px 20px',
        color: colors.gray,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: `4px solid ${colors.lightGray}`,
        borderTopColor: colors.maroon,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    noData: {
        textAlign: 'center',
        padding: '60px 20px',
        color: colors.gray
    },
    noDataIcon: {
        fontSize: '3rem',
        marginBottom: '15px',
        display: 'block'
    },
    programsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px'
    },
    programCard: {
        background: colors.white,
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: `1px solid ${colors.lightGray}`
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        padding: '5px 12px',
        borderRadius: '15px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    programHeader: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    categoryBadge: {
        background: `${colors.maroon}15`,
        color: colors.maroon,
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    modeBadge: {
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    programTitle: {
        color: colors.textDark,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '10px',
        lineHeight: 1.3
    },
    programUniversity: {
        color: colors.gray,
        fontSize: '0.9rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    programMeta: {
        display: 'flex',
        gap: '15px',
        marginBottom: '15px'
    },
    metaItem: {
        color: colors.gray,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    programFee: {
        background: colors.lightGray,
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feeLabel: {
        display: 'block',
        color: colors.gray,
        fontSize: '0.8rem',
        marginBottom: '3px'
    },
    feeAmount: {
        color: colors.maroon,
        fontSize: '1.3rem',
        fontWeight: '700'
    },
    emiText: {
        background: '#DCFCE7',
        color: '#15803D',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    programActions: {
        display: 'flex',
        gap: '10px'
    },
    viewDetailsBtn: {
        flex: 1,
        padding: '12px',
        background: colors.lightGray,
        color: colors.textDark,
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '0.9rem',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'all 0.3s ease'
    },
    enrollNowBtn: {
        flex: 1,
        padding: '12px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        border: 'none',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        boxShadow: `0 4px 15px ${colors.maroon}30`
    },
    viewAllContainer: {
        textAlign: 'center',
        marginTop: '50px'
    },
    viewAllBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: colors.darkBlue,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    },

    // Universities Section
    universitiesSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        position: 'relative',
        overflow: 'hidden'
    },
    universitiesPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    sectionHeaderLight: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionBadgeLight: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0, 153, 214, 0.2)',
        color: colors.lightBlue,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '15px'
    },
    sectionTitleLight: {
        color: colors.white,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionSubtitleLight: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1.05rem',
        margin: 0
    },
    loadingLight: {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
    },
    spinnerLight: {
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderTopColor: colors.lightBlue,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    noDataLight: {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'rgba(255, 255, 255, 0.6)'
    },
    universitiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    universityCard: {
        background: colors.white,
        borderRadius: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    universityFeaturedBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `${colors.lightBlue}20`,
        color: colors.darkBlue,
        padding: '4px 10px',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: '600'
    },
    universityLogo: {
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        background: colors.lightGray,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
    },
    logoImg: {
        width: '70px',
        height: '70px',
        objectFit: 'contain'
    },
    universityName: {
        color: colors.textDark,
        fontSize: '1.05rem',
        fontWeight: '700',
        marginBottom: '8px'
    },
    universityLocation: {
        color: colors.gray,
        fontSize: '0.85rem',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
    },
    universityMeta: {
        marginBottom: '15px'
    },
    ratingBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: '#FEF3C7',
        color: '#D97706',
        padding: '5px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    universityPrograms: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: colors.darkBlue,
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    viewAllBtnLight: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        background: colors.white,
        color: colors.darkBlue,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'transform 0.3s ease'
    },

    // Why Section
    whySection: {
        padding: '80px 20px',
        background: colors.lightGray
    },
    whyContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '60px',
        alignItems: 'center'
    },
    whyLeft: {},
    whyTitle: {
        color: colors.textDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '20px'
    },
    whyDesc: {
        color: colors.gray,
        fontSize: '1.05rem',
        lineHeight: 1.7,
        marginBottom: '35px'
    },
    whyFeatures: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    whyFeature: {
        display: 'flex',
        gap: '15px'
    },
    whyFeatureIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `${colors.lightBlue}20`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    whyFeatureTitle: {
        color: colors.textDark,
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '5px'
    },
    whyFeatureDesc: {
        color: colors.gray,
        fontSize: '0.9rem',
        margin: 0
    },
    whyRight: {},
    whyCard: {
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        borderRadius: '24px',
        padding: '40px 30px',
        textAlign: 'center'
    },
    whyCardIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'rgba(0, 153, 214, 0.2)',
        color: colors.lightBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem'
    },
    whyCardTitle: {
        color: colors.white,
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    whyCardDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.95rem',
        marginBottom: '25px'
    },
    whyCardBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 25px',
        background: colors.lightBlue,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem'
    },

    // Testimonials Section
    testimonialsSection: {
        padding: '80px 20px',
        background: colors.white
    },
    testimonialsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px'
    },
    testimonialCard: {
        background: colors.lightGray,
        borderRadius: '20px',
        padding: '30px',
        border: `1px solid ${colors.lightGray}`
    },
    testimonialQuote: {
        color: colors.maroon,
        fontSize: '1.5rem',
        marginBottom: '15px'
    },
    testimonialText: {
        color: colors.gray,
        fontSize: '0.95rem',
        lineHeight: 1.7,
        marginBottom: '20px'
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    testimonialImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `3px solid ${colors.maroon}20`
    },
    testimonialName: {
        color: colors.textDark,
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '3px'
    },
    testimonialProgram: {
        color: colors.maroon,
        fontSize: '0.85rem',
        margin: '0 0 2px'
    },
    testimonialUniversity: {
        color: colors.gray,
        fontSize: '0.8rem',
        margin: 0
    },

    // CTA Section
    ctaSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
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
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    ctaTitle: {
        color: colors.white,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaDesc: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '1.1rem',
        marginBottom: '20px',
        lineHeight: 1.6
    },
    ctaTagline: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '30px',
        color: colors.lightBlue,
        fontSize: '1.1rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    ctaButtons: {
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
        background: colors.white,
        color: colors.maroon,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        transition: 'transform 0.3s ease'
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
        border: '2px solid rgba(255, 255, 255, 0.5)'
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
        
        .primary-btn:hover, .secondary-btn:hover {
            transform: translateY(-3px);
        }
        
        .program-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        
        .university-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 1024px) {
            .hero-container {
                grid-template-columns: 1fr !important;
                text-align: center;
                padding-top: 120px !important;
            }
            .hero-content {
                max-width: 100% !important;
            }
            .hero-images {
                display: none !important;
            }
            .hero-buttons {
                justify-content: center;
            }
            .trust-badges {
                justify-content: center;
            }
            .tagline {
                justify-content: center;
            }
            .features-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
            }
            .programs-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
            }
            .universities-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
            }
            .testimonials-grid { 
                grid-template-columns: repeat(2, 1fr) !important; 
            }
            .why-content { 
                grid-template-columns: 1fr !important; 
            }
        }
        
        @media (max-width: 768px) {
            .hero-title { 
                font-size: 2.2rem !important; 
            }
            .features-grid { 
                grid-template-columns: 1fr !important; 
            }
            .programs-grid { 
                grid-template-columns: 1fr !important; 
            }
            .universities-grid { 
                grid-template-columns: 1fr !important; 
            }
            .testimonials-grid { 
                grid-template-columns: 1fr !important; 
            }
            .stats-container { 
                gap: 25px !important; 
            }
            .stat-item {
                flex: 0 0 45%;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Home;
