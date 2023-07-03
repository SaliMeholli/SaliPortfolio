import Image from "next/image";
import React from "react";
import styles from "./HomePage.module.scss";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaStackOverflow } from "react-icons/fa";
import SocialIcons from "../../components/socialIcons/SocialIcons";
import Lottie from "react-lottie";
import animationData from "../socialIcons/SocialIcons";
import SaliImage from "../../public/images/sali.jpeg";
import { motion } from "framer-motion";
function HomePage() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  return (
    <div className={styles.container}>
      <SocialIcons />
      <div className={styles.HomeContainer}>
        {/* <Lottie options={defaultOptions} height={500} width={500} /> */}

        <Image src={SaliImage} width={300} height={300} />
        <h1>I am a frontend developer</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae
          quidem debitis a, recusandae excepturi temporibus repudiandae
          perferendis nulla dolores. Consequuntur voluptates obcaecati atque.
          Dignissimos in suscipit nam numquam nemo?
        </p>
      </div>
    </div>
  );
}

export default HomePage;
