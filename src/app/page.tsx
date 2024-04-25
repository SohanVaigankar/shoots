import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";
import Link from "next/link";
// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const RenderImages = async () => {
  const images = await getImages();
  return (
    <div className="scrollbar-hide grid h-full  border-separate grid-cols-6 gap-8 overflow-y-auto rounded-md bg-card p-4">
      {images.map((image) => (
        <div key={image.id} className="flex flex-col ">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={480}
              height={900}
              style={{ objectFit: "contain" }}
              className="rounded-sm shadow-sm hover:scale-[1.015] hover:cursor-pointer  hover:shadow-md"
            />
          </Link>
          <p className="p-1 text-center text-[0.8rem]">{image?.name}</p>
        </div>
      ))}
    </div>
  );
};

const HomePage = async () => {
  return (
    <main style={{ height: "calc(100vh - 7rem)" }}>
      <SignedOut>
        <div className="flex h-full w-full flex-col items-center justify-center text-center text-2xl">
          <div className=" p-5">Please sign in to access images</div>
          <div className="rounded-md border-2 border-primary px-4 py-1 text-[1.2rem] hover:cursor-pointer  hover:bg-primary hover:text-primary-foreground">
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
