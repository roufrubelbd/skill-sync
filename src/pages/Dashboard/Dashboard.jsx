import React from 'react';
import AdminDashboard from './AdminDashboard';
import { User } from 'lucide-react';
import UserDashBoard from './UserDashBoard';


const Dashboard = () => {
    const adminUser = 'admin'
    const user = 'user'
    return (
        <>
            {adminUser === 'admin' && (
                <AdminDashboard />
            )}
            {user === 'user' && (
                <UserDashBoard />
            )}
        </>
    );
};

export default Dashboard;