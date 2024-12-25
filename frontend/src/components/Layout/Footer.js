import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-red-100 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <p className="text-red-600 text-sm">
                        &copy; {new Date().getFullYear()} Udaan Lead Management
                    </p>
                </div>
                
                <div className="mt-4 flex justify-center space-x-6">
                    <a 
                        href="#" 
                        className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                    >
                        Terms
                    </a>
                    <a 
                        href="#" 
                        className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                    >
                        Privacy
                    </a>
                    <a 
                        href="#" 
                        className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;