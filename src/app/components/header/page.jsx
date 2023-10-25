import React from 'react';
import styles from './header.module.css';
import Link from 'next/link'
import Image from 'next/image'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';


const NavBar = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
                <a href='https://www.skillsusa.org/' target='_blank'>
                    <Image 
                        src='/SkillsUSA.png'
                        alt='SkillsUSA logo'
                        width={115}
                        height={115}
                        className={styles.logo}
                    />
                </a>
                <div className={styles.links}>

                    <Link className={styles.link} href="/">Home</Link>
                    <Link href="/Events" className={styles.link} >Events</Link>
                    <Link href="/Officers" className={styles.link} >Meet the Officers</Link>
                    <Link href="#" className={styles.link} >More</Link>
                </div>
            </div>
        </div>
     );
}
 
export default NavBar;