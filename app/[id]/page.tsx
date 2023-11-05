import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { data } = await supabase.from('pages').select().eq('id', params.id);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
