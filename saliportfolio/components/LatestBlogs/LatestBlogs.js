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
              <TheBlog
                title={lastBlog.title}
                description={lastBlog.description}
                photo={lastBlog.image}
                readTime={lastBlog.readTime}
                // lastBlog={item === lastBlog}
                latest={true}
                date={lastBlog.date}
              />
            )}
          </div>
        </div>
      </Link>
      <div className={styles.cards}>
        {blogs.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default LatestBlogs;
