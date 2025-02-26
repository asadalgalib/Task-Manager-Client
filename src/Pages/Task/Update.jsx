import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel
} from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { CalendarIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const Update = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [selected, setSelected] = useState(null);
    const [time, setTime] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        axiosSecure.get(`/task/${id}`)
            .then(res => {
                setSelected(res.data);
                setTime(res.data.time);
                reset({
                    title: res.data.title,
                    description: res.data.description,
                    status: res.data.status,
                });
            })
            .catch(err => {
                console.log(err.code);
            })
    }, [id]);

    const onSubmit = (data) => {
        const title = data.title;
        const description = data.description;
        const status = data.status;
        console.log({ title, description, status, time });

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.put(`/task/${id}`, { title, description, status, time })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your update has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/tasks');
                        }
                    })
            }
        })
    };

    return (
        <div className='max-w-lg mx-auto my-8'>
            <Card>
                <CardContent className="rounded bg-primary">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-semibold text-white">Update Your Task</CardTitle>
                        <CardDescription className="text-center mb-2">Update your plan and make it happen.</CardDescription>
                    </CardHeader>
                    <div className='mb-4'>
                        <Label htmlFor="deadline" className='text-white'>Deadline</Label>
                        <div className="mt-1">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !time && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {time ? format(time, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={time}
                                        onSelect={setTime}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title" className='text-white'>Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Title of your Task"
                                    className='bg-background'
                                    {...register('title', {

                                    })} />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="description" className='text-white'>Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description of your Task"
                                    className='bg-background'
                                    {...register('description', {
                                        maxLength: 2000
                                    })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status" className='text-white'>Status</Label>
                                <Select className='bg-background'
                                    onValueChange={(value) => setValue("status", value, {
                                        shouldValidate: true
                                    })}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder={selected?.status || "Select Status"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="To Do">To Do</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Done">Done</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" {...register("status")} />
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button type="submit" variant='outline' className='font-semibold'>Update</Button>
                        </div>
                        <div className='mb-1 mt-4'>
                            {errors.title && <span className='flex text-red-500'>Please enter a Title with less than 50 characters</span>}
                            {errors.status && <span className='flex text-red-500'>Please select a Status</span>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Update;