import { cookies } from 'next/headers'
import { prisma } from '../../../../lib/db/client';

//removes session from database but cookie dose not get deleted. starting a new session will overwire the current cookie.

export async function GET(req: Request) {
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
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const deleteSession = await prisma.sessions.delete({
        where: { sessionid: session_token.value },
    })
    if (!deleteSession) {
        return new Response(JSON.stringify({ error: 'Error Removing session from database please report this error along with this token ', session_token }), {
            status: 418,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const expiresPast = date.toUTCString();

    return new Response(JSON.stringify({ success: 'Session deleted' }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json', 
            'Set-Cookie': `session_token=; HttpOnly; Path=/; Expires=${expiresPast}; SameSite=Strict; Secure`,
        },
    });
}