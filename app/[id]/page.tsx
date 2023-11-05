import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const Page = async ({ params }: any) => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { data } = await supabase.from('pages').select().eq('id', params.id);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
export default Page;
