import React from "react";
import styles from "./Contact.module.scss";
import BigBulb from "../../public/images/BigBulb.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CiLocationOn } from "react-icons/ci";
import { IoMailOpenOutline } from "react-icons/io5";
import {AiOutlineArrowRight} from 'react-icons/ai';
function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "-100px 0px",
  });
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.CTA} >
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      > */}
      <div>
        
        <p>
        Don't be shy, reach out and let't connect like two well-commented lines of code!
        </p>
        </div>
        <div className={styles.buttonContainer}>
          <a href="mailto:salidev.ks@gmail.com" className={styles.button}>
            Hit me up
            <AiOutlineArrowRight className={styles.arrow} />
          </a>
        </div>
      {/* </motion.div> */}
      </div>
    </div>
  );
}

export default Contact;
