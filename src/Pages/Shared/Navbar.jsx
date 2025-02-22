import { SidebarTrigger } from "@/components/ui/sidebar"

const Navbar = () => {
    return (
        <div className="px-4 bg-primary flex h-16">
            <div className="flex items-center justify-center gap-3">
                <div>
                    <SidebarTrigger />
                </div>
                <div>
                    <h1 className="text-xl font-medium text-white">My Tasks</h1>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Navbar;