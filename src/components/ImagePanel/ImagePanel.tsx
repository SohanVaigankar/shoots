import React from "react";
// components
import PanelActions from "./PanelActions/PanelActions";
import EditPanel from "./EditPanel/EditPanel";
import ImageDetails from "./ImageDetails/ImageDetails";
// types & interfaces
import { type ImageDataType, type UploaderDataType } from "./types";

type ImagePanelProps = {
  imgData: ImageDataType;
  imgId: number;
  uploaderData: UploaderDataType;
};

const ImagePanel = (props: ImagePanelProps) => {
  const { imgData, imgId, uploaderData } = props;
  return (
    <section className="flex w-full flex-shrink-0 flex-col gap-2 rounded-md text-primary  lg:w-56 lg:gap-3 lg:p-2 lg:shadow-sm ">
      <ImageDetails imgData={imgData} uploaderData={uploaderData} />
      <EditPanel />
      <PanelActions imgId={imgId} />
    </section>
  );
};

export default ImagePanel;
