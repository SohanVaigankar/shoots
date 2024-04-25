import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";
import Link from "next/link";
// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const RenderImages = async () => {
  const images = await getImages();
  return (
    <div className="scrollbar-hide grid h-full  border-separate grid-cols-6 gap-8 overflow-y-auto rounded-md bg-[#313131] p-4">
      {images.map((image) => (
        <div key={image.id} className="flex  flex-col ">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={480}
              height={900}
              style={{ objectFit: "contain" }}
              className="rounded-sm shadow-sm hover:scale-[1.025] hover:cursor-pointer hover:border-2 hover:border-zinc-700"
            />
          </Link>
          <p>{image?.name}</p>
        </div>
      ))}
    </div>
  );
};

const HomePage = async () => {
  return (
    <main className="h-[65%]">
      <SignedOut>
        <div className="flex h-full w-full flex-col items-center justify-center text-center text-2xl">
          <div className=" p-5">Please sign in to access images</div>
          <div className="rounded-md bg-[#f5f5f5] px-4 py-1 text-[1.2rem] text-[#313131] hover:cursor-pointer">
            <SignInButton>sign in</SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <RenderImages />
      </SignedIn>
    </main>
  );
};

export default HomePage;
