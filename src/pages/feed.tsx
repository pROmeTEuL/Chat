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

const Feed = () => {
  return (
    <div>
      <Header />
      <main className="grid h-full w-full grid-cols-4 p-4">
        <div></div>
        <div className="col-span-2 flex flex-col gap-4">
          Feed
          <Input type="search" placeholder="search people or chirps" />
          <PostsList />
        </div>
        <div></div>
      </main>
    </div>
  );
};
export default Feed;

const PostsList = () => {
  const topPosts = api.post.getTopPosts.useQuery({ count: 30 });
  return (
    <ul className="flex flex-col gap-2">
      {topPosts.data?.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
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
        <p>{post.hearts} hearts</p>
      </CardFooter>
    </Card>
  );
};
