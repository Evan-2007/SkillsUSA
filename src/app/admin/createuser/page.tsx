'use client'
import styles from './page.module.css';
import React, { useState } from 'react';




export default function AddEvent (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [ms, setSite] = useState<boolean>(false);
    const [documents, SetDocuments] = useState<boolean>(false);
    const [events, setEvents] = useState<boolean>(false);
    const [users, setUsers] = useState<boolean>(false);
    const [officers, setOfficers] = useState<boolean>(false);
    const [news, setNews] = useState<boolean>(false);



    const handlSubmit = async (e: (React.SyntheticEvent)) => {
        e.preventDefault();  // Prevent the default form submit action
        
        try {
            const body = { username, password, confirmpassword, ms, documents, events, users, officers, news };
            console.log(body);
            const response = await fetch('/api/auth/createuser', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(body)
            });
        }

        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logincontainer}>
                <h6 className='text-6xl'>Create User</h6>
                <br />
                <div className={styles.formcontainer}>
                    <form onSubmit={handlSubmit} className={styles.form}>
                        <input className={styles.input} value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input className={styles.input} value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <input className={styles.input} value={confirmpassword} type="password" placeholder="Retype Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className={styles.perms}>

                            <p>Set User Permissions Below</p>
                            <p className={styles.warning}>(Giving an account the user premission will allow them to add other premissions to their account)</p>
                            <div className={styles.permission_row1}>
                                <div className={styles.checkboxcontainer}>
                                    <p>Events</p>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox" 
                                        checked={events}
                                        onChange={(e) => setEvents(e.target.checked)}
                                    />
                                </div>

                                <div className={styles.checkboxcontainer}>
                                    <p>Users</p>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox" 
                                        checked={users}
                                        onChange={(e) => setUsers(e.target.checked)}
                                    />
                                </div>
                            </div>

                            <div className={styles.permission_row2}>
                                <div className={styles.checkboxcontainer}>
                                    <p>Officers</p>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox" 
                                        checked={officers}
                                        onChange={(e) => setOfficers(e.target.checked)}
                                    />
                                </div>

                                <div className={styles.checkboxcontainer}>
                                    <p>News</p>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox" 
                                        checked={news}
                                        onChange={(e) => setNews(e.target.checked)}
                                    />
                                </div>
                                
                                <div className={styles.checkboxcontainer}>
                                    <p>Documents</p>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox" 
                                        checked={documents}
                                        onChange={(e) => SetDocuments(e.target.checked)}
                                    />
                                </div> 
                            </div>
                        </div>
                        <button className={styles.submit} type="submit" style={{ color: 'white' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}