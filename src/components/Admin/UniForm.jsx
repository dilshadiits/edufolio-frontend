import React, { useState } from 'react';
import axios from 'axios';
import API_BASE from '../../api';

const UniForm = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const initialFormState = {
        name: '',
        slug: '',
        rating: '',
        city: '',
        state: '',
        minFee: '',
        maxFee: '',
        logo: '',
        bannerImage: '',
        description: '',
        type: 'Private',
        naacGrade: '',
        establishedYear: '',
        ugcApproved: true,
        aicteApproved: false,
        highlights: '',
        facilities: '',
        website: '',
        email: '',
        phone: '',
        featured: false,
        isActive: true
    };

    const [form, setForm] = useState(initialFormState);

    const universityTypes = ['Private', 'Government', 'Deemed', 'State', 'Central', 'Autonomous'];
    const naacGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'];

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

    // Validate form
    const validateForm = () => {
        if (!form.name || !form.name.trim()) {
            showToast('University name is required', 'error');
            return false;
        }
        if (form.name.trim().length < 3) {
            showToast('University name must be at least 3 characters', 'error');
            return false;
        }
        if (!form.slug || !form.slug.trim()) {
            showToast('Slug is required', 'error');
            return false;
        }
        if (!/^[a-z0-9-]+$/.test(form.slug.trim())) {
            showToast('Slug can only contain lowercase letters, numbers, and hyphens', 'error');
            return false;
        }
        if (!form.city || !form.city.trim()) {
            showToast('City is required', 'error');
            return false;
        }
        if (form.email && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            showToast('Please enter a valid email address', 'error');
            return false;
        }
        return true;
    };

    // Prepare data for submission
    const prepareData = () => {
        const data = {
            name: form.name.trim(),
            slug: form.slug.trim().toLowerCase(),
            type: form.type || 'Private',
            city: form.city.trim(),
            ugcApproved: Boolean(form.ugcApproved),
            aicteApproved: Boolean(form.aicteApproved),
            featured: Boolean(form.featured),
            isActive: Boolean(form.isActive)
        };

        // Optional string fields
        if (form.state && form.state.trim()) {
            data.state = form.state.trim();
        }

        // Build location
        if (form.city && form.state) {
            data.location = `${form.city.trim()}, ${form.state.trim()}`;
        } else {
            data.location = form.city.trim();
        }

        if (form.description && form.description.trim()) {
            data.description = form.description.trim();
        }

        if (form.rating && form.rating.trim()) {
            data.rating = form.rating.trim();
        }

        if (form.naacGrade) {
            data.naacGrade = form.naacGrade;
        }

        if (form.logo && form.logo.trim()) {
            data.logo = form.logo.trim();
        }

        if (form.bannerImage && form.bannerImage.trim()) {
            data.bannerImage = form.bannerImage.trim();
        }

        if (form.website && form.website.trim()) {
            data.website = form.website.trim();
        }

        if (form.email && form.email.trim()) {
            data.email = form.email.trim();
        }

        if (form.phone && form.phone.trim()) {
            data.phone = form.phone.trim();
        }

        // Number fields
        if (form.establishedYear) {
            const year = parseInt(form.establishedYear, 10);
            if (!isNaN(year) && year >= 1800 && year <= new Date().getFullYear()) {
                data.establishedYear = year;
            }
        }

        if (form.minFee) {
            const fee = parseInt(form.minFee, 10);
            if (!isNaN(fee) && fee >= 0) {
                data.minFee = fee;
            }
        } else {
            data.minFee = 0;
        }

        if (form.maxFee) {
            const fee = parseInt(form.maxFee, 10);
            if (!isNaN(fee) && fee >= 0) {
                data.maxFee = fee;
            }
        } else {
            data.maxFee = 0;
        }

        // Array fields
        if (form.highlights && form.highlights.trim()) {
            data.highlights = form.highlights
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
        } else {
            data.highlights = [];
        }

        if (form.facilities && form.facilities.trim()) {
            data.facilities = form.facilities
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
        } else {
            data.facilities = [];
        }

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
            console.log('Submitting university data:', universityData);

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
            } else if (err.response?.status === 409 || err.response?.data?.message?.includes('duplicate')) {
                showToast('A university with this slug already exists', 'error');
            } else if (err.response?.status === 400) {
                showToast(err.response?.data?.message || 'Invalid data. Please check all fields.', 'error');
            } else {
                showToast(err.response?.data?.message || 'Failed to add university. Please try again.', 'error');
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
                            <label style={styles.label}>
                                Slug <span style={styles.required}>*</span>
                            </label>
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

                {/* Ratings & Approvals Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-award" style={styles.sectionIcon}></i>
                        Ratings & Approvals
                    </h4>
                    <div style={styles.grid}>
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
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Rating / Ranking</label>
                            <input
                                name="rating"
                                placeholder="e.g., NIRF Rank 25"
                                value={form.rating}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div style={styles.checkboxRow}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="ugcApproved"
                                checked={form.ugcApproved}
                                onChange={handleChange}
                                style={styles.checkbox}
                            />
                            <span style={{
                                ...styles.checkboxCustom,
                                background: form.ugcApproved ? '#FF6B35' : '#fff',
                                borderColor: form.ugcApproved ? '#FF6B35' : '#CBD5E1'
                            }}>
                                {form.ugcApproved && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.7rem' }}></i>}
                            </span>
                            UGC Approved
                        </label>

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="aicteApproved"
                                checked={form.aicteApproved}
                                onChange={handleChange}
                                style={styles.checkbox}
                            />
                            <span style={{
                                ...styles.checkboxCustom,
                                background: form.aicteApproved ? '#FF6B35' : '#fff',
                                borderColor: form.aicteApproved ? '#FF6B35' : '#CBD5E1'
                            }}>
                                {form.aicteApproved && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.7rem' }}></i>}
                            </span>
                            AICTE Approved
                        </label>
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
                                City <span style={styles.required}>*</span>
                            </label>
                            <input
                                name="city"
                                placeholder="e.g., Noida"
                                value={form.city}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>State</label>
                            <input
                                name="state"
                                placeholder="e.g., Uttar Pradesh"
                                value={form.state}
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

                {/* Description Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-file-lines" style={styles.sectionIcon}></i>
                        Description & Details
                    </h4>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>About University</label>
                        <textarea
                            name="description"
                            placeholder="Write a brief description about the university..."
                            value={form.description}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="3"
                        ></textarea>
                        <small style={styles.hint}>{form.description.length} characters</small>
                    </div>
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
                        Use image hosting services like Imgur, Cloudinary, or Unsplash for image URLs
                    </p>

                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-image" style={{ marginRight: '6px', color: '#64748B' }}></i>
                                Logo URL
                            </label>
                            <input
                                name="logo"
                                type="url"
                                placeholder="https://example.com/logo.png"
                                value={form.logo}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <small style={styles.hint}>Recommended: Square image (200x200px)</small>
                            {form.logo && (
                                <div style={styles.previewContainer}>
                                    <div style={styles.logoPreview}>
                                        <img
                                            src={form.logo}
                                            alt="Logo Preview"
                                            style={styles.logoImg}
                                            onError={(e) => e.target.style.display = 'none'}
                                            onLoad={(e) => e.target.style.display = 'block'}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, logo: '' }))}
                                        style={styles.clearBtn}
                                    >
                                        <i className="fa-solid fa-times"></i> Clear
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                <i className="fa-solid fa-panorama" style={{ marginRight: '6px', color: '#64748B' }}></i>
                                Banner Image URL
                            </label>
                            <input
                                name="bannerImage"
                                type="url"
                                placeholder="https://example.com/banner.jpg"
                                value={form.bannerImage}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <small style={styles.hint}>Recommended: Wide image (1200x400px)</small>
                            {form.bannerImage && (
                                <div style={styles.previewContainer}>
                                    <div style={styles.bannerPreview}>
                                        <img
                                            src={form.bannerImage}
                                            alt="Banner Preview"
                                            style={styles.bannerImg}
                                            onError={(e) => e.target.style.display = 'none'}
                                            onLoad={(e) => e.target.style.display = 'block'}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, bannerImage: '' }))}
                                        style={styles.clearBtn}
                                    >
                                        <i className="fa-solid fa-times"></i> Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.quickLinks}>
                        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                            <i className="fa-solid fa-lightbulb" style={{ marginRight: '6px', color: '#F59E0B' }}></i>
                            Quick image sources:
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
                                placeholder="admissions@university.edu"
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
                                <strong>Featured</strong>
                                <small style={{ display: 'block', color: '#64748B', marginTop: '2px' }}>Show on homepage</small>
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
                                <small style={{ display: 'block', color: '#64748B', marginTop: '2px' }}>Visible to users</small>
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
                        <i className="fa-solid fa-rotate-left"></i> Clear Form
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
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i> Adding...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-plus"></i> Add University
                            </>
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
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative'
    },
    // Toast
    toast: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        left: '20px',
        padding: '14px 20px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.9rem',
        fontWeight: '500',
        border: '1px solid',
        zIndex: 100,
        animation: 'slideIn 0.3s ease'
    },
    toastClose: {
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        opacity: 0.7,
        fontSize: '1rem',
        color: 'inherit'
    },
    header: {
        marginBottom: '25px',
        paddingBottom: '20px',
        borderBottom: '1px solid #E2E8F0'
    },
    title: {
        margin: 0,
        marginBottom: '8px',
        color: '#0F172A',
        fontSize: '1.4rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center'
    },
    subtitle: {
        margin: 0,
        color: '#64748B',
        fontSize: '0.9rem'
    },
    section: {
        marginBottom: '25px',
        paddingBottom: '25px',
        borderBottom: '1px solid #F1F5F9'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '0 0 18px 0',
        color: '#334155',
        fontSize: '1rem',
        fontWeight: '600'
    },
    sectionIcon: {
        color: '#FF6B35',
        fontSize: '0.95rem'
    },
    sectionHint: {
        margin: '0 0 15px 0',
        color: '#64748B',
        fontSize: '0.85rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '18px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '8px',
        color: '#334155',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    required: {
        color: '#DC2626'
    },
    input: {
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.95rem',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        width: '100%',
        boxSizing: 'border-box'
    },
    select: {
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.95rem',
        fontFamily: 'inherit',
        background: '#fff',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box'
    },
    textarea: {
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.95rem',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: '80px',
        width: '100%',
        boxSizing: 'border-box'
    },
    hint: {
        marginTop: '6px',
        color: '#64748B',
        fontSize: '0.8rem'
    },
    // Checkbox Styles
    checkboxRow: {
        display: 'flex',
        gap: '25px',
        flexWrap: 'wrap',
        marginTop: '15px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        color: '#334155',
        fontWeight: '500'
    },
    checkbox: {
        display: 'none'
    },
    checkboxCustom: {
        width: '20px',
        height: '20px',
        borderRadius: '5px',
        border: '2px solid #CBD5E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0
    },
    // Image Preview Styles
    previewContainer: {
        marginTop: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
    },
    logoPreview: {
        width: '80px',
        height: '80px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        overflow: 'hidden',
        background: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    logoImg: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        padding: '8px',
        boxSizing: 'border-box'
    },
    bannerPreview: {
        width: '100%',
        maxWidth: '200px',
        height: '70px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        overflow: 'hidden',
        background: '#F8FAFC'
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    clearBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 12px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'inherit',
        flexShrink: 0
    },
    quickLinks: {
        marginTop: '15px',
        padding: '12px 15px',
        background: '#F8FAFC',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
    },
    quickLink: {
        color: '#0284C7',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '500',
        padding: '4px 10px',
        background: '#E0F2FE',
        borderRadius: '5px'
    },
    // Settings Grid
    settingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
    },
    settingCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: '#F8FAFC',
        borderRadius: '12px',
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all 0.2s'
    },
    settingCardActive: {
        background: '#FFF7ED',
        borderColor: '#FF6B35'
    },
    settingIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        flexShrink: 0
    },
    // Action Buttons
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '25px',
        paddingTop: '20px',
        borderTop: '1px solid #E2E8F0'
    },
    resetBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: '#F1F5F9',
        color: '#64748B',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        fontFamily: 'inherit',
        transition: 'background 0.2s'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 28px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8B5C 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600',
        fontFamily: 'inherit',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.35)',
        transition: 'all 0.2s'
    }
};

export default UniForm;
