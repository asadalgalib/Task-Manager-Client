import { LayoutDashboardIcon, List, LogIn  } from "lucide-react"
import taskIcon from '../assets/icons8-shein-50.png'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import './navlink.css'
import { NavLink } from "react-router-dom";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Task",
        url: "/tasks",
        icon: List,
    },
    {
        title: "Login",
        url: "/signup",
        icon: LogIn,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <div className="h-16 flex items-center bg-[--sidebar-header-background]">
                <SidebarHeader >
                    <div className="flex items-center justify-start gap-3">
                        <div>
                            <img
                                src={taskIcon}
                                className="lg:w-12 lg:h-12 w-10 h-10"
                                alt="logo" />
                        </div>
                        <div>
                            <h1 className="lg:text-xl text-lg text-white">Task Manager</h1>
                        </div>
                    </div>
                </SidebarHeader>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Links</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url}>
                                            <item.icon style={{width : '20px', height : '20px'}} />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
