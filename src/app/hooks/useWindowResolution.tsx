import { useEffect, useState } from "react";

type resolutionType = {
  height: number | null;
  width: number | null;
};

const useWindowResolution = () => {
  const [resolution, setResolution] = useState<resolutionType>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // handler fn
    const handleResize = (e: UIEvent) => {
      setResolution({
        height: e.target.innerHeight,
        width: e.target.innerWidth,
      });
    };

    // listens to window resize event
    window.addEventListener("resize", (e) => handleResize(e));

    // cleans up the resize event listener
    return () => window.removeEventListener("resize", (e) => handleResize(e));
  }, []);
  //   returns current window resolution
  return resolution;
};

export default useWindowResolution;
