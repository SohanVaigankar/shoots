"use client";
import { useEffect, useState } from "react";

const breakpoints = {
  sm: "(min-width: 656px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
};

const useMediaQuery = (query: string): boolean => {
  // is query true for the resolution
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(breakpoints[query]).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    // listening to window resolution change event
    mediaQueryList.addEventListener("change", listener);

    // cleanup fn to remove event
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
