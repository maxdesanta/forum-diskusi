import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="p-5 flex justify-center">
                <div className='w-[90%] flex justify-between flex-col gap-8'>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}
