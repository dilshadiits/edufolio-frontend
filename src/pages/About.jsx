import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    const team = [
        {
            name: 'Rahul Sharma',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            description: 'Education industry veteran with 15+ years of experience'
        },
        {
            name: 'Priya Patel',
            role: 'Head of Operations',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            description: 'Expert in student success and educational operations'
        },
        {
            name: 'Amit Kumar',
            role: 'Academic Director',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            description: 'PhD in Education with focus on online learning'
        },
        {
            name: 'Neha Singh',
            role: 'Student Success Lead',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            description: 'Dedicated to helping students achieve their goals'
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section - Blue Theme */}
            <section style={styles.hero}>
                <div style={styles.heroPattern}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-info-circle"></i> About Us
                    </span>
                    <h1 style={styles.heroTitle}>About Edufolio</h1>
                    <p style={styles.heroSubtitle}>
                        Empowering learners with quality online education from India's top universities. 
                        Your success is our mission.
                    </p>
                    <div style={styles.tagline}>
                        <span>learn.</span>
                        <span>grow.</span>
                        <span>succeed.</span>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.missionGrid}>
                        <div style={styles.missionContent}>
                            <span style={styles.sectionBadgeMaroon}>
                                <i className="fa-solid fa-bullseye"></i> Our Mission
                            </span>
                            <h2 style={styles.sectionTitle}>Making Quality Education Accessible</h2>
                            <p style={styles.sectionText}>
                                At Edufolio, we believe that quality education should be accessible to everyone, 
                                regardless of their location or circumstances. Our platform connects aspiring 
                                learners with India's top universities offering online and distance education programs.
                            </p>
                            <p style={styles.sectionText}>
                                We are committed to providing comprehensive information about various programs, 
                                helping students make informed decisions about their educational journey. Our team 
                                of expert counselors is always ready to guide you towards the right path.
                            </p>
                            <div style={styles.missionStats}>
                                <div style={styles.missionStat}>
                                    <span style={styles.missionStatNumber}>5+</span>
                                    <span style={styles.missionStatLabel}>Years of Experience</span>
                                </div>
                                <div style={styles.missionStat}>
                                    <span style={styles.missionStatNumberBlue}>10K+</span>
                                    <span style={styles.missionStatLabel}>Students Guided</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.missionImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600" 
                                alt="Students learning"
                                style={styles.image}
                            />
                            <div style={styles.imageAccent}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section style={styles.visionSection}>
                <div style={styles.container}>
                    <div style={styles.visionGrid}>
                        <div style={styles.visionImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                                alt="Team collaboration"
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.visionContent}>
                            <span style={styles.sectionBadgeBlue}>
                                <i className="fa-solid fa-eye"></i> Our Vision
                            </span>
                            <h2 style={styles.sectionTitle}>Transforming Education Landscape</h2>
                            <p style={styles.sectionText}>
                                We envision a future where every individual has the opportunity to pursue 
                                higher education without barriers. Through technology and partnerships with 
                                prestigious institutions, we aim to democratize learning.
                            </p>
                            <div style={styles.visionPoints}>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIconBlue}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Bridge the gap between aspirations and opportunities</span>
                                </div>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIconMaroon}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Make quality education affordable and accessible</span>
                                </div>
                                <div style={styles.visionPoint}>
                                    <div style={styles.visionPointIconBlue}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <span>Support students throughout their learning journey</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Maroon Theme */}
            <section style={styles.valuesSection}>
                <div style={styles.valuesSectionPattern}></div>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadgeLight}>
                            <i className="fa-solid fa-heart"></i> Our Values
                        </span>
                        <h2 style={styles.sectionTitleLight}>What We Stand For</h2>
                        <p style={styles.sectionSubtitleLight}>
                            Our core values guide everything we do at Edufolio
                        </p>
                    </div>

                    <div style={styles.valuesGrid}>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIconBlue}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Quality Education</h3>
                            <p style={styles.valueText}>
                                We partner only with accredited universities that maintain high educational standards and deliver real value.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIconWhite}>
                                <i className="fa-solid fa-handshake"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Trust & Transparency</h3>
                            <p style={styles.valueText}>
                                Complete transparency in fees, curriculum, and university information. No hidden charges, ever.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIconWhite}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Student First</h3>
                            <p style={styles.valueText}>
                                Every decision we make is guided by what's best for our students and their career aspirations.
                            </p>
                        </div>
                        <div style={styles.valueCard}>
                            <div style={styles.valueIconBlue}>
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <h3 style={styles.valueTitle}>Continuous Support</h3>
                            <p style={styles.valueText}>
                                From enrollment to graduation, we're here to support your journey with 24/7 assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Blue Theme */}
            <section style={styles.statsSection}>
                <div style={styles.statsSectionPattern}></div>
                <div style={styles.container}>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-building-columns"></i>
                            </div>
                            <span style={styles.statNumber}>50+</span>
                            <span style={styles.statLabel}>Partner Universities</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span style={styles.statNumber}>500+</span>
                            <span style={styles.statLabel}>Programs Available</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <span style={styles.statNumber}>10,000+</span>
                            <span style={styles.statLabel}>Students Enrolled</span>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span style={styles.statNumber}>95%</span>
                            <span style={styles.statLabel}>Student Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadgeBlue}>
                            <i className="fa-solid fa-trophy"></i> Why Choose Us
                        </span>
                        <h2 style={styles.sectionTitleCenter}>The Edufolio Advantage</h2>
                        <p style={styles.sectionSubtitle}>
                            What makes us the preferred choice for thousands of students
                        </p>
                    </div>

                    <div style={styles.advantagesGrid}>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumberMaroon}>01</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Verified Universities</h3>
                                <p style={styles.advantageText}>
                                    All partner universities are UGC-DEB approved and NAAC accredited, ensuring your degree is recognized nationwide.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumberBlue}>02</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Expert Counseling</h3>
                                <p style={styles.advantageText}>
                                    Free career counseling from experienced education consultants who understand your needs and aspirations.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumberBlue}>03</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>Best Price Guarantee</h3>
                                <p style={styles.advantageText}>
                                    We ensure you get the best possible fees with available scholarships and flexible EMI options.
                                </p>
                            </div>
                        </div>
                        <div style={styles.advantageItem}>
                            <div style={styles.advantageNumberMaroon}>04</div>
                            <div style={styles.advantageContent}>
                                <h3 style={styles.advantageTitle}>End-to-End Support</h3>
                                <p style={styles.advantageText}>
                                    From application to graduation, we support you at every step with dedicated student success managers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={styles.teamSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadgeMaroon}>
                            <i className="fa-solid fa-user-group"></i> Our Team
                        </span>
                        <h2 style={styles.sectionTitleCenter}>Meet the People Behind Edufolio</h2>
                        <p style={styles.sectionSubtitle}>
                            Dedicated professionals committed to your educational success
                        </p>
                    </div>

                    <div style={styles.teamGrid}>
                        {team.map((member, index) => (
                            <div key={index} style={styles.teamCard}>
                                <div style={styles.teamImageWrapper}>
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        style={styles.teamImage}
                                    />
                                </div>
                                <h3 style={styles.teamName}>{member.name}</h3>
                                <p style={styles.teamRole}>{member.role}</p>
                                <p style={styles.teamDesc}>{member.description}</p>
                                <div style={styles.teamSocial}>
                                    <a href="#" style={styles.teamSocialLinkBlue}>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" style={styles.teamSocialLinkMaroon}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Maroon Theme */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                        <p style={styles.ctaText}>
                            Take the first step towards your dream career. Our expert counselors are here to help you 
                            choose the right program and university.
                        </p>
                        <div style={styles.ctaTagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <div style={styles.ctaBtns}>
                            <Link to="/programs" style={styles.primaryBtn}>
                                <i className="fa-solid fa-graduation-cap"></i>
                                Explore Programs
                            </Link>
                            <Link to="/contact" style={styles.secondaryBtn}>
                                <i className="fa-solid fa-phone"></i>
                                Talk to Counselor
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
    textMuted: '#94A3B8'
};

const styles = {
    // Hero Section - Blue Background
    hero: {
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        padding: '120px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    heroPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0, 153, 214, 0.2)',
        color: colors.lightBlue,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)'
    },
    heroTitle: {
        color: colors.white,
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '20px'
    },
    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.2rem',
        lineHeight: 1.6,
        maxWidth: '600px',
        margin: '0 auto 20px'
    },
    tagline: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        color: colors.lightBlue,
        fontSize: '1.1rem',
        fontWeight: '600',
        fontStyle: 'italic'
    },

    // Section Styles
    section: {
        padding: '100px 20px',
        background: colors.white
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },

    // Mission Section
    missionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
    },
    missionContent: {},
    missionImage: {
        position: 'relative'
    },
    image: {
        width: '100%',
        borderRadius: '20px',
        boxShadow: `0 20px 50px ${colors.darkBlue}20`
    },
    imageAccent: {
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        width: '200px',
        height: '200px',
        background: `linear-gradient(135deg, ${colors.maroon}20, ${colors.pink}20)`,
        borderRadius: '20px',
        zIndex: -1
    },
    sectionBadgeMaroon: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        padding: '10px 20px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '15px'
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
    sectionTitle: {
        color: colors.textDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '20px',
        lineHeight: 1.3
    },
    sectionTitleLight: {
        color: colors.white,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px',
        lineHeight: 1.3
    },
    sectionTitleCenter: {
        color: colors.textDark,
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '15px',
        textAlign: 'center',
        lineHeight: 1.3
    },
    sectionText: {
        color: colors.gray,
        fontSize: '1.05rem',
        lineHeight: 1.8,
        marginBottom: '20px'
    },
    sectionSubtitle: {
        color: colors.gray,
        fontSize: '1.05rem',
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionSubtitleLight: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1.05rem',
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionHeader: {
        textAlign: 'center'
    },
    missionStats: {
        display: 'flex',
        gap: '40px',
        marginTop: '30px'
    },
    missionStat: {
        display: 'flex',
        flexDirection: 'column'
    },
    missionStatNumber: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.maroon
    },
    missionStatNumberBlue: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.darkBlue
    },
    missionStatLabel: {
        color: colors.gray,
        fontSize: '0.95rem'
    },

    // Vision Section
    visionSection: {
        padding: '100px 20px',
        background: colors.lightGray
    },
    visionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
    },
    visionImage: {},
    visionContent: {},
    visionPoints: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '25px'
    },
    visionPoint: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        color: colors.gray,
        fontSize: '1rem'
    },
    visionPointIconBlue: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        flexShrink: 0
    },
    visionPointIconMaroon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        flexShrink: 0
    },

    // Values Section - Maroon Theme
    valuesSection: {
        padding: '100px 20px',
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
        position: 'relative',
        overflow: 'hidden'
    },
    valuesSectionPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    valueCard: {
        background: 'rgba(255, 255, 255, 0.08)',
        padding: '35px 25px',
        borderRadius: '20px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    },
    valueIconBlue: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: colors.lightBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: colors.white,
        margin: '0 auto 20px',
        boxShadow: `0 8px 20px ${colors.lightBlue}40`
    },
    valueIconWhite: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: colors.white,
        margin: '0 auto 20px'
    },
    valueTitle: {
        color: colors.white,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '12px'
    },
    valueText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem',
        lineHeight: 1.6
    },

    // Stats Section - Blue Theme
    statsSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        position: 'relative',
        overflow: 'hidden'
    },
    statsSectionPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    statCard: {
        textAlign: 'center',
        padding: '20px'
    },
    statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(0, 153, 214, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: colors.lightBlue,
        margin: '0 auto 15px'
    },
    statNumber: {
        display: 'block',
        color: colors.white,
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '5px'
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem'
    },

    // Advantages Section
    advantagesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px'
    },
    advantageItem: {
        display: 'flex',
        gap: '25px',
        padding: '30px',
        background: colors.lightGray,
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.lightGray}`
    },
    advantageNumberMaroon: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.maroon,
        lineHeight: 1,
        flexShrink: 0
    },
    advantageNumberBlue: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: colors.darkBlue,
        lineHeight: 1,
        flexShrink: 0
    },
    advantageContent: {},
    advantageTitle: {
        color: colors.textDark,
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    advantageText: {
        color: colors.gray,
        fontSize: '0.95rem',
        lineHeight: 1.7
    },

    // Team Section
    teamSection: {
        padding: '100px 20px',
        background: colors.lightGray
    },
    teamGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '30px'
    },
    teamCard: {
        background: colors.white,
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.lightGray}`
    },
    teamImageWrapper: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 20px',
        border: `4px solid ${colors.darkBlue}20`
    },
    teamImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    teamName: {
        color: colors.textDark,
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    teamRole: {
        color: colors.darkBlue,
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    teamDesc: {
        color: colors.gray,
        fontSize: '0.85rem',
        lineHeight: 1.5,
        marginBottom: '15px'
    },
    teamSocial: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    },
    teamSocialLinkBlue: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    },
    teamSocialLinkMaroon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
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

// Add responsive styles and hover effects
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
        }
        
        .team-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        
        .team-social-link:hover {
            background: linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%);
            color: #fff;
        }
        
        .advantage-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            background: #fff;
        }
        
        .value-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
        }
        
        .primary-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0, 153, 214, 0.5);
        }
        
        .secondary-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        @media (max-width: 1024px) {
            .mission-grid, .vision-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .advantages-grid { grid-template-columns: 1fr !important; }
            .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        @media (max-width: 600px) {
            .values-grid { grid-template-columns: 1fr !important; }
            .stats-grid { grid-template-columns: 1fr !important; }
            .team-grid { grid-template-columns: 1fr !important; }
            .hero-title { font-size: 2rem !important; }
            .cta-title { font-size: 1.8rem !important; }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default About;
