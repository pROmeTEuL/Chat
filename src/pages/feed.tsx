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
import { auth, useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { create } from "domain";

const Feed = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const authUser = api.user.authenticate.useMutation();
  useEffect(() => {
    if (!user) return;
    if (!user.primaryEmailAddress) return;
    if (!user.username) return;
    authUser.mutate({
      id: user.id,
      email: user.primaryEmailAddress.emailAddress,
      name: user.username,
    });
  }, [user]);
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Not signed in</div>;

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
  const { user } = useUser();
  const reply = useRef<HTMLTextAreaElement>(null);
  const author = api.user.getById.useQuery({ id: post.ownerId });
  const createReply = api.reply.createReply.useMutation();

  if (!user?.id) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>By {author.data?.name}</CardDescription>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Reply</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply</DialogTitle>
                <DialogDescription>
                  Reply to {author.data?.name}
                </DialogDescription>
              </DialogHeader>
              <Textarea ref={reply} />
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-min"
                  onClick={() => {
                    if (!reply.current) return;
                    const content = reply.current.value;
                    if (!content) return;
                    createReply.mutate({
                      content,
                      postId: post.id,
                      userId: user.id,
                    });
                  }}
                >
                  Send Reply
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};
