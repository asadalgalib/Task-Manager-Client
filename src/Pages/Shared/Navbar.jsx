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
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { user,logOutUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () =>{
        navigate('/');
        logOutUser();
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
                <div >
                    <Dialog className="">
                        <DialogTrigger>
                            <div className="flex  items-center gap-1 px-4 py-[5px] rounded-md bg-[--sidebar-header-background]">
                                <Plus className="text-red-500"></Plus>
                                <span className="text-white text-base">Add</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="rounded bg-primary">
                            <DialogHeader>
                                <DialogTitle className="text-center text-xl font-semibold text-white">Add Your Task</DialogTitle>
                                <DialogDescription className="text-center mb-2">Create your plan and make it happen.</DialogDescription>
                            </DialogHeader>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name" className='text-white'>Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Title of your Task"
                                            className='bg-background' />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="name" className='text-white'>Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Description of your Task"
                                            className='bg-background' />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="status" className='text-white'>Status</Label>
                                        <Select className='bg-background'>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue placeholder="Select a Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="todo">To Do</SelectItem>
                                                    <SelectItem value="doing">Doing</SelectItem>
                                                    <SelectItem value="done">Done</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-center">
                                <Button variant='outline' className='font-semibold'>Add</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                {
                                    user == null? 
                                    <AvatarFallback>AG</AvatarFallback> :  <AvatarImage src={user?.photoURL} className="rounded-full" />
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
