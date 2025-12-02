import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../api';

const UniversityForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(isEditMode);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [originalData, setOriginalData] = useState(null);

    // Match your model schema exactly
    const initialFormState = {
        name: '',
        slug: '',
        shortName: '',
        logo: '',
        banner: '',
        description: '',
        establishedYear: '',
        location: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        rating: 'Not Rated',
        accreditations: '',
        approvals: '',
        facilities: '',
        highlights: '',
        minFee: '',
        maxFee: '',
        featured: false,
        ranking: '',
        isActive: true
    };

    const [form, setForm] = useState(initialFormState);

    // Rating options from your model enum
    const ratingOptions = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'];

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Fetch university data when in edit mode
    const fetchUniversityData = useCallback(async () => {
        if (!id) return;

        setFetchingData(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            const res = await axios.get(`${API_BASE}/admin/universities/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const uni = res.data;
            console.log('Fetched university data:', uni);

            // Map to form - match your model fields exactly
            const formData = {
                name: uni.name || '',
                slug: uni.slug || '',
                shortName: uni.shortName || '',
                logo: uni.logo || '',
                banner: uni.banner || '',
                description: uni.description || '',
                establishedYear: uni.establishedYear ? String(uni.establishedYear) : '',
                location: uni.location || '',
                address: uni.address || '',
                website: uni.website || '',
                email: uni.email || '',
                phone: uni.phone || '',
                rating: uni.rating || 'Not Rated',
                accreditations: Array.isArray(uni.accreditations) ? uni.accreditations.join(', ') : '',
                approvals: Array.isArray(uni.approvals) ? uni.approvals.join(', ') : '',
                facilities: Array.isArray(uni.facilities) ? uni.facilities.join(', ') : '',
                highlights: Array.isArray(uni.highlights) ? uni.highlights.join(', ') : '',
                minFee: uni.minFee ? String(uni.minFee) : '',
                maxFee: uni.maxFee ? String(uni.maxFee) : '',
                featured: Boolean(uni.featured),
                ranking: uni.ranking ? String(uni.ranking) : '',
                isActive: uni.isActive !== false
            };

            setForm(formData);
            setOriginalData(formData);

        } catch (err) {
            console.error('Error fetching university:', err);
            if (err.response?.status === 404) {
                setError('University not found');
                setTimeout(() => navigate('/admin/dashboard'), 2000);
            } else if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/admin/login');
            } else {
                setError('Failed to load university data');
            }
        } finally {
            setFetchingData(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        if (isEditMode && id) {
            fetchUniversityData();
        }
    }, [isEditMode, id, fetchUniversityData]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => {
            const newForm = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };

            // Auto-generate slug from name for new entries
            if (name === 'name' && !isEditMode) {
                newForm.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            }

            return newForm;
        });

        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (!form.name || !form.name.trim()) {
            setError('University name is required');
            return false;
        }
        if (form.name.trim().length < 3) {
            setError('University name must be at least 3 characters');
            return false;
        }
        if (!form.location || !form.location.trim()) {
            setError('Location is required');
            return false;
        }
        if (!form.description || !form.description.trim()) {
            setError('Description is required');
            return false;
        }
        return true;
    };

    // Prepare data matching your model schema
    const prepareDataForSubmit = () => {
        const data = {
            name: form.name.trim(),
            slug: form.slug?.trim().toLowerCase() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: form.description.trim(),
            location: form.location.trim(),
            featured: Boolean(form.featured),
            isActive: Boolean(form.isActive)
        };

        // Optional string fields
        if (form.shortName?.trim()) data.shortName = form.shortName.trim();
        if (form.logo?.trim()) data.logo = form.logo.trim();
        if (form.banner?.trim()) data.banner = form.banner.trim();
        if (form.address?.trim()) data.address = form.address.trim();
        if (form.website?.trim()) data.website = form.website.trim();
        if (form.email?.trim()) data.email = form.email.trim();
        if (form.phone?.trim()) data.phone = form.phone.trim();
        if (form.rating) data.rating = form.rating;

        // Number fields
        if (form.establishedYear) {
            const year = parseInt(form.establishedYear, 10);
            if (!isNaN(year) && year >= 1800 && year <= new Date().getFullYear()) {
                data.establishedYear = year;
            }
        }
        if (form.minFee) {
            data.minFee = parseInt(form.minFee, 10) || 0;
        }
        if (form.maxFee) {
            data.maxFee = parseInt(form.maxFee, 10) || 0;
        }
        if (form.ranking) {
            const rank = parseInt(form.ranking, 10);
            if (!isNaN(rank)) data.ranking = rank;
        }

        // Array fields - split by comma
        const toArray = (str) => {
            if (!str || !str.trim()) return [];
            return str.split(',').map(s => s.trim()).filter(Boolean);
        };

        data.accreditations = toArray(form.accreditations);
        data.approvals = toArray(form.approvals);
        data.facilities = toArray(form.facilities);
        data.highlights = toArray(form.highlights);

        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            const universityData = prepareDataForSubmit();
            console.log('Submitting data:', JSON.stringify(universityData, null, 2));

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            let response;
            if (isEditMode) {
                response = await axios.put(
                    `${API_BASE}/admin/universities/${id}`,
                    universityData,
                    config
                );
                console.log('Update response:', response.data);
                setSuccess('University updated successfully! Redirecting...');
                setOriginalData({ ...form });
            } else {
                response = await axios.post(
                    `${API_BASE}/admin/universities`,
                    universityData,
                    config
                );
                console.log('Create response:', response.data);
                setSuccess('University created successfully! Redirecting...');
            }

            setTimeout(() => navigate('/admin/dashboard'), 1500);

        } catch (err) {
            console.error('Error saving university:', err);
            console.error('Error response:', err.response?.data);

            if (err.response?.status === 401) {
                handleLogout();
            } else if (err.response?.status === 409) {
                setError('A university with this slug already exists');
            } else if (err.response?.status === 400) {
                setError(err.response?.data?.message || 'Invalid data. Please check required fields.');
            } else {
                setError(err.response?.data?.message || 'Failed to save university');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        const confirmMsg = isEditMode
            ? 'Reset all changes to original values?'
            : 'Clear all fields?';

        if (window.confirm(confirmMsg)) {
            if (isEditMode && originalData) {
                setForm({ ...originalData });
            } else {
                setForm({ ...initialFormState });
            }
            setError('');
            setSuccess('');
        }
    };

    // Loading state
    if (fetchingData) {
        return (
            <div style={styles.wrapper}>
                <aside style={styles.sidebar}>
                    <div style={styles.sidebarHeader}>
                        <i className="fa-solid fa-graduation-cap" style={styles.sidebarLogo}></i>
                        <span style={styles.sidebarTitle}>EduFolio</span>
                    </div>
                </aside>
                <main style={styles.main}>
                    <div style={styles.loadingContainer}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#FF6B35' }}></i>
                        <h2 style={{ color: '#334155', marginTop: '20px' }}>Loading...</h2>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <i className="fa-solid fa-graduation-cap" style={styles.sidebarLogo}></i>
                    <span style={styles.sidebarTitle}>EduFolio</span>
                </div>

                <nav style={styles.sidebarNav}>
                    <Link to="/admin/dashboard" style={styles.navItem}>
                        <i className="fa-solid fa-chart-pie"></i>
                        <span>Overview</span>
                    </Link>
                    <div style={styles.navItemActive}>
                        <i className="fa-solid fa-building-columns"></i>
                        <span>Universities</span>
                    </div>
                    <Link to="/admin/programs/add" style={styles.navItem}>
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Programs</span>
                    </Link>
                </nav>

                <div style={styles.sidebarFooter}>
                    <a href="/" target="_blank" rel="noreferrer" style={styles.viewSiteLink}>
                        <i className="fa-solid fa-external-link"></i>
                        <span>View Website</span>
                    </a>
                    <button style={styles.logoutBtn} onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <div style={styles.container}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div>
                            <h1 style={styles.title}>
                                <i className={`fa-solid ${isEditMode ? 'fa-pen-to-square' : 'fa-plus-circle'}`} style={{ color: '#FF6B35' }}></i>
                                {isEditMode ? ' Edit University' : ' Add New University'}
                            </h1>
                            <p style={styles.subtitle}>
                                {isEditMode ? `Editing: ${form.name}` : 'Fill in the details below'}
                            </p>
                        </div>
                        <button style={styles.backBtn} onClick={() => navigate('/admin/dashboard')}>
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </button>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div style={styles.errorAlert}>
                            <span><i className="fa-solid fa-exclamation-circle"></i> {error}</span>
                            <button onClick={() => setError('')} style={styles.alertClose}>×</button>
                        </div>
                    )}
                    {success && (
                        <div style={styles.successAlert}>
                            <i className="fa-solid fa-check-circle"></i> {success}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>

                        {/* Basic Info */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-info-circle" style={{ color: '#FF6B35' }}></i> Basic Information
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Name <span style={styles.required}>*</span></label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="University name"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Slug</label>
                                    <input
                                        name="slug"
                                        value={form.slug}
                                        onChange={handleChange}
                                        placeholder="university-slug"
                                        style={styles.input}
                                    />
                                    <small style={styles.hint}>/universities/{form.slug || 'slug'}</small>
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Short Name</label>
                                    <input
                                        name="shortName"
                                        value={form.shortName}
                                        onChange={handleChange}
                                        placeholder="e.g., AU"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Established Year</label>
                                    <input
                                        name="establishedYear"
                                        type="number"
                                        value={form.establishedYear}
                                        onChange={handleChange}
                                        placeholder="e.g., 2005"
                                        style={styles.input}
                                        min="1800"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-location-dot" style={{ color: '#FF6B35' }}></i> Location
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Location <span style={styles.required}>*</span></label>
                                    <input
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="City, State"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Full Address</label>
                                    <input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Complete address"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-file-lines" style={{ color: '#FF6B35' }}></i> Description
                            </h3>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>About <span style={styles.required}>*</span></label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="About the university..."
                                    style={styles.textarea}
                                    rows="4"
                                />
                                <small style={styles.hint}>{form.description.length} characters</small>
                            </div>
                        </div>

                        {/* Ratings & Approvals */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-award" style={{ color: '#FF6B35' }}></i> Ratings & Approvals
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>NAAC Rating</label>
                                    <select
                                        name="rating"
                                        value={form.rating}
                                        onChange={handleChange}
                                        style={styles.select}
                                    >
                                        {ratingOptions.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>NIRF Ranking</label>
                                    <input
                                        name="ranking"
                                        type="number"
                                        value={form.ranking}
                                        onChange={handleChange}
                                        placeholder="e.g., 25"
                                        style={styles.input}
                                        min="1"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Accreditations (comma separated)</label>
                                    <input
                                        name="accreditations"
                                        value={form.accreditations}
                                        onChange={handleChange}
                                        placeholder="NAAC, NBA, AACSB"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Approvals (comma separated)</label>
                                    <input
                                        name="approvals"
                                        value={form.approvals}
                                        onChange={handleChange}
                                        placeholder="UGC, AICTE, BCI"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Fee Structure */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#FF6B35' }}></i> Fee Structure
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Minimum Fee (₹)</label>
                                    <input
                                        name="minFee"
                                        type="number"
                                        value={form.minFee}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        style={styles.input}
                                        min="0"
                                    />
                                    {form.minFee && <small style={styles.hint}>₹{Number(form.minFee).toLocaleString('en-IN')}</small>}
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Maximum Fee (₹)</label>
                                    <input
                                        name="maxFee"
                                        type="number"
                                        value={form.maxFee}
                                        onChange={handleChange}
                                        placeholder="500000"
                                        style={styles.input}
                                        min="0"
                                    />
                                    {form.maxFee && <small style={styles.hint}>₹{Number(form.maxFee).toLocaleString('en-IN')}</small>}
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-star" style={{ color: '#FF6B35' }}></i> Features
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Highlights (comma separated)</label>
                                    <textarea
                                        name="highlights"
                                        value={form.highlights}
                                        onChange={handleChange}
                                        placeholder="100% Placement, Industry Tie-ups, Flexible Learning"
                                        style={{ ...styles.textarea, minHeight: '60px' }}
                                        rows="2"
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Facilities (comma separated)</label>
                                    <textarea
                                        name="facilities"
                                        value={form.facilities}
                                        onChange={handleChange}
                                        placeholder="Digital Library, Online Labs, Career Services"
                                        style={{ ...styles.textarea, minHeight: '60px' }}
                                        rows="2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Media */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-image" style={{ color: '#FF6B35' }}></i> Media
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Logo URL</label>
                                    <input
                                        name="logo"
                                        type="url"
                                        value={form.logo}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        style={styles.input}
                                    />
                                    {form.logo && (
                                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img
                                                src={form.logo}
                                                alt="Logo"
                                                style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setForm(prev => ({ ...prev, logo: '' }))}
                                                style={styles.clearBtn}
                                            >
                                                <i className="fa-solid fa-times"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Banner URL</label>
                                    <input
                                        name="banner"
                                        type="url"
                                        value={form.banner}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        style={styles.input}
                                    />
                                    {form.banner && (
                                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img
                                                src={form.banner}
                                                alt="Banner"
                                                style={{ width: '100px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setForm(prev => ({ ...prev, banner: '' }))}
                                                style={styles.clearBtn}
                                            >
                                                <i className="fa-solid fa-times"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-address-book" style={{ color: '#FF6B35' }}></i> Contact
                            </h3>
                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Website</label>
                                    <input
                                        name="website"
                                        type="url"
                                        value={form.website}
                                        onChange={handleChange}
                                        placeholder="https://www.university.edu"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="info@university.edu"
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 1234567890"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>
                                <i className="fa-solid fa-cog" style={{ color: '#FF6B35' }}></i> Settings
                            </h3>
                            <div style={styles.settingsGrid}>
                                <label style={{
                                    ...styles.settingCard,
                                    background: form.featured ? '#FFF7ED' : '#F8FAFC',
                                    border: form.featured ? '2px solid #FF6B35' : '2px solid transparent'
                                }}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{
                                        ...styles.settingIcon,
                                        background: form.featured ? '#FF6B35' : '#E2E8F0',
                                        color: form.featured ? '#fff' : '#64748B'
                                    }}>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div>
                                        <strong>Featured</strong>
                                        <small style={{ display: 'block', color: '#64748B' }}>Show on homepage</small>
                                    </div>
                                </label>

                                <label style={{
                                    ...styles.settingCard,
                                    background: form.isActive ? '#D1FAE5' : '#F8FAFC',
                                    border: form.isActive ? '2px solid #16A34A' : '2px solid transparent'
                                }}>
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{
                                        ...styles.settingIcon,
                                        background: form.isActive ? '#16A34A' : '#E2E8F0',
                                        color: form.isActive ? '#fff' : '#64748B'
                                    }}>
                                        <i className={`fa-solid ${form.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                    </div>
                                    <div>
                                        <strong>Active</strong>
                                        <small style={{ display: 'block', color: '#64748B' }}>Visible to users</small>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={styles.actions}>
                            <button type="button" onClick={handleReset} style={styles.resetBtn}>
                                <i className="fa-solid fa-rotate-left"></i> {isEditMode ? 'Reset' : 'Clear'}
                            </button>
                            <div style={styles.actionRight}>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/dashboard')}
                                    style={styles.cancelBtn}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        ...styles.submitBtn,
                                        opacity: loading ? 0.7 : 1,
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {loading ? (
                                        <><i className="fa-solid fa-spinner fa-spin"></i> {isEditMode ? 'Updating...' : 'Creating...'}</>
                                    ) : (
                                        <><i className={`fa-solid ${isEditMode ? 'fa-save' : 'fa-plus'}`}></i> {isEditMode ? 'Update' : 'Create'}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Poppins', sans-serif" },
    sidebar: { width: '250px', background: '#0F172A', padding: '20px', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0 },
    sidebarHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    sidebarLogo: { fontSize: '1.5rem', color: '#FF6B35' },
    sidebarTitle: { color: '#fff', fontSize: '1.2rem', fontWeight: '700' },
    sidebarNav: { display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 },
    navItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', color: '#94A3B8', fontSize: '0.9rem', borderRadius: '8px', textDecoration: 'none' },
    navItemActive: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(255,107,53,0.15)', color: '#FF6B35', fontSize: '0.9rem', fontWeight: '600', borderRadius: '8px' },
    sidebarFooter: { paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' },
    viewSiteLink: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' },
    logoutBtn: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', marginTop: '8px', background: 'rgba(220,38,38,0.15)', border: 'none', color: '#F87171', fontSize: '0.85rem', borderRadius: '8px', cursor: 'pointer' },
    main: { flex: 1, marginLeft: '250px', padding: '25px' },
    loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' },
    container: { maxWidth: '800px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
    title: { color: '#0F172A', fontSize: '1.4rem', fontWeight: '700', margin: 0 },
    subtitle: { color: '#64748B', fontSize: '0.85rem', margin: '5px 0 0' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#F1F5F9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
    errorAlert: { background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' },
    successAlert: { background: '#D1FAE5', color: '#059669', padding: '12px 16px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' },
    alertClose: { background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem' },
    form: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' },
    section: { padding: '20px', borderBottom: '1px solid #E2E8F0' },
    sectionTitle: { display: 'flex', alignItems: 'center', gap: '10px', color: '#0F172A', fontSize: '1rem', fontWeight: '600', margin: '0 0 15px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
    inputGroup: { marginBottom: '5px' },
    label: { display: 'block', color: '#334155', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' },
    required: { color: '#DC2626' },
    input: { width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' },
    select: { width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff', cursor: 'pointer' },
    textarea: { width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px', fontFamily: 'inherit' },
    hint: { display: 'block', color: '#64748B', fontSize: '0.75rem', marginTop: '4px' },
    clearBtn: { width: '28px', height: '28px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' },
    settingsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
    settingCard: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#F8FAFC', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' },
    settingIcon: { width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' },
    actions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: '#F8FAFC' },
    actionRight: { display: 'flex', gap: '10px' },
    resetBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
    cancelBtn: { padding: '10px 18px', background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
    submitBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 22px', background: 'linear-gradient(135deg, #FF6B35, #FF8B5C)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }
};

export default UniversityForm;
