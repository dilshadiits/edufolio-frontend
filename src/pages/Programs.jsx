import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

const Programs = () => {
    const [searchParams] = useSearchParams();
    const [programs, setPrograms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        category: searchParams.get('category') || '',
        level: ''
    });
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (filter.category) params.append('category', filter.category);
            if (filter.level) params.append('level', filter.level);

            const [programsRes, categoriesRes] = await Promise.all([
                axios.get(`${API_BASE}/public/programs?${params.toString()}`),
                axios.get(`${API_BASE}/public/categories`)
            ]);

            setPrograms(programsRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            console.error('Error fetching programs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleEnrollClick = (e, program) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedProgram(program);
        setShowEnrollModal(true);
    };

    const filteredPrograms = programs.filter(prog =>
        prog.name.toLowerCase().includes(search.toLowerCase()) ||
        prog.category.toLowerCase().includes(search.toLowerCase())
    );

    const clearFilters = () => {
        setSearch('');
        setFilter({ category: '', level: '' });
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroPattern}></div>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>
                        <i className="fa-solid fa-graduation-cap"></i>
                        200+ Programs Available
                    </span>
                    <h1 style={styles.heroTitle}>Explore Programs</h1>
                    <p style={styles.heroSubtitle}>
                        Find the perfect program to advance your career from our wide selection of UGC-approved courses
                    </p>
                    <div style={styles.tagline}>
                        <span>learn.</span>
                        <span>grow.</span>
                        <span>succeed.</span>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section style={styles.filterSection}>
                <div style={styles.container}>
                    <form onSubmit={handleSearch} style={styles.searchForm}>
                        <div style={styles.searchBox}>
                            <i className="fa-solid fa-search" style={styles.searchIcon}></i>
                            <input
                                type="text"
                                placeholder="Search programs by name, category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={styles.searchInput}
                            />
                            {search && (
                                <button 
                                    type="button"
                                    style={styles.clearSearchBtn}
                                    onClick={() => setSearch('')}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                        </div>
                        <button type="submit" style={styles.searchBtn}>
                            <i className="fa-solid fa-search"></i>
                            Search
                        </button>
                    </form>

                    <div style={styles.filters}>
                        <div style={styles.filterLabel}>
                            <i className="fa-solid fa-filter"></i>
                            Filters:
                        </div>
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={filter.level}
                            onChange={(e) => setFilter({ ...filter, level: e.target.value })}
                            style={styles.filterSelect}
                        >
                            <option value="">All Levels</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Certificate">Certificate</option>
                        </select>

                        {(filter.category || filter.level || search) && (
                            <button onClick={clearFilters} style={styles.clearBtn}>
                                <i className="fa-solid fa-times"></i> Clear All
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
                                    Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
                                </p>
                                {(filter.category || filter.level) && (
                                    <div style={styles.activeTags}>
                                        {filter.category && (
                                            <span style={styles.activeTag}>
                                                {filter.category}
                                                <button onClick={() => setFilter({...filter, category: ''})}>
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </span>
                                        )}
                                        {filter.level && (
                                            <span style={styles.activeTag}>
                                                {filter.level}
                                                <button onClick={() => setFilter({...filter, level: ''})}>
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div style={styles.grid}>
                                {filteredPrograms.map(program => (
                                    <div key={program._id} style={styles.card}>
                                        {program.featured && (
                                            <span style={styles.featuredBadge}>
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}
                                        
                                        <div style={styles.cardHeader}>
                                            <span style={styles.categoryTag}>{program.category}</span>
                                            <span style={styles.levelTag}>{program.level}</span>
                                        </div>

                                        <h3 style={styles.cardTitle}>{program.name}</h3>

                                        {program.universityId && (
                                            <div style={styles.uniInfo}>
                                                <img
                                                    src={program.universityId.logo || 'https://via.placeholder.com/30'}
                                                    alt={program.universityId.name}
                                                    style={styles.uniLogo}
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/30x30?text=U';
                                                    }}
                                                />
                                                <span>{program.universityId.name}</span>
                                            </div>
                                        )}

                                        <div style={styles.cardMeta}>
                                            <div style={styles.metaItem}>
                                                <i className="fa-regular fa-clock"></i>
                                                <span>{program.duration}</span>
                                            </div>
                                            <div style={styles.metaItem}>
                                                <i className="fa-solid fa-laptop"></i>
                                                <span>{program.mode || 'Online'}</span>
                                            </div>
                                        </div>

                                        <div style={styles.feeSection}>
                                            <div style={styles.fee}>
                                                <span style={styles.feeLabel}>Total Fee</span>
                                                <span style={styles.feeValue}>
                                                    ₹{Number(program.fee).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <span style={styles.emiTag}>
                                                <i className="fa-solid fa-check-circle"></i> EMI Available
                                            </span>
                                        </div>

                                        <div style={styles.cardFooter}>
                                            <Link 
                                                to={`/programs/${program.slug}`}
                                                style={styles.viewBtn}
                                            >
                                                View Details
                                            </Link>
                                            <button 
                                                style={styles.enrollBtn}
                                                onClick={(e) => handleEnrollClick(e, program)}
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
                            <p style={styles.emptyText}>Try adjusting your search or filters to find what you're looking for</p>
                            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                                <i className="fa-solid fa-refresh"></i>
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaPattern}></div>
                <div style={styles.container}>
                    <div style={styles.ctaContent}>
                        <div style={styles.ctaIcon}>
                            <i className="fa-solid fa-headset"></i>
                        </div>
                        <div style={styles.ctaText}>
                            <h3 style={styles.ctaTitle}>Need Help Choosing?</h3>
                            <p style={styles.ctaDesc}>Our expert counselors can help you find the perfect program</p>
                        </div>
                        <Link to="/contact" style={styles.ctaBtn}>
                            <i className="fa-solid fa-phone"></i>
                            Get Free Counseling
                        </Link>
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
    // Hero Section - Maroon Background
    hero: {
        background: `linear-gradient(135deg, ${colors.darkMaroon} 0%, ${colors.maroon} 100%)`,
        padding: '120px 20px 60px',
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
        marginBottom: '15px'
    },
    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '1.1rem',
        margin: '0 0 20px 0',
        lineHeight: 1.6
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
        flex: 1,
        position: 'relative'
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
        outline: 'none',
        transition: 'all 0.3s ease',
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
        fontWeight: '600',
        fontSize: '0.9rem'
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
        gap: '6px',
        fontWeight: '600',
        transition: 'all 0.3s ease'
    },

    // Main Section
    mainSection: {
        padding: '50px 20px',
        background: colors.lightGray,
        minHeight: '50vh'
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
        margin: 0,
        fontSize: '0.95rem'
    },
    activeTags: {
        display: 'flex',
        gap: '10px'
    },
    activeTag: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '25px'
    },
    card: {
        background: colors.white,
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        border: `1px solid ${colors.lightGray}`,
        position: 'relative'
    },
    featuredBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.pink} 100%)`,
        color: colors.white,
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    cardHeader: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    categoryTag: {
        background: `${colors.maroon}15`,
        color: colors.maroon,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    levelTag: {
        background: `${colors.darkBlue}15`,
        color: colors.darkBlue,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '500'
    },
    cardTitle: {
        margin: 0,
        color: colors.textDark,
        fontSize: '1.2rem',
        fontWeight: '700',
        lineHeight: 1.3
    },
    uniInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: colors.gray,
        fontSize: '0.9rem'
    },
    uniLogo: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        objectFit: 'contain',
        background: colors.lightGray,
        padding: '2px'
    },
    cardMeta: {
        display: 'flex',
        gap: '20px'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.gray,
        fontSize: '0.9rem'
    },
    feeSection: {
        background: colors.lightGray,
        padding: '15px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fee: {
        display: 'flex',
        flexDirection: 'column'
    },
    feeLabel: {
        color: colors.gray,
        fontSize: '0.8rem',
        marginBottom: '2px'
    },
    feeValue: {
        color: colors.maroon,
        fontSize: '1.3rem',
        fontWeight: '700'
    },
    emiTag: {
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
    cardFooter: {
        display: 'flex',
        gap: '10px',
        marginTop: 'auto',
        paddingTop: '15px',
        borderTop: `1px solid ${colors.lightGray}`
    },
    viewBtn: {
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
    enrollBtn: {
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

    // Empty State
    emptyState: {
        textAlign: 'center',
        padding: '80px 20px',
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
        fontSize: '3rem',
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

    // CTA Section - Blue Background
    ctaSection: {
        padding: '60px 20px',
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
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '30px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        flexWrap: 'wrap',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1
    },
    ctaIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: `rgba(0, 153, 214, 0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.lightBlue,
        fontSize: '1.8rem',
        flexShrink: 0
    },
    ctaText: {
        flex: 1
    },
    ctaTitle: {
        color: colors.white,
        fontSize: '1.4rem',
        fontWeight: '700',
        marginBottom: '5px'
    },
    ctaDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem',
        margin: 0
    },
    ctaBtn: {
        padding: '16px 32px',
        background: colors.lightBlue,
        color: colors.white,
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1rem',
        boxShadow: `0 4px 20px ${colors.lightBlue}40`,
        transition: 'all 0.3s ease'
    }
};

// Add keyframes for spinner and hover effects
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        body {
            font-family: 'Poppins', sans-serif;
        }
        
        .active-tag button {
            background: none;
            border: none;
            color: #00529D;
            cursor: pointer;
            padding: 0;
            font-size: 0.75rem;
            transition: color 0.3s ease;
        }
        
        .active-tag button:hover {
            color: #8B2346;
        }
        
        @media (max-width: 768px) {
            .search-form {
                flex-direction: column;
            }
            .cta-content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Programs;
