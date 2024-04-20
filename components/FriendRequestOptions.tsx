'use client'

import Link from "next/link";
import { useState } from "react";

interface FriendRequestOptionsProps{
    sessionId: string,
    intialUnseenRequestCount : number
}

const FriendRequestOptions:React.FC<FriendRequestOptionsProps> = ({intialUnseenRequestCount, sessionId}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(intialUnseenRequestCount);
    return (  
        <Link href='/dashboard/requests' className="
            text-white
            hover:text-indigo-600
            hover:bg-white
            group
            flex
            items-center
            gap-x-3
            rounded-md
            p-2
            text-sm
            leading-6
            font-semibold
        ">
            <div className="text-black border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                text-[0.625rem]
                font-medium
                bg-gray-900
            ">
            </div>
            <p className="truncate">Friend Requests</p>
            {unseenRequestCount > 0 ? (<div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-black bg-indigo-700">
                {unseenRequestCount}
            </div>) 
            : 
            null}
        </Link>
    );
}
 
export default FriendRequestOptions;