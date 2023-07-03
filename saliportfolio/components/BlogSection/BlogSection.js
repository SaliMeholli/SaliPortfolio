import React from "react";
import styles from "./BlogSection.module.scss";
import { motion } from "framer-motion";
import TheBlog from "../TheBlog/TheBlog";
import Link from "next/link";

function BlogSection({ blogs }) {

  return (
    <div className={styles.container}>
      <h1>Latest Blogs</h1>
      <div className={styles.blogs}>
        {blogs.map((item, index) => (
          <motion.div
            key={item.frontmatter.path} // Use item.frontmatter.path as the key
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/posts/${item.frontmatter.path}`}
              key={item.frontmatter.path}
            >
              <TheBlog
                title={item.frontmatter.title} // Use item.frontmatter.title as the prop value
                description={item.frontmatter.description} // Use item.frontmatter.description
                photo={item.frontmatter.image} // Use item.frontmatter.image
                // readTime={calculateReadTime(item.markdownContent)} // Calculate read time based on markdown content
                date={item.frontmatter.date} // Use item.frontmatter.date
              />
            </Link>
          </motion.div>
        ))}
      </div>
      <Link href="/posts" className={styles.showMoreLink}>Show More</Link>
    </div>
  );
}

export default BlogSection;
