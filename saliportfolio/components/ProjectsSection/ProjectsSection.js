import React from "react";
import styles from "./ProjectsSection.module.scss";
import { motion } from "framer-motion";
import TheBlog from "../TheBlog/TheBlog";
import Link from "next/link";
import readingTime from "reading-time";
import {AiOutlineArrowRight} from 'react-icons/ai';
import TheProject from "../TheProject/TheProject";
import Image from "next/image";
import {Poppins} from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});
const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: ['500'],
});
function ProjectsSection({projects}) {
  
  return (
    <div className={styles.container}>
       
      <div className={styles.projects}>
      <div className={styles.title}>
    <h1 className={poppins.className}>Projects</h1>
    <p className={poppins.className}>Each project is a unique piece of development 🧩</p>
    </div>
      
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
                // style={{ objectFit: "cover" }}
                
                alt=" "
                // priority
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.projectText}>
                <h1 className={poppinsBold.className}>{item.frontmatter.title}</h1>
              <p className={poppins.className}>{item.frontmatter.description}</p>
              <div className={styles.CODEandWEB}>
                <Link href={`/projects/${item.frontmatter.path}`} className={styles.LearnMore}><span className={poppins.className}>Code</span></Link>
                <Link href={`/projects/${item.frontmatter.path}`} className={styles.LearnMore}><span className={poppins.className}>Live Demo</span></Link>
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
