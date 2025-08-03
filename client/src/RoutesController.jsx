import React from 'react';
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";

const RoutesController = () => {
    return (
        <div>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                    <Route path='/gallery' element={<Gallery/>}></Route>
                    <Route path='/contact' element={<Contact/>}></Route>
                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default RoutesController;