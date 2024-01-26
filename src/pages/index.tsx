import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const lol = api.post.hello.useQuery({ text: "my nuts" });
  const allPosts = api.post.getAll.useQuery();

  if (allPosts.isLoading) return <div>Loading...</div>;

  return <main>{allPosts.data?.map((el) => el.name)}</main>;
}
