import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import Google from "next-auth/providers/google";

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
            const dbUser = (await db.get(`user:${token.id}`)) as User | null;    // the UpstashRedisAdapter takes care of the token generation
        }
    }
};

export default authOptions;
