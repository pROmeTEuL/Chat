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

import { Heart, PencilLine } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"


const Feed = () => {
  return (
    <div className="max-h-screen overflow-hidden">
      <Header />
      <ScrollArea className="overflow-hidden">
        <main className="grid h-full w-full grid-cols-4 p-4">
          <div></div>
          <div className="col-span-2 flex max-h-screen flex-col gap-4">
            <div id="bla"><CreatePost /></div>
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

const CreatePost = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"> Create post <PencilLine /> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="title" placeholder="Title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea id="content" placeholder="Content" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PostCard = ({ post }: { post: Post }) => {
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
          <Button size="icon">
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
