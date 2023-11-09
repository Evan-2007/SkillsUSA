import { prisma } from '../../../../lib/db/client';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import getState from '../../../../lib/auth/getstate';
import { cookies } from 'next/headers'


const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS): 10;

export async function POST(req: Request, res: Response) {
  const Body = await req.json();
  const { username, password, confirmpassword, ms, active, events, users, officers, news} = Body;

  const cookieStore = cookies()
  const maybeSessionToken = cookieStore.get('session_token')


  if (!maybeSessionToken || typeof maybeSessionToken.value !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing session token' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}


  type SessionToken = {
    value: string;
  };
  
  const sessionToken: SessionToken = { value: maybeSessionToken.value };

  const state = await getState(sessionToken);

  if (typeof state.user !== 'object') {
    return new Response(JSON.stringify({ error: 'Error getting state' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  if (state.status == 200 && state.user.users == true) {


    if (!username || !password || !confirmpassword ) {
      return new Response(JSON.stringify({ error: 'Missing username or password' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    if (password !== confirmpassword) {
      return new Response(JSON.stringify({ error: 'Passwords do not match' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      const hash = await bcrypt.hash(password, saltRounds);

      await prisma.users.create({
        data: {
          username: username,
          password: hash,
          ms: state.user.ms,
          active: active,
          events: events,
          users: users,
          officers: officers,
          news: news,
        },
      });
      return new Response(JSON.stringify({ success: 'User created' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.error('Duplicate entry error:', e.meta);
          return new Response(JSON.stringify({ error: 'Duplicate entry' }), {
            status: 409,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          console.error('Some other database error:', e);
          return new Response(JSON.stringify({ error: 'Database error' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      } else {
        console.error('Unknown error:', e);
        return new Response(JSON.stringify({ error: 'Unknown error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
  } 
  if (state.status == 200 && state.user.users == false) {
    return new Response(JSON.stringify({ error: 'You do not have permission to create or eddit users. if you believe this is an error cantact an admin or open an issue on github' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  else {
    return new Response(JSON.stringify({ error: state.headers }), {
      status: state.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}




export async function GET(req: Request, res: Response) {

  const cookieStore = cookies()
  const maybeSessionToken = cookieStore.get('session_token')


  if (!maybeSessionToken || typeof maybeSessionToken.value !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing session token' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}


  type SessionToken = {
    value: string;
  };
  
  const sessionToken: SessionToken = { value: maybeSessionToken.value };

  const state = await getState(sessionToken);

  if (typeof state.user !== 'object') {
    return new Response(JSON.stringify({ error: 'Error getting state' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  if (state.status == 200 && state.user.users == true) {



    const userList = await prisma.users.findMany({
      where: {
        ms: state.user.ms,
      },
      select: {
        ms: true,
        username: true,
        active: true,
        events: true,
        users: true,
        officers: true,
        news: true,

      },
    });

    return new Response(JSON.stringify({ success: userList }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });


  }

  if (state.status == 200 && state.user.users == false) {
    return new Response(JSON.stringify({ error: 'You do not have permission to create or eddit users. if you believe this is an error cantact an admin or open an issue on github' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  else {
    return new Response(JSON.stringify({ error: state.headers }), {
      status: state.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


//edit permissions

export async function PATCH(req: Request, res: Response) {

  const cookieStore = cookies()
  const maybeSessionToken = cookieStore.get('session_token')
  const Body = await req.json();
  const { username, active, events, users, officers, news} = Body;

  if (!maybeSessionToken || typeof maybeSessionToken.value !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing session token' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}


  type SessionToken = {
    value: string;
  };
  
  const sessionToken: SessionToken = { value: maybeSessionToken.value };

  const state = await getState(sessionToken);

  if (typeof state.user !== 'object') {
    return new Response(JSON.stringify({ error: 'Error getting state' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  if (state.status == 200 && state.user.users == true) {


    const getUserSite = await prisma.users.findMany({
      where: {
        username: username,
      },
      select: {
        ms: true,
      },
    });

    if (getUserSite == null )
    {
      return new Response(JSON.stringify({ error: 'User does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    type getUserSite = {
      ms: boolean;
    };

    if (getUserSite.ms !== state.user.ms) {
      return new Response(JSON.stringify({ error: 'You do not have permission to edit this user' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    const EditPermissions = await prisma.users.update({
      where: {
        username: username,
      },
      data: {
        active: active,
        events: events,
        users: users,
        officers: officers,
        news: news,
      },
    });

      return new Response(JSON.stringify({ success: EditPermissions }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  if (state.status == 200 && state.user.users == false) {
    return new Response(JSON.stringify({ error: 'You do not have permission to create or eddit users. if you believe this is an error cantact an admin or open an issue on github' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  else {
    return new Response(JSON.stringify({ error: state.headers }), {
      status: state.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
