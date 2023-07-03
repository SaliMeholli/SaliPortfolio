import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialIcons}>
          {/* Add your social media icons and links here */}
          <a href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <p className={styles.copyRight}>
          &copy; 2023 Sali. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
