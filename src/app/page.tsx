import Image from "next/image";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/383a11fc-f7c1-49d3-96a2-ec628b2309c0-jtoka6.jpg",
  "https://utfs.io/f/c1e54cfd-f85a-4715-9b49-b3b5c2395afd-8lmoxn.jpg",
  "https://utfs.io/f/bb0acc60-ff47-410c-9bd4-8361052a8fd9-d0wbgw.jpg",
  "https://utfs.io/f/a28ab6fd-eba7-47b3-ac3e-362c10311066-p1vz3k.jpg",
];

const mockImages = mockUrls.map((url, index) => ({ id: index + 1, url }));

const HomePage = async () => {
  const posts = await db.query.posts.findMany();
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        
        {posts?.map((post) => <div key={post.id}>{post.name}</div>)}

        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <Image
              src={image.url}
              alt={"img"}
              width={0}
              height={0}
              // sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
