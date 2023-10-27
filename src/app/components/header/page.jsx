'use client'
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation'



export default function NavBar() {

    const Router = useRouter();

    const [site, setSite] = useState(null);

    useEffect(() => {
        const currentSite = cookies.get('site');
        if (currentSite === undefined) {
            cookies.set('site', 'Mt Shasta', { path: '/' });
            setSite('Mt Shasta');
            return;
        }
        console.log(currentSite);
        setSite(currentSite);
    }, []);

    const toggleSite = () => {
        const newSite = site === 'Yreka' ? 'Mt Shasta' : 'Yreka';
        cookies.set('site', newSite, { path: '/' });
        setSite(newSite);
        Router.push('/')
    };

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <a href="https://www.skillsusa.org/" target="_blank">
                <Image
                    src="/SkillsUSA.png"
                    alt="SkillsUSA logo"
                    width={115}
                    height={115}
                    className={styles.logo}
                />
            </a>
            <div className={styles.links}>
                <Link className={styles.link} href="/">
                    Home
                </Link>
                <Link href="/Events" className={styles.link}>
                    Events
                </Link>
                <Link href="/Officers" className={styles.link}>
                    Meet the Officers
                </Link>
                <Link href="#" className={styles.link}>
                    More
                </Link>
            </div>
                <div className={styles.selectsite}> 
                    <button onClick={toggleSite} >
                        {site ? `You are currently viewing the  ${site} site. Click Here to switch to ${site === 'Yreka' ? 'Mt Shasta' : 'Yreka'} site` : 'Loading...'}
                    </button>
                </div>
            </div>
        </div>
    );
}