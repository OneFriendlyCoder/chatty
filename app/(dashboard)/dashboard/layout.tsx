import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestOptions from "@/components/FriendRequestOptions";
import { fetchRedis } from "@/helpers/redis";
interface LayoutProps{
    children: React.ReactNode
}

interface SideBarOption {
    id: number,
    name: string,
    href: string,
}

const Layout:React.FC<LayoutProps> = async ({children}) => {

    const session = await getServerSession(authOptions);
    if(!session){notFound()}
    const unseenrequestcount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length
    const sidebarOptions: SideBarOption[] = [
        {
            id: 1,
            name: 'Add friend',
            href: '/dsahboard/add'
        }
    ]
    return (  
        <div className="w-full flex h-screen">
            <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto  bg-gray-700 px-6">
                <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
                    Logo
                </Link>
                <div className="text-xs font-semibold leading-6 text-gray-400">Your chats</div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            User chats
                        </li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                    return (
                                        <li key={option.id}>
                                            <Link href={option.href} className="text-white hover:text-indigo-600">
                                                <span className="truncate">{option.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                        <li>
                            <FriendRequestOptions sessionId={session.user.id} intialUnseenRequestCount={unseenrequestcount}/>
                        </li>
                        <li className="-mx-6 mt-auto flex items-center">
                                <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
                                    <div className="relative h-8 w-8 bg-gray-100">
                                        <Image fill referrerPolicy="no-referrer" className="rounded-full" src={session.user.image || ""} alt="your profile image"/>
                                    </div>
                                    <span className="sr-only text-white">Your profile</span>
                                    <div className="flex flex-col">
                                        <span aria-hidden='true'>{session.user.name}</span>
                                        <span className="text-xs text-zinc-400" aria-hidden='true'>{session.user.email}</span>
                                    </div>
                                </div>
                                <SignOutButton className="h-full aspect-square"/>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </div>
    );
}
 
export default Layout;