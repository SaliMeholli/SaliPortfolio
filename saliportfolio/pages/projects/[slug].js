import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from '../projects/ProjectPage.module.scss';
import TheBlog from "../../components/TheBlog/TheBlog";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import LatestBlogs from "../../components/LatestBlogs/LatestBlogs";
import SocialIcons from "../../components/socialIcons/SocialIcons";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import ReactMarkdown from "react-markdown";
function posts({ ProjectpagesData, ProjectsContent, ReadingTime, next, previous }) {

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
  return (
    <div className={styles.container}>
      <Navbar />
      {/* <ReactMarkdown components={components}>
                  {ProjectpagesData?.markdownContent}
                </ReactMarkdown>
                 */}
     <div className={styles.ProjectBanner}>
  <div className={styles.overlay}></div>
  <div className={styles.textContent}>
  <h1>{ProjectpagesData?.frontmatter?.title}</h1>
  <p>{ProjectpagesData?.frontmatter?.description}</p>
  </div>
  
  <Image src={ProjectpagesData.frontmatter.image} fill className={styles.BannerImage} alt="" />
  
</div>

      <Contact />
      <Footer />
    </div>
  );
}

export default posts;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/projects"));

  const paths = [];

  const localizedPaths = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(
      path.join("content", "projects", filename),
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

  const ProjectsFiles = fs.readdirSync(path.join("content/projects"));


  const ProjectsContent = ProjectsFiles.map((ProjectsFilename) => {
    const markDownProject = fs.readFileSync(
      path.join("content/projects", ProjectsFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownProject);

    return {
      frontmatter, 
      markdownContent,
    };
  });

  const ProjectpagesData = ProjectsContent.find(
    (Projectpage) => Projectpage.frontmatter.path === slug
  );
  const ReadingTime =
    Math.round(readingTime(ProjectpagesData.markdownContent).minutes) || 1;
  const currentPostIndex = ProjectsContent.findIndex(
    (p) => p.frontmatter.path === slug
  );
  const previous =
    currentPostIndex > 0 ? ProjectsContent[currentPostIndex - 1] : null;
  const next =
    currentPostIndex < ProjectsContent.length - 1
      ? ProjectsContent[currentPostIndex + 1]
      : null;
  return {
    props: {
      previous,
      next,
      ProjectpagesData,
      ProjectsContent,
      ReadingTime,
    },
  };
}
 