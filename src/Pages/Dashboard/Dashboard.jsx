import React from 'react';

const Dashboard = () => {
    return (
        <div className='md:px-8 px-4 py-4 mb-5'>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-primary" />
            </div>
        </div>
    );
};

export default Dashboard;