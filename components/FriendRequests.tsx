'use client'

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IncomingFriendRequestProps{
    incomingFriendRequests: IncomingFriendRequests[],
    sessionId: string,
}
const FriendRequests:React.FC<IncomingFriendRequestProps> = ({incomingFriendRequests, sessionId}) => {
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequests[]>(incomingFriendRequests)
    const router = useRouter();
    
    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/friends/accept', {id: senderId})
        setFriendRequests(prev => prev.filter(request => request.senderId !== senderId))
        router.refresh();
    }

    const denyFriend = async (senderId: string) => {
        await axios.post('/api/friends/deny', {id: senderId})
        setFriendRequests(prev => prev.filter(request => request.senderId !== senderId))
        router.refresh();
    }


    return (  
        <>
        {
            friendRequests.length === 0 ? (
                <p className="text-sm text-white">Nothing to show</p>
            ) : (
                friendRequests.map((request) => (
                    <div key={request.senderId} className="flex gap-4 items-center">
                        <span>UserIcon</span>
                        <p className="font-medium text-lg">{request.senderEmail}</p>
                        <button onClick={() => {acceptFriend(request.senderId)}} aria-label="accept friend" className="w-8 h-8 bg-indigo-600 hover:bg-indigo-800 grid place-items-center rounded-full"></button>
                        <button onClick={() => {denyFriend(request.senderId)}} aria-label="deny friend" className="w-8 h-8 bg-red-600 hover:bg-red-800 grid place-items-center rounded-full"></button>
                    </div>
                ))
            )
        }
        </>
    );
}
 
export default FriendRequests;