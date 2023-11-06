import { toast } from 'react-hot-toast'
import React, { useRef } from 'react'
import axios from 'axios'

const Registermodal = ({ setToggle }) => {
    const [confirmation, setConfirmation] = React.useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const passwordRef = useRef();

    async function registrationUser(e) {
        setConfirmation(true);
        setTimeout(() => { setConfirmation(false); }, 2000);
        if (!(nameRef.current.value && emailRef.current.value && telRef.current.value && passwordRef.current.value)) {
            toast('Fill The required fields!!');
            return;
        }
        const { data } = await axios.post('http://localhost:8000/registrationToDB.php',
            JSON.stringify({
                name: nameRef.current.value, email: emailRef.current.value
                , tel: telRef.current.value, password: passwordRef.current.value
            }));
        console.log(data);

        if (data == false) { toast.error('user already exist!'); return; }
        if (data) toast.success('data successfully enrolled');
        setToggle(true);
    }

    return (
        <>

            <section className='w-full max-w-lg mt-80 flex-col'>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Name :
                    </span>
                    <input type="text" ref={nameRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Password" />
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        E-Mail :
                    </span>
                    <input type="email" ref={emailRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="email" />
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Password :
                    </span>
                    <input type="password" ref={passwordRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Password" />
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Phone :
                    </span>
                    <input type="password" ref={telRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Password" />
                </label>
                <div className='flex w-full justify-between items-center gap-50 mt-5'>
                    <button onClick={registrationUser} className='bg-slate-600 rounded text-white px-10 py-4' >submit</button>
                    <span style={{ cursor: 'pointer' }} onClick={() => setToggle(true)}>Login</span>
                </div>
            </section>
        </>
    )
}

export default Registermodal