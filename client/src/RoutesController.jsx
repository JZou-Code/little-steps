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

const RoutesController = () => {
    return (
        <div>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/gallery' element={<Gallery/>}></Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path='/newsletter' element={<NewsletterPage/>}></Route>
                    </Route>
                    <Route path='/contact' element={<Contact/>}></Route>
                    <Route path='/account' element={<Outlet/>}>
                        <Route element={<PrivateRoute/>}>
                            <Route path='' element={<AccountPage/>}></Route>
                        </Route>
                        <Route path='login' element={<LoginPage/>}></Route>
                        <Route path='sign-up' element={<SignUpPage/>}></Route>
                    </Route>

                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default RoutesController;
