import React, { useState, useEffect } from 'react'
import completed from "../../../../src/assets/Check.svg"
import './Success.css'
const Success = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    if (!isVisible) {
        return null;
    }
    return (
        <>
            <main className='successmgs'>
                <div className="successmgs-conatainer">
                    <span></span>
                    <div className="mgs">
                        <p>Accepted Successfully</p>
                        <img src={completed} alt="" />
                    </div>
                </div>
            </main>
        </>
    )
}


export default Success;