import React from "react";
import styles from "./ProjectsSection.module.scss";
import { motion } from "framer-motion";
import TheBlog from "../TheBlog/TheBlog";
import Link from "next/link";
import readingTime from "reading-time";
import {AiOutlineArrowRight} from 'react-icons/ai';
import TheProject from "../TheProject/TheProject";
import Image from "next/image";
function ProjectsSection({projects}) {
  
  return (
    <div className={styles.container}>
        <div className={styles.title}>
    <h1>Projects</h1>
    </div>
      
      <div className={styles.projects}>
      
        {projects.map((item, index) => (
          <Link
            href={`/projects/${item.frontmatter.path}`}
            key={item.frontmatter.path}
          >
          {/* <TheProject 
           title={item.frontmatter.title} // Use item.frontmatter.title as the prop value
              description={item.frontmatter.description} // Use item.frontmatter.description
              photo={item.frontmatter.image} // Use item.frontmatter.image
              readTime={
                Math.round(readingTime(item.markdownContent).minutes) || 1
              }
              date={item.frontmatter.date} 
              
              /> */}
              <div className={`${styles.card} ${index % 2 === 1 ? styles.odd : styles.even}`}>
        <Image
        src={item.frontmatter.image}
        width={600}
                height={300}
                style={{ objectFit: "cover" }}
                
                alt=" "
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div>
                <h1>{item.frontmatter.title}</h1>
              <p>{item.frontmatter.description}</p>
              <div className={styles.CODEandWEB}>
                <Link href={`/projects/${item.frontmatter.path}`} className={styles.LearnMore}>Code</Link>
                <Link href={`/projects/${item.frontmatter.path}`} className={styles.LearnMore}>Live Demo</Link>
              </div>
                </div>

      </div>
          </Link>
        ))}
      </div>
      </div>
      /* <Link href="/posts" className={styles.showMoreLink}>
        Show More
      </Link> */
   
  );
}

export default ProjectsSection;
