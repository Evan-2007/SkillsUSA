'use client'
import { useState } from 'react'
import styles from './addevent.module.css'

export default function AddEvent (){
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const site = 'YLC'


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({title, body, location, date, time, site})
    }
    return (
        <div className={styles.container}>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit} className={styles.container}>
                <input value={title} type="text" placeholder="Event Name" onChange={(e) => setTitle(e.target.value)} />
                <input value={location} type="text" placeholder="Event Location" onChange={(e) => setLocation(e.target.value)} />
                <input value={date} type="text" placeholder="Event Date" onChange={(e) => setDate(e.target.value)} />
                <input value={time} type="text" placeholder="Event Time" onChange={(e) => setTime(e.target.value)} />
                <textarea value={body} placeholder="Event description" onChange={(e) => setBody(e.target.value)} />
                <button type="submit" styles="text-white">Submit</button>
            </form>
        </div>
    )
}