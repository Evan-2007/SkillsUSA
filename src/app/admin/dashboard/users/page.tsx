'use client'
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    interface User {
        username: string;
        [key: string]: any; // This assumes that the user object can have any other keys.
    }
    

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
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.row}>
                    <td className={styles.td}>
                            <th>Username</th>
                        </td>
                        <td className={styles.td}>
                            <th>Permissions</th>
                        </td>
                        <td className={styles.td}>
                            <th>Actions</th>
                        </td>
                    </tr>
                    {users.map(user => (
                        <tr className={styles.row} key={user.username}>
                            <td className={styles.td}>
                                <Link href={'/admin/dashboard/users/' + user.username}>
                                    {user.username}
                                </Link>
                            </td>
                            <td className={styles.td}>
                                 {Object.keys(user).filter(key => user[key] === true && key !== 'username' && key !== "ms").map(trueKey => (
                                    <span key={trueKey} className={styles.permissions}> {trueKey.charAt(0).toUpperCase() + trueKey.slice(1)}</span>

                                ))}
                                <Link href={"/admin/user/editpermissions/" + user.username} className={styles.editPermissions}>Edit </Link>
                            </td>
                            <td className={styles.td}>
                                <Link href={'/admin/dashboard/users/' + user.username}>
                                    <button className={styles.button}>Edit User</button>
                                {user.admin !== 'true' }
                                </Link>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
