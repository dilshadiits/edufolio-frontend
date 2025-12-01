import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [filter, setFilter] = useState({
        category: '',
        level: '',
        mode: '',
        university: ''
    });
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        fetchPrograms();
        fetchUniversities();
    }, [filter]);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.category) params.append('category', filter.category);
            if (filter.level) params.append('level', filter.level);
            if (filter.mode) params.append('mode', filter.mode);
            if (filter.university) params.append('universityId', filter.university);

            const res = await axios.get(`${API_BASE}/public/programs?${params.toString()}`);
            setPrograms(res.data);
        } catch (err) {
            console.error('Error fetching programs:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUniversities = async () => {
        try {
            const res = await axios.get(`${API_BASE}/public/universities`);
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
        }
    };

    const filteredPrograms = programs.filter(prog =>
        prog.name.toLowerCase().includes(search.toLowerCase()) ||
        prog.category?.toLowerCase().includes(search.toLowerCase()) ||
        prog.universityId?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ category: '', level: '', mode: '', university: '' });
    };

    const handleEnrollClick = (program) => {
        setSelectedProgram(program);
        setShowEnrollModal(true);
    };

    const categories = ['MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc'];
    const levels = ['UG', 'PG', 'Diploma', 'Certificate'];
    const modes = ['Online', 'Distance', 'Hybrid'];

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
                            <i className="fa-solid fa-graduation-cap"></i> Explore Programs
                        </span>
                        <h1 style={styles.heroTitle}>
                            Find Your Perfect <span style={styles.highlight}>Program</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Browse through 200+ UGC-approved programs from India's top universities. 
                            From undergraduate to postgraduate, find the right fit for your career goals.
                        </p>
                        <div style={styles.tagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        
                        {/* Quick Stats */}
                        <div style={styles.heroStats}>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>200+</span>
                                <span style={styles.heroStatLabel}>Programs</span>
                            </div>
                            <div style={styles.heroStatDivider}></div>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>50+</span>
                                <span style={styles.heroStatLabel}>Universities</span>
                            </div>
                            <div style={styles.heroStatDivider}></div>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>100%</span>
                                <span style={styles.heroStatLabel}>Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Images Section */}
                    <div style={styles.heroImages}>
                        {/* ============================================
                            MAIN IMAGE (Large - Center)
                            Recommended size: 400x350px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.mainImageContainer}>
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=350&fit=crop" 
                                alt="Students studying"
                                style={styles.mainImage}
                            />
                            <div style={styles.mainImageOverlay}></div>
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 1 (Small - Top Right)
                            Recommended size: 180x130px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage1}>
                            <img 
                                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=180&h=130&fit=crop" 
                                alt="Student with laptop"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 2 (Small - Bottom Left)
                            Recommended size: 160x120px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage2}>
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=160&h=120&fit=crop" 
                                alt="Team collaboration"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Floating Programs Card */}
                        <div style={styles.floatingProgramCard}>
                            <div style={styles.floatingProgramIcon}>
                                <i className="fa-solid fa-book-open"></i>
                            </div>
                            <div style={styles.floatingProgramContent}>
                                <span style={styles.floatingProgramNumber}>MBA</span>
                                <span style={styles.floatingProgramLabel}>Most Popular</span>
                            </div>
                        </div>

                        {/* Floating Success Card */}
                        <div style={styles.floatingSuccessCard}>
                            <div style={styles.floatingSuccessIcon}>
                                <i className="fa-solid fa-trophy"></i>
                            </div>
                            <div style={styles.floatingSuccessContent}>
                                <span style={styles.floatingSuccessNumber}>95%</span>
                                <span style={styles.floatingSuccessLabel}>Placement</span>
                            </div>
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 3 (Small - Middle Right)
                            Recommended size: 140x100px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage3}>
                            <img 
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=140&h=100&fit=crop" 
                                alt="Online learning"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div style={styles.decorCircle1}></div>
                        <div style={styles.decorCircle2}></div>
                        <div style={styles.decorDots}></div>
                    </div>
                </div>

                {/* Category Pills in Hero */}
                <div style={styles.heroCategorySection}>
                    <div style={styles.heroCategoryContainer}>
                        <span style={styles.heroCategoryLabel}>Popular:</span>
                        <div style={styles.heroCategoryPills}>
                            {['MBA', 'MCA', 'BBA', 'BCA', 'B.Com'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter({ ...filter, category: cat })}
                                    style={{
                                        ...styles.heroCategoryPill,
                                        background: filter.category === cat ? colors.lightBlue : 'rgba(255, 255, 255, 0.1)',
                                        color: colors.white
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filter Section */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <div style={styles.searchForm}>
                        <div style={styles.searchBox}>
                            <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                            <input
                                type="text"
                                placeholder="Search programs, universities..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={styles.searchInput}
                            />
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    style={styles.clearSearchBtn}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                        </div>
                        <button style={styles.searchBtn}>
                            <i className="fa-solid fa-search"></i>
                            Search
                        </button>
                    </div>

                    <div style={styles.filters}>
                        <div style={styles.filterLabel}>
                            <i className="fa-solid fa-filter"></i> Filter:
                        </div>
                        
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={filter.level}
                            onChange={(e) => setFilter({ ...filter, level: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Levels</option>
                            {levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>

                        <select
                            value={filter.mode}
                            onChange={(e) => setFilter({ ...filter, mode: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Modes</option>
                            {modes.map(mode => (
                                <option key={mode} value={mode}>{mode}</option>
                            ))}
                        </select>

                        <select
                            value={filter.university}
                            onChange={(e) => setFilter({ ...filter, university: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Universities</option>
                            {universities.map(uni => (
                                <option key={uni._id} value={uni._id}>{uni.name}</option>
                            ))}
                        </select>

                        {(filter.category || filter.level || filter.mode || filter.university || search) && (
                            <button onClick={clearFilters} style={styles.clearBtn}>
                                <i className="fa-solid fa-times"></i> Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <p>Loading programs...</p>
                        </div>
                    ) : filteredPrograms.length > 0 ? (
                        <>
                            <div style={styles.resultsHeader}>
                                <p style={styles.resultCount}>
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
                                </p>
                                <div style={styles.viewToggle}>
                                    <button style={styles.viewBtn}>
                                        <i className="fa-solid fa-grid-2"></i>
                                    </button>
                                    <button style={styles.viewBtnInactive}>
                                        <i className="fa-solid fa-list"></i>
                                    </button>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                {filteredPrograms.map(program => (
                                    <div 
                                        key={program._id} 
                                        style={styles.card}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 35, 70, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                                        }}
                                    >
                                        {/* Featured Badge */}
                                        {program.featured && (
                                            <span style={styles.featuredBadge}>
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}

                                        {/* Card Header */}
                                        <div style={styles.cardHeader}>
                                            <div style={styles.categoryWrapper}>
                                                <span style={styles.categoryBadge}>{program.category}</span>
                                                <span style={styles.levelBadge}>{program.level}</span>
                                            </div>
                                            <span style={styles.modeBadge}>
                                                <i className="fa-solid fa-wifi"></i> {program.mode}
                                            </span>
                                        </div>

                                        {/* Program Title */}
                                        <h3 style={styles.cardTitle}>{program.name}</h3>

                                        {/* University */}
                                        <div style={styles.universityRow}>
                                            <div style={styles.universityLogo}>
                                                <img
                                                    src={program.universityId?.logo || 'https://via.placeholder.com/40x40?text=U'}
                                                    alt={program.universityId?.name}
                                                    style={styles.uniLogoImg}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/40x40?text=U';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p style={styles.universityName}>{program.universityId?.name || 'University'}</p>
                                                {program.universityId?.rating && (
                                                    <span style={styles.uniRating}>
                                                        <i className="fa-solid fa-award"></i> NAAC {program.universityId.rating}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Duration & Details */}
                                        <div style={styles.detailsRow}>
                                            <span style={styles.detailItem}>
                                                <i className="fa-solid fa-clock"></i> {program.duration}
                                            </span>
                                            <span style={styles.detailItem}>
                                                <i className="fa-solid fa-calendar"></i> {program.semesters || '4'} Semesters
                                            </span>
                                        </div>

                                        {/* Eligibility */}
                                        {program.eligibility && (
                                            <p style={styles.eligibility}>
                                                <i className="fa-solid fa-user-check"></i>
                                                <span>Eligibility: {program.eligibility.substring(0, 50)}...</span>
                                            </p>
                                        )}

                                        {/* Fee Section */}
                                        <div style={styles.feeSection}>
                                            <div style={styles.feeInfo}>
                                                <span style={styles.feeLabel}>Total Fee</span>
                                                <span style={styles.feeAmount}>
                                                    ₹{Number(program.fee).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <div style={styles.emiInfo}>
                                                <span style={styles.emiLabel}>EMI from</span>
                                                <span style={styles.emiAmount}>
                                                    ₹{Math.round(program.fee / 24).toLocaleString('en-IN')}/mo
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={styles.cardActions}>
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
                                                <i className="fa-solid fa-paper-plane"></i>
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIconWrapper}>
                                <i className="fa-solid fa-graduation-cap" style={styles.emptyIcon}></i>
                            </div>
                            <h3 style={styles.emptyTitle}>No Programs Found</h3>
                            <p style={styles.emptyText}>
                                We couldn't find any programs matching your criteria. 
                                Try adjusting your search or filters.
                            </p>
                            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                                <i className="fa-solid fa-refresh"></i> Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Section */}
            <section style={styles.whySection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-star"></i> Why Choose Us
                        </span>
                        <h2 style={styles.sectionTitle}>Why Our Programs Stand Out</h2>
                        <p style={styles.sectionSubtitle}>Industry-aligned curriculum designed for your success</p>
                    </div>

                    <div style={styles.whyGrid}>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconMaroon}>
                                <i className="fa-solid fa-laptop-code"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>100% Online Learning</h3>
                            <p style={styles.whyCardDesc}>
                                Study from anywhere with our flexible online learning platform
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconBlue}>
                                <i className="fa-solid fa-certificate"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>UGC-DEB Approved</h3>
                            <p style={styles.whyCardDesc}>
                                All programs are approved by UGC-DEB for online education
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconMaroon}>
                                <i className="fa-solid fa-briefcase"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>Career Support</h3>
                            <p style={styles.whyCardDesc}>
                                Dedicated placement assistance and career guidance
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconBlue}>
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>Affordable EMI</h3>
                            <p style={styles.whyCardDesc}>
                                Easy payment options with 0% interest EMI available
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Blue Theme */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-headset"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Need Help Choosing a Program?</h2>
                        <p style={styles.ctaText}>
                            Our expert counselors can help you find the perfect program based on your career goals and interests.
                        </p>
                        <div style={styles.ctaTagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <div style={styles.ctaButtons}>
                            <Link to="/contact" style={styles.ctaPrimaryBtn}>
                                <i className="fa-solid fa-phone"></i> Talk to Counselor
                            </Link>
                            <a href="https://wa.me/919876543210" style={styles.ctaSecondaryBtn}>
                                <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

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
        padding: '100px 0 30px',
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
    heroStats: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '20px 30px',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)'
    },
    heroStat: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    heroStatNumber: {
        color: colors.white,
        fontSize: '1.8rem',
        fontWeight: '800'
    },
    heroStatLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.85rem'
    },
    heroStatDivider: {
        width: '1px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.2)'
    },

    // Hero Images Section
    heroImages: {
        position: 'relative',
        height: '450px'
    },
    mainImageContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '340px',
        height: '280px',
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
        height: '80px',
        background: 'linear-gradient(to top, rgba(107, 29, 58, 0.7), transparent)'
    },
    floatingImage1: {
        position: 'absolute',
        top: '5px',
        right: '30px',
        width: '150px',
        height: '100px',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float1 6s ease-in-out infinite'
    },
    floatingImage2: {
        position: 'absolute',
        bottom: '50px',
        left: '0',
        width: '140px',
        height: '95px',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float2 6s ease-in-out infinite'
    },
    floatingImage3: {
        position: 'absolute',
        top: '45%',
        right: '0',
        width: '120px',
        height: '85px',
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
    floatingProgramCard: {
        position: 'absolute',
        top: '20px',
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
    floatingProgramIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem'
    },
    floatingProgramContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingProgramNumber: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '800'
    },
    floatingProgramLabel: {
        color: colors.gray,
        fontSize: '0.7rem'
    },
    floatingSuccessCard: {
        position: 'absolute',
        bottom: '30px',
        right: '20px',
        background: colors.white,
        padding: '14px 18px',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'float2 5s ease-in-out infinite'
    },
    floatingSuccessIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: '#FEF3C7',
        color: '#D97706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem'
    },
    floatingSuccessContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingSuccessNumber: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '800'
    },
    floatingSuccessLabel: {
        color: colors.gray,
        fontSize: '0.7rem'
    },
    decorCircle1: {
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: `3px solid ${colors.lightBlue}40`,
        animation: 'pulse 3s ease-in-out infinite'
    },
    decorCircle2: {
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: `${colors.lightBlue}20`,
        animation: 'pulse 4s ease-in-out infinite'
    },
    decorDots: {
        position: 'absolute',
        top: '60%',
        right: '8%',
        width: '50px',
        height: '50px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
        backgroundSize: '10px 10px'
    },

    // Hero Category Pills
    heroCategorySection: {
        marginTop: '40px',
        paddingTop: '25px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    heroCategoryContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    heroCategoryLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    heroCategoryPills: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    heroCategoryPill: {
        padding: '10px 20px',
        borderRadius: '25px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    },

    // Filter Section
    filterSection: {
        background: colors.white,
        padding: '25px 20px',
        borderBottom: `3px solid ${colors.lightGray}`,
        position: 'sticky',
        top: '70px',
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    },
    searchForm: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px'
    },
    searchBox: {
        position: 'relative',
        flex: 1,
        maxWidth: '500px'
    },
    searchIcon: {
        position: 'absolute',
        left: '18px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: colors.gray,
        fontSize: '1rem'
    },
    searchInput: {
        width: '100%',
        padding: '16px 50px 16px 50px',
        borderRadius: '12px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        outline: 'none',
        background: colors.lightGray
    },
    clearSearchBtn: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: colors.gray,
        border: 'none',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        fontSize: '0.8rem'
    },
    searchBtn: {
        padding: '16px 30px',
        background: colors.maroon,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        boxShadow: `0 4px 15px ${colors.maroon}40`,
        transition: 'all 0.3s ease'
    },
    filters: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    filterLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.textDark,
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    filterSelect: {
        padding: '12px 18px',
        borderRadius: '10px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '0.9rem',
        cursor: 'pointer',
        minWidth: '140px',
        background: colors.lightGray,
        color: colors.textDark,
        fontWeight: '500',
        outline: 'none'
    },
    clearBtn: {
        padding: '12px 18px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600'
    },

    // Main Section
    mainSection: {
        padding: '50px 20px',
        background: colors.lightGray,
        minHeight: '60vh'
    },
    loading: {
        textAlign: 'center',
        padding: '80px 20px',
        color: colors.gray
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: `4px solid ${colors.lightGray}`,
        borderTopColor: colors.maroon,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
    },
    resultsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
    },
    resultCount: {
        color: colors.gray,
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: 0
    },
    viewToggle: {
        display: 'flex',
        gap: '5px'
    },
    viewBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        border: 'none',
        background: colors.maroon,
        color: colors.white,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewBtnInactive: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        border: 'none',
        background: colors.white,
        color: colors.gray,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '25px'
    },
    card: {
        background: colors.white,
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        position: 'relative',
        transition: 'all 0.3s ease',
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
        gap: '4px',
        boxShadow: `0 4px 10px ${colors.maroon}40`
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
    },
    categoryWrapper: {
        display: 'flex',
        gap: '8px'
    },
    categoryBadge: {
        background: `${colors.maroon}15`,
        color: colors.maroon,
        padding: '6px 14px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    levelBadge: {
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '6px 14px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    modeBadge: {
        background: '#DCFCE7',
        color: '#15803D',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    cardTitle: {
        color: colors.textDark,
        fontSize: '1.2rem',
        fontWeight: '700',
        marginBottom: '15px',
        lineHeight: 1.3
    },
    universityRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '15px',
        padding: '12px',
        background: colors.lightGray,
        borderRadius: '12px'
    },
    universityLogo: {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        background: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    uniLogoImg: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '6px'
    },
    universityName: {
        color: colors.textDark,
        fontSize: '0.9rem',
        fontWeight: '600',
        margin: '0 0 4px 0'
    },
    uniRating: {
        color: '#D97706',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    detailsRow: {
        display: 'flex',
        gap: '20px',
        marginBottom: '15px'
    },
    detailItem: {
        color: colors.gray,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    eligibility: {
        color: colors.gray,
        fontSize: '0.85rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '10px 12px',
        background: `${colors.darkBlue}08`,
        borderRadius: '8px',
        borderLeft: `3px solid ${colors.darkBlue}`
    },
    feeSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: colors.lightGray,
        borderRadius: '12px',
        marginBottom: '15px'
    },
    feeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    feeLabel: {
        color: colors.gray,
        fontSize: '0.75rem'
    },
    feeAmount: {
        color: colors.maroon,
        fontSize: '1.3rem',
        fontWeight: '700'
    },
    emiInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textAlign: 'right'
    },
    emiLabel: {
        color: colors.gray,
        fontSize: '0.75rem'
    },
    emiAmount: {
        color: colors.darkBlue,
        fontSize: '1rem',
        fontWeight: '600'
    },
    cardActions: {
        display: 'flex',
        gap: '10px'
    },
    viewDetailsBtn: {
        flex: 1,
        padding: '14px',
        background: colors.lightGray,
        color: colors.textDark,
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'all 0.3s ease'
    },
    enrollNowBtn: {
        flex: 1,
        padding: '14px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        boxShadow: `0 4px 15px ${colors.maroon}30`
    },

    // Empty State
    emptyState: {
        textAlign: 'center',
        padding: '100px 20px',
        maxWidth: '500px',
        margin: '0 auto',
        background: colors.white,
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
    },
    emptyIconWrapper: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: `${colors.maroon}10`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px'
    },
    emptyIcon: {
        fontSize: '2.5rem',
        color: colors.maroon
    },
    emptyTitle: {
        color: colors.textDark,
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    emptyText: {
        color: colors.gray,
        fontSize: '1rem',
        lineHeight: 1.6,
        marginBottom: '25px'
    },
    clearFiltersBtn: {
        padding: '14px 28px',
        background: colors.maroon,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: `0 4px 15px ${colors.maroon}30`
    },

    // Why Section
    whySection: {
        padding: '80px 20px',
        background: colors.white
    },
    sectionHeader: {
        textAlign: 'center',
        marginBottom: '50px'
    },
    sectionBadge: {
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
    sectionTitle: {
        color: colors.textDark,
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '10px'
    },
    sectionSubtitle: {
        color: colors.gray,
        fontSize: '1.05rem'
    },
    whyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    whyCard: {
        textAlign: 'center',
        padding: '30px 20px',
        borderRadius: '16px',
        background: colors.lightGray,
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.lightGray}`
    },
    whyIconMaroon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem'
    },
    whyIconBlue: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem'
    },
    whyCardTitle: {
        color: colors.textDark,
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '10px'
    },
    whyCardDesc: {
        color: colors.gray,
        fontSize: '0.9rem',
        lineHeight: 1.6,
        margin: 0
    },

    // CTA Section - Blue Background
    ctaSection: {
        padding: '80px 20px',
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        position: 'relative',
        overflow: 'hidden'
    },
    ctaPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
    },
    ctaContent: {
        textAlign: 'center',
        maxWidth: '650px',
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
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    ctaText: {
        color: 'rgba(255, 255, 255, 0.85)',
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

// Add keyframes and responsive styles
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
        
        .search-input:focus {
            border-color: ${colors.maroon} !important;
            box-shadow: 0 0 0 3px ${colors.maroon}20 !important;
            background: ${colors.white} !important;
        }
        
        .why-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            background: ${colors.white};
        }
        
        .hero-category-pill:hover {
            background: ${colors.lightBlue} !important;
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
            .hero-stats {
                justify-content: center;
            }
            .tagline {
                justify-content: center;
            }
            .why-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
        
        @media (max-width: 768px) {
            .hero-title { 
                font-size: 2rem !important; 
            }
            .grid { 
                grid-template-columns: 1fr !important; 
            }
            .results-header { 
                flex-direction: column; 
                align-items: flex-start; 
            }
            .search-form { 
                flex-direction: column; 
            }
            .filters {
                overflow-x: auto;
                padding-bottom: 10px;
            }
            .why-grid {
                grid-template-columns: 1fr !important;
            }
            .hero-stats {
                flex-direction: column;
                gap: 15px;
            }
            .hero-stat-divider {
                display: none;
            }
            .cta-buttons {
                flex-direction: column;
                width: 100%;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Programs;
