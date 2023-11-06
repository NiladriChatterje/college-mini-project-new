import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios'
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';


const LoginModal = ({ setToggle }) => {
    const navigate = useNavigate();
    const { setUserDetails, userDetails } = useStateContext();
    const [Validate, setValidate] = useState(false);
    const [OTP, setOTP] = useState(-1);
    //const navigate = useNavigate();
    const validateRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    React.useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userDetails));
    }, [userDetails?.email]);

    async function isSuccessFromDatabase() {
        try {
            const { data } = await axios.post('http://localhost:8000/credenCheck.php',
                JSON.stringify({ email: usernameRef.current.value, password: passwordRef.current.value }));
            console.log(data)
            if (data) {
                setUserDetails({ name: data?.user_name, email: data?.user_email })
                return true;
            }
        } catch (e) {

        }
        return false;
    }

    async function credentialLogin(e) {
        e.preventDefault();
        if (!(usernameRef.current.value && passwordRef.current.value)) {
            toast('Please Fill the fields'); return;
        }
        const result = await isSuccessFromDatabase()
        if (result) {
            let OTP = Math.trunc((Math.random() * 1000000));
            setValidate(true);
            /*await axios.post('http://localhost:5000/send_email', {
                recipient: usernameRef.current.value,
                confirmation: OTP
            });*/
            toast('OTP sent')
            setOTP(OTP);
        }
        else toast.error('No records found');

    }

    function validation(e) {
        toast(OTP)
        if (OTP == parseInt(validateRef?.current?.value)) {
            toast.success("OTP verified");
            navigate('/brief')
            return true
        }
    }
    return (
        <>

            <section className='w-full max-w-lg flex flex-col mt-60'>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        E-Mail :
                    </span>
                    <input type="email" ref={usernameRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="email" />
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Password :
                    </span>
                    <input type="password" ref={passwordRef} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Password" />
                </label>
                <div className="flex w-full gap-10 justify-between  mt-5">
                    <input type={'password'} ref={validateRef} style={{ display: Validate ? 'inline-block' : 'none' }}
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    /><button style={{ display: Validate ? 'inline-block' : 'none' }} onClick={validation} className='py-3 px-10 bg-slate-700 rounded text-white'>Verify</button>
                </div>
                <div className='flex w-full justify-between items-center gap-50 mt-2'>
                    <button onClick={credentialLogin} className='bg-slate-600 rounded text-white px-10 py-4' >submit</button>
                    <span style={{ cursor: 'pointer' }} onClick={() => setToggle(false)}>Register</span>
                </div>
            </section>

        </>
    );

}

export default LoginModal;
