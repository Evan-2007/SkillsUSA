import styles from "./footer.module.css";

const Footer = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.footer}>
                <p>Footer</p>
                <a href="https://github.com/Evan-2007/SkillsUSA/issues" target='_blank' ><h1>If you are having any issues please report it here </h1>https://github.com/Evan-2007/SkillsUSA/issues</a>
            </div>
        </div>
     );
}
 
export default Footer;