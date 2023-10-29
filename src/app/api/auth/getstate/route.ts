import { prisma } from '../../../../lib/db/client';
import { NextApiRequest, NextApiResponse } from 'next';
//import cookies from 'js-cookie';
import { cookies } from 'next/headers'

    export async function GET(req: Request, res: NextApiResponse) {
     const cookieStore = cookies()
     const session_token = cookieStore.get('session_token')
     if (!session_token) {
         return new Response(JSON.stringify({ error: 'Missing session token' }), {
             status: 400,
             headers: { 'Content-Type': 'application/json' },
         });
        }
     
     const session = await prisma.sessions.findUnique({
         where: { sessionid: session_token.value },
     })


     if (!session) {
         return new Response(JSON.stringify({ error: 'Session not found' }), {
             status: 418,
             headers: { 'Content-Type': 'application/json' },
         });
        }

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const formattedDate = currentDate.toISOString();

        if (new Date(session.expires) < new Date(formattedDate)) {
            const deleteSession = await prisma.sessions.delete({
                where: { sessionid: session_token.value },
            });
            if (!deleteSession) {
                return new Response(JSON.stringify({ error: 'Error Removing session from database please report this error along with this token ', session_token }), {
                    status: 418,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(JSON.stringify({ error: 'Session expired' }), {
                status: 418,
                headers: { 'Content-Type': 'application/json' },
            });
        }



        const checkdate = (new Date(session.expires) < new Date(formattedDate)) 




     
     const user = await prisma.users.findUnique({
         where: { username: session.username },
     });

     if (!user) {
         return new Response(JSON.stringify({ error: 'User not found' }), {
             status: 418,
             headers: { 'Content-Type': 'application/json' },
         });
    }

    const { password, ...userWithoutPassword } = user;
     return new Response(JSON.stringify({ userWithoutPassword, session, checkdate }), {
         status: 200,
         headers: { 'Content-Type': 'application/json',  },
     });
    
}

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const body = await req.json();
        const { session_token } = body

        if (!session_token) {
            return new Response(JSON.stringify({ error: 'Missing session token' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const session = await prisma.sessions.findUnique({
            where: { sessionid: session_token },
        });

        if (!session) {
            return new Response(JSON.stringify({ error: 'Session not found' }), {
                status: 418,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const formattedDate = currentDate.toISOString();


        if (new Date(session.expires) > new Date(formattedDate)) {
            const deleteSession = await prisma.sessions.delete({
                where: { sessionid: session_token },
            });
            if (!deleteSession) {
                return new Response(JSON.stringify({ error: 'Error Removing session from database please report this error along with this token ', session_token }), {
                    status: 418,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(JSON.stringify({ error: 'Session expired' }), {
                status: 418,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (new Date(session.expires) < new Date(formattedDate)) {
        const user = await prisma.users.findUnique({
            where: { username: session.username },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 418,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(
            JSON.stringify({
                expires: session.expires,
                session_id : session.sessionid,
                username: user.username,
                id: user.id,
                ms: user.ms,
                events: user.events,
                news: user.news,
                officers: user.officers,
                users: user.users,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        }


    } catch (error) {
        console.error('Error in POST:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}