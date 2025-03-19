'use server';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { customFetch } from '../api/customFetch';
// Adding Post Function Starts
export const addPost = async (values) => {
  const res = await fetch(`http://localhost:5000/posts`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
  if (res?.ok) {
    // revalidateTag('posts'); // look at note at bottom this for cache dynamic response at ssg
    // then to cahe use isr and remove revalidatetag or just remove this and add force-cache to get api
    redirect('/');
  }
  return {
    data: await res.json(),
    ok: res?.ok,
  };
};
// Adding Post Function Ends

// Editing Post Function Starts
export const editPost = async (values, id) => {
  const res = await fetch(`http://localhost:5000/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
  if (res?.ok) {
    revalidateTag('posts');
    redirect(`/posts/details/${id}`);
  }
  return {
    data: await res.json(),
    ok: res?.ok,
  };
};
// Editing Post Function Ends

// Deleteing post Function Starts
export const deletePost = async (id) => {
  const res = await fetch(`http://localhost:5000/posts/${id}`, {
    method: 'Delete',
  });
  if (res?.ok) {
    revalidateTag('posts');
    redirect(`/`);
  }
  return {
    data: await res.json(),
    ok: res?.ok,
  };
};
// Deleteing post Function Ends

//note about fetch with cache
// Your page uses revalidate: 300, which means data should be cached for 5 minutes.
// 2️⃣ However, you're calling revalidateTag("posts") right after adding a post.

// This forces Next.js to refetch the data, which is why you always see fresh data instead of cached data.
// Essentially, you're invalidating the cache manually every time you add a post.
// ✅ Solution
// 👉 Remove revalidateTag("posts") if you want caching to work as expected.
// Your addPost function should look like this:
