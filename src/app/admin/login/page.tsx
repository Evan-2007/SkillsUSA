'use client'
import styles from './page.module.css';
import React, { useState } from 'react';
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { error } from 'console';
import { errorMonitor } from 'events';

export default function AddEvent (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [serverResponse, setServerResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter()
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
            
            if (response.status == 200) {
                router.push('/admin/dashboard')
            }
            else {
                console.log(Response)
                setServerResponse(Response.message);
            }
        }

        catch (err) {
            console.error(err);
            console.log(Response)
            const error = JSON.stringify(err);
            setErrorMessage('Response');
            console.log(error)
            //console.log(Response)
        }
        console.log(serverResponse)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logincontainer}>
                <h6 className='text-6xl'>Log In</h6>
                <br />
                {serverResponse && serverResponse && <p>{serverResponse}</p>}
                <p>{serverResponse}</p>
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