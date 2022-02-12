import React from 'react';
//import LandingPage from './LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
//import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route path="/" element={<LandingPage/>} />
            </Route>
            <Route path='/login' element={<LoginPage/>} />
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </BrowserRouter>

);

export default AppRouter;