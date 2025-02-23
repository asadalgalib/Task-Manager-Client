import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Plus } from "lucide-react";
import { Label } from '@radix-ui/react-label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, control,reset, formState: { errors } } = useForm();
    const axioSecure = useAxiosSecure();
    const [open, setOpen] = useState(false);

    // logout user
    const handleLogout = () => {
        navigate('/');
        logOutUser();
    }

    // add task
    const onSubmit = (userData) => {
        const title = userData.title;
        const description = userData.description;
        const status = userData.status;
        const time = new Date();
        const email = user.email;
        console.log({ title, description, status, time,email });

        axioSecure.post('/task', { title, description, status, time,email })
            .then(res => {
                if (res.data.insertedId) {
                    setOpen(false)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    setTimeout(() => {
                        navigate('/tasks');
                    }, 1500);
                }
            })
            .catch(err => {
                console.log(err.code);
            })
    }


    return (
        <div className="px-4 lg:px-8 bg-primary flex items-center justify-between h-16 sticky top-0">
            <div className="flex items-center justify-center gap-3">
                <div>
                    <SidebarTrigger />
                </div>
                <div>
                    <h1 className="lg:text-xl text-lg font-medium text-white">My Tasks</h1>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                {/* add task to database */}
                <div >
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <div className="flex items-center gap-1 px-4 py-[5px] rounded-md bg-[--sidebar-header-background]">
                                <Plus className="text-red-500"></Plus>
                                <span className="text-white text-base">Add Task</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="rounded bg-primary">
                            <DialogHeader>
                                <DialogTitle className="text-center text-xl font-semibold text-white">Add Your Task</DialogTitle>
                                <DialogDescription className="text-center mb-2">Create your plan and make it happen.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name" className='text-white'>Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Title of your Task"
                                            className='bg-background'
                                            {...register('title', {
                                                required: 'Title is required',
                                                maxLength: 50
                                            })} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="name" className='text-white'>Description</Label>
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
                                                <SelectValue placeholder="Select a Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup
                                                    {...register('status', {
                                                        required: 'Status is required',
                                                    })}>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="To Do">To Do</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Done">Done</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <input type="hidden" {...control.register("status", { required: "Status is required" })} />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-5">
                                    <Button variant='outline' className='font-semibold'>Add</Button>
                                </div>
                                <div className='mb-1 mt-4'>
                                    {errors.title && <span className='flex text-red-500'>Please enter a Title with less than 50 characters</span>}
                                    {errors.status && <span className='flex text-red-500'>Please select a Status</span>}
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {/* dropdown menu for user to logout */}
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                {
                                    user == null ?
                                        <AvatarFallback>AG</AvatarFallback> : <AvatarImage src={user?.photoURL} className="rounded-full" />
                                }
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-10 mt-2'>
                            <DropdownMenuLabel>
                                {
                                    user && <p>{user?.displayName}</p>
                                }
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div>
                                    <Button onClick={handleLogout} variant="secondary" className='hover:bg-primary hover:text-white'>
                                        <LogOut className="text-red-500"></LogOut>
                                        <span className="font-medium">Logout</span>
                                    </Button>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
