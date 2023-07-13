import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
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
      <ScrollLink
        to="experience"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        Experience
      </ScrollLink>
      <Link href="/posts">Posts</Link>
    </div>
  );
}

export default Navbar;
