import { Database } from '@/types_db';
import { getURL } from '@/utils/helpers';
import { stripe } from '@/utils/stripe';
import {
  createOrRetrieveCustomer,
  upsertUserPage
} from '@/utils/supabase-admin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw Error('Could not get user');
      const page = await req.json();
      console.log(page);
      const customer = await upsertUserPage(user.id, page);

      return new Response(JSON.stringify(customer), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
