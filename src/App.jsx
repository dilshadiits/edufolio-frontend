import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import UniversityForm from './pages/Admin/UniversityForm'; // Unified component
import ProgramForm from './pages/Admin/ProgramForm';       // Unified component

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }
    
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* ===================== */}
                {/* Public Routes */}
                {/* ===================== */}
                <Route path="/" element={<Home />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:slug" element={<UniversityDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* ===================== */}
                {/* Admin Routes */}
                {/* ===================== */}
                
                {/* Auth Routes */}
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<Login />} />

                {/* Dashboard */}
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />

                {/* University Routes - Single component handles both Add & Edit */}
                <Route 
                    path="/admin/universities/add" 
                    element={
                        <ProtectedRoute>
                            <UniversityForm />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/universities/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <UniversityForm />
                        </ProtectedRoute>
                    } 
                />

                {/* Program Routes - Single component handles both Add & Edit */}
                <Route 
                    path="/admin/programs/add" 
                    element={
                        <ProtectedRoute>
                            <ProgramForm />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/programs/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <ProgramForm />
                        </ProtectedRoute>
                    } 
                />

                {/* 404 - Catch all */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

// Simple 404 Component
const NotFound = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
        <h1 style={{ fontSize: '6rem', color: '#FF6B35', margin: 0 }}>404</h1>
        <h2 style={{ color: '#0F172A', marginBottom: '10px' }}>Page Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '30px' }}>
            The page you're looking for doesn't exist.
        </p>
        <a 
            href="/" 
            style={{
                padding: '12px 24px',
                background: '#FF6B35',
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600'
            }}
        >
            Go Home
        </a>
    </div>
);

export default App;
