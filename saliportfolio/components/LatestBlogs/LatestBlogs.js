import Link from "next/link";
import React, { useEffect, useRef } from "react";
import TheBlog from "../TheBlog/TheBlog";
import styles from "./LatestBlogs.module.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function LatestBlogs({ blogs, lastBlog }) {
  
  return (
    <div className={styles.allBlogs}>
      <Link href={`/posts/${lastBlog.path}`} key={lastBlog}>
        <div className={styles.latestBlogContainer}>
          <div className={styles.lastBlog}>
            {lastBlog && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TheBlog
                  title={lastBlog.title}
                  description={lastBlog.description}
                  photo={lastBlog.image}
                  readTime={lastBlog.readTime}
                  // lastBlog={item === lastBlog}
                  latest={true}
                  date={lastBlog.date}
                />
              </motion.div>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.cards}>
        {blogs.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/posts/${item.path}`} key={item}>
              <TheBlog
               
                title={item.title}
                description={item.description}
                photo={item.image}
                readTime={item.readTime}
                lastBlog={item === lastBlog}
                date={item.date}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LatestBlogs;
