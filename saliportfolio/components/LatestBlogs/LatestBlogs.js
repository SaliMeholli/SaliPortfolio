import Link from "next/link";
import React from "react";
import TheBlog from "../TheBlog/TheBlog";
import styles from "./LatestBlogs.module.scss";
function LatestBlogs({ blogs, lastBlog }) {
  return (
    <div>
      <div className={styles.latestBlogContainer}>
        <h1 className={styles.blogsHeader}>Sali's Blog</h1>
        <div className={styles.lastBlog}>
          {lastBlog && (
            <Link href={`/posts/${lastBlog.path}`} key={lastBlog}>
              <TheBlog
                title={lastBlog.title}
                description={lastBlog.description}
                photo={lastBlog.image}
                readTime={lastBlog.readTime}
                // lastBlog={item === lastBlog}
                latest={true}
                date={lastBlog.date}
              />
            </Link>
          )}
        </div>
      </div>
      <div className={styles.cards}>
        {blogs.map((item) => (
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
