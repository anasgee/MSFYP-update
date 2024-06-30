import React, { useState } from 'react';
import './ScheduleForm.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduleForm = ({ userId }) => { // Assuming you pass userId as a prop
    const [teacher, setTeacher] = useState('');
    const [searchTeacher, setSearchTeacher] = useState('');
    const [availability, setAvailability] = useState({
        "Monday": { startTime: '', endTime: '', available: false },
        "Tuesday": { startTime: '', endTime: '', available: false },
        "Wednesday": { startTime: '', endTime: '', available: false },
        "Thursday": { startTime: '', endTime: '', available: false },
        "Friday": { startTime: '', endTime: '', available: false },
        "Saturday": { startTime: '', endTime: '', available: false },
        "Sunday": { startTime: '', endTime: '', available: false }
    });
    const [schedule, setSchedule] = useState(null);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const [day, field] = name.split('_');

        if (field === 'startTime' || field === 'endTime') {
            const otherField = field === 'startTime' ? 'endTime' : 'startTime';
            const otherValue = availability[day][otherField];

            if (field === 'startTime' && otherValue && value >= otherValue) {
                toast.error('Start time should be less than end time');
                return;
            } else if (field === 'endTime' && otherValue && value <= otherValue) {
                toast.error('End time should be greater than start time');
                return;
            }
        }

        setAvailability(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: field === 'available' ? checked : value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/schedule', { teacher, availability });
            setSchedule(response.data);
            toast.success('Schedule saved!');
          
            setTeacher('');
            setAvailability({
                "Monday": { startTime: '', endTime: '', available: false },
                "Tuesday": { startTime: '', endTime: '', available: false },
                "Wednesday": { startTime: '', endTime: '', available: false },
                "Thursday": { startTime: '', endTime: '', available: false },
                "Friday": { startTime: '', endTime: '', available: false },
                "Saturday": { startTime: '', endTime: '', available: false },
                "Sunday": { startTime: '', endTime: '', available: false }
            });
            setSchedule(null);
        } catch (error) {
            handleError(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/schedule/${searchTeacher}`);
            const { teacher, availability } = response.data;
            setTeacher(teacher);
            setAvailability(availability);
            setSchedule(response.data);
            toast.success('Schedule loaded!');
        } catch (error) {
            handleError(error);
        }
    };

    // const handleUpdate = async () => {
    //     try {
    //         const response = await axios.put('http://localhost:5000/api/schedule', { teacherId: userId, availability });
    //         setSchedule(response.data);
    //         toast.success('Schedule updated!');
    //     } catch (error) {
    //         handleError(error);
    //     }
    // };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/schedule/${teacher}`);
            resetForm();
            toast.success('Schedule deleted!');
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            const { data } = error.response;
            toast.error(data.message || 'An error occurred', { autoClose: false });
        } else {
            toast.error('An unexpected error occurred', { autoClose: false });
        }
    };

    const resetForm = () => {
        setTeacher('');
        setSearchTeacher('');
        setAvailability({
            "Monday": { startTime: '', endTime: '', available: false },
            "Tuesday": { startTime: '', endTime: '', available: false },
            "Wednesday": { startTime: '', endTime: '', available: false },
            "Thursday": { startTime: '', endTime: '', available: false },
            "Friday": { startTime: '', endTime: '', available: false },
            "Saturday": { startTime: '', endTime: '', available: false },
            "Sunday": { startTime: '', endTime: '', available: false }
        });
        setSchedule(null);
    };

    return (
        <div className='main_Div'>
            <div className='search'>
                <input
                    type="text"
                    value={searchTeacher}
                    onChange={(e) => setSearchTeacher(e.target.value)}
                    placeholder="Search Teacher Name"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Teacher Name:</label>
                    <input 
                        type="text" 
                        value={teacher} 
                        onChange={(e) => setTeacher(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <div className='seTime'>
                    <label>Set Your Availability:</label>
                    <label>Start Time</label>
                    <label>End Time</label>
                    </div>

                    {Object.keys(availability).map(day => (
                        <div className='days' key={day}>
                            <input 
                                type="checkbox" 
                                name={`${day}_available`} 
                                checked={availability[day].available} 
                                onChange={handleChange} 
                            />
                            <label>{day}</label>
                            <div className='time'>
                                <input
                                    type="time"
                                    name={`${day}_startTime`}
                                    value={availability[day].startTime}
                                    onChange={handleChange}
                                    disabled={!availability[day].available}
                                />
                                <input
                                    type="time"
                                    name={`${day}_endTime`}
                                    value={availability[day].endTime}
                                    onChange={handleChange}
                                    disabled={!availability[day].available}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit">Save Schedule</button>
                {schedule && (
                    <div className='buttons'>
                        <button type="button" onClick={handleDelete}>Delete Schedule</button>
                    </div>
                )}
            </form>
            <ToastContainer />
        </div>
    );
};

export default ScheduleForm;
