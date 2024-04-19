import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const renderImages = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Image
            src={image.url}
            alt={image.name}
            width={0}
            height={0}
            // sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>{image.name}</p>
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
