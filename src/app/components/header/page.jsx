'use client'
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function NavBar() {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(false);
    const router = useRouter();

        useEffect(() => {
                const getState = async () => {
                    try {
                        const response = await fetch('/api/auth/getstate', {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        })
                        const data = await response.json();


                        if (response.status == 200) {
                            setState(true);
                        }


                    } catch (error) {
                        console.error("Failed to fetch permissions:", error);
                        setState(false);
                    } finally {
                        setLoading(false);
                    }

                }
            getState();
            

    }, []);


    const [site, setSite] = useState(false);

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
        cookies.set('site', newSite, { path: '/', expires: 365 });
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
                    News
                </Link>

                


                    {state ? <Link href ="/admin/dashboard" className={styles.link}>Admin Dashboard</Link>: <Link href ="/admin/login" className={styles.link}>Login</Link>}

                {state ? <Link href="/admin/logout" className={styles.link}>Logout</Link>: null}

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