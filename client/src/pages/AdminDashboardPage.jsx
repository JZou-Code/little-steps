import React from 'react';
import classes from '../style/AdminDashboardPage.module.css'

const AdminDashboardPage = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.ListContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                </table>
            </div>
            AdminDashboard Page
        </div>
    );
};

export default AdminDashboardPage;
