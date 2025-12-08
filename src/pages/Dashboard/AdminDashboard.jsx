import React from 'react';
import { NavLink } from 'react-router';

const AdminDashboard = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='w-full p-2 md:w-1/6 bg-base-200'>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Admin Dashboard</NavLink>
                <NavLink to="/dashboard/add-lesson">Add Lessons</NavLink>
                <NavLink to="/dashboard/admin/manage-lessons">Manage Lessons</NavLink>
                <NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink>
            </div>
            </div>
            <div className='w-full p-2 md:w-5/6 bg-base-100'>
                <h2 className='text-3xl font-bold mb-4'>Welcome to your Dashboard</h2>
                <p>Here you can manage your lessons, view statistics, and update your profile.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;