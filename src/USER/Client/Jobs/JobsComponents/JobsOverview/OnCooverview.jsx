import './Overview.css';
import dp from '../../../../assets/userdp.svg';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileOverview() {
    const { viewid } = useParams(); // Assuming jobId is passed in the URL
    const [jobs, setJobs] = useState('');
    const [jobData, setJobData] = useState(null);
    const location = useLocation();
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (location.pathname.includes('/client/jobs/ongoing')) {
            setJobs('ongoing');
        } else if (location.pathname.includes('/client/jobs/completed')) {
            setJobs('completed');
        }
    }, [location.pathname]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${API_URL}/api/jobs/getOnGoingJobDetail/${viewid}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setJobData(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        if (viewid) fetchJobDetails();
    }, [viewid]);

    if (!jobData) return <div>Loading job details...</div>;

    return (
        <main className="client-oncooverview-main">
            <section className="client-profileoverview-inner client-oncooverview-inner">
                <img className="client-profileoverview-inner-dp" src={jobData.assignedTo?.profilePic || dp} alt="User" />
                <p className="client-profileoverview-inner-title">{jobData.title}
                    <span className='client-profileoverview-inner-time'>{jobData.createdAt}</span>
                </p>
                <p className="client-profileoverview-inner-threedot">...</p>

                {/* Job Overview Section */}
                <div className="client-profileoverview-inner-des">
                    <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the Project: </span> {jobData.title}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Overview</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Objective: </span> {jobData.description}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Project status</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        {jobData.status === 'ongoing' ? 'Ongoing project, awaiting completion' : 'Completed project'}
                    </p>
                </div>
            </section>

            {/* Freelancer Details */}
            <section className="client-oncooverview-side side1">
                <img className="client-profileoverview-side-dp" src={jobData.assignedTo?.profilePic || dp} alt="User" />
                <p className="client-oncooverview-side-head">{jobData.assignedTo?.name}</p>
                <p className="client-oncooverview-side-type">Freelancer</p>
                <p className="client-oncooverview-side-cost">${jobData.budgetMin} - ${jobData.budgetMax}</p>
            </section>

            {/* Project Deadline and Chat Option */}
            {jobs === 'ongoing' && (
                <section className="client-oncooverview-side side2">
                    <p className="client-oncooverview-side-deadline">Project deadline</p>
                    <p className="client-oncooverview-side-enddate">{jobData.deadline}</p>
                    <p className="client-oncooverview-side-subtxt">
                        Message {jobData.assignedTo?.name}
                    </p>
                    <p className="client-oncooverview-side-chatbtn"><IoChatboxEllipsesOutline /> Chat</p>
                </section>
            )}

            {/* Completed Project Details */}
            {jobs === 'completed' && (
                <section className="client-oncooverview-side side2">
                    <p className="client-oncooverview-side-emoji">🥳</p>
                    <p className="client-oncooverview-side-head">Completed</p>
                    <p className="client-oncooverview-side-subtxt">
                        Project started on {jobData.startDate} and completed on {jobData.endDate}
                    </p>
                </section>
            )}
        </main>
    );
}
