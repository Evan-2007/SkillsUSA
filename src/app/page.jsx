'use client'
import Image from 'next/image'
import styles from './home.module.css'
import { useEffect, useState } from 'react'
import cookies from 'js-cookie'

export default function Home() {

  
  const [site, setSite] = useState(null);

  useEffect(() => {
    const currentSite = cookies.get('site');
    console.log(currentSite);
    setSite(currentSite);
}, []);


  // setCookie("name", "value", {
  //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  //   httpOnly: true,
  // });

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className={styles.welcometextcon}>
          <p className={styles.welcometext}>
            Welcome to Golden Eagle Skills USA website
          </p>
        </div>
        <Image 
          src='/Trees.jpg'
          alt='Welcome Banner'
          width={1920}
          height={500}
          className={styles.welcomebanner}
        />

      </div>


      <div className={styles.events}>
        <div>
          <p className={styles.upComming}>
            Upcoming Events
          </p>
        </div>
      </div>
    </div>
  )
}
