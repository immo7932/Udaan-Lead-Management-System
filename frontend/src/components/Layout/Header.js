import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md border-b border-red-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <Link 
                        to="/dashboard" 
                        className="text-red-800 font-bold text-3xl hover:text-red-600 transition-colors duration-200"
                    >
                        MyApp
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="text-red-600 hover:text-red-800 px-4 py-2 rounded-md text-xl font-medium transition-colors duration-200 hover:bg-red-50"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/restaurants" 
                                className="text-red-600 hover:text-red-800 px-4 py-2 rounded-md text-xl font-medium transition-colors duration-200 hover:bg-red-50"
                            >
                                Restaurants
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="text-red-600 hover:text-red-800 px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-red-50"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;