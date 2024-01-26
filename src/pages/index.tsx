import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { api } from "~/utils/api";

import { Button } from "~/components/ui/button";
import { Post } from "~/server/api/routers/post";
import { useState } from "react";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const allPosts = api.post.getAll.useQuery();
  const [showPosts, setShowPosts] = useState(false);

  if (allPosts.isLoading) {
    return <div>Loading...</div>;
  }

  if (allPosts.error ?? !allPosts.data) {
    return <div>Error: {allPosts.error?.message}</div>;
  }

  return (
    <main className="p-4">
      <Button variant="default" onClick={() => router.push('/login')}> Login </Button>
    </main>
  );
}

const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
};
