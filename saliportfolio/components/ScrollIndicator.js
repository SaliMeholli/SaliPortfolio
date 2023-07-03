import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PageProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPosition = window.pageYOffset;
      const progress = (currentScrollPosition / totalScrollHeight) * 100;
      setScrollProgress(progress);
    };

    const handleRouteChange = () => {
      // Reset the scroll progress when the route changes
      setScrollProgress(0);
      // Wait for the next tick to reapply the scroll progress
      setTimeout(() => {
        handleScroll();
      }, 0);
    };

    window.addEventListener("scroll", handleScroll);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "#f0f0f0",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${scrollProgress}%`,
          backgroundColor: "#70b4e1",
          transition: "width 0.2s ease-out",
        }}
      ></div>
    </div>
  );
};

export default PageProgressIndicator;