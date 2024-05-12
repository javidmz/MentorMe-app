import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowSizeChange);

    return () => window.removeEventListener("resize", handleWindowSizeChange);
  });

  return windowSize;
};

export default useWindowSize;
