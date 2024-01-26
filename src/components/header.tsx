import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <div className="flex items-center gap-8 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
      <p>🐦‍⬛ Pigeon</p>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};
