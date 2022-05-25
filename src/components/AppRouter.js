import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import Room from './Room';
import SignUpPage from './SignUpPage';

const AppRouter = () => (

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route path="/" element={<LandingPage/>} />
                <Route path='/room/:activeId' element={<Room />} />
            </Route>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </BrowserRouter>

);

export default AppRouter;