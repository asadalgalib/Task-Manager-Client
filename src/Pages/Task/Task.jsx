import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Task = () => {
    return (
        <div className='md:px-8 px-4 py-4 mb-5 grid items-start justify-center grid-cols-1 lg:grid-cols-3 gap-5'>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>To Do</h1>
                </div>
                <Card className='rounded'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>Doing</h1>
                </div>
                <Card className='rounded'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>Done</h1>
                </div>
                <Card className='rounded'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Task;