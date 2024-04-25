import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/TopNav";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Shoots | Your Personalised Gallery",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CSPostHogProvider>
          <body className={`font-sans ${inter.variable} dark`}>
            <div className="h-screen overflow-y-hidden p-5">
              <TopNav />
              <main className=" mt-5 grid h-full max-h-[90%] overscroll-y-auto">
                {children}
              </main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  );
}
