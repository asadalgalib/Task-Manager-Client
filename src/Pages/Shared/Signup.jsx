import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

const Signup = () => {

    return (
        <div className="flex min-h-[calc(100svh-64px)] py-14 flex-col items-center justify-center gap-6 bg-muted">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <LoginForm />
            </div>
        </div>
    )
};

export default Signup;