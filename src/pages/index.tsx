import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const lol = api.post.hello.useQuery({ text: "my nuts" });

  if (lol.isLoading) return <div>Loading...</div>;

  return <main>{lol.data?.greeting}</main>;
}
