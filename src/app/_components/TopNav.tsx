"use client";
// nextjs
import Image from "next/image";
import { useRouter } from "next/navigation";
// clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// components
import { UploadImageButton } from "./UploadImageButton";
// assets
import { ShootsLogoSVG } from "~/assets/svgs";
import ThemeToggle from "./ThemeToggle";

const TopNav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-30 h-[10vh] bg-gradient-to-b from-transparent  to-transparent px-2  pt-2 backdrop-blur-[1px] lg:px-5 lg:pt-5">
      <section className="mx-auto flex w-full items-center  justify-between rounded-md  bg-card px-4 py-3 text-xl shadow-sm">
        <div
          className="flex h-full items-center justify-center gap-2 hover:cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src={ShootsLogoSVG}
            alt="shoots"
            className="h-10 w-10 object-contain"
          />
          <span>shoots</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <div
              className="
          from-gradientStart  to-gradientEnd rounded-md bg-gradient-to-r px-3 py-[0.25rem]  
          text-[0.9rem] text-white shadow-md hover:cursor-pointer"
            >
              <SignInButton>Get Started</SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="hidden sm:block">
              <UploadImageButton />
            </div>
            <UserButton />
          </SignedIn>
        </div>
      </section>
    </nav>
  );
};

export default TopNav;
