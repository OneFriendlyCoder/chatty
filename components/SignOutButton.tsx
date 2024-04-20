"use client"

import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const SignOutButton:React.FC<SignOutButtonProps> = ({...props}) => {
    
    const [isSignOut, setIsSignOut] = useState<boolean>(false);
    return (  
        <button {...props} onClick={async () => {setIsSignOut(true);
            try { 
                await signOut();
            } catch (error) {
                toast.error('There was a problem signing out')
            } finally {
                setIsSignOut(false);
            }
        }}>
            {isSignOut ? (
                <>Loading...</>
            ): (
                <>SignOut</>
            )}

        </button>
    );
}
 
export default SignOutButton;