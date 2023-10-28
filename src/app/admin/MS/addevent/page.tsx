'use client'
import axios from 'axios';  // Ensure axios is imported
import React, { useState } from 'react';
import styles from './addevent.module.css';
// import { TuiDatePicker } from 'nextjs-tui-date-picker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function AddEvent (){
    type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [title, setTitle] = useState('');
    const [Body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState<Value>(new Date());
    const [time, setTime] = useState('');

    const site = 'MS';


    const handleSubmit = async (e: (React.SyntheticEvent)) => {
        e.preventDefault();  // Prevent the default form submit action
        
        try {
            const body = { title, Body, location, date, time, site };
            const response = await fetch('/api/ms/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        }

        catch (err) {
            console.error(err);
        }
        // Send a POST request to the API endpoint
        // const response = await axios.post('/api/events', {
        //     title,
        //     Body,
        //     location,
        //     date,
        //     time,
        //     site
        // });
        // console.log(response);
    }

    return (
        <div className={styles.container}>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit} className={styles.container}>
                <input value={title} type="text" placeholder="Event Name" onChange={(e) => setTitle(e.target.value)} />
                <input value={location} type="text" placeholder="Event Location" onChange={(e) => setLocation(e.target.value)} />
                <Calendar onChange={setDate} value={date} className={styles.date} />
                <input value={time} type="text" placeholder="Event Time" onChange={(e) => setTime(e.target.value)} />
                <textarea value={Body} placeholder="Event description" onChange={(e) => setBody(e.target.value)} />
                <button type="submit" style={{ color: 'white' }}>Submit</button> {/* fixed styles to style */}
            </form>
        </div>
    );
}
