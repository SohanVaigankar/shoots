import { clerkClient } from "@clerk/nextjs/server";
// server action queries
import { getImage } from "~/server/queries";
// components
import FullImage from "./FullImage/FullImage";
import ImagePanel from "./ImagePanel/ImagePanel";
// context provider
import { EditContextProvider } from "~/context";

type FullPageImageViewProps = { id: number };

const FullPageImageView = async (props: FullPageImageViewProps) => {
  const { id } = props;

  if (isNaN(id)) throw new Error("Invalid Image ID");

  const image = await getImage(id);

  //   get the info of image uploader
  const uploaderData = await clerkClient.users.getUser(image.userId);

  return (
    <EditContextProvider>
      <div className=" set-flex-direction flex h-full   w-full min-w-0  gap-2 overflow-y-auto  p-2 md:gap-3 lg:overflow-y-hidden">
        <FullImage name={image.name} url={image.url} />
        <ImagePanel imgId={id} imgData={image} uploaderData={uploaderData} />
      </div>
    </EditContextProvider>
  );
};

export default FullPageImageView;
