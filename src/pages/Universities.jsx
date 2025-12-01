import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        rating: '',
        featured: ''
    });

    useEffect(() => {
        fetchUniversities();
    }, [filter]);

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.rating) params.append('rating', filter.rating);
            if (filter.featured) params.append('featured', filter.featured);

            const res = await axios.get(`${API_BASE}/public/universities?${params.toString()}`);
            setUniversities(res.data);
        } catch (err) {
            console.error('Error fetching universities:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        uni.location?.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ rating: '', featured: '' });
    };

    return (
        <>
            <Navbar />

            {/* Hero Section with Images - Blue Theme */}
            <section style={styles.hero}>
                <div style={styles.heroPattern}></div>
                
                <div style={styles.heroContainer}>
                    {/* Left Content */}
                    <div style={styles.heroContent}>
                        <span style={styles.heroBadge}>
                            <i className="fa-solid fa-building-columns"></i> Our Partners
                        </span>
                        <h1 style={styles.heroTitle}>
                            Partner <span style={styles.highlight}>Universities</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Explore our network of accredited universities offering quality online education. 
                            Choose from India's top institutions for your educational journey.
                        </p>
                        <div style={styles.tagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        
                        {/* Quick Stats */}
                        <div style={styles.heroStats}>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>50+</span>
                                <span style={styles.heroStatLabel}>Universities</span>
                            </div>
                            <div style={styles.heroStatDivider}></div>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>200+</span>
                                <span style={styles.heroStatLabel}>Programs</span>
                            </div>
                            <div style={styles.heroStatDivider}></div>
                            <div style={styles.heroStat}>
                                <span style={styles.heroStatNumber}>100%</span>
                                <span style={styles.heroStatLabel}>UGC Approved</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Images Section */}
                    <div style={styles.heroImages}>
                        {/* ============================================
                            MAIN IMAGE (Large - Center)
                            Recommended size: 500x400px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.mainImageContainer}>
                            <img 
                                src="https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=400&fit=crop" 
                                alt="University campus"
                                style={styles.mainImage}
                            />
                            <div style={styles.mainImageOverlay}></div>
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 1 (Small - Top Right)
                            Recommended size: 200x150px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage1}>
                            <img 
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=150&fit=crop" 
                                alt="Graduation ceremony"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* ============================================
                            FLOATING IMAGE 2 (Small - Bottom Left)
                            Recommended size: 180x130px
                            Change the src to your own image
                            ============================================ */}
                        <div style={styles.floatingImage2}>
                            <img 
                                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=180&h=130&fit=crop" 
                                alt="Students studying"
                                style={styles.floatingImg}
                            />
                        </div>

                        {/* Floating University Card */}
                        <div style={styles.floatingUniCard}>
                            <div style={styles.floatingUniIcon}>
                                <i className="fa-solid fa-award"></i>
                            </div>
                            <div style={styles.floatingUniContent}>
                                <span style={styles.floatingUniNumber}>NAAC A++</span>
                                <span style={styles.floatingUniLabel}>Top Rated</span>
                            </div>
                        </div>

                        {/* Floating Accreditation Card */}
                        <div style={styles.floatingAccredCard}>
                            <div style={styles.floatingAccredIcon}>
                                <i className="fa-solid fa-shield-check"></i>
                            </div>
                            <div style={styles.floatingAccredContent}>
                                <span style={styles.floatingAccredNumber}>UGC-DEB</span>
                                <span style={styles.floatingAccredLabel}>Approved</span>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div style={styles.decorCircle1}></div>
                        <div style={styles.decorCircle2}></div>
                        <div style={styles.decorDots}></div>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <div style={styles.searchForm}>
                        <div style={styles.searchBox}>
                            <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                            <input
                                type="text"
                                placeholder="Search universities by name or location..."
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
                            <i className="fa-solid fa-filter"></i> Filter by:
                        </div>
                        <select
                            value={filter.rating}
                            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Ratings</option>
                            <option value="A++">A++ Rating</option>
                            <option value="A+">A+ Rating</option>
                            <option value="A">A Rating</option>
                            <option value="B++">B++ Rating</option>
                            <option value="B+">B+ Rating</option>
                            <option value="B">B Rating</option>
                        </select>

                        <select
                            value={filter.featured}
                            onChange={(e) => setFilter({ ...filter, featured: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Universities</option>
                            <option value="true">Featured Only</option>
                        </select>

                        {(filter.rating || filter.featured || search) && (
                            <button onClick={clearFilters} style={styles.clearBtn}>
                                <i className="fa-solid fa-times"></i> Clear All
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Universities Grid */}
            <section style={styles.mainSection}>
                <div style={styles.container}>
                    {loading ? (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <p>Loading universities...</p>
                        </div>
                    ) : filteredUniversities.length > 0 ? (
                        <>
                            <div style={styles.resultsHeader}>
                                <p style={styles.resultCount}>
                                    <i className="fa-solid fa-building-columns"></i>
                                    Showing <strong>{filteredUniversities.length}</strong> universit{filteredUniversities.length !== 1 ? 'ies' : 'y'}
                                </p>
                                <div style={styles.sortOptions}>
                                    <span style={styles.sortLabel}>Sort by:</span>
                                    <select style={styles.sortSelect}>
                                        <option value="featured">Featured First</option>
                                        <option value="name">Name (A-Z)</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                {filteredUniversities.map(university => (
                                    <Link
                                        key={university._id}
                                        to={`/universities/${university.slug}`}
                                        style={styles.card}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 82, 157, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                                        }}
                                    >
                                        {/* Featured Badge */}
                                        {university.featured && (
                                            <span style={styles.featuredBadge}>
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}
                                        
                                        {/* Banner Image */}
                                        <div style={styles.cardBanner}>
                                            <img
                                                src={university.banner || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop'}
                                                alt={university.name}
                                                style={styles.bannerImg}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop';
                                                }}
                                            />
                                            <div style={styles.bannerOverlay}></div>
                                        </div>

                                        {/* Card Content */}
                                        <div style={styles.cardContent}>
                                            {/* Logo */}
                                            <div style={styles.logoWrapper}>
                                                <img
                                                    src={university.logo || 'https://via.placeholder.com/70x70?text=Logo'}
                                                    alt={university.name}
                                                    style={styles.logo}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/70x70?text=Logo';
                                                    }}
                                                />
                                            </div>

                                            {/* University Name */}
                                            <h3 style={styles.cardTitle}>{university.name}</h3>
                                            
                                            {/* Short Name */}
                                            {university.shortName && (
                                                <p style={styles.shortName}>({university.shortName})</p>
                                            )}
                                            
                                            {/* Location */}
                                            <p style={styles.location}>
                                                <i className="fa-solid fa-location-dot"></i>
                                                {university.location || 'India'}
                                            </p>

                                            {/* Badges Row */}
                                            <div style={styles.cardMeta}>
                                                {university.rating && (
                                                    <span style={styles.ratingBadge}>
                                                        <i className="fa-solid fa-award"></i> NAAC {university.rating}
                                                    </span>
                                                )}
                                                {university.accreditations?.slice(0, 2).map((acc, i) => (
                                                    <span key={i} style={styles.accBadge}>{acc}</span>
                                                ))}
                                            </div>

                                            {/* Established Year */}
                                            {university.establishedYear && (
                                                <p style={styles.established}>
                                                    <i className="fa-solid fa-calendar"></i>
                                                    Est. {university.establishedYear}
                                                </p>
                                            )}

                                            {/* Fee Range */}
                                            <div style={styles.feeRange}>
                                                <div style={styles.feeInfo}>
                                                    <span style={styles.feeLabel}>Fee Range</span>
                                                    <span style={styles.feeValue}>
                                                        ₹{Number(university.minFee || 0).toLocaleString('en-IN')} - ₹{Number(university.maxFee || 0).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <div style={styles.programCount}>
                                                    <i className="fa-solid fa-graduation-cap"></i>
                                                    <span>{university.programCount || '10+'} Programs</span>
                                                </div>
                                            </div>

                                            {/* View Button */}
                                            <div style={styles.viewBtn}>
                                                <span>View Details</span>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIconWrapper}>
                                <i className="fa-solid fa-building-columns" style={styles.emptyIcon}></i>
                            </div>
                            <h3 style={styles.emptyTitle}>No Universities Found</h3>
                            <p style={styles.emptyText}>
                                We couldn't find any universities matching your criteria. 
                                Try adjusting your search or filters.
                            </p>
                            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                                <i className="fa-solid fa-refresh"></i> Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Our Universities */}
            <section style={styles.whySection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionBadge}>
                            <i className="fa-solid fa-star"></i> Why Choose Us
                        </span>
                        <h2 style={styles.sectionTitle}>Why Our Partner Universities?</h2>
                        <p style={styles.sectionSubtitle}>All our partner universities meet the highest standards</p>
                    </div>

                    <div style={styles.whyGrid}>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconBlue}>
                                <i className="fa-solid fa-shield-check"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>UGC-DEB Approved</h3>
                            <p style={styles.whyCardDesc}>
                                All universities are approved by UGC-DEB for distance and online education
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconMaroon}>
                                <i className="fa-solid fa-award"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>NAAC Accredited</h3>
                            <p style={styles.whyCardDesc}>
                                Top-rated institutions with excellent NAAC grades ensuring quality
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconBlue}>
                                <i className="fa-solid fa-briefcase"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>Placement Support</h3>
                            <p style={styles.whyCardDesc}>
                                Dedicated placement cells and career support for all students
                            </p>
                        </div>
                        <div style={styles.whyCard}>
                            <div style={styles.whyIconMaroon}>
                                <i className="fa-solid fa-certificate"></i>
                            </div>
                            <h3 style={styles.whyCardTitle}>Recognized Degrees</h3>
                            <p style={styles.whyCardDesc}>
                                Degrees valid for government jobs, higher studies, and abroad
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Maroon Theme */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-headset"></i>
                        </div>
                        <h2 style={styles.ctaTitle}>Can't find what you're looking for?</h2>
                        <p style={styles.ctaText}>
                            Our counselors can help you find the perfect university based on your requirements.
                        </p>
                        <div style={styles.ctaTagline}>
                            <span>learn.</span>
                            <span>grow.</span>
                            <span>succeed.</span>
                        </div>
                        <Link to="/contact" style={styles.ctaBtn}>
                            <i className="fa-solid fa-phone"></i> Talk to a Counselor
                        </Link>
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
    // Hero Section - Blue Background with Images
    hero: {
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
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
        width: '380px',
        height: '300px',
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
        background: 'linear-gradient(to top, rgba(0, 82, 157, 0.6), transparent)'
    },
    floatingImage1: {
        position: 'absolute',
        top: '10px',
        right: '20px',
        width: '160px',
        height: '110px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        animation: 'float1 6s ease-in-out infinite'
    },
    floatingImage2: {
        position: 'absolute',
        bottom: '40px',
        left: '10px',
        width: '140px',
        height: '100px',
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
    floatingUniCard: {
        position: 'absolute',
        top: '30px',
        left: '0',
        background: colors.white,
        padding: '15px 20px',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'float1 5s ease-in-out infinite'
    },
    floatingUniIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: '#FEF3C7',
        color: '#D97706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
    },
    floatingUniContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingUniNumber: {
        color: colors.textDark,
        fontSize: '1.2rem',
        fontWeight: '800'
    },
    floatingUniLabel: {
        color: colors.gray,
        fontSize: '0.75rem'
    },
    floatingAccredCard: {
        position: 'absolute',
        bottom: '20px',
        right: '0',
        background: colors.white,
        padding: '15px 20px',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'float2 5s ease-in-out infinite'
    },
    floatingAccredIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
    },
    floatingAccredContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    floatingAccredNumber: {
        color: colors.textDark,
        fontSize: '1.2rem',
        fontWeight: '800'
    },
    floatingAccredLabel: {
        color: colors.gray,
        fontSize: '0.75rem'
    },
    decorCircle1: {
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        border: `3px solid ${colors.lightBlue}40`,
        animation: 'pulse 3s ease-in-out infinite'
    },
    decorCircle2: {
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: `${colors.lightBlue}20`,
        animation: 'pulse 4s ease-in-out infinite'
    },
    decorDots: {
        position: 'absolute',
        top: '60%',
        right: '5%',
        width: '60px',
        height: '60px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
        backgroundSize: '12px 12px'
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
        fontSize: '0.8rem',
        transition: 'background 0.3s ease'
    },
    searchBtn: {
        padding: '16px 30px',
        background: colors.darkBlue,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        boxShadow: `0 4px 15px ${colors.darkBlue}40`,
        transition: 'all 0.3s ease'
    },
    filters: {
        display: 'flex',
        gap: '15px',
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
        padding: '12px 20px',
        borderRadius: '10px',
        border: `2px solid ${colors.lightGray}`,
        fontSize: '0.9rem',
        cursor: 'pointer',
        minWidth: '160px',
        background: colors.lightGray,
        color: colors.textDark,
        fontWeight: '500',
        outline: 'none',
        transition: 'all 0.3s ease'
    },
    clearBtn: {
        padding: '12px 20px',
        background: `${colors.maroon}15`,
        color: colors.maroon,
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        transition: 'all 0.3s ease'
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
        borderTopColor: colors.darkBlue,
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
    sortOptions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    sortLabel: {
        color: colors.gray,
        fontSize: '0.9rem'
    },
    sortSelect: {
        padding: '10px 15px',
        borderRadius: '8px',
        border: `1px solid ${colors.lightGray}`,
        fontSize: '0.9rem',
        cursor: 'pointer',
        background: colors.white,
        color: colors.textDark
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '30px'
    },
    card: {
        background: colors.white,
        borderRadius: '20px',
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${colors.lightGray}`
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        boxShadow: `0 4px 10px ${colors.maroon}40`
    },
    cardBanner: {
        height: '160px',
        overflow: 'hidden',
        position: 'relative'
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: `linear-gradient(to top, ${colors.darkBlue}60, transparent)`
    },
    cardContent: {
        padding: '25px',
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    logoWrapper: {
        position: 'absolute',
        top: '-40px',
        left: '25px',
        width: '80px',
        height: '80px',
        background: colors.white,
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `3px solid ${colors.lightGray}`
    },
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '10px'
    },
    cardTitle: {
        marginTop: '45px',
        marginBottom: '5px',
        color: colors.textDark,
        fontSize: '1.25rem',
        fontWeight: '700',
        lineHeight: 1.3
    },
    shortName: {
        color: colors.darkBlue,
        fontSize: '0.9rem',
        margin: '0 0 10px 0',
        fontWeight: '500'
    },
    location: {
        color: colors.gray,
        fontSize: '0.9rem',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    cardMeta: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '15px'
    },
    ratingBadge: {
        background: '#FEF3C7',
        color: '#D97706',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    accBadge: {
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    established: {
        color: colors.gray,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '15px'
    },
    feeRange: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: colors.lightGray,
        borderRadius: '12px',
        marginBottom: '15px',
        marginTop: 'auto'
    },
    feeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    feeLabel: {
        color: colors.gray,
        fontSize: '0.8rem'
    },
    feeValue: {
        color: colors.maroon,
        fontWeight: '700',
        fontSize: '0.95rem'
    },
    programCount: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: colors.darkBlue,
        fontSize: '0.85rem',
        background: colors.white,
        padding: '8px 12px',
        borderRadius: '8px',
        fontWeight: '600'
    },
    viewBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px',
        background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #003D7A 100%)`,
        color: colors.white,
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease'
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
        background: `${colors.darkBlue}10`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 25px'
    },
    emptyIcon: {
        fontSize: '2.5rem',
        color: colors.darkBlue
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
        background: colors.darkBlue,
        color: colors.white,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: `0 4px 15px ${colors.darkBlue}30`,
        transition: 'all 0.3s ease'
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
        background: `${colors.maroon}15`,
        color: colors.maroon,
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

    // CTA Section - Maroon Background
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
        maxWidth: '600px',
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
    ctaBtn: {
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
            border-color: ${colors.darkBlue} !important;
            box-shadow: 0 0 0 3px ${colors.darkBlue}20 !important;
            background: ${colors.white} !important;
        }
        
        .filter-select:focus {
            border-color: ${colors.darkBlue} !important;
            background: ${colors.white} !important;
        }
        
        .why-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            background: ${colors.white};
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
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Universities;
