import { prisma } from '../../../../lib/db/client';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const { title, body, location, date, time, site } = req.body;
    let POST;

    //if (site == 'MS') {
        post = await prisma.MSEvents.create({
            data: {
                title,
                body,
                location,
                date,
                time
            },
        });
        //});
        //console.log('post created');

    // if (site == 'YLC') {
    //    post = await prisma.YLCEvents.create({
     //       data: {
     //           title,
      //          body,
       //         location,
      //          date,
       //         time
      //      },
      //  });
        //return new Response(post,{status: 200})
        return new Response(data,{status: 200})
  //  } else {
        //return new Response({status: 400})
   // }

}

export async function GET(req, res) {
    const { method } = req;


    //res.setHeader('Allow', ['POST']);
    //return res.status(405).end(`Method ${method} Not Allowed`);
    return new Response({status: 405})
}
