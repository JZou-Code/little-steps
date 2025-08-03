import React from 'react';
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import PageStateProvider from "./context/PageStateProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const RoutesController = () => {
    return (
        <div>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                    <Route path='/gallery' element={<Gallery/>}></Route>
                    <Route path='/contact' element={<Contact/>}></Route>
                    <Route path='/account' element={
                            <Outlet/>
                    }>
                        <Route path='login' element={<LoginPage/>}></Route>
                        <Route path='sign-up' element={<LoginPage/>}></Route>
                    </Route>
                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default RoutesController;