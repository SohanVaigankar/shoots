import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/FullImagePage";

const PhotoModal = async ({
  params: { id: imageId },
}: {
  params: { id: number };
}) => {
  return (
    <Modal>
      <FullPageImageView id={imageId} />
    </Modal>
  );
};

export default PhotoModal;
