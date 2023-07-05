import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./TheBlog.module.scss";
// import photo from "../../public/images/photo1.webp";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function TheBlog({
  title,
  description,
  photo,
  readTime,
  lastBlog,
  latest,
  date,
}) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "-100px 0px",
  });

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        {latest && !lastBlog && (
          <div className={styles.lastBlog}>
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            > */}
            <div className={styles.lastBlogCard}>
              <Image
                src={photo}
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
                alt=" "
                priority
              />
            </div>
            <div>
              <h1>{title}</h1>
              <p>{description}</p>
              <div className={styles.datetime}>
                <p className={styles.readTime}>{readTime} MIN READ</p>
                <p className={styles.Date}>{date}</p>
              </div>
            </div>
            {/* </motion.div> */}
          </div>
        )}

        {!latest && !lastBlog && (
          <div className={styles.cards} ref={ref}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.card}>
                <Image
                  src={photo}
                  width={300}
                  height={250}
                  style={{ objectFit: "cover" }}
                  alt=" "
                />
                <div>
                  <p className={styles.readTime}>{readTime} MIN READ</p>
                  <p className={styles.Date}>{date}</p>
                </div>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TheBlog;
