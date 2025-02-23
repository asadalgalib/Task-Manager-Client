import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from "react"
import { AuthContext } from "@/Context/AuthContext/AuthProvider"
import Swal from "sweetalert2"
import useAxiosSecure from "@/hooks/useAxiosSecure"

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { user, setUser, auth, provider } = useContext(AuthContext);
  const axioSecure = useAxiosSecure();

  // log in and save user in database
  const handleLogin = () => {
    if (user) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are already loged in!",
      });
    }

    signInWithPopup(auth, provider)
      .then(result => {

        setUser(result.user);
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;

        axioSecure.post('/user', { name, email, photo })
          .then(res => {
            if (res.data.status === 200 || res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/user/tasks');
            }

          })
      }).catch(err => {
        console.log(err.code);
      })
  }

  return (
    (<div className={cn("flex flex-col gap-6 rounded", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to <span className="text-sky-500">MY TASK</span></CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <Button id='login' onClick={handleLogin} variant="outline" className="w-full bg-primary hover:bg-[--sidebar-header-background]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="white" />
              </svg>
              <span className="text-white">Login with Google</span>
            </Button>
          </div>
          {/* <form>
            <div className="grid gap-6">
              <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full hover:bg-[--sidebar-header-background]">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form> */}
        </CardContent>
      </Card>
    </div>)
  );
}
