import { React, useState } from "react";
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
import { FaArrowLeft } from "react-icons/fa";
import LatestBlogs from "../../components/LatestBlogs/LatestBlogs";
import BlogSection from "../../components/BlogSection/BlogSection";
import TheBlog from "../../components/TheBlog/TheBlog";
import { ScrollLink } from "react-scroll";

// import slugify from "slugify";

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

    code: ({ children }) => <code className={styles.code}>{children}</code>,
  };
  const generateTableOfContents = (markdownContent) => {
    const processor = remark();
    const ast = processor.parse(markdownContent);

    const headings = [];

    const visit = (node, level) => {
      if (node.type === "heading") {
        const id = node.data?.id || slugify(node.children?.[0]?.value || "");
        const text = node.children?.[0]?.value || "";
        headings.push({ level, id, text });
      }

      if (node.children) {
        node.children.forEach((child) => visit(child, level + 1));
      }
    };

    ast.children.forEach((node) => visit(node, 1));

    return headings;
  };
  const GeneratedTableOfContents = generateTableOfContents(
    PostpagesData?.markdownContent
  );
  const [tableOfContents, setTableOfContents] = useState(
    GeneratedTableOfContents
  );
  return (
    <div className={styles.PostPageContainer}>
      <div className={styles.container}>
        <Navbar />
        <PageProgressIndicator />
        <div className={styles.contents}>
          {tableOfContents && tableOfContents.length > 0 && (
            <>
              <h5 className={styles.contentTitle}>Contents</h5>
              <hr className={styles.theLine}></hr>
              <div className={styles.tocContainer}>
                {tableOfContents.map((item) => (
                  <Link
                    // className={`${styles.link} ${
                    //   activeLink === item.id ? styles.isActive : ""
                    // }`}
                    className={styles.scrollLink}
                    style={{ marginLeft: `${item.level * 15}px` }}
                    key={item.id}
                    href={`#${item.id}`}
                    // onClick={() => setActiveLink(item.id)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
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
                priority
              />
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
      <div className={styles.relatedBlogs}>
        <h1>Related Blogs</h1>
        <div className={styles.relatedCards}>
          {recentBlogs.map((item) => {
            console.log(item);
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
      </div>
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
