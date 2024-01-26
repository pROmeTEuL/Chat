import { Header } from "~/components/header";
import { Input } from "~/components/ui/input";

const Feed = () => {
  return (
    <div>
      <Header />
      <main className="grid h-full w-full grid-cols-4 p-4">
        <div>Sidebar</div>
        <div className="col-span-2 flex flex-col gap-4">
          Feed
          <Input type="search" placeholder="search people or chirps" />
        </div>
        <div>Second Sidebar</div>
      </main>
    </div>
  );
};
export default Feed;
