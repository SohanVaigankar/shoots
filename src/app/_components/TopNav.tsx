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

const TopNav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-[0.5rem] mx-auto  flex h-[7%] w-full items-center justify-between rounded-md  bg-card px-4 py-5 text-xl shadow-sm">
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
        <SignedOut>
          <div className="rounded-md border-2 border-primary px-3 py-[0.1rem] text-[0.9rem] hover:cursor-pointer  hover:bg-primary hover:text-primary-foreground">
            <SignInButton>sign in</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="hidden sm:block">
            <UploadImageButton />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopNav;
