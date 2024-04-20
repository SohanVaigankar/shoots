import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";
import Link from "next/link";
// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const renderImages = async () => {
  const images = await getImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={480}
              height={480}
              style={{ objectFit: "contain" }}
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
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in to access images
        </div>
      </SignedOut>
      <SignedIn>{renderImages()}</SignedIn>
    </main>
  );
};

export default HomePage;
