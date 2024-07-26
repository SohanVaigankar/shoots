import React from "react";
// types & interfaces
import { type ImageDataType, type UploaderDataType } from "../types";

type ImageDetailsProps = {
  imgData: ImageDataType;
  uploaderData: UploaderDataType;
};

const ImageDetails = (props: ImageDetailsProps) => {
  const { imgData, uploaderData } = props;
  return (
    <>
      <div className="md:text-md rounded-md bg-card p-2 text-center text-sm shadow-sm lg:hidden">
        {imgData.name}
      </div>
      <div className="flex w-full  flex-col gap-2 rounded-md ">
        <div className="md:text-md hidden rounded-md bg-card p-2 text-center text-sm lg:block">
          {imgData.name}
        </div>
        <div className="flex justify-evenly gap-2 rounded-md bg-card p-2 text-sm shadow-sm md:text-[0.9rem] lg:flex-col">
          <div className="border-card-foreground/1 flex w-full flex-col rounded-md border p-2  text-center md:p-2">
            <span>Uploaded By: </span>
            <span className="font-semibold">{uploaderData.fullName}</span>
          </div>
          <div className="flex w-full flex-col rounded-md border border-card-foreground/10 p-2 text-center">
            <span>Created On: </span>
            <span className="font-semibold">
              {new Date(imgData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDetails;
