import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { ChevronDown, Delete, DeleteIcon, Edit, Ellipsis, Trash } from 'lucide-react';

const Task = () => {
    const data = [
        {
            "id": 1,
            "title": "My Love",
            "time": "12 Jan 2025 10:32 AM",
            "description": "",
            "category": "To Do"
        },
        {
            "id": 2,
            "title": "My Pant",
            "time": "17 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
        {
            "id": 3,
            "title": "My Lungi",
            "time": "10 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
        {
            "id": 4,
            "title": "My Pajama",
            "time": "3 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
        {
            "id": 5,
            "title": "My ice-cream",
            "time": "8 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
        {
            "id": 6,
            "title": "My tea",
            "time": "29 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
        {
            "id": 7,
            "title": "My Life",
            "time": "21 Jan 2025 10:32 AM",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum repudiandae dolores ut commodi ab magnam? Nesciunt facilis quis ducimus ex!",
            "category": "To Do"
        },
    ]

    return (
        <div className='md:px-8 px-4 py-4 mb-5 grid items-start justify-center grid-cols-1 lg:grid-cols-3 gap-5'>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>To Do</h1>
                </div>
                <div className='grid grid-cols-1 items-start gap-4'>
                    {
                        data?.map(task => <Card className='rounded' key={task.id}>
                            <CardHeader>
                                <CardTitle>
                                    <div className='flex items-center justify-between'>
                                        <span>{task.title}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Ellipsis></Ellipsis>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='mr-14 mt-2'>
                                                <DropdownMenuLabel><span className='text-center'>Actions</span></DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Edit className='w-4 h-4'></Edit>
                                                        <span>Edit</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Trash className='w-4 h-4'></Trash>
                                                        <span>Delete</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardTitle>
                                <CardDescription>{task.time}</CardDescription>
                            </CardHeader>
                            {
                                task.description && <CardContent>
                                    <ReactReadMoreReadLess
                                        readMoreStyle={{ color: '#94a3b8' }}
                                        readLessStyle={{ color: '#94a3b8' }}
                                        charLimit={60}
                                        readMoreText={"Read More..."}
                                        readLessText={"Read Less.."}
                                    >
                                        {task.description}
                                    </ReactReadMoreReadLess>
                                </CardContent>
                            }
                        </Card>)
                    }
                </div>
            </div>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>Doing</h1>
                </div>
                <div className='grid grid-cols-1 items-start gap-4'>
                    {
                        data?.map(task => <Card className='rounded' key={task.id}>
                            <CardHeader>
                            <CardTitle>
                                    <div className='flex items-center justify-between'>
                                        <span>{task.title}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Ellipsis></Ellipsis>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='mr-14 mt-2'>
                                                <DropdownMenuLabel><span className='text-center'>Actions</span></DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Edit className='w-4 h-4'></Edit>
                                                        <span>Edit</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Trash className='w-4 h-4'></Trash>
                                                        <span>Delete</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardTitle>
                                <CardDescription>{task.time}</CardDescription>
                            </CardHeader>
                            {
                                task.description && <CardContent>
                                    <ReactReadMoreReadLess
                                        readMoreStyle={{ color: '#94a3b8' }}
                                        readLessStyle={{ color: '#94a3b8' }}
                                        charLimit={60}
                                        readMoreText={"Read More..."}
                                        readLessText={"Read Less.."}
                                    >
                                        {task.description}
                                    </ReactReadMoreReadLess>
                                </CardContent>
                            }
                        </Card>)
                    }
                </div>
            </div>
            <div className="rounded bg-primary p-3 pb-10">
                <div>
                    <h1 className='text-center text-xl font-semibold text-white my-2'>Done</h1>
                </div>
                <div className='grid grid-cols-1 items-start gap-4'>
                    {
                        data?.map(task => <Card className='rounded' key={task.id}>
                            <CardHeader>
                            <CardTitle>
                                    <div className='flex items-center justify-between'>
                                        <span>{task.title}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Ellipsis></Ellipsis>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='mr-14 mt-2'>
                                                <DropdownMenuLabel><span className='text-center'>Actions</span></DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Edit className='w-4 h-4'></Edit>
                                                        <span>Edit</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div className='flex items-start justify-start gap-2'>
                                                        <Trash className='w-4 h-4'></Trash>
                                                        <span>Delete</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardTitle>
                                <CardDescription>{task.time}</CardDescription>
                            </CardHeader>
                            {
                                task.description && <CardContent>
                                    <ReactReadMoreReadLess
                                        readMoreStyle={{ color: '#94a3b8' }}
                                        readLessStyle={{ color: '#94a3b8' }}
                                        charLimit={60}
                                        readMoreText={"Read More..."}
                                        readLessText={"Read Less.."}
                                    >
                                        {task.description}
                                    </ReactReadMoreReadLess>
                                </CardContent>
                            }
                        </Card>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Task;