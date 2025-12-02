import React, { useState } from 'react';
import axios from 'axios';
import API_BASE from '../../api';

const UniForm = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

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

    // Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 4000);
    };

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => {
            const newForm = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };

            // Auto-generate slug from name
            if (name === 'name') {
                newForm.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            }

            return newForm;
        });
    };

    // Validate form - match your model's required fields
    const validateForm = () => {
        if (!form.name || !form.name.trim()) {
            showToast('University name is required', 'error');
            return false;
        }
        if (form.name.trim().length < 3) {
            showToast('University name must be at least 3 characters', 'error');
            return false;
        }
        if (!form.location || !form.location.trim()) {
            showToast('Location is required', 'error');
            return false;
        }
        if (!form.description || !form.description.trim()) {
            showToast('Description is required', 'error');
            return false;
        }
        if (form.email && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            showToast('Please enter a valid email address', 'error');
            return false;
        }
        return true;
    };

    // Prepare data matching your model schema
    const prepareData = () => {
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
        } else {
            data.minFee = 0;
        }
        if (form.maxFee) {
            data.maxFee = parseInt(form.maxFee, 10) || 0;
        } else {
            data.maxFee = 0;
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

    // Submit the Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showToast('Please login again', 'error');
                return;
            }

            const universityData = prepareData();
            console.log('Submitting university data:', JSON.stringify(universityData, null, 2));

            const response = await axios.post(
                `${API_BASE}/admin/universities`,
                universityData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('University created:', response.data);

            // Reset form
            setForm({ ...initialFormState });

            showToast('University added successfully!', 'success');

            // Callback
            if (onSuccess) {
                setTimeout(() => onSuccess(), 1000);
            }

        } catch (err) {
            console.error('Error creating university:', err);
            console.error('Error response:', err.response?.data);

            if (err.response?.status === 401) {
                showToast('Session expired. Please login again.', 'error');
            } else if (err.response?.status === 409) {
                showToast('A university with this slug already exists', 'error');
            } else if (err.response?.status === 400) {
                showToast(err.response?.data?.message || 'Invalid data. Please check required fields.', 'error');
            } else {
                showToast(err.response?.data?.message || 'Failed to add university', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    // Clear form
    const handleReset = () => {
        if (window.confirm('Clear all fields?')) {
            setForm({ ...initialFormState });
            showToast('Form cleared', 'success');
        }
    };

    return (
        <div style={styles.container}>
            {/* Toast Notification */}
            {toast.show && (
                <div style={{
                    ...styles.toast,
                    background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5',
                    color: toast.type === 'error' ? '#DC2626' : '#059669',
                    borderColor: toast.type === 'error' ? '#FECACA' : '#A7F3D0'
                }}>
                    <i className={`fa-solid ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
                    <span>{toast.message}</span>
                    <button
                        style={styles.toastClose}
                        onClick={() => setToast({ show: false, message: '', type: '' })}
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
            )}

            <div style={styles.header}>
                <h3 style={styles.title}>
                    <i className="fa-solid fa-plus-circle" style={{ color: '#FF6B35', marginRight: '10px' }}></i>
                    Add New University
                </h3>
                <p style={styles.subtitle}>Fill in the details to add a new university</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Basic Info Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-info-circle" style={styles.sectionIcon}></i>
                        Basic Information
                    </h4>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                University Name <span style={styles.required}>*</span>
                            </label>
                            <input
                                name="name"
                                placeholder="e.g., Amity University Online"
                                value={form.name}
                                onChange={handleChange}
                                style={styles.input}
                                autoComplete="off"
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Slug</label>
                            <input
                                name="slug"
                                placeholder="e.g., amity-university-online"
                                value={form.slug}
                                onChange={handleChange}
                                style={styles.input}
                                autoComplete="off"
                            />
                            <small style={styles.hint}>URL: /universities/{form.slug || 'your-slug'}</small>
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Short Name</label>
                            <input
                                name="shortName"
                                placeholder="e.g., AU"
                                value={form.shortName}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Established Year</label>
                            <input
                                name="establishedYear"
                                type="number"
                                placeholder="e.g., 2005"
                                value={form.establishedYear}
                                onChange={handleChange}
                                style={styles.input}
                                min="1800"
                                max={new Date().getFullYear()}
                            />
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-location-dot" style={styles.sectionIcon}></i>
                        Location
                    </h4>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                Location <span style={styles.required}>*</span>
                            </label>
                            <input
                                name="location"
                                placeholder="e.g., Noida, Uttar Pradesh"
                                value={form.location}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Address</label>
                            <input
                                name="address"
                                placeholder="Complete address"
                                value={form.address}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-file-lines" style={styles.sectionIcon}></i>
                        Description
                    </h4>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            About University <span style={styles.required}>*</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Write a detailed description about the university..."
                            value={form.description}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="4"
                        ></textarea>
                        <small style={styles.hint}>{form.description.length} characters</small>
                    </div>
                </div>

                {/* Ratings & Approvals Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-award" style={styles.sectionIcon}></i>
                        Ratings & Approvals
                    </h4>
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
                                placeholder="e.g., 25"
                                value={form.ranking}
                                onChange={handleChange}
                                style={styles.input}
                                min="1"
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Accreditations (comma separated)</label>
                            <input
                                name="accreditations"
                                placeholder="NAAC, NBA, AACSB"
                                value={form.accreditations}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Approvals (comma separated)</label>
                            <input
                                name="approvals"
                                placeholder="UGC, AICTE, BCI"
                                value={form.approvals}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Fee Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-indian-rupee-sign" style={styles.sectionIcon}></i>
                        Fee Structure
                    </h4>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Minimum Fee (₹)</label>
                            <input
                                name="minFee"
                                type="number"
                                placeholder="e.g., 50000"
                                value={form.minFee}
                                onChange={handleChange}
                                style={styles.input}
                                min="0"
                            />
                            {form.minFee && (
                                <small style={styles.hint}>₹{Number(form.minFee).toLocaleString('en-IN')}</small>
                            )}
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Maximum Fee (₹)</label>
                            <input
                                name="maxFee"
                                type="number"
                                placeholder="e.g., 500000"
                                value={form.maxFee}
                                onChange={handleChange}
                                style={styles.input}
                                min="0"
                            />
                            {form.maxFee && (
                                <small style={styles.hint}>₹{Number(form.maxFee).toLocaleString('en-IN')}</small>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-star" style={styles.sectionIcon}></i>
                        Features
                    </h4>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Highlights (comma separated)</label>
                            <textarea
                                name="highlights"
                                placeholder="100% Placement, Industry Partnerships, Flexible Learning"
                                value={form.highlights}
                                onChange={handleChange}
                                style={{ ...styles.textarea, minHeight: '60px' }}
                                rows="2"
                            ></textarea>
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Facilities (comma separated)</label>
                            <textarea
                                name="facilities"
                                placeholder="Digital Library, Online Labs, Career Services"
                                value={form.facilities}
                                onChange={handleChange}
                                style={{ ...styles.textarea, minHeight: '60px' }}
                                rows="2"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-image" style={styles.sectionIcon}></i>
                        Media (Image URLs)
                    </h4>
                    <p style={styles.sectionHint}>
                        Use image hosting services like Imgur, Cloudinary, or Unsplash
                    </p>

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Logo URL</label>
                            <input
                                name="logo"
                                type="url"
                                placeholder="https://example.com/logo.png"
                                value={form.logo}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            {form.logo && (
                                <div style={styles.previewContainer}>
                                    <img
                                        src={form.logo}
                                        alt="Logo Preview"
                                        style={styles.logoImg}
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
                                placeholder="https://example.com/banner.jpg"
                                value={form.banner}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            {form.banner && (
                                <div style={styles.previewContainer}>
                                    <img
                                        src={form.banner}
                                        alt="Banner Preview"
                                        style={styles.bannerImg}
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

                    <div style={styles.quickLinks}>
                        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                            <i className="fa-solid fa-lightbulb" style={{ marginRight: '6px', color: '#F59E0B' }}></i>
                            Quick sources:
                        </span>
                        <a href="https://imgur.com/upload" target="_blank" rel="noreferrer" style={styles.quickLink}>Imgur</a>
                        <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={styles.quickLink}>Unsplash</a>
                        <a href="https://cloudinary.com" target="_blank" rel="noreferrer" style={styles.quickLink}>Cloudinary</a>
                    </div>
                </div>

                {/* Contact Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-address-book" style={styles.sectionIcon}></i>
                        Contact Information
                    </h4>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Website</label>
                            <input
                                name="website"
                                type="url"
                                placeholder="https://www.university.edu"
                                value={form.website}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="info@university.edu"
                                value={form.email}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+91 1234567890"
                                value={form.phone}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Settings Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-cog" style={styles.sectionIcon}></i>
                        Settings
                    </h4>
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

                {/* Action Buttons */}
                <div style={styles.actions}>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={styles.resetBtn}
                        disabled={loading}
                    >
                        <i className="fa-solid fa-rotate-left"></i> Clear
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
                            <><i className="fa-solid fa-spinner fa-spin"></i> Adding...</>
                        ) : (
                            <><i className="fa-solid fa-plus"></i> Add University</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        background: '#fff',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative'
    },
    toast: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        left: '15px',
        padding: '12px 16px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.9rem',
        fontWeight: '500',
        border: '1px solid',
        zIndex: 100
    },
    toastClose: {
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'inherit',
        fontSize: '1rem'
    },
    header: {
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #E2E8F0'
    },
    title: {
        margin: 0,
        marginBottom: '5px',
        color: '#0F172A',
        fontSize: '1.3rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center'
    },
    subtitle: {
        margin: 0,
        color: '#64748B',
        fontSize: '0.85rem'
    },
    section: {
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #F1F5F9'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '0 0 15px 0',
        color: '#334155',
        fontSize: '1rem',
        fontWeight: '600'
    },
    sectionIcon: {
        color: '#FF6B35',
        fontSize: '0.9rem'
    },
    sectionHint: {
        margin: '0 0 12px 0',
        color: '#64748B',
        fontSize: '0.8rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '6px',
        color: '#334155',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    required: {
        color: '#DC2626'
    },
    input: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        width: '100%',
        boxSizing: 'border-box'
    },
    select: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        background: '#fff',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box'
    },
    textarea: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: '80px',
        width: '100%',
        boxSizing: 'border-box'
    },
    hint: {
        marginTop: '4px',
        color: '#64748B',
        fontSize: '0.75rem'
    },
    previewContainer: {
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    logoImg: {
        width: '60px',
        height: '60px',
        objectFit: 'contain',
        borderRadius: '8px',
        border: '1px solid #E2E8F0'
    },
    bannerImg: {
        width: '120px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '1px solid #E2E8F0'
    },
    clearBtn: {
        padding: '5px 10px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.75rem'
    },
    quickLinks: {
        marginTop: '12px',
        padding: '10px 12px',
        background: '#F8FAFC',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
    },
    quickLink: {
        color: '#0284C7',
        textDecoration: 'none',
        fontSize: '0.8rem',
        padding: '3px 8px',
        background: '#E0F2FE',
        borderRadius: '4px'
    },
    settingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
    },
    settingCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px',
        background: '#F8FAFC',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    settingIcon: {
        width: '38px',
        height: '38px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: '1px solid #E2E8F0'
    },
    resetBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 18px',
        background: '#F1F5F9',
        color: '#64748B',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 22px',
        background: 'linear-gradient(135deg, #FF6B35, #FF8B5C)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
    }
};

export default UniForm;
