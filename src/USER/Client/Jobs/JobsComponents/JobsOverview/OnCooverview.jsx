import './Overview.css';
import dp from '../../../../assets/userdp.svg';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileOverview() {
    const { viewid } = useParams(); // Assuming jobId is passed in the URL
    const navigate = useNavigate();
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
    const handleCompleteJob = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/api/jobs/complete/${viewid}`, // Adjust the route based on your backend
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert(response.data.message); // Show success message
            // Update local jobData state to reflect completed status
            setJobData((prevData) => ({
                ...prevData,
                status: "completed",
            }));
            setJobs('completed'); 
            navigate("/client/jobs/completed")
        } catch (error) {
            console.error("Error completing the job:", error);
            alert("Failed to mark the job as completed.");
        }
    };
    if (!jobData) return <div>Loading job details...</div>;

    return (
        <main className="client-oncooverview-main">
            <section className="client-profileoverview-inner client-oncooverview-inner">
                {/* <img className="client-profileoverview-inner-dp" src={dp} alt="User" /> */}
                <p className="client-profileoverview-inner-title">
                    <h1>{jobData.postTitle}</h1>
                    <span className="client-profileoverview-inner-time">
                        {new Date(jobData.deadline).toLocaleDateString()}
                    </span>
                </p>
                <p className="client-profileoverview-inner-threedot">...</p>

                {/* --------------------------------------------------------------------DESC------------------ */}
                <div className="client-profileoverview-inner-des">
                    {/* <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the Project: </span> Mobile E-Commerce Application
                    </p> */}

                    <p className="client-profileoverview-inner-des-head">Overview</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        {jobData.description}
                    </p>
                    <div className="client-profileoverview-inner-side-byside">
                        <div>
                            {" "}
                            <p className="client-profileoverview-inner-des-head">Deadline</p>
                            <p className="client-profileoverview-inner-des-subtxt">
                                {new Date(jobData.deadline).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="client-profileoverview-inner-des-head">Budget</p>
                            <p className="client-profileoverview-inner-des-subtxt">
                                {jobData.budget}
                            </p>
                        </div>
                        <div>
                            <p className="client-profileoverview-inner-des-head">Category</p>
                            <p className="client-profileoverview-inner-des-subtxt">
                                {jobData.category}
                            </p>
                        </div>
                    </div>

                    <p className="client-profileoverview-inner-des-head">Tags</p>
                    <p className="client-profileoverview-inner-des-tags">
                        {jobData.tags.map((tag, i) => (
                            <p className="job-tag-seps">{tag}</p>
                        ))}
                    </p>
                    <p className="client-profileoverview-inner-des-head">Files</p>
                    <p className="client-profileoverview-inner-des-file">
                        {jobData.files.map((file, i) => (
                            <p>
                                <a href={file}>file {i + 1}</a>
                            </p>
                        ))}
                    </p>
                </div>
            </section>

            {/* Freelancer Details */}
            <section className="client-oncooverview-side side1">
                <img className="client-profileoverview-side-dp" src={jobData.assignedTo?.profilePic || dp} alt="User" />
                <p className="client-oncooverview-side-head">{jobData.assignedTo?.userName}</p>
                <p className="client-oncooverview-side-head">{jobData.assignedTo?.name}</p>
                <p className="client-oncooverview-side-type">Freelancer</p>
            </section>

            {/* Project Deadline and Chat Option */}
            {jobs === 'ongoing' && (
                <section className="client-oncooverview-side side2">
                    <p className="client-oncooverview-side-deadline">Project deadline</p>
                    <p className="client-oncooverview-side-enddate">{new Date(jobData.deadline).toLocaleDateString()}</p>
                    <p className="client-oncooverview-side-subtxt">
                        Message {jobData.assignedTo?.name}
                    </p>
                    <p className="client-oncooverview-side-chatbtn"><IoChatboxEllipsesOutline /> Chat</p>
                    <button className='complete-btn' onClick={handleCompleteJob}> Mark as completed</button>
        
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
