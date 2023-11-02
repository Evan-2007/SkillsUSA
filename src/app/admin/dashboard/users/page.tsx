'use client'
import { useRouter } from 'next/navigation';  // Corrected import
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getPerms = async () => {
            try {
                const response = await fetch('/api/auth/createuser', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();
                if (response.status === 200) {
                    setUsers(data.success);
                }
            } catch (error) {
                console.error("Failed to fetch permissions:", error);
            } finally {
                setLoading(false);
            }
        };

        getPerms();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.page}>
                {users.map(user => (
                    <div className={styles.user} key={user.username}>
                        <Link href={'/admin/dashboard/users/' + user.username}>
                            {user.username}
                            {'      '}      
                            Permissions:        
                            {Object.keys(user).filter(key => user[key] === true && key !== 'username').map(trueKey => (
                                <span key={trueKey}> {trueKey.charAt(0).toUpperCase() + trueKey.slice(1)},</span>
                            ))}
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
}
