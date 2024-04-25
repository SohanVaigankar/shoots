import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadImageButton } from "./UploadImageButton";

const TopNav = () => {
  return (
    <nav className="sticky top-[0.5rem] mx-auto  flex h-[5%] w-full items-center justify-between rounded-md  bg-card p-4 text-xl shadow-sm">
      <div>shoots</div>
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
