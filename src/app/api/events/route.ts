import { prisma } from '../../../lib/db/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
    const body = await req.json();
    const { title, Body, location, date, time } = body;

    const result = await prisma.msevents.create({
        data: {
            title: title,
            Body: Body,
            location: location,
            date: date,
            time: time,
        },
    });

    return new Response(JSON.stringify(result), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const result = await prisma.msevents.findMany();
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}