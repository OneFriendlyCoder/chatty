"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function LoginWithGoogle(){
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }
    return (  
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-6">
            <div className="w-full flex flex-col items-center max-w-md space-y-8">
                <div className="flex flex-col items-center gap-8">
                    logo
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-light text-white">SignIn to your account</h2>
                </div>
                <Button variant="destructive" onClick={LoginWithGoogle}>
                    {isLoading ? "Loading..." : "Google"}
                </Button>
            </div>
        </div>
    );
}
 
export default Login;