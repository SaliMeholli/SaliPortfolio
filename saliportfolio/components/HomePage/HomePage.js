import Image from "next/image";
import React from "react";
import styles from "./HomePage.module.scss";
//
import SocialIcons from "../../components/socialIcons/SocialIcons";

import animationData from "../socialIcons/SocialIcons";
import SaliImage from "../../public/images/ProfilePicture.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HtmlLogo from "../../public/images/html.png";
import JsLogo from "../../public/images/js.svg";
import CssLogo from "../../public/images/css.svg";
import { AiFillHtml5 } from "react-icons/ai";

import {
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoGraphql,
} from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
// import { Particles } from "../Particles/Particles"; //
import {Poppins} from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: false,

    rootMargin: "-100px 0px",
  });
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.HomeContainer}>
        
        <SocialIcons />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.HomeContainer}>
          <div className={styles.Home}>
            {/* <Lottie options={defaultOptions} height={500} width={500} /> */}
            <div className={styles.ImageContainer}>
              <Image src={SaliImage} width={500} height={500} alt="" />
            </div>
            <div className={styles.TextContainer}>
              <h1 className={poppins.className}>
                I am a <span>fullstack developer</span>
              </h1>
              <p className={poppins.className}>
                Hi, I&apos;m Sali Meholli.A passionate full-stack developer
                based in Prishtina, Kosovo.📍
                 I create engaging user interfaces and bring designs to
                life. I love exploring new tools and frameworks to stay
                up-to-date with the frontend landscape.
              </p>

              <p className={styles.TechIcons} >
                TechStack: <AiFillHtml5 size={40} color="#E34F26" />
                <BiLogoCss3 size={40} color="#1572B6" />
                <BiLogoJavascript size={40} color="#F0DB4F" />
                <BiLogoReact size={40} color="#61DAFB" />
                <TbBrandNextjs size={40} color="#000000" />
                <BiLogoGraphql color="#E10098" size={40} />
              </p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}

export default HomePage;
