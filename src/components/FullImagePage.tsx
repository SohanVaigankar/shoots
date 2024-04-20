import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

const FullPageImageView = async (props: { id: number }) => {
  const { id } = props;

  if (isNaN(id)) throw new Error("Invalid Image ID");

  const image = await getImage(id);

  //   get the info of image uploader
  const uploaderData = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          alt={image.name}
          src={image.url}
          className="w-96 flex-shrink object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col ">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col px-2">
          <span>Uploaded By: </span>
          <span>{uploaderData.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On: </span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FullPageImageView;
