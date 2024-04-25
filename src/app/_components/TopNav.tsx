import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadImageButton } from "./UploadImageButton";

const TopNav = () => {
  return (
    <nav className="sticky top-[0.5rem] mx-auto  flex h-[5%] w-full items-center justify-between rounded-md border-b bg-[#313131] p-4 text-xl ">
      <div>shoots</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <div className="rounded-md bg-[#f5f5f5] px-4 py-[0.2rem] text-[0.9rem] text-[#313131] hover:cursor-pointer">
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
