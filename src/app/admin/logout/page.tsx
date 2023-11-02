'use client'
import styles from 'logout.module.css';
import React, { useState, useEffect } from 'react';

export default function Logout() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('/api/auth/logout', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                setError(response.statusText);
                const data = await response.json();
                if (response.status === 200) {
                    window.location.href = '/';
                }
            } catch (err) {
                setLoading(false);
            } finally {
            setLoading(false);
            }; 
        }

        logout();
    }, []);

    if (loading) {
        return (
            <div className="h-screen pt-28 decoration-white text-9xl">
                Logging out...
            </div>
        )
    }

    return (
        <div className="h-screen pt-28 decoration-white text-9xl">
            {error}
            <br />
            <a href="/">click here to return to home</a>
        </div>
    )
}