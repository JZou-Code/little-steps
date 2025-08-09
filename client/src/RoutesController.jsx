import React from 'react';
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/./AboutPage.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import PageStateProvider from "./context/PageStateProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

const RoutesController = () => {
    return (
        <div>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/about' element={<AboutPage/>}></Route>
                    <Route path='/gallery' element={<Gallery/>}></Route>
                    <Route path='/contact' element={<Contact/>}></Route>
                    <Route path='/account' element={
                            <Outlet/>
                    }>
                        <Route path='login' element={<LoginPage/>}></Route>
                        <Route path='sign-up' element={<SignUpPage/>}></Route>
                    </Route>
                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default RoutesController;
