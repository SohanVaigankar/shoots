"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import posthog from "posthog-js";

import { useUploadThing } from "~/utils/uploadthing";
// context
import { useEditContext } from "~/context";
import { EDIT_CONTEXT_ACTIONS } from "~/context/edit-context/actions.types";
// components
import { Button } from "../ui/button";
// icons
import { PiMagnifyingGlassPlus, PiMagnifyingGlassMinus } from "react-icons/pi";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";
import { MdRotate90DegreesCw } from "react-icons/md";
// constants & helper fns
import { downloadBlobFile } from "~/utils/helperFunctions";

type FullImageProps = {
  name: string;
  url: string;
};

// full page component w/ zoom functionality
const FullImage = (props: FullImageProps) => {
  const { name, url } = props;

  const {
    isEdit,
    brightness,
    contrast,
    saturation,
    grayscale,
    rotate,
    flipHorizontal,
    flipVertical,
    zoom,
    saveImage,
    downloadImage,
    dispatch,
  } = useEditContext();

  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { startUpload, isUploading } = useUploadThing<"imageUploader">(
    "imageUploader",
    {
      onUploadBegin() {
        posthog.capture("upload_begin");
        toast.loading("Uploading...", { duration: 100000, id: "upload-begin" });
      },
      onUploadError() {
        posthog.capture("upload_error");
        toast.dismiss("upload-begin");
        toast.error("Failed to upload image", { duration: 5000 });
      },
      onClientUploadComplete() {
        toast.dismiss("upload-begin");
        toast.success("Image Upload Successful");
        // router.refresh();
      },
    },
  );

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  const handlePointerDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const initialX = event.clientX - (flipHorizontal ? -offsetX : offsetX);
    const initialY = event.clientY - (flipVertical ? -offsetY : offsetY);
    setPanStart({ x: initialX, y: initialY });
  };

  const handlePointerMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      event.preventDefault();

      const offsetXDelta = event.clientX - panStart!.x;
      const offsetYDelta = event.clientY - panStart!.y;

      setOffsetX(flipHorizontal ? -offsetXDelta : offsetXDelta);
      setOffsetY(flipVertical ? -offsetYDelta : offsetYDelta);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // zoom in handler fn
  const handleZoomIn = () => {
    dispatch({
      type: EDIT_CONTEXT_ACTIONS.UPDATE_ZOOM,
      payload: zoom + 0.1,
    });
    applyFilter(zoom + 0.1);
  };

  // zoom out handler fn
  const handleZoomOut = () => {
    dispatch({
      type: EDIT_CONTEXT_ACTIONS.UPDATE_ZOOM,
      payload: Math.max(zoom - 0.1, 0.1),
    });
    applyFilter(Math.max(zoom - 0.1, 0.1));
  };

  // canvas scroll handler fn
  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleClick = (type: string) => {
    switch (type) {
      case "zoomIn":
        handleZoomIn();
        break;
      case "zoomOut":
        handleZoomOut();
        break;
      case "flipHorizontal":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.UPDATE_HORIZONTAL_FLIP });
        break;
      case "flipVertical":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.UPDATE_VERTICAL_FLIP });
        break;
      case "rotate90":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_ROTATE,
          payload: rotate > 360 ? 0 : rotate + 90,
        });
        break;

      default:
        break;
    }
  };

  const applyFilter = (zoom: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;

    image.onload = () => {
      if (canvas && context) {
        const zoomedWidth = image.width * zoom;
        const zoomedHeight = image.height * zoom;
        const translateX = (image.width - zoomedWidth) / 2;
        const translateY = (image.height - zoomedHeight) / 2;
        canvas.width = image.width;
        canvas.height = image.height;
        context.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturation}%)`;
        context.save();
        if (rotate) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          context.translate(centerX, centerY);
          context.rotate((rotate * Math.PI) / 180);
          context.translate(-centerX, -centerY);
        }
        if (flipHorizontal) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        if (flipVertical) {
          context.translate(0, canvas.height);
          context.scale(1, -1);
        }
        context.translate(translateX, translateY);

        context.translate(offsetX, offsetY);

        context.scale(zoom, zoom);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        context.restore();
      }
    };
  };

  const uploadImage = async (files: File[]) => {
    try {
      await startUpload(files);

      dispatch({
        type: EDIT_CONTEXT_ACTIONS.RESET,
      });
    } catch (error) {
      console.error("uploadImage", error);
    } finally {
    }
  };

  // useEffect(() => {
  //   if (file) {
  //     const fileSrc = URL.createObjectURL(file);
  //     setImageSrc(fileSrc);
  //     setImageName(file.name);
  //     return () => {
  //       URL.revokeObjectURL(fileSrc);
  //     };
  //   }
  // }, [file, open]);

  const handleSaveImage = async () => {
    if (!saveImage && !downloadImage) return null;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          if (downloadImage) {
            downloadBlobFile(blob, name);
            dispatch({
              type: EDIT_CONTEXT_ACTIONS.DOWNLOAD_IMAGE,
            });
          } else if (saveImage) {
            const editedFile = new File([blob], name, { type: blob.type });
            void uploadImage(new Array(editedFile));

            // onSaveImage(editedFile); // update file
          }
          // if (onClose) {
          //   onClose();
          // }
        }
      });
    }
  };

  useEffect(() => {
    handleSaveImage();
  }, [saveImage, downloadImage]);

  useEffect(() => {
    applyFilter(zoom);
  }, [
    url,
    brightness,
    contrast,
    saturation,
    grayscale,
    rotate,
    flipHorizontal,
    flipVertical,
    offsetX,
    offsetY,
    zoom,
  ]);

  return (
    <div className="relative flex h-full w-full  items-center justify-center  overflow-hidden rounded-md bg-card shadow-sm">
      <canvas
        className={`object-fit mx-auto max-h-full max-w-full 
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        id="canvas"
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      />
      {/* controls */}
      <div className="absolute bottom-4 flex gap-2">
        <Button onClickCapture={() => handleClick("zoomOut")}>
          <PiMagnifyingGlassMinus fontSize={"1.25rem"} />
        </Button>
        <Button onClickCapture={() => handleClick("zoomIn")}>
          <PiMagnifyingGlassPlus fontSize={"1.25rem"} />
        </Button>
        {isEdit && (
          <>
            <Button onClickCapture={() => handleClick("flipHorizontal")}>
              <LuFlipHorizontal2 fontSize={"1.25rem"} />
            </Button>
            <Button onClickCapture={() => handleClick("flipVertical")}>
              <LuFlipVertical2 fontSize={"1.25rem"} />
            </Button>
          </>
        )}
        {!isEdit && (
          <>
            <Button onClickCapture={() => handleClick("rotate90")}>
              <MdRotate90DegreesCw fontSize={"1.25rem"} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FullImage;
