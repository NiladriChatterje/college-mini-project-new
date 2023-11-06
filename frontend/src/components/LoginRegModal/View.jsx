import React, { useState } from 'react'
import { LoginModal, RegisterModal } from './index'
import Spline from '@splinetool/react-spline';

const View = () => {
    const [toggle, setToggle] = useState(true);
    return (
        <section className='flex w-full h-full justify-center items-center bg-slate-200 fixed top-0 left-0 z-20 justify-center align-center'>
            <Spline style={{ position: 'absolute', zIndex: -1, transform: 'translateY(-250px) scale(0.65)' }} scene="https://prod.spline.design/rE2q7BGhaiGf91w6/scene.splinecode" />
            {toggle ? <LoginModal setToggle={setToggle} /> : <RegisterModal setToggle={setToggle} />}
        </section>
    )
}

export default View