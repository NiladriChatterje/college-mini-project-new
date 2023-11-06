import axios from 'axios';
import React, { useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddRecords = () => {
    const InputRef = useRef({});
    const navigate = useNavigate();
    const { userDetails } = useStateContext();

    async function addRecord(e) {
        e.preventDefault();

        if (!(InputRef.current['event_status'].value && InputRef.current['timestamp'].value &&
            InputRef.current['description'].value && InputRef.current['amount'].value && InputRef.current['location'].value)) {
            toast("fill all the fields");
            return;
        }
        const { data } = await axios.post('http://localhost:8000/addDataToEvent.php', JSON.stringify({
            userID: userDetails?.email,
            event_status: InputRef.current['event_status'].value,
            timestamp: InputRef.current['timestamp'].value,
            description: InputRef.current['description'].value,
            amount: parseFloat(InputRef.current['amount'].value),
            location: InputRef.current['location'].value,

        }));
        if (data)
            navigate('/brief');
    }
    const date = new Date();
    if (userDetails?.email)
        return (
            <div className='flex justify-center w-full'>
                <form onSubmit={addRecord} className='w-full max-w-md'>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Timestamp :
                        </span>
                        <input max={date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay + ' 23:59:00'} type="datetime-local" ref={el => InputRef.current['timestamp'] = el} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="timestamp" />
                    </label>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Spent On :
                        </span>
                        <input type="text" ref={el => InputRef.current['event_status'] = el} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="spent on" />
                    </label>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Description :
                        </span>
                        <textarea ref={el => InputRef.current['description'] = el} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="description of investment"></textarea>
                    </label>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Amount :
                        </span>
                        <input type='number' ref={el => InputRef.current['amount'] = el} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="description of investment" />
                    </label>
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Location :
                        </span>
                        <input type='text' ref={el => InputRef.current['location'] = el} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="description of investment" />
                    </label>
                    <label className="block">
                        <button className="py-5 px-10 mt-5 rounded bg-slate-500 block text-sm font-medium text-white">
                            Submit
                        </button>
                    </label>
                </form>
            </div>
        );
    return <Navigate to={'/'} />
}

export default AddRecords