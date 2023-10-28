import { prisma } from '../../../../lib/db/client';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const saltRounds = 10;

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { username, password, confirmpassword, ms, active, events, users, officers, news} = body;
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
      status: 418,
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
        ms: ms,
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
