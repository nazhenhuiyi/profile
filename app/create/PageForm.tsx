'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Database } from '@/types_db';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Avatar from './avatar';
type Page = Database['public']['Tables']['pages']['Row'];
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'description must be at least 2 characters.'
  }),
  location: z.string(),
  status: z.string(),
  avatar_url: z.string()
});

export function ProfileForm({ page }: { page: Page }) {
  console.log(page);
  const form = useForm<z.infer<typeof formSchema>>({
    //@ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: page as any
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = await fetch('/api/create-page', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(values)
    });
    console.log(values, data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[720px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>这里可以填写你的基本信息和动态</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Avatar size={120} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex-auto flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="你的网名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="你的一些近况" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator className="my-4" />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>居住地点</FormLabel>
                  <FormControl>
                    <Input placeholder="你的居住地" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              // TODO 这里使用一些选择的方式来做
            }
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="是否最近在休假还是疯狂加班工作"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>社交媒体</CardTitle>
            <CardDescription>这里可以填写你的社交媒体信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="">
              {['twitter', 'github', 'youtube'].map((v) => (
                <span></span>
              ))}
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
