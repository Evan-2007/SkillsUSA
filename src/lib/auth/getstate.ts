import { prisma } from '../db/client';

async function getState(sessionToken: string) {

    if (!sessionToken) {
        return(JSON.stringify({ error: 'Missing session token' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
       }
    
    const session_token = sessionToken.value;

    const session = await prisma.sessions.findUnique({
        where: { sessionid: session_token },
    })


    if (!session) {
        return(JSON.stringify({ error: 'Session not found or expired' }), {
            status: 418,
            headers: { 'Content-Type': 'application/json' },
        });
       }

       const currentDate = new Date();
       currentDate.setDate(currentDate.getDate());
       const formattedDate = currentDate.toISOString();

       if (new Date(session.expires) < new Date(formattedDate)) {
           const deleteSession = await prisma.sessions.delete({
               where: { sessionid: session_token },
           });
           if (!deleteSession) {
               return(JSON.stringify({ error: 'Error Removing session from database please report this error along with this token ', session_token }), {
                   status: 418,
                   headers: { 'Content-Type': 'application/json' },
               });
           }
           return(JSON.stringify({ error: 'Session expired' }), {
               status: 418,
               headers: { 'Content-Type': 'application/json' },
           });
       }



       const checkdate = (new Date(session.expires) < new Date(formattedDate)) 




    
    const user = await prisma.users.findUnique({
        where: { username: session.username },
    });

    if (!user) {
        return(JSON.stringify({ error: 'User not found' }), {
            status: 418,
            headers: { 'Content-Type': 'application/json' },
        });
   }

   const { password, ...userWithoutPassword } = user;
    return(JSON.stringify({ userWithoutPassword, session, checkdate }), {
        user: userWithoutPassword,
        status: 200,
        headers: { 'Content-Type': 'application/json',  },
    });
   
}

export default getState;