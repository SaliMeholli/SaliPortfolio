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

const generateTableOfContents = (markdownContent) => {
  const processor = remark();
  const ast = processor.parse(markdownContent);

  const headings = [];
  //q22
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

function PostPage({ PostpagesData, BlogsContent }) {
  const tableOfContents = generateTableOfContents(
    PostpagesData?.markdownContent
  );

  const components = {
    h1: (props) => (
      <h1 {...props} id={`${slugify(props.children)}`}>
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h1>
    ),
    // Define any custom components or overrides here
    h3: (props) => (
      <h3 {...props} id={`${slugify(props.children)}`}>
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h3>
    ),
    h2: (props) => (
      <h2 {...props} id={`${slugify(props.children)}`}>
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h2>
    ),
    h4: (props) => (
      <h3 {...props} id={`${slugify(props.children)}`}>
        <a href={`#${slugify(props.children)}`}>{props.children}</a>
      </h3>
    ),

    code: ({ children }) => <code className={styles.code}>{children}</code>,
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
                <ReactMarkdown components={components}>
                  {PostpagesData?.markdownContent}
                </ReactMarkdown>
              </motion.div>
            </div>
            <Link href="/posts" className={styles.GoBack}>
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/posts"));

  const paths = [];

  const localizedPaths = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(
      path.join("content", "posts", filename),
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

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Read the files in the blogs directory
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
