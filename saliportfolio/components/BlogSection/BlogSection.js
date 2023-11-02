import React from "react";
import styles from "./BlogSection.module.scss";
import { motion } from "framer-motion";
import TheBlog from "../TheBlog/TheBlog";
import Link from "next/link";
import readingTime from "reading-time";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {Poppins} from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100'],
});

function BlogSection({ blogs }) {
  
  return (
    <div className={styles.container}>
      {/* <h1>Latest Blogs</h1> */}
      
    <div className={styles.BlogsContainer}>
      <div className={styles.BlogsAndMore}>
        <h1 className={poppins.className}>Blogs</h1>
        <Link href={`/posts`} className={poppins.className}>See All Blogs <AiOutlineArrowRight  /></Link>
      </div>
      
      <div className={styles.blogs}>
      
        {blogs.map((item, index) => (
          <Link
            href={`/posts/${item.frontmatter.path}`}
            key={item.frontmatter.path}
          >
            <TheBlog
              title={item.frontmatter.title} // Use item.frontmatter.title as the prop value
              description={item.frontmatter.description} // Use item.frontmatter.description
              photo={item.frontmatter.image} // Use item.frontmatter.image
              readTime={
                Math.round(readingTime(item.markdownContent).minutes) || 1
              }
              date={item.frontmatter.date} // Use item.frontmatter.date
            />
          </Link>
        ))}
      </div>
      </div>
      {/* <Link href="/posts" className={styles.showMoreLink}>
        Show More
      </Link> */}
    </div>
  );
}

export default BlogSection;
