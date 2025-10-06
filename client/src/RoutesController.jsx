import React from 'react';
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import NewsletterPage from "./pages/NewsletterPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminRoute from "./utils/AdminRoute.jsx";
import AddChildPage from "./pages/AddChildPage.jsx";
import ChildMessage from "./pages/ChildMessage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import CreateNewsletterPage from "./pages/CreateNewsletterPage.jsx";

/**
 * Routes controller component that defines all application routes
 * Handles public routes, private routes, and admin-only routes
 * Uses nested routing for account and newsletter sections
 * Wraps all routes with error boundary for error handling
 * 
 * @returns {JSX.Element} The routes configuration component
 */
const RoutesController = () => {
    return (
        <div>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/gallery' element={<Gallery/>}></Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path='/newsletter' element={<Outlet/>}>
                            <Route path='' element={<NewsletterPage/>}></Route>
                            <Route path='create-new' element={<CreateNewsletterPage/>}></Route>
                        </Route>
                        <Route path='/child-message' element={<Outlet/>}>
                            <Route path='' element={<ChildMessage/>}></Route>
                            <Route path='message' element={<MessagePage/>}></Route>
                        </Route>
                    </Route>
                    <Route path='/contact' element={<Contact/>}></Route>
                    <Route path='/account' element={<Outlet/>}>
                        <Route element={<PrivateRoute/>}>
                            <Route path='' element={<AccountPage/>}></Route>
                            <Route path='add-child' element={<AddChildPage/>}></Route>
                        </Route>
                        <Route path='login' element={<LoginPage/>}></Route>
                        <Route path='sign-up' element={<SignUpPage/>}></Route>
                    </Route>
                    <Route element={<AdminRoute/>}>
                        <Route path='/admin-dashboard' element={<AdminDashboardPage/>}></Route>
                    </Route>
                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default RoutesController;
