import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import Google from "next-auth/providers/google";
import { fetchRedis } from "@/helpers/redis";
const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login'
    },
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt ({token, user}){
            const dbUserResult = (await fetchRedis('get', `user:${token.id}`)) as string| null;
            if(!dbUserResult){
                token.id = user!.id;
                return token;
            }
            const dbUser = JSON.parse(dbUserResult) as User;
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
        async session ({session, token}) {
            if(token){
                session.user.id = token.id,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.picture
            }
            return session;
        },
        redirect(){
            return '/dashboard'
        }
    }
};

export default authOptions;
