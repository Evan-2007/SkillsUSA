'use client'
import styles from './page.module.css';
import React, { useState } from 'react';
import cookies from 'js-cookie'

export default function AddEvent (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handlSubmit = async (e: (React.SyntheticEvent)) => {
        e.preventDefault();  // Prevent the default form submit action
        
        try {
            const body = { username, password };
            console.log(body);
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(body);
            const Response = await response.json();
            console.log(Response)
            
            if (Response.token) {
                cookies.set('session_token', Response.token, { expires: 7 });
                window.location.href = '/admin';
            }
            else {
                console.log(Response)
            }
        }

        catch (err) {
            console.error(err);
            console.log(Response)
            //console.log(Response)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logincontainer}>
                <h6 className='text-6xl'>Log In</h6>
                <br />
                <p className='text-xs'>If you do not have login information please request it from an administrator</p>
                <div className={styles.formcontainer}>
                    <form onSubmit={handlSubmit} className={styles.form}>
                        <input className={styles.input} value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input className={styles.input} value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button className={styles.submit} type="submit" style={{ color: 'white' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}