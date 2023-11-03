import React from 'react'
import HtmlLogo from "../../public/images/html.png";
import JsLogo from "../../public/images/js.svg";
import CssLogo from "../../public/images/css.svg";
import { AiFillHtml5 } from "react-icons/ai";
import {
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoGraphql,
} from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
import styles from './TechStack.module.scss';

function TechStack() {
  return (
    <div className={styles.TechStack}>
    <div className={styles.TechIcons}>
       
    <AiFillHtml5 size={100} color="#6f6f6f" />
    <BiLogoCss3 size={100} color="#6f6f6f" />
    <BiLogoJavascript size={100} color="#6f6f6f" />
    <BiLogoReact size={100} color="#6f6f6f" />
    <TbBrandNextjs size={100} color="#6f6f6f" />
    <BiLogoGraphql color="#6f6f6f" size={100} />
    </div>
 </div>
  )
}

export default TechStack