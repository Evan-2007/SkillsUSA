import React from 'react';
import styles from './header.module.css';
import Link from 'next/link'


const Header = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.links}>
                    <Link href="#">Home</Link>
                    <Link href="#">Events</Link>
                    <Link href="#">Meet the Officers</Link>
                    <Link href="#">More</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Header;