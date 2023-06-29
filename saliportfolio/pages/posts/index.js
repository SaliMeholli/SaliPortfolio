import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../components/PostsPage/PostsPage.module.scss";
import TheBlog from "../../components/TheBlog/TheBlog";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import LatestBlogs from "../../components/LatestBlogs/LatestBlogs";
function posts({ BlogFiles, BlogsContent }) {
  const { blogs, lastBlog } = getBlogPosts(BlogsContent);
  // console.log(lastBlog);
  return (
    <div className={styles.container}>
      <Navbar />

      <LatestBlogs blogs={blogs} lastBlog={lastBlog} />
    </div>
  );
}

export default posts;
function getBlogPosts(BlogsContent) {
  const blogs = BlogsContent.map((item) => {
    return {
      path: item.frontmatter.path,
      image: item.frontmatter.image,
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      date: item.frontmatter.date,
      readTime: Math.round(readingTime(item.markdownContent).minutes) || 1,
    };
  });
  const lastBlog = blogs[0];
 
  return {
    blogs,
    lastBlog,
  };
}

export async function getStaticProps() {
  const BlogFiles = fs.readdirSync(path.join("content/posts"));

  const BlogsContent = BlogFiles.map((BlogFilename) => {
    const markDownBlog = fs.readFileSync(
      path.join("content/posts", BlogFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownBlog);

    return {
      frontmatter,
      markdownContent,
    };

    return null;
  });
  // const readTime =
  //   Math.round(readingTime(BlogsContent.markdownContent).minutes) || 1;

  return {
    props: {
      BlogFiles,
      BlogsContent,
    },
  };
}
