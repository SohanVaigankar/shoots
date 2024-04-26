"use client";
// nextjs
import { useRouter } from "next/navigation";
// clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// components
import { UploadImageButton } from "./UploadImageButton";

const TopNav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-[0.5rem] mx-auto  flex h-[7%] w-full items-center justify-between rounded-md  bg-card px-4 py-5 text-xl shadow-sm">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        shoots
      </div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <div className="rounded-md border-2 border-primary px-3 py-[0.1rem] text-[0.9rem] hover:cursor-pointer  hover:bg-primary hover:text-primary-foreground">
            <SignInButton>sign in</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UploadImageButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopNav;
