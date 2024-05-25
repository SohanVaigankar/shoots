import Image from "next/image";
import Link from "next/link";
// clerk
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
// server queries
import { getImages } from "~/server/queries";
//components
import { UploadImageButton } from "./_components/UploadImageButton";
import { Footer } from "~/components";
// update the page content when any change is made to the db
export const dynamic = "force-dynamic";
const RenderImages = async () => {
  const images = await getImages();
  return (
    <div className="scrollbar-hide grid h-full  border-separate gap-8 overflow-y-auto rounded-md bg-card p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {images?.map((image) => (
        <div key={image.id} className="mx-auto flex flex-col">
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
    <>
      <SignedOut>
        <main className="" style={{ height: "calc(100vh - 10%)" }}>
          <main className="flex h-full flex-grow  items-center justify-center px-8 text-center">
            <div className=" flex flex-col items-center">
              <h1 className="font-heading mb-4 text-6xl font-bold leading-tight text-primary">
                This is{" "}
                <span className="from-gradientStart to-gradientEnd bg-gradient-to-r bg-clip-text text-transparent">
                  Shoots
                </span>
              </h1>
              <p className="mb-6 text-2xl text-secondary-foreground">
                Your ultimate destination to manage and showcase your photos.
              </p>
              <SignInButton>
                <button className="from-gradientStart to-gradientEnd transform rounded-md bg-gradient-to-r px-6 py-3 text-primary shadow-lg transition duration-300 hover:scale-105">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </main>
          {/* <section className=" bg-background py-12 rounded-md">
            <div className="container mx-auto px-8 text-center flex justify-center flex-col items-center">
              <h2 className="font-heading mb-8 text-4xl font-bold text-secondary-foreground/50">
                Features
              </h2>
              <div className="flex flex-wrap justify-center">
                <div className="m-4 max-w-xs rounded-lg bg-foreground p-6 shadow-lg">
                  <img
                    src="/path-to-icon.svg"
                    alt="Feature 1"
                    className="mx-auto mb-4 h-16 w-16"
                  />
                  <h3 className="text-xl font-bold text-secondary">
                    Feature 1
                  </h3>
                  <p className="text-gray-700">Description of feature 1.</p>
                </div>
                <div className="m-4 max-w-xs rounded-lg bg-foreground p-6 shadow-lg">
                  <img
                    src="/path-to-icon.svg"
                    alt="Feature 2"
                    className="mx-auto mb-4 h-16 w-16"
                  />
                  <h3 className="text-xl font-bold text-secondary">
                    Feature 2
                  </h3>
                  <p className="text-gray-700">Description of feature 2.</p>
                </div>
                <div className="m-4 max-w-xs rounded-lg bg-foreground p-6 shadow-lg">
                  <img
                    src="/path-to-icon.svg"
                    alt="Feature 3"
                    className="mx-auto mb-4 h-16 w-16"
                  />
                  <h3 className="text-xl font-bold text-secondary">
                    Feature 3
                  </h3>
                  <p className="text-gray-700">Description of feature 3.</p>
                </div>
              </div>
            </div>
          </section> */}

          <Footer />
        </main>
      </SignedOut>

      <SignedIn>
        <main
          className="relative mt-5  overflow-y-hidden"
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
