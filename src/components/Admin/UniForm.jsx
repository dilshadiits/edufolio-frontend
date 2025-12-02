import React, { useState } from 'react';
import axios from 'axios';
import API_BASE from '../../api';

const UniForm = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [form, setForm] = useState({
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
        ugcApproved: true,
        featured: false,
        isActive: true
    });

    const universityTypes = ['Private', 'Government', 'Deemed', 'State', 'Central', 'Autonomous'];
    const naacGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'];

    // Handle Input Changes
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

        // Reset image error when URL changes
        if (name === 'logo' || name === 'bannerImage') {
            setImageError(false);
        }
    };

    // Handle Image Load Error
    const handleImageError = () => {
        setImageError(true);
    };

    // Handle Image Load Success
    const handleImageLoad = () => {
        setImageError(false);
    };

    // Submit the Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.name.trim()) {
            alert('University name is required');
            return;
        }
        if (!form.slug.trim()) {
            alert('Slug is required');
            return;
        }
        if (!form.city.trim()) {
            alert('City is required');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const universityData = {
                ...form,
                name: form.name.trim(),
                slug: form.slug.trim(),
                logo: form.logo.trim(),
                bannerImage: form.bannerImage.trim(),
                minFee: form.minFee ? Number(form.minFee) : 0,
                maxFee: form.maxFee ? Number(form.maxFee) : 0,
                location: `${form.city}, ${form.state}`.trim()
            };

            await axios.post(`${API_BASE}/admin/universities`, universityData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Reset form
            setForm({
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
                ugcApproved: true,
                featured: false,
                isActive: true
            });

            if (onSuccess) onSuccess();
            alert("University Added Successfully!");
        } catch (err) {
            console.error(err);
            if (err.response?.status === 409) {
                alert("A university with this slug already exists");
            } else {
                alert(err.response?.data?.message || "Failed to save University.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Clear form
    const handleReset = () => {
        if (window.confirm('Clear all fields?')) {
            setForm({
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
                ugcApproved: true,
                featured: false,
                isActive: true
            });
            setImageError(false);
        }
    };

    return (
        <div style={styles.container}>
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
                </div>

                {/* Description Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-file-lines" style={styles.sectionIcon}></i>
                        Description
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
                    </div>
                </div>

                {/* Media Section - URL Based */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-image" style={styles.sectionIcon}></i>
                        Media (Image URLs)
                    </h4>
                    <p style={styles.sectionHint}>
                        Use image hosting services like Imgur, Cloudinary, or Unsplash for image URLs
                    </p>

                    <div style={styles.grid}>
                        {/* Logo URL */}
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

                            {/* Logo Preview */}
                            {form.logo && (
                                <div style={styles.previewContainer}>
                                    <div style={styles.logoPreview}>
                                        <img
                                            src={form.logo}
                                            alt="Logo Preview"
                                            style={styles.logoImg}
                                            onError={handleImageError}
                                            onLoad={handleImageLoad}
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

                        {/* Banner URL */}
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

                            {/* Banner Preview */}
                            {form.bannerImage && (
                                <div style={styles.previewContainer}>
                                    <div style={styles.bannerPreview}>
                                        <img
                                            src={form.bannerImage}
                                            alt="Banner Preview"
                                            style={styles.bannerImg}
                                            onError={handleImageError}
                                            onLoad={handleImageLoad}
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

                    {/* Quick Links */}
                    <div style={styles.quickLinks}>
                        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                            <i className="fa-solid fa-lightbulb" style={{ marginRight: '6px' }}></i>
                            Quick image sources:
                        </span>
                        <a href="https://imgur.com/upload" target="_blank" rel="noreferrer" style={styles.quickLink}>Imgur</a>
                        <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={styles.quickLink}>Unsplash</a>
                        <a href="https://cloudinary.com" target="_blank" rel="noreferrer" style={styles.quickLink}>Cloudinary</a>
                    </div>
                </div>

                {/* Settings Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>
                        <i className="fa-solid fa-cog" style={styles.sectionIcon}></i>
                        Settings
                    </h4>
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
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                                style={styles.checkbox}
                            />
                            <span style={{
                                ...styles.checkboxCustom,
                                background: form.featured ? '#FF6B35' : '#fff',
                                borderColor: form.featured ? '#FF6B35' : '#CBD5E1'
                            }}>
                                {form.featured && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.7rem' }}></i>}
                            </span>
                            Featured
                        </label>

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                                style={styles.checkbox}
                            />
                            <span style={{
                                ...styles.checkboxCustom,
                                background: form.isActive ? '#16A34A' : '#fff',
                                borderColor: form.isActive ? '#16A34A' : '#CBD5E1'
                            }}>
                                {form.isActive && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.7rem' }}></i>}
                            </span>
                            Active
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actions}>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={styles.resetBtn}
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
                                <i className="fa-solid fa-spinner fa-spin"></i> Saving...
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
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
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
        transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    select: {
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.95rem',
        fontFamily: 'inherit',
        background: '#fff',
        cursor: 'pointer'
    },
    textarea: {
        padding: '12px 14px',
        borderRadius: '10px',
        border: '2px solid #E2E8F0',
        outline: 'none',
        fontSize: '0.95rem',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: '80px'
    },
    hint: {
        marginTop: '6px',
        color: '#64748B',
        fontSize: '0.8rem'
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
        justifyContent: 'center'
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
        fontFamily: 'inherit'
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
    // Checkbox Styles
    checkboxRow: {
        display: 'flex',
        gap: '25px',
        flexWrap: 'wrap'
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
        transition: 'all 0.2s'
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
