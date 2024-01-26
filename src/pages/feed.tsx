import { Header } from "~/components/header";
import { Input } from "~/components/ui/input";
import { Post } from "~/server/api/routers/post";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Toggle } from "~/components/ui/toggle";

const Feed = () => {
  return (
    <div className="max-h-screen overflow-hidden">
      <Header />
      <ScrollArea>
        <main className="grid h-full w-full grid-cols-4 p-4">
          <div></div>
          <div className="col-span-2 flex max-h-screen flex-col gap-4">
            Feed
            <Input type="search" placeholder="search people or chirps" />
            <PostsList />
          </div>
          <div></div>
        </main>
        <ScrollBar></ScrollBar>
      </ScrollArea>
    </div>
  );
};
export default Feed;

const PostsList = () => {
  const topPosts = api.post.getTopPosts.useQuery({ count: 30 });
  return (
    <ul className="flex flex-col gap-4">
      {topPosts.data?.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const heartPost = api.post.heartPost.useMutation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-4">
          <p>{post.hearts}</p>
          <Toggle className="w-min" size={"sm"}>
            <Heart />
          </Toggle>
        </div>
      </CardFooter>
    </Card>
  );
};
