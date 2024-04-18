import Image from "next/image";
import { db } from "~/server/db";

// update the page content when any change is made to the db
export const dynamic = "force-dynamic";

const HomePage = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
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
    </main>
  );
};

export default HomePage;
