import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./PostPage.module.scss";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { remark } from "remark";
import Link from "next/link";
import SocialIcons from "../../components/socialIcons/SocialIcons";
import { motion } from "framer-motion";
import PageProgressIndicator from "../../components/ScrollIndicator";
import readingTime from "reading-time";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
function PostPage({ PostpagesData, BlogsContent }) {
  const blog = {
    path: PostpagesData?.frontmatter.path,
    title: PostpagesData?.frontmatter.title,
    leadText: PostpagesData?.frontmatter.leadText,
    description: PostpagesData?.frontmatter.description,
    date: PostpagesData?.frontmatter.date,
    content: PostpagesData?.body,
    image: PostpagesData?.frontmatter.image,
    headerImage: PostpagesData?.frontmatter.headerImage,
    author: PostpagesData?.frontmatter.author,
    lng: PostpagesData?.frontmatter.lng,
    tags: PostpagesData?.frontmatter.tags,
    services: PostpagesData?.frontmatter.services,
    projects: PostpagesData?.frontmatter.projects,
  };

  return (
    <div className={styles.PostPageContainer}>
      <div className={styles.container}>
        <Navbar />
        <PageProgressIndicator />
        <SocialIcons />
        <div className={styles.contentContainer}>
          {/* <div className={styles.tocContainer}>
          {tableOfContents.map((item) => (
            <Link
              style={{ marginLeft: `${item.level * 15}px` }}
              key={item.id}
              href={`#${item.id}`}
            >
              {item.text}
            </Link>
          ))}
        </div> */}
          <div className={styles.divider}></div>
          <div className={styles.textContent}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }} // Add delay based on index
            >
              <Image
                src={PostpagesData?.frontmatter?.image}
                width={600}
                height={300}
                alt=""
                priority
              />
            </motion.div>
            <h1>{PostpagesData?.frontmatter?.title}</h1>
            <div className={styles.ReactMarkdown}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} // Add delay based on index
              >
                <ReactMarkdown>{PostpagesData?.markdownContent}</ReactMarkdown>
              </motion.div>
            </div>
            <Link href="/posts" className={styles.GoBack}>
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
//123
export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/Posts"));

  const paths = [];

  const localizedPaths = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(
      path.join("content", "Posts", filename),
      "utf-8"
    );
    const { data } = matter(markdownWithMetadata);
    const slug = data.path;

    return {
      params: {
        slug,
      },
    };
  });
  paths.push(...localizedPaths);

  // console.log();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const BlogFiles = fs.readdirSync(path.join("content/Posts"));

  const BlogsContent = BlogFiles.map((BlogFilename) => {
    const markDownBlog = fs.readFileSync(
      path.join("content/Posts", BlogFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownBlog);

    return {
      frontmatter,
      markdownContent,
    };
  });

  const PostpagesData = BlogsContent.find(
    (Postpage) => Postpage.frontmatter.path === slug
  );

  return {
    props: {
      PostpagesData,
      BlogsContent,
    },
  };
}
