import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./TheProject.module.scss";
// import photo from "../../public/images/photo1.webp";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function TheProject({
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
        <Image 
        src={photo}
        width={400}
                height={300}
                style={{ objectFit: "cover" }}
                alt=" "
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div>
                <h1>{title}</h1>
              <p>{description}</p>
              <div className={styles.datetime}>
                <p className={styles.readTime}>{readTime} MIN READ</p>
                <p className={styles.Date}>{date}</p>
              </div>
                </div>

      </div>
    </div>
  );
}

export default TheProject;
