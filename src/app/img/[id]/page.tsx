import FullPageImageView from "~/components/FullImagePage";
import { getImage } from "~/server/queries";

const PhotoPage = async ({
  params: { id: imageId },
}: {
  params: { id: number };
}) => {
  return <FullPageImageView id={imageId} />;
};

export default PhotoPage;
