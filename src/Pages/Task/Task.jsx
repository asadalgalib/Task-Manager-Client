import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
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
import {
    Edit,
    Ellipsis,
    Trash
} from 'lucide-react';
import useTask from '@/hooks/useTask';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    arrayMove,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Task = () => {
    const [allTask, isLoading] = useTask();
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        setData(allTask);
    }, [allTask])

    const columns = {
        "To Do": data?.filter(task => task.status === "To Do"),
        "In Progress": data?.filter(task => task.status === "In Progress"),
        "Done": data?.filter(task => task.status === "Done")
    }
    const toDo = data?.filter(task => task.status === "To Do");
    const inProgress = data?.filter(task => task.status === "In Progress");
    const done = data?.filter(task => task.status === "Done");
    console.log(toDo,inProgress,done);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );

    const SortableItem = (props) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({ id: props._id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {props.children}
            </div>
        );
    };

    const handleDragEnd = e => {
        const { active, over } = e;

        if (!over) return;

        const activeTask = data.find(item => item._id === active.id);
        const overTask = data.find(item => item._id === over.id);

        if (activeTask.status !== overTask.status) {
            const overColumn = Object.keys(columns).find(column =>
                columns[column].some(item => item._id === over.id)
            );
            activeTask.status = overColumn;

            setData((items) => {
                const oldIndex = items.findIndex(item => item._id === active.id);
                const newIndex = items.findIndex(item => item._id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        } else {
            setData((items) => {
                const oldIndex = items.findIndex(item => item._id === active.id);
                const newIndex = items.findIndex(item => item._id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    if (isLoading || !data) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner text-primary"></span></div>
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <div className='md:px-8 px-4 py-4 mb-5 grid items-start justify-center grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    data && Object.keys(columns)?.map(column =>
                        <SortableContext
                            key={column}
                            items={columns[column]?.map(task => task._id)}
                            strategy={verticalListSortingStrategy}>
                            <div className="rounded bg-primary p-3 pb-10">
                                <div>
                                    <h1 className='text-center text-xl font-semibold text-white my-2'>{column}</h1>
                                </div>
                                <div className='grid grid-cols-1 items-start gap-4'>
                                    {
                                        columns[column]?.map(task =>
                                            <SortableItem key={task._id} _id={task._id}>
                                                <Card className='rounded'>
                                                    <CardHeader>
                                                        <CardTitle>
                                                            <div className='flex items-center justify-between'>
                                                                <span>{task.title}</span>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger>
                                                                        <Ellipsis />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className='mr-14 mt-2'>
                                                                        <DropdownMenuLabel><span className='text-center'>Actions</span></DropdownMenuLabel>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem>
                                                                            <div className='flex items-start justify-start gap-2'>
                                                                                <Edit className='w-4 h-4' />
                                                                                <span>Edit</span>
                                                                            </div>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <div className='flex items-start justify-start gap-2'>
                                                                                <Trash className='w-4 h-4' />
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
                                                </Card>
                                            </SortableItem>)
                                    }
                                </div>
                            </div>
                        </SortableContext>
                    )
                }
            </div>
        </DndContext>
    );
};

export default Task;
