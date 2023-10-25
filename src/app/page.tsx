import Image from 'next/image'
import styles from './home.module.css'

export default function Home() {
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
            Up Comming Events
          </p>
        </div>
      </div>
    </div>
  )
}
