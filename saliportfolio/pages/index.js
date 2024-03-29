import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar/Navbar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import HomePage from "../components/HomePage/HomePage";
import Experience from "../components/Experience/Experience";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import BlogSection from "../components/BlogSection/BlogSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
import TechStack from "../components/TechStack/TechStack";

export default function Home({ BlogsContent, ProjectsContent }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sali Meholli</title>
        <meta name="description" content="Made with love by Sali" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HomePage />
      <ProjectsSection projects={ProjectsContent}/>
      <TechStack />
      .
      <Experience />
    
      <Contact />
      <BlogSection blogs={BlogsContent} />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
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
  }).slice(0, 3);

  const ProjectsFiles = fs.readdirSync(path.join("content/projects"));
  const ProjectsContent = ProjectsFiles.map((ProjectFilename) => {
    const markDownProject = fs.readFileSync(
      path.join("content/projects", ProjectFilename),
      "utf-8"
    );
    const { data: frontmatter, content: markdownContent } =
      matter(markDownProject);

    return {
      frontmatter,
      markdownContent,
    };
  });

  // console.log(ProjectsContent);


  return {
    props: {
      BlogsContent,
      ProjectsContent
    },
  };
}
