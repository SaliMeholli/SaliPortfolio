import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from './PostPage.module.scss';
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
import { FaArrowLeft } from "react-icons/fa";
import LatestBlogs from "../../components/LatestBlogs/LatestBlogs";
import BlogSection from "../../components/BlogSection/BlogSection";
import TheBlog from "../../components/TheBlog/TheBlog";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';



function PostPage({
  PostpagesData,
  BlogsContent,
  ReadingTime,
  next,
  previous,
}) {
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };
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
  const recentBlogs = getBlogPosts(BlogsContent);
  const blogs = getBlogPosts(BlogsContent);
  const customCodeStyle = {
    ...atomDark,
    lineHeight: '1.4',
  padding: '10px',
  overflowX: 'auto', // Enable horizontal scrolling on smaller screens
  whiteSpace: 'pre-wrap', // Allow the code to wrap
  maxWidth: '100%', // Mak 
  };
  const components = {
 
    h1: (props) => (
      <h1
        {...props}
        id={`${slugify(props.children)}`}
        className={styles.MarkdownLink}
      >
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h1>
    ),
    h2: (props) => (
      <h2
        {...props}
        id={`${slugify(props.children)}`}
        className={styles.MarkdownLink}
      >
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h2>
    ),
    h3: (props) => (
      <h3
        {...props}
        id={`${slugify(props.children)}`}
        className={styles.MarkdownLink}
      >
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h3>
    ),

    h4: (props) => (
      <h3
        {...props}
        id={`${slugify(props.children)}`}
        className={styles.MarkdownLink}
      >
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h3>
    ),
    

    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        return (
          <SyntaxHighlighter
            style={customCodeStyle}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      } else {
        return (
          <code className={styles.code} {...props}>
            {children}
          </code>
        );
      }
    },
    
  };

  return (
    <div className={styles.PostPageContainer}>
      <div className={styles.container}>
        <Navbar />
        <PageProgressIndicator />

        <div className={styles.contentContainer}>
          <div className={styles.divider}></div>
          <div className={styles.textContent}>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }} // Add delay based on index
            >
              <div className={styles.titleandimage}>
              <div className={styles.arrow}>
                <Link href="/posts">
                  <FaArrowLeft size={15} />
                  ../
                </Link>
              </div>
              <h1>{PostpagesData?.frontmatter?.title}</h1>
              <div className={styles.readTimeDate}>
                <p>{ReadingTime} min read</p>•
                <p>{PostpagesData.frontmatter.date}</p>
              </div>
              <Image
                src={PostpagesData?.frontmatter?.image}
                width={600}
                height={300}
                alt=""
                priority={true}
              />
              </div>
            </motion.div>
            

            <div className={styles.ReactMarkdown}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} // Add delay based on index
              >
                <ReactMarkdown components={components}>
                  {PostpagesData?.markdownContent}
                </ReactMarkdown>
              </motion.div>
            </div>
            <div className={styles.buttons}>
              <Link href={`/posts/${previous?.frontmatter?.path}/`}>
                <button
                  disabled={!previous}
                  className={!previous ? styles.disabled : ""}
                >
                  &#8592; &nbsp; Previous Article
                </button>
              </Link>

              <Link href={`/posts/${next?.frontmatter?.path}/`}>
                <button
                  disabled={!next}
                  className={!next ? styles.disabled : ""}
                >
                  {" "}
                  Next Article &nbsp; &#8594;
                </button>
              </Link>
            </div>
          </div>
          {/* <Link href="/posts" className={styles.GoBack}>
              Go Back
            </Link> */}
        </div>
      </div>
      {/* <div className={styles.relatedBlogs}>
        <h1>Related Blogs</h1>
        <div className={styles.relatedCards}>
          {recentBlogs.map((item) => {
            return (
              <Link href={item.slug} key={item.slug}>
                <TheBlog
                  title={item.blogTitle}
                  photo={item.image}
                  readTime={item.readTime}
                  description={item.description}
                  date={item.date}
                />
              </Link>
            );
          })}
        </div>
      </div> */}
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

//

function getBlogPosts(cmsBlogs) {
  const blogs = cmsBlogs
    .map((item) => {
      return {
        slug: item.frontmatter.path,
        image: item.frontmatter.image,
        blogTitle: item.frontmatter.title,
        description: item.frontmatter.description,
        readTime: Math.round(readingTime(item.markdownContent).minutes) || 1,
        date: item.frontmatter.date,
      };
    })
    .slice(0, 3);

  return blogs;
}
//
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
  const ReadingTime =
    Math.round(readingTime(PostpagesData.markdownContent).minutes) || 1;
  const currentPostIndex = BlogsContent.findIndex(
    (p) => p.frontmatter.path === slug
  );
  const previous =
    currentPostIndex > 0 ? BlogsContent[currentPostIndex - 1] : null;
  const next =
    currentPostIndex < BlogsContent.length - 1
      ? BlogsContent[currentPostIndex + 1]
      : null;
  return {
    props: {
      previous,
      next,
      PostpagesData,
      BlogsContent,
      ReadingTime,
    },
  };
}
