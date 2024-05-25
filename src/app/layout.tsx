import { Inter, Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/TopNav";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "./_analytics/provider";
// styles
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ThemeProvider } from "~/context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Shoots | Your Personalised Gallery",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
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
      <html lang="en" suppressHydrationWarning className={inter.className}>
        <CSPostHogProvider>
          <body className={` bg-primary-foreground`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TopNav />
              <main className="h-screen max-h-[90vh]  px-2 pb-2 lg:px-5 lg:pb-5">
                {children}
              </main>
              {modal}
              <div id="modal-root" />
              <Toaster />
            </ThemeProvider>
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  );
}
