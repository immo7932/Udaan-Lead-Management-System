import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { AuthContext } from '../context/AuthContext';
import { Phone, Mail, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState({
        interactions: [],
        grouped: {
            calls: [],
            emails: [],
            orders: []
        },
        summary: {
            totalInteractions: 0,
            callsCount: 0,
            emailsCount: 0,
            ordersCount: 0,
            completedCount: 0,
            pendingCount: 0
        }
    });
    const [performanceMetrics, setPerformanceMetrics] = useState({
        wellPerforming: [],
        underPerforming: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const resCalls = await axios.get('http://localhost:5000/api/calls/today');
                setDashboardData(resCalls.data);
                const resPerformance = await axios.get('http://localhost:5000/api/performance');
                setPerformanceMetrics(resPerformance.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load dashboard data.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getStatusBadge = (status) => {
        return status === 'Completed' ? 
            <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">Completed</span> :
            <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">Pending</span>;
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Call':
                return <Phone className="w-4 h-4 text-blue-500" />;
            case 'Email':
                return <Mail className="w-4 h-4 text-red-500" />;
            case 'Order':
                return <ShoppingCart className="w-4 h-4 text-green-500" />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50">
                <div className="text-xl font-semibold text-red-600 animate-pulse">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50">
                <div className="text-xl font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
            <h2 className="text-3xl font-bold text-red-800 mb-8 border-b-2 border-red-200 pb-2">
                Dashboard
            </h2>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow border border-red-100">
                    <div className="text-lg font-semibold text-red-700">Today's Summary</div>
                    <div className="mt-2 space-y-1">
                        <div className="flex justify-between">
                            <span>Total Tasks:</span>
                            <span className="font-medium">{dashboardData.summary.totalInteractions}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Completed:</span>
                            <span className="font-medium text-green-600">{dashboardData.summary.completedCount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pending:</span>
                            <span className="font-medium text-yellow-600">{dashboardData.summary.pendingCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-red-700 mb-4">
                    Today's Tasks
                </h3>
                {dashboardData.interactions.length === 0 ? (
                    <p className="text-red-500">No tasks scheduled for today.</p>
                ) : (
                    <ul className="bg-white shadow-lg rounded-lg p-4 space-y-2 border border-red-100">
                        {dashboardData.interactions.map(interaction => (
                            <li
                                key={interaction._id}
                                className="flex justify-between items-center border-b border-red-100 last:border-b-0 pb-2 pt-2 hover:bg-red-50 transition-colors duration-200 px-4 rounded"
                            >
                                <div className="flex items-center space-x-4">
                                    {getTypeIcon(interaction.type)}
                                    <span className="font-medium text-red-700">{interaction.restaurantName}</span>
                                    {getStatusBadge(interaction.status)}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-red-500">
                                        {interaction.contactName} | {interaction.time}
                                    </span>
                                    {interaction.details && (
                                        <span className="text-gray-500 text-sm">
                                            ({interaction.details})
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-red-700 mb-4">
                    Performance Metrics
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-red-100 hover:shadow-xl transition-shadow duration-300">
                        <h4 className="text-xl font-medium text-red-600 mb-4 border-b border-red-100 pb-2">
                            Well-Performing Accounts
                        </h4>
                        {performanceMetrics.wellPerforming.length === 0 ? (
                            <p className="text-red-400">No well-performing accounts.</p>
                        ) : (
                            <ul className="space-y-3">
                                {performanceMetrics.wellPerforming.map(account => (
                                    <li
                                        key={account._id}
                                        className="flex justify-between items-center border-b border-red-50 last:border-b-0 pb-3 pt-2 hover:bg-red-50 transition-colors duration-200 px-4 rounded"
                                    >
                                        <span className="font-medium text-red-700">{account.name}</span>
                                        <span className="text-red-500">Interactions: {account.interactions}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 border border-red-100 hover:shadow-xl transition-shadow duration-300">
                        <h4 className="text-xl font-medium text-red-600 mb-4 border-b border-red-100 pb-2">
                            Underperforming Accounts
                        </h4>
                        {performanceMetrics.underPerforming.length === 0 ? (
                            <p className="text-red-400">No underperforming accounts.</p>
                        ) : (
                            <ul className="space-y-3">
                                {performanceMetrics.underPerforming.map(account => (
                                    <li
                                        key={account._id}
                                        className="flex justify-between items-center border-b border-red-50 last:border-b-0 pb-3 pt-2 hover:bg-red-50 transition-colors duration-200 px-4 rounded"
                                    >
                                        <span className="font-medium text-red-700">{account.name}</span>
                                        <span className="text-red-500">Interactions: {account.interactions}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;