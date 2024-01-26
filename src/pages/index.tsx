import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { SignIn, useSignIn } from "@clerk/nextjs";
import { ThemeToggle } from "~/components/theme-toggle";
import { useRouter } from "next/router";

type Providers = "google" | "apple";

export default function Home() {}

/*

  const router = useRouter();
  const { signIn } = useSignIn();
  const OAuthButton = ({
    provider,
    children,
  }: {
    provider: Providers;
    children?: React.ReactNode;
  }) => {
    return (
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => {
          console.log(`logging in with ${provider}`);
          signIn?.authenticateWithRedirect({
            strategy: `oauth_${provider}`,
            redirectUrl: "/",
            redirectUrlComplete: "/",
          });
        }}
      >
        {children}
      </Button>
    );
  };

  return (
    <div className="flex h-screen flex-grow flex-row ">
      <div className="bg-zinc-50 p-8 sm:basis-0 lg:basis-3/5 dark:bg-zinc-900">
        <h3>Pigeon</h3>
      </div>
      <Separator orientation="vertical" />
      <div className="flex h-screen  flex-col items-center gap-2 p-16 align-middle sm:w-screen sm:basis-full lg:basis-2/5 dark:bg-zinc-950">
        {" "}
        <div className="flex w-full justify-end">
          <ThemeToggle />
        </div>
        <h1 className="my-8"> Log In </h1>
        <OAuthButton provider="google">Continue with Google</OAuthButton>
        <OAuthButton provider="apple">Continue with Apple</OAuthButton>
      </div>
    </div>
  );
 */
