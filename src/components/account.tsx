import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export const Account = () => {
  const user = useUser();
  if (!user.isSignedIn) {
    return <LoggedOut />;
  }
  return <LoggedIn />;
};

const LoggedOut = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged Out</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/sign-in");
          }}
        >
          Log In
        </DropdownMenuItem>
        <DropdownMenuItem>Sign up</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LoggedIn = () => {
  const user = useUser();
  const { signOut } = useClerk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Avatar>
            <AvatarImage src={user.user?.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>{user.user?.fullName}</p>
          <p className="font-normal opacity-60">
            {user.user?.primaryEmailAddress?.emailAddress}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
