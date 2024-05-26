import { clerkClient } from "@clerk/nextjs/server";
// server action queries
import { deleteImage, getImage } from "~/server/queries";
// components
import { Button } from "./ui/button";
import FullImage from "./FullImage/FullImage";
// icons
import { MdDeleteOutline } from "react-icons/md";

const FullPageImageView = async (props: { id: number }) => {
  const { id } = props;

  if (isNaN(id)) throw new Error("Invalid Image ID");

  const image = await getImage(id);

  //   get the info of image uploader
  const uploaderData = await clerkClient.users.getUser(image.userId);
  return (
    <div className=" set-flex-direction flex h-full   w-full min-w-0  gap-2 overflow-y-auto  p-2 md:gap-3 lg:overflow-y-hidden">
      <FullImage name={image.name} url={image.url} />
      <div className="md:text-md rounded-md bg-card p-2 text-center text-sm shadow-sm lg:hidden">
        {image.name}
      </div>
      <div className="flex w-full flex-shrink-0 flex-col gap-2 rounded-md text-primary  lg:w-56 lg:gap-3 lg:p-2 lg:shadow-sm ">
        <div className="md:text-md hidden rounded-md bg-card p-2 text-center text-sm lg:block">
          {image.name}
        </div>
        <section className="flex justify-evenly gap-2 rounded-md bg-card p-2 text-sm shadow-sm md:text-[0.9rem] lg:flex-col">
          <div className="border-card-foreground/1 flex w-full flex-col rounded-md border p-2  text-center md:p-2">
            <span>Uploaded By: </span>
            <span className="font-semibold">{uploaderData.fullName}</span>
          </div>
          <div className="flex w-full flex-col rounded-md border border-card-foreground/10 p-2 text-center">
            <span>Created On: </span>
            <span className="font-semibold">
              {new Date(image.createdAt).toLocaleDateString()}
            </span>
          </div>
        </section>
        <div className="mx-auto md:p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(id);
            }}
          >
            <Button type="submit" variant="destructive" size="sm">
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
