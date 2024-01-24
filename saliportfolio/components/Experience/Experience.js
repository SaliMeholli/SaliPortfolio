import { useInView } from "react-intersection-observer";
import styles from "./Experience.module.scss";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useRef, useState } from "react";
import CentralLogo from "../../public/images/central-logo.svg";
import UbtLogo from "../../public/images/ubt-logo.svg";
import ProvatarLogo from "../../public/images/Provatar2.svg";
import Image from "next/image";
import Link from "next/link";
import {Montserrat} from 'next/font/google';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'],
});


const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimeline lineColor="#248bcc" className={styles.VerticalTimeline}>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eaeaea", color: "#248bcc" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="02.2023 - 11.2023"
        dateClassName={styles.dateClassName}
        iconStyle={{
          background: "#248bcc",
          color: "#fff",
        }}
        icon={<CentralLogo />}
        // lineColor={"black"}
      >
        <h3 className="vertical-timeline-element-title">CentralSoft</h3>
        <h4 className="vertical-timeline-element-subtitle">Prishtina</h4>
        <p>
          Front-end Frameworks: React, Next. <br />
          Version Control: Git, Bitbucket, GitHub, GitLab etc.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eaeaea", color: "#248bcc" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="11.2022 - 02.2023"
        dateClassName={styles.dateClassName}
        iconStyle={{
          background: "#248bcc",
          color: "#fff",
        }}
        icon={<ProvatarLogo />}
        // lineColor={"black"}
      >
        <h3 className="vertical-timeline-element-title">Provatar</h3>
        <h4 className="vertical-timeline-element-subtitle">Prishtina</h4>
        <p>
          Front-end Frameworks: React, Next. <br />
          Version Control: Git, Bitbucket, GitHub, GitLab etc.
        </p>
      </VerticalTimelineElement>
     
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eaeaea", color: "#248bcc" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="2022 - present"
        dateClassName={styles.dateClassName}
        iconStyle={{ background: "#248bcc", color: "#fff" }}
        icon={<UbtLogo />}
        // lineColor={"red"}
      >
        <h3 className="vertical-timeline-element-title">
          University of Bussiness and Technology
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Prishtina</h4>
        <p>Computer Sciences Student</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};
function Experience() {
  return (
    <div className={styles.container} id="experience">
      <h1 className={montserrat.className}>Experience and Education</h1>

      {/* <motion.div> */}
        <ExperienceCard />
      {/* </motion.div> */}
    </div>
  );
}

export default Experience;
