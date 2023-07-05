import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition >= 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isScrolled ? styles.scrolled : ""}`}>
      <Link href="/">Home</Link>
      {/* <Link href="#about">About</Link> */}
      <Link href="#experience">Experience</Link>
      <Link href="/posts">Posts</Link>
    </div>
  );
}

export default Navbar;
