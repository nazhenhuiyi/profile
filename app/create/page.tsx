import { ProfileForm } from './PageForm';
import { getSession } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';

export default async function SignIn() {
  const session = await getSession();

  if (!session) {
    return redirect('/account');
  }
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data } = await supabase
    .from('pages')
    .select()
    .eq('id', session.user.id)
    .single();

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <ProfileForm page={data} />
      </div>
    </div>
  );
}
