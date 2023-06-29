import Image from "next/image";
import React from "react";
import styles from "./TheBlog.module.scss";
// import photo from "../../public/images/photo1.webp";
function TheBlog({
  title,
  description,
  photo,
  readTime,
  lastBlog,
  latest,
  date,
}) {
  return (
    <div>
      {latest && !lastBlog && (
        <div className={styles.lastBlog}>
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
        </div>
      )}

      {!latest &&
        !lastBlog && ( // Add this condition to exclude lastBlog from rendering again
          <div className={styles.container}>
            <div className={styles.cards}>
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
            </div>
          </div>
        )}
    </div>
  );
}

export default TheBlog;
