import React from 'react'
import styles from './CTAButton.module.scss';
import {Poppins} from 'next/font/google';
import {AiOutlineArrowRight} from 'react-icons/ai';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

function CTAButtton({background, color}) {
    
  return (
    <div className={styles.buttonContainer}>
    <a href="mailto:salidev.ks@gmail.com" className={styles.button} style={{ backgroundColor: background }}>
      <span className={poppins.className} style={{ color: color}}>Hit me up</span>
      
      <AiOutlineArrowRight className={styles.arrow} style={{ color: color}}/>
    </a>
  </div>
  )
}

export default CTAButtton