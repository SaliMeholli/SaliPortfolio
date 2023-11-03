import React from "react";
import styles from "./Contact.module.scss";
import BigBulb from "../../public/images/BigBulb.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CiLocationOn } from "react-icons/ci";
import { IoMailOpenOutline } from "react-icons/io5";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {Poppins} from 'next/font/google';
import CTAButtton from "./CTAButtton";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});
function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "-100px 0px",
  });
  
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.CTAcontainer}>
      <div className={styles.CTA} >
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      > */}
      <div>
        
        <p className={poppins.className}>
        Don&apos;t be shy, reach out and let&apos;s connect like two well-commented lines of code!
        </p>
        </div>
       <CTAButtton background="white" color="black"/>
      {/* </motion.div> */}
      </div>
      </div>
    </div>
  );
}

export default Contact;
