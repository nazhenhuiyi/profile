import { ProfileForm } from './PageForm';
import { getSession } from '@/app/supabase-server';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="flex h-full">
      <div className="flex flex-auto p-3 justify-center border-r overflow-auto">
        {data ? <ProfileForm page={data} /> : null}
      </div>
      <div className="flex items-center justify-center w-[400px]">
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <ScrollArea className="rounded-[2rem] overflow-auto w-[272px] h-[572px] bg-white dark:bg-gray-800">
            <div className="h-[800px]">
              The regular expressions references will help more advanced users
              find the information they need quickly and also help beginners
              learn more about regular expressions. These references will also
              greatly help with documenting the new v mode that is currently in
              development and is expected to add support for set
              difference/subtraction, set intersection, and nested character
              classes. Having individual reference pages for each regular
              expression feature will make it easier to give a more detailed
              explanation of the new features using the v flag. For more
              information on this flag, check out th The regular expressions
              references will help more advanced users find the information they
              need quickly and also help beginners learn more about regular
              expressions. These references will also greatly help with
              documenting the new v mode that is currently in development and is
              expected to add support for set difference/subtraction, set
              intersection, and nested character classes. Having individual
              reference pages for each regular expression feature will make it
              easier to give a more detailed explanation of the new features
              using the v flag. For more information on this flag, check out
              thThe regular expressions references will help more advanced users
              find the information they need quickly and also help beginners
              learn more about regular expressions. These references will also
              greatly help with documenting the new v mode that is currently in
              development and is expected to add support for set
              difference/subtraction, set intersection, and nested character
              classes. Having individual reference pages for each regular
              expression feature will make it easier to give a more detailed
              explanation of the new features using the v flag. For more
              information on this flag, check out thThe regular expressions
              references will help more advanced users find the information they
              need quickly and also help beginners learn more about regular
              expressions. These references will also greatly help with
              documenting the new v mode that is currently in development and is
              expected to add support for set difference/subtraction, set
              intersection, and nested character classes. Having individual
              reference pages for each regular expression feature will make it
              easier to give a more detailed explanation of the new features
              using the v flag. For more information on this flag, check out
              thThe regular expressions references will help more advanced users
              find the information they need quickly and also help beginners
              learn more about regular expressions. These references will also
              greatly help with documenting the new v mode that is currently in
              development and is expected to add support for set
              difference/subtraction, set intersection, and nested character
              classes. Having individual reference pages for each regular
              expression feature will make it easier to give a more detailed
              explanation of the new features using the v flag. For more
              information on this flag, check out thThe regular expressions
              references will help more advanced users find the information they
              need quickly and also help beginners learn more about regular
              expressions. These references will also greatly help with
              documenting the new v mode that is currently in development and is
              expected to add support for set difference/subtraction, set
              intersection, and nested character classes. Having individual
              reference pages for each regular expression feature will make it
              easier to give a more detailed explanation of the new features
              using the v flag. For more information on this flag, check out th
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
