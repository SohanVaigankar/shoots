import { Suspense } from "react";
import { Modal } from "./modal";
import FullPageImageView from "~/components/FullImagePage";
import Loading from "./loading";

const PhotoModal = async ({
  params: { id: imageId },
}: {
  params: { id: number };
}) => {
  return (
    <Modal>
      <Suspense fallback={<Loading/>}>
        <FullPageImageView id={imageId} />
      </Suspense>
    </Modal>
  );
};

export default PhotoModal;
