import Image from "next/image";
import React from "react";
import styles from "./SocialIcons.module.scss";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaStackOverflow } from "react-icons/fa";
import { motion } from "framer-motion";
function SocialIcons() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <a href="https://twitter.com/meholli_sali" className={styles.link}>
          <FaTwitter size={32} color="#1DA1F2" />
          <span>meholli_sali</span>
        </a>
        <a
          href="https://www.linkedin.com/in/sali-meholli-b6b002224/"
          className={styles.link}
        >
          <FaLinkedin size={32} color="#0077B5" />
          <span>Sali Meholli</span>
        </a>
        <a href="https://facebook.com" className={styles.link}>
          <FaFacebook size={32} color="#1877F2" />
          <span>Sali Meholli</span>
        </a>
        <a href="https://github.com/SaliMeholli" className={styles.link}>
          <FaGithub size={32} color="#333" />
          <span>SaliMeholli</span>
        </a>
      </div>
    </div>
  );
}

export default SocialIcons;
