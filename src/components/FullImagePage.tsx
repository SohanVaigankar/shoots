import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
const FullPageImageView = async (props: { id: number }) => {
  const { id } = props;

  if (isNaN(id)) throw new Error("Invalid Image ID");

  const image = await getImage(id);

  //   get the info of image uploader
  const uploaderData = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0 gap-3">
      <div className="flex w-full  items-center justify-center rounded-md bg-card shadow-sm">
        <img
          alt={image.name}
          src={image.url}
          className="w-96 flex-shrink object-contain shadow-md"
        />
      </div>
      <div className="flex w-56 flex-shrink-0 flex-col gap-3 rounded-md bg-muted p-2 text-primary shadow-sm">
        <div className="text-md rounded-md bg-card p-2 text-center">
          {image.name}
        </div>
        <section className="flex flex-col gap-2 rounded-md bg-card p-2 text-[0.9rem]">
          <div className="border-card-foreground/1 flex flex-col rounded-md border p-2  text-center">
            <span>Uploaded By: </span>
            <span className="font-semibold">{uploaderData.fullName}</span>
          </div>
          <div className="flex flex-col rounded-md border border-card-foreground/10 p-2 text-center">
            <span>Created On: </span>
            <span className="font-semibold">
              {new Date(image.createdAt).toLocaleDateString()}
            </span>
          </div>
        </section>
        <div className="mx-auto p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(id);
            }}
          >
            <Button type="submit" variant="destructive">
              <MdDeleteOutline fontSize={"1.125rem"} />
              <span>Delete</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FullPageImageView;
