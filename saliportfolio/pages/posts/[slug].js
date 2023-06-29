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

function PostPage({ PostpagesData }) {
  const tableOfContents = generateTableOfContents(
    PostpagesData?.markdownContent
  );
  console.log(tableOfContents);

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

    code: ({ children }) => <code className={classes.code}>{children}</code>,
  };
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.textContainer}>
        <div className={styles.textContent}>
          <Image
            src={PostpagesData.frontmatter.image}
            width={600}
            height={300}
            alt=""
          />
          <h1>{PostpagesData.frontmatter.title}</h1>
          <div className={styles.ReactMarkdown}>
            <ReactMarkdown components={components}>
              {PostpagesData?.markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
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

  console.log(PostpagesData.frontmatter.path);
  return {
    props: {
      PostpagesData,

      BlogsContent: BlogsContent,
    },
  };
}
