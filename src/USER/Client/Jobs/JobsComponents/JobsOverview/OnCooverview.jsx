import './Overview.css';
import dp from '../../../../assets/userdp.svg';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProfileOverview() {
    const [jobs, setJobs] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/client/jobs/ongoing')) {
            setJobs('ongoing');
        } else if (location.pathname.includes('/client/jobs/completed')) {
            setJobs('completed');
        }
    }, [location.pathname]);

    return (
        <main className="client-oncooverview-main">
            <section className="client-profileoverview-inner client-oncooverview-inner">
                <img className="client-profileoverview-inner-dp" src={dp} alt="User" />
                <p className="client-profileoverview-inner-title">CreativeTech Solution
                    <span className='client-profileoverview-inner-time'>3 hours ago </span>
                </p>
                <p className="client-profileoverview-inner-threedot">...</p>

                {/* --------------------------------------------------------------------DESC------------------ */}
                <div className="client-profileoverview-inner-des">
                    <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the Project: </span> Mobile E-Commerce Application
                    </p>

                    <p className="client-profileoverview-inner-des-head">Overview</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Objective: </span> Developed a machine learning model to predict future sales based on historical data. The project involved preprocessing large datasets, feature engineering, and applying regression algorithms to achieve accurate sales predictions.
                    </p>

                    <p className="client-profileoverview-inner-des-head">Project status</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        This project has been reviewed and selected by the admin at QuantumEdge Technologies, reflecting its alignment with the platform's standards and objectives.
                    </p>
                </div>
            </section>
            <section className="client-oncooverview-side side1">
                <img className="client-profileoverview-side-dp" src={dp} alt="User" />
                <p className="client-oncooverview-side-head">DataInsight Labs</p>
                <p className="client-oncooverview-side-type">Freelancer</p>
                <p className="client-oncooverview-side-cost">$900 - $1000</p>
            </section>


            {jobs === 'ongoing' && (
                <>


                    <section className="client-oncooverview-side side2">
                        <p className="client-oncooverview-side-deadline">Project deadline</p>
                        <p className="client-oncooverview-side-enddate">5/11/2025</p>
                        <p className="client-oncooverview-side-subtxt">
                            Message DataInsight Labs
                        </p>
                        <p className="client-oncooverview-side-chatbtn"><IoChatboxEllipsesOutline /> Chat</p>
                    </section>
                </>
            )}

            {jobs === 'completed' && (
                <>

                    <section className="client-oncooverview-side side2">
                        <p className="client-oncooverview-side-emoji">🥳</p>
                        <p className="client-oncooverview-side-head">Completed</p>
                        <p className="client-oncooverview-side-subtxt">
                            Project started at 2/3/2024 and completed on 2/5/2025
                        </p>
                    </section>
                </>
            )}
        </main>
    );
}
