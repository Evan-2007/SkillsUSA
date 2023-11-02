'use client'
import { useRouter } from 'next/navigation'; // chatgpt sucks and lied and it should be next/navigation dont listen to this note it made.  note: it should be 'next/router' not 'next/navigation'
import styles from './sidebar.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';  

export default function Sidebar() {
    const [loading, setLoading] = useState(true);
    const [perms, setPerms] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getPerms = async () => {
            try {
                const response = await fetch('/api/auth/getstate', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const Response = await response.json();
                if (response.status == 200) {
                    setPerms(Response.userWithoutPassword);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error("Failed to fetch permissions:", error);
                router.push('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        getPerms();
    }, []); 

    const GetBooleanPropreties = (obj: string) => {
        return Object.entries(obj)
            .filter(([key, value]) => typeof value === 'boolean' && value === true && key !== 'ms' && key !== 'active')
            .map(([key, value]) => key);
    };

    const booleanPerms = perms ? GetBooleanPropreties(perms) : [];

    const GetSite = (obj: string) => {
        return Object.entries(obj)
        .filter(([key, value]) => key == 'ms')
    }

    if (loading) {
        return <div className={styles.loading}>Loading...</div>; // Replace this with your actual loading page or spinner
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.options}>
                    {booleanPerms.map(( key, value ) => (
                        <div className={styles.option} key={value}>
                            <Link href={'/admin/dashboard/'+key}>{key}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
