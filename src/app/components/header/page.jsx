import React from 'react';
import styles from './header.module.css';
import Link from 'next/link'


const NavBar = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
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