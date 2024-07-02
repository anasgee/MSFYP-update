

import React, { useState } from 'react';
import "./ScheduleView.css"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduleView = () => {
    const [teacher, setTeacher] = useState('');
    const [schedule, setSchedule] = useState(null);

    const handleSearch = async () => {
        try {
            if (!teacher) {
                toast.error('Please enter a teacher name', { autoClose: true });
                return;
            }
    
            const response = await axios.get(`http://localhost:5000/api/schedule/${teacher}`);
            setSchedule(response.data);
            toast.success("Hurrah! Schedule Found Successfully")
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                setSchedule("");
                toast.error(data.message || 'An error occurred', { autoClose: true });
            } else {
                toast.error('An unexpected error occurred', { autoClose: true });
            }
        }
    };
    

    const getDayStyle = (available) => ({
        color: available ? 'green' : 'red',
        // textDecoration: available ? 'none': 'line-through',
        // fontWeight: available? "bolder":"lighter"
    });

    const getTimeStyle = () => ({
        color: 'blue'
    });

    return (
        <div className='main_div'>
        <div className='div'>
            <div className='divInner'>
                <h1 className='mb-3 mx-auto'>View Schedule</h1>
                <input 
                    type="text" 
                    value={teacher} 
                    onChange={(e) => setTeacher(e.target.value)} 
                    placeholder='Enter Teacher Name'
                />
                <button onClick={handleSearch}>Search Schedule</button>
            </div>
            {schedule && (
                <div>
                    <h3>Schedule for {schedule.teacher}</h3>
                    <ul className='li'>
                        {Object.keys(schedule.availability).map(day => (
                            <li key={day}>
                                <span style={getDayStyle(schedule.availability[day].available)}>
                                    {day}: {schedule.availability[day].available ? 'Available' : 'Not Available'}
                                </span>
                                {schedule.availability[day].available && (
                                    <span style={getTimeStyle()}>
                                        {` from ${schedule.availability[day].startTime} to ${schedule.availability[day].endTime}`}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ToastContainer />
        </div>
        </div>
    );
};

export default ScheduleView;
