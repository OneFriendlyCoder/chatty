"use client"
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios from "axios"
import { useState } from "react";
import { z } from "zod";
import { AxiosError } from "axios";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"


type FormData = z.infer<typeof addFriendValidator>;             //zod data into typescript data

const AddFriendButtons = () => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

    const {register, handleSubmit, setError, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    });
    
    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({email});
            await axios.post('/api/friends/add', {
                email: validatedEmail,
            })
            setShowSuccessState(true);
        } catch (error) {
            console.log(error);
            if(error instanceof z.ZodError){
                setError('email', {message: error.message})
            }
            if(error instanceof AxiosError){
                setError('email', {message: error.response?.data})
            }
            setError('email', {message: "Something went wrong"});
        }
    }

    const onSubmit = (data: FormData) => {
        addFriend(data.email);
    }


    return (  
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">Add friend by Email</label>
            <div className="mt-2 flex gap-4">
                <input {...register('email')} type="text" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6" placeholder="you@example.com"/>
                <button className="text-white">Add</button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            {showSuccessState ? (
                <p className="mt-1 text-sm text-green-600">Friend Request sent</p>
            ): null}
        </form>
    );
}
 
export default AddFriendButtons;