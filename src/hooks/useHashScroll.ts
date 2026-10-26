import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHashScroll = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const timeout = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [hash]);
};

export default useHashScroll;
