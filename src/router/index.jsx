import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import Homepage from '../pages/Homepage'
import DetailThreadPage from '../pages/DetailThreadPage'
import AddThreadPage from '../pages/addThreadPage'
import LaderBoard from '../pages/LaderboardPage'
import AuthLayout from '../layouts/auth-layout'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

export default function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/thread/:id" element={<DetailThreadPage />} />
                <Route path="/add" element={
                    <ProtectedRoute>
                        <AddThreadPage />
                    </ProtectedRoute>
                } />
                <Route path="/laderboard" element={<LaderBoard />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}
