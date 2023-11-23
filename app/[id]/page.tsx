import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { TopPlayground } from './TopPlayground';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const Page = async ({ params }: any) => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { data } = await supabase.from('pages').select().eq('id', params.id);
  return (
    <div>
      <TopPlayground />
    </div>
  );
};
export default Page;
