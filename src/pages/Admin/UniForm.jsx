import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../api';

const UniversityForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [form, setForm] = useState({
        name: '',
        slug: '',
        type: 'Private',
        establishedYear: '',
        rating: '',
        naacGrade: '',
        ugcApproved: true,
        aicteApproved: false,
        city: '',
        state: '',
        location: '',
        minFee: '',
        maxFee: '',
        description: '',
        logo: '',
        bannerImage: '',
        website: '',
        email: '',
        phone: '',
        highlights: '',
        facilities: '',
        featured: false,
        isActive: true
    });

    const universityTypes = ['Private', 'Government', 'Deemed', 'State', 'Central', 'Autonomous'];
    const naacGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'];

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            fetchUniversityData();
        }
    }, [id]);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    };

    const fetchUniversityData = async () => {
        setFetchingData(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE}/admin/universities/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const uni = res.data;

            setForm({
                name: uni.name || '',
                slug: uni.slug || '',
                type: uni.type || 'Private',
                establishedYear: uni.establishedYear || '',
                rating: uni.rating || '',
                naacGrade: uni.naacGrade || '',
                ugcApproved: uni.ugcApproved !== undefined ? uni.ugcApproved : true,
                aicteApproved: uni.aicteApproved || false,
                city: uni.city || '',
                state: uni.state || '',
                location: uni.location || '',
                minFee: uni.minFee || '',
                maxFee: uni.maxFee || '',
                description: uni.description || '',
                logo: uni.logo || '',
                bannerImage: uni.bannerImage || '',
                website: uni.website || '',
                email: uni.email || '',
                phone: uni.phone || '',
                highlights: Array.isArray(uni.highlights) ? uni.highlights.join(', ') : uni.highlights || '',
                facilities: Array.isArray(uni.facilities) ? uni.facilities.join(', ') : uni.facilities || '',
                featured: uni.featured || false,
                isActive: uni.isActive !== undefined ? uni.isActive : true
            });
        } catch (err) {
            console.error('Error fetching university:', err);
            if (err.response?.status === 404) {
                setError('University not found');
                setTimeout(() => navigate('/admin/dashboard'), 2000);
            } else if (err.response?.status === 401) {
                handleLogout();
            } else {
                setError('Failed to load university data');
            }
        } finally {
            setFetchingData(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-generate slug from name
        if (name === 'name') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setForm(prev => ({ ...prev, slug }));
        }

        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        const setUploading = field === 'logo' ? setUploadingLogo : setUploadingBanner;
        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_BASE}/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setForm(prev => ({ ...prev, [field]: res.data.url }));
        } catch (err) {
            console.error('Image upload failed:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (field) => {
        setForm(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setError('University name is required');
            return false;
        }
        if (form.name.trim().length < 3) {
            setError('University name must be at least 3 characters');
            return false;
        }
        if (!form.slug.trim()) {
            setError('Slug is required');
            return false;
        }
        if (!form.city.trim()) {
            setError('City is required');
            return false;
        }
        if (form.website && !isValidUrl(form.website)) {
            setError('Please enter a valid website URL');
            return false;
        }
        if (form.email && !isValidEmail(form.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

            const universityData = {
                ...form,
                name: form.name.trim(),
                slug: form.slug.trim(),
                description: form.description.trim(),
                minFee: form.minFee ? Number(form.minFee) : 0,
                maxFee: form.maxFee ? Number(form.maxFee) : 0,
                establishedYear: form.establishedYear ? Number(form.establishedYear) : null,
                location: form.location || `${form.city}, ${form.state}`.trim(),
                highlights: form.highlights
                    ? form.highlights.split(',').map(s => s.trim()).filter(Boolean)
                    : [],
                facilities: form.facilities
                    ? form.facilities.split(',').map(s => s.trim()).filter(Boolean)
                    : []
            };

            if (isEditMode) {
                await axios.put(`${API_BASE}/admin/universities/${id}`, universityData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('University updated successfully! Redirecting...');
            } else {
                await axios.post(`${API_BASE}/admin/universities`, universityData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('University created successfully! Redirecting...');
            }

            setTimeout(() => navigate('/admin/dashboard'), 1500);

        } catch (err) {
            console.error('Error saving university:', err);
            if (err.response?.status === 401) {
                handleLogout();
            } else if (err.response?.status === 409) {
                setError('A university with this slug already exists');
            } else {
                setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} university`);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        const confirmMsg = isEditMode
            ? 'Reset all changes? This will reload the original data.'
            : 'Clear all fields?';

        if (window.confirm(confirmMsg)) {
            if (isEditMode) {
                fetchUniversityData();
            } else {
                setForm({
                    name: '',
                    slug: '',
                    type: 'Private',
                    establishedYear: '',
                    rating: '',
                    naacGrade: '',
                    ugcApproved: true,
                    aicteApproved: false,
                    city: '',
                    state: '',
                    location: '',
                    minFee: '',
                    maxFee: '',
                    description: '',
                    logo: '',
                    bannerImage: '',
                    website: '',
                    email: '',
                    phone: '',
                    highlights: '',
                    facilities: '',
                    featured: false,
                    isActive: true
                });
            }
            setError('');
            setSuccess('');
        }
    };

    // Loading state for edit mode
    if (isEditMode && fetchingData) {
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
                        <div style={styles.loadingSpinner}>
                            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#FF6B35' }}></i>
                        </div>
                        <h2 style={{ color: '#334155', marginTop: '20px' }}>Loading University Data...</h2>
                        <p style={{ color: '#64748B' }}>Please wait while we fetch the details.</p>
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
                    <Link to="/admin/universities/add" style={styles.navItemActive}>
                        <i className="fa-solid fa-building-columns"></i>
                        <span>Universities</span>
                    </Link>
                    <Link to="/admin/programs/add" style={styles.navItem}>
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Programs</span>
                    </Link>
                    <Link to="/admin/dashboard" style={styles.navItem}>
                        <i className="fa-solid fa-envelope"></i>
                        <span>Enquiries</span>
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
                        <div style={styles.headerLeft}>
                            <h1 style={styles.title}>
                                <i
                                    className={`fa-solid ${isEditMode ? 'fa-pen-to-square' : 'fa-plus-circle'}`}
                                    style={styles.titleIcon}
                                ></i>
                                {isEditMode ? 'Edit University' : 'Add New University'}
                            </h1>
                            <p style={styles.subtitle}>
                                {isEditMode
                                    ? 'Update the university information below'
                                    : 'Fill in the details to add a new university'
                                }
                            </p>
                            {isEditMode && form.name && (
                                <div style={styles.editBadge}>
                                    <i className="fa-solid fa-building-columns"></i>
                                    Editing: {form.name}
                                </div>
                            )}
                        </div>
                        <button
                            style={styles.backBtn}
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
                        </button>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div style={styles.errorAlert}>
                            <div style={styles.alertContent}>
                                <i className="fa-solid fa-exclamation-circle"></i>
                                <span>{error}</span>
                            </div>
                            <button style={styles.alertClose} onClick={() => setError('')}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                    )}

                    {success && (
                        <div style={styles.successAlert}>
                            <div style={styles.alertContent}>
                                <i className="fa-solid fa-check-circle"></i>
                                <span>{success}</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>

                        {/* Section 1: Basic Information */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-info-circle"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Basic Information</h2>
                                    <p style={styles.sectionDesc}>Enter the basic details of the university</p>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        University Name <span style={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Amity University Online"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        Slug <span style={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={form.slug}
                                        onChange={handleChange}
                                        placeholder="e.g., amity-university-online"
                                        style={styles.input}
                                    />
                                    <small style={styles.hint}>
                                        Used in URL: /universities/{form.slug || 'your-slug'}
                                    </small>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>University Type</label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        style={styles.select}
                                    >
                                        {universityTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Established Year</label>
                                    <input
                                        type="number"
                                        name="establishedYear"
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

                        {/* Section 2: Ratings & Approvals */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-award"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Ratings & Approvals</h2>
                                    <p style={styles.sectionDesc}>Add accreditation and approval details</p>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Rating / Ranking</label>
                                    <input
                                        type="text"
                                        name="rating"
                                        value={form.rating}
                                        onChange={handleChange}
                                        placeholder="e.g., NIRF Rank 25"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>NAAC Grade</label>
                                    <select
                                        name="naacGrade"
                                        value={form.naacGrade}
                                        onChange={handleChange}
                                        style={styles.select}
                                    >
                                        <option value="">Select Grade</option>
                                        {naacGrades.map(grade => (
                                            <option key={grade} value={grade}>{grade}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={styles.checkboxRow}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="ugcApproved"
                                        checked={form.ugcApproved}
                                        onChange={handleChange}
                                        style={styles.checkboxInput}
                                    />
                                    <span style={styles.checkboxCustom}>
                                        {form.ugcApproved && <i className="fa-solid fa-check"></i>}
                                    </span>
                                    <span>UGC Approved</span>
                                </label>

                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="aicteApproved"
                                        checked={form.aicteApproved}
                                        onChange={handleChange}
                                        style={styles.checkboxInput}
                                    />
                                    <span style={styles.checkboxCustom}>
                                        {form.aicteApproved && <i className="fa-solid fa-check"></i>}
                                    </span>
                                    <span>AICTE Approved</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 3: Location */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Location</h2>
                                    <p style={styles.sectionDesc}>Specify the university location</p>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        City <span style={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="e.g., Noida"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        placeholder="e.g., Uttar Pradesh"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={{ ...styles.inputGroup, gridColumn: '1 / -1' }}>
                                    <label style={styles.label}>Full Location / Address</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Sector 125, Noida, Uttar Pradesh 201313"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Fee Structure */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Fee Structure</h2>
                                    <p style={styles.sectionDesc}>Set the fee range for programs</p>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Minimum Fee (₹)</label>
                                    <div style={styles.inputWithIcon}>
                                        <span style={styles.inputPrefix}>₹</span>
                                        <input
                                            type="number"
                                            name="minFee"
                                            value={form.minFee}
                                            onChange={handleChange}
                                            placeholder="50000"
                                            style={{ ...styles.input, paddingLeft: '35px' }}
                                            min="0"
                                        />
                                    </div>
                                    {form.minFee && (
                                        <small style={styles.hint}>
                                            ₹{Number(form.minFee).toLocaleString('en-IN')}
                                        </small>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Maximum Fee (₹)</label>
                                    <div style={styles.inputWithIcon}>
                                        <span style={styles.inputPrefix}>₹</span>
                                        <input
                                            type="number"
                                            name="maxFee"
                                            value={form.maxFee}
                                            onChange={handleChange}
                                            placeholder="500000"
                                            style={{ ...styles.input, paddingLeft: '35px' }}
                                            min="0"
                                        />
                                    </div>
                                    {form.maxFee && (
                                        <small style={styles.hint}>
                                            ₹{Number(form.maxFee).toLocaleString('en-IN')}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Description */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-file-lines"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Description</h2>
                                    <p style={styles.sectionDesc}>Provide detailed information about the university</p>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>About University</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description about the university, its history, achievements, and what makes it unique..."
                                    style={styles.textarea}
                                    rows="5"
                                ></textarea>
                                <small style={styles.hint}>
                                    {form.description.length}/1000 characters
                                </small>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <i className="fa-solid fa-star" style={styles.labelIcon}></i>
                                    Highlights (comma separated)
                                </label>
                                <textarea
                                    name="highlights"
                                    value={form.highlights}
                                    onChange={handleChange}
                                    placeholder="100% Placement Assistance, Industry Partnerships, Flexible Learning, Expert Faculty"
                                    style={styles.textarea}
                                    rows="2"
                                ></textarea>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <i className="fa-solid fa-building" style={styles.labelIcon}></i>
                                    Facilities (comma separated)
                                </label>
                                <textarea
                                    name="facilities"
                                    value={form.facilities}
                                    onChange={handleChange}
                                    placeholder="Digital Library, Online Labs, Student Portal, Career Services, Alumni Network"
                                    style={styles.textarea}
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>

                        {/* Section 6: Media */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-image"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Media</h2>
                                    <p style={styles.sectionDesc}>Upload logo and banner images</p>
                                </div>
                            </div>

                            <div style={styles.mediaGrid}>
                                {/* Logo Upload */}
                                <div style={styles.mediaUpload}>
                                    <label style={styles.label}>University Logo</label>
                                    <div style={styles.uploadBox}>
                                        {form.logo ? (
                                            <div style={styles.imagePreviewBox}>
                                                <img src={form.logo} alt="Logo" style={styles.logoPreview} />
                                                <button
                                                    type="button"
                                                    style={styles.removeImageBtn}
                                                    onClick={() => removeImage('logo')}
                                                >
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <label style={styles.uploadLabel}>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileUpload(e, 'logo')}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    disabled={uploadingLogo}
                                                />
                                                {uploadingLogo ? (
                                                    <div style={styles.uploadingState}>
                                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                                        <span>Uploading...</span>
                                                    </div>
                                                ) : (
                                                    <div style={styles.uploadPlaceholder}>
                                                        <i className="fa-solid fa-cloud-upload-alt"></i>
                                                        <span>Click to upload logo</span>
                                                        <small>PNG, JPG up to 5MB</small>
                                                    </div>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Banner Upload */}
                                <div style={styles.mediaUpload}>
                                    <label style={styles.label}>Banner Image</label>
                                    <div style={styles.uploadBoxWide}>
                                        {form.bannerImage ? (
                                            <div style={styles.bannerPreviewBox}>
                                                <img src={form.bannerImage} alt="Banner" style={styles.bannerPreview} />
                                                <button
                                                    type="button"
                                                    style={styles.removeImageBtn}
                                                    onClick={() => removeImage('bannerImage')}
                                                >
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <label style={styles.uploadLabel}>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileUpload(e, 'bannerImage')}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    disabled={uploadingBanner}
                                                />
                                                {uploadingBanner ? (
                                                    <div style={styles.uploadingState}>
                                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                                        <span>Uploading...</span>
                                                    </div>
                                                ) : (
                                                    <div style={styles.uploadPlaceholder}>
                                                        <i className="fa-solid fa-image"></i>
                                                        <span>Click to upload banner</span>
                                                        <small>Recommended: 1200x400px</small>
                                                    </div>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 7: Contact Information */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-address-book"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Contact Information</h2>
                                    <p style={styles.sectionDesc}>Add contact details for the university</p>
                                </div>
                            </div>

                            <div style={styles.grid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        <i className="fa-solid fa-globe" style={styles.labelIcon}></i>
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={form.website}
                                        onChange={handleChange}
                                        placeholder="https://www.university.edu"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        <i className="fa-solid fa-envelope" style={styles.labelIcon}></i>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="admissions@university.edu"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>
                                        <i className="fa-solid fa-phone" style={styles.labelIcon}></i>
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 1234567890"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 8: Settings */}
                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionIcon}>
                                    <i className="fa-solid fa-cog"></i>
                                </div>
                                <div>
                                    <h2 style={styles.sectionTitle}>Settings</h2>
                                    <p style={styles.sectionDesc}>Configure visibility and featured status</p>
                                </div>
                            </div>

                            <div style={styles.settingsGrid}>
                                <label style={{
                                    ...styles.settingCard,
                                    ...(form.featured ? styles.settingCardActive : {})
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
                                        <strong>Featured University</strong>
                                        <small>Display on homepage and featured sections</small>
                                    </div>
                                </label>

                                <label style={{
                                    ...styles.settingCard,
                                    ...(form.isActive ? styles.settingCardActive : {})
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
                                        <small>University is visible to students</small>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div style={styles.actions}>
                            <button
                                type="button"
                                style={styles.resetBtn}
                                onClick={handleReset}
                            >
                                <i className="fa-solid fa-rotate-left"></i>
                                {isEditMode ? 'Reset Changes' : 'Clear Form'}
                            </button>
                            <div style={styles.actionRight}>
                                <button
                                    type="button"
                                    style={styles.cancelBtn}
                                    onClick={() => navigate('/admin/dashboard')}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        ...styles.submitBtn,
                                        opacity: (loading || uploadingLogo || uploadingBanner) ? 0.7 : 1,
                                        cursor: (loading || uploadingLogo || uploadingBanner) ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={loading || uploadingLogo || uploadingBanner}
                                >
                                    {loading ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                            {isEditMode ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            <i className={`fa-solid ${isEditMode ? 'fa-save' : 'fa-plus'}`}></i>
                                            {isEditMode ? 'Update University' : 'Create University'}
                                        </>
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
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFC'
    },
    sidebar: {
        width: '260px',
        background: '#0F172A',
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    sidebarLogo: {
        fontSize: '1.8rem',
        color: '#FF6B35'
    },
    sidebarTitle: {
        color: '#fff',
        fontSize: '1.4rem',
        fontWeight: '700'
    },
    sidebarNav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'transparent',
        color: '#94A3B8',
        fontSize: '0.95rem',
        fontWeight: '500',
        borderRadius: '10px',
        textDecoration: 'none'
    },
    navItemActive: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'rgba(255, 107, 53, 0.15)',
        color: '#FF6B35',
        fontSize: '0.95rem',
        fontWeight: '600',
        borderRadius: '10px',
        textDecoration: 'none'
    },
    sidebarFooter: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    viewSiteLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        color: '#94A3B8',
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        background: 'rgba(220, 38, 38, 0.15)',
        border: 'none',
        color: '#F87171',
        fontSize: '0.9rem',
        borderRadius: '10px',
        cursor: 'pointer'
    },
    main: {
        flex: 1,
        marginLeft: '260px',
        padding: '30px'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        background: '#fff',
        borderRadius: '20px',
        padding: '60px'
    },
    loadingSpinner: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#FFF7ED',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
    },
    headerLeft: {},
    title: {
        color: '#0F172A',
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    titleIcon: {
        color: '#FF6B35'
    },
    subtitle: {
        color: '#64748B',
        fontSize: '0.95rem',
        margin: 0
    },
    editBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        padding: '8px 16px',
        background: '#FFF7ED',
        color: '#EA580C',
        borderRadius: '25px',
        fontSize: '0.85rem',
        fontWeight: '600',
        border: '1px solid #FFEDD5'
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: '#F1F5F9',
        color: '#334155',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    errorAlert: {
        background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
        border: '1px solid #FCA5A5',
        color: '#DC2626',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    successAlert: {
        background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
        border: '1px solid #6EE7B7',
        color: '#059669',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '25px'
    },
    alertContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: '500'
    },
    alertClose: {
        background: 'none',
        border: 'none',
        color: '#DC2626',
        cursor: 'pointer',
        fontSize: '1.1rem'
    },
    form: {
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
    },
    section: {
        padding: '30px',
        borderBottom: '1px solid #E2E8F0'
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        marginBottom: '25px'
    },
    sectionIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.1rem',
        flexShrink: 0
    },
    sectionTitle: {
        color: '#0F172A',
        fontSize: '1.15rem',
        fontWeight: '700',
        marginBottom: '4px'
    },
    sectionDesc: {
        color: '#64748B',
        fontSize: '0.9rem',
        margin: 0
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    inputGroup: {
        marginBottom: '5px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '10px'
    },
    labelIcon: {
        color: '#64748B'
    },
    required: {
        color: '#DC2626'
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    inputWithIcon: {
        position: 'relative'
    },
    inputPrefix: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#64748B',
        fontWeight: '600'
    },
    select: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: '#fff',
        outline: 'none'
    },
    textarea: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        resize: 'vertical',
        fontFamily: 'inherit',
        outline: 'none',
        minHeight: '100px'
    },
    hint: {
        display: 'block',
        color: '#64748B',
        fontSize: '0.8rem',
        marginTop: '8px'
    },
    checkboxRow: {
        display: 'flex',
        gap: '30px',
        marginTop: '20px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        color: '#334155'
    },
    checkboxInput: {
        display: 'none'
    },
    checkboxCustom: {
        width: '22px',
        height: '22px',
        borderRadius: '6px',
        border: '2px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        color: '#FF6B35',
        fontSize: '0.75rem'
    },
    mediaGrid: {
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '25px'
    },
    mediaUpload: {},
    uploadBox: {
        width: '180px',
        height: '180px',
        border: '2px dashed #E2E8F0',
        borderRadius: '16px',
        overflow: 'hidden'
    },
    uploadBoxWide: {
        width: '100%',
        height: '180px',
        border: '2px dashed #E2E8F0',
        borderRadius: '16px',
        overflow: 'hidden'
    },
    uploadLabel: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: '#F8FAFC'
    },
    uploadPlaceholder: {
        textAlign: 'center',
        color: '#94A3B8'
    },
    uploadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        color: '#FF6B35'
    },
    imagePreviewBox: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    bannerPreviewBox: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    logoPreview: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        padding: '10px',
        boxSizing: 'border-box'
    },
    bannerPreview: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    removeImageBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: '#DC2626',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
    },
    settingCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '20px',
        background: '#F8FAFC',
        borderRadius: '14px',
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all 0.2s'
    },
    settingCardActive: {
        background: '#FFF7ED',
        borderColor: '#FF6B35'
    },
    settingIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '25px 30px',
        background: '#F8FAFC',
        flexWrap: 'wrap',
        gap: '15px'
    },
    actionRight: {
        display: 'flex',
        gap: '12px'
    },
    resetBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        background: '#fff',
        color: '#64748B',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    cancelBtn: {
        padding: '14px 28px',
        background: '#fff',
        color: '#64748B',
        border: '2px solid #E2E8F0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 32px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.95rem',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.35)'
    }
};

export default UniversityForm;
