// src/pages/Home.js

import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect authenticated users to the dashboard
    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-red-500 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-5xl font-bold text-red-600 mb-8">Welcome to Call Management System</h1>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg border border-red-600 shadow hover:bg-red-50 transition-colors duration-300"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
