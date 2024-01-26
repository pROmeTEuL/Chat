import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "~/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={cn(
        "bg-background min-h-screen font-sans antialiased",
        fontSans.variable,
      )}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
