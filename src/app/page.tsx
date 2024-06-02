// clerk
import { SignedIn, SignedOut } from "@clerk/nextjs";
// server queries
import { getImages } from "~/server/queries";
//components
import { UploadImageButton } from "./_components/UploadImageButton";
import { ImageGrid, LandingPage } from "~/components";

// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const RenderImages = async () => {
  const images = await getImages();
  return <ImageGrid items={images} />;
};

const HomePage = async () => {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <main
          className="relative mt-4  overflow-y-hidden"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <RenderImages />
          <div className="absolute bottom-[7%] right-8 sm:hidden">
            <UploadImageButton />
          </div>
        </main>
      </SignedIn>
    </>
  );
};

export default HomePage;
