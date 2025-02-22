import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from '@/Pages/Shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

    return (
        <div>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar variant="default"></AppSidebar>
                <div className='w-screen'>
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default MainLayout;