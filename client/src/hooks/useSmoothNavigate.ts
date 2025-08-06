import { useLocation } from "wouter";

export const useSmoothNavigate = () => {
  const [, navigate] = useLocation();

  const smoothNavigate = (href: string) => {
    const [path, hash] = href.split("#");

    navigate(path || "/");

    setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100); // slight delay to allow DOM render
  };

  return smoothNavigate;
};
