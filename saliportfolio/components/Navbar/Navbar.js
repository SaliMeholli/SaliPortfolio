import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


import {Montserrat} from 'next/font/google';
import {Poppins} from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200'],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'],
});


function Navbar() {
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.pageYOffset;
  //     setIsScrolled(scrollPosition >= 100);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className={styles.container} >
      <Link href="/" className={poppins.className}>Home</Link>
      {/* <Link href="#about">About</Link> */}
      <ScrollLink
        to="experience"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className={poppins.className}
      >
        Experience
      </ScrollLink>
      <Link href="/posts" className={poppins.className}>Posts</Link>
    </div>
  );
}

export default Navbar;
