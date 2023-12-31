'use client';
import React, { useEffect, useState } from 'react';
import { Database } from '@/types_db';
import { useSupabase } from '../supabase-provider';
type Profiles = Database['public']['Tables']['pages']['Row'];

export default function Avatar({
  uid = '',
  value: url,
  size,
  onChange
}: {
  uid?: string;
  value?: Profiles['avatar_url'];
  size: number;
  onChange: (url: string) => void;
}) {
  const { supabase } = useSupabase();

  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data } = await supabase.storage
          .from('avatars')
          .getPublicUrl(path);

        setAvatarUrl(data.publicUrl);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;
      console.log(file, fileExt, supabase);
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      console.log(uploadError);
      if (uploadError) {
        throw uploadError;
      }

      onChange(filePath);
    } catch (error) {
      console.log(error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      {avatarUrl ? (
        <div
          style={{
            width: size,
            height: size,
            backgroundImage: `url('${avatarUrl}')`,
            backgroundSize: 'cover'
          }}
          className="rounded aspect-square block"
        />
      ) : null}

      <div style={{ width: size }} className="absolute w-full h-full top-0">
        <label className="w-full h-full absolute " htmlFor="single">
          {avatarUrl ? (
            <span className="bg-black text-white">重新上传</span>
          ) : (
            'upload '
          )}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute'
          }}
          className="w-full h-full"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
