"use client";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { Button } from "../ui/button";

type FullImageProps = {
  name: string;
  url: string;
};

// full page component w/ zoom functionality
const FullImage = (props: FullImageProps) => {
  const { name, url } = props;

  //   zoom controls
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="absolute  bottom-5 z-30 flex gap-1">
        <Button onClick={() => zoomIn()}>Zoom +</Button>
        <Button onClick={() => zoomOut()}>Zoom -</Button>
        <Button onClick={() => resetTransform()}>Reset</Button>
      </div>
    );
  };
  return (
    <div className="relative flex h-full w-full  items-center justify-center  overflow-hidden rounded-md bg-card shadow-sm">
      <TransformWrapper>
        <Controls />
        <TransformComponent>
          <img
            alt={name}
            src={url}
            className="mx-auto h-full w-full"
            style={{
              maxHeight: "calc(80vh)",
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default FullImage;
