import { prisma } from '../../../../lib/db/client';

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const expires = process.env.SESSION_EXPIRES || '7';
const saltRounds = 10;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username  || !password) {
            return new Response(JSON.stringify({ error: 'Missing username or password', body}), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const gethash = await prisma.users.findUnique({
            where: { username },
        });

        if (!gethash) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 418,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const match = await bcrypt.compare(password, gethash.password);
        
        if (match) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(expires));
            const formattedDate = currentDate.toISOString();

            const token = crypto.randomBytes(16).toString('hex');

            await prisma.sessions.create({
                data: {
                    username: username,
                    sessionid: token,
                    expires: formattedDate,
                },
            });

            return new Response(JSON.stringify({ token }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Password incorrect' }), {
                status: 401,
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
};
