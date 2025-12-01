import React, { useState, useEffect } from 'react';
import { addProgram, updateProgram, uploadImage } from '../../services/api';

const ProgramForm = ({ program, onSuccess, onCancel }) => {
    const isEditMode = Boolean(program);
    
    const [form, setForm] = useState({
        name: '',
        category: 'Management',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Populate form when editing
    useEffect(() => {
        if (program) {
            setForm({
                name: program.name || '',
                category: program.category || 'Management',
                image: program.image || ''
            });
        }
    }, [program]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        
        try {
            const data = new FormData();
            data.append('file', file);
            const res = await uploadImage(data);
            setForm({ ...form, image: res.data.url });
        } catch (err) {
            setError('Failed to upload image');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        // Validation
        if (!form.name.trim()) {
            setError('Program name is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await updateProgram(program._id, form);
            } else {
                await addProgram(form);
            }
            
            // Reset form only if adding new
            if (!isEditMode) {
                setForm({ name: '', category: 'Management', image: '' });
            }
            
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} program`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (isEditMode && onCancel) {
            onCancel();
        } else {
            setForm({ name: '', category: 'Management', image: '' });
            setError('');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>
                    {isEditMode ? '✏️ Edit Program' : '➕ Add Program'}
                </h3>
                {isEditMode && (
                    <span style={styles.editBadge}>Editing: {program.name}</span>
                )}
            </div>

            {error && (
                <div style={styles.error}>
                    ⚠️ {error}
                </div>
            )}

            <div style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Program Name *</label>
                    <input
                        placeholder="Enter program name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Category</label>
                    <select
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        style={styles.select}
                    >
                        <option value="Management">Management</option>
                        <option value="IT">IT</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Healthcare">Healthcare</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Program Image</label>
                    <input
                        type="file"
                        onChange={handleFile}
                        accept="image/*"
                        style={styles.fileInput}
                        disabled={uploading}
                    />
                    {uploading && <span style={styles.uploadingText}>📤 Uploading...</span>}
                </div>

                {/* Image Preview */}
                {form.image && (
                    <div style={styles.imagePreview}>
                        <img
                            src={form.image}
                            alt="Preview"
                            style={styles.previewImg}
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <button
                            onClick={() => setForm({ ...form, image: '' })}
                            style={styles.removeImgBtn}
                            type="button"
                        >
                            ✕ Remove
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                <div style={styles.actions}>
                    <button
                        onClick={handleReset}
                        style={styles.cancelBtn}
                        type="button"
                        disabled={loading}
                    >
                        {isEditMode ? 'Cancel' : 'Reset'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{
                            ...styles.submitBtn,
                            opacity: loading || uploading ? 0.7 : 1
                        }}
                        disabled={loading || uploading}
                    >
                        {loading
                            ? (isEditMode ? '🔄 Updating...' : '🔄 Saving...')
                            : (isEditMode ? '💾 Update Program' : '➕ Save Program')
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    header: {
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        color: '#1E293B'
    },
    editBadge: {
        display: 'inline-block',
        marginTop: '8px',
        padding: '4px 12px',
        background: '#FFF7ED',
        color: '#EA580C',
        borderRadius: '20px',
        fontSize: '0.85rem'
    },
    error: {
        background: '#FEF2F2',
        color: '#DC2626',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '16px',
        fontSize: '0.9rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#374151'
    },
    input: {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '2px solid #E5E7EB',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    select: {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '2px solid #E5E7EB',
        fontSize: '0.95rem',
        outline: 'none',
        background: 'white',
        cursor: 'pointer'
    },
    fileInput: {
        padding: '10px',
        border: '2px dashed #E5E7EB',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    uploadingText: {
        color: '#6B7280',
        fontSize: '0.85rem'
    },
    imagePreview: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        background: '#F9FAFB',
        borderRadius: '8px'
    },
    previewImg: {
        width: '80px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '6px'
    },
    removeImgBtn: {
        padding: '6px 12px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '8px'
    },
    cancelBtn: {
        padding: '12px 20px',
        background: '#F3F4F6',
        color: '#4B5563',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    submitBtn: {
        padding: '12px 24px',
        background: '#FF6B35',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    }
};

export default ProgramForm;
