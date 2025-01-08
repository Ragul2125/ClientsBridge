import './Overview.css';
import dp from '../../../../assets/userdp.svg';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Api_Url = import.meta.env.VITE_BACKEND_URL;

export default function ProfileOverview() {
    const { viewid } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("User is not authenticated. Please log in.");
                    return;
                }

                const response = await axios.get(`${Api_Url}/api/jobs/getDetails/${viewid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setJob(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                console.error("Error fetching job details:", err);
                setError(err.response?.data?.message || "Something went wrong!");
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [viewid]);

    if (loading) {
        return <p>Loading job details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!job) {
        return <p style={{ margin: '3em' }}>Job not found. Please check the URL.</p>;
    }

    return (
        <main className="client-profileoverview-main">
            <div className="client-profileoverview-inner">
                <img className="client-profileoverview-inner-dp" src={dp} alt="User profile" />
                <p className="client-profileoverview-inner-title">
                    {job.postTitle}
                    <span className="client-profileoverview-inner-time">
                        {new Date(job.deadline).toLocaleDateString()}
                    </span>
                </p>
                <p className="client-profileoverview-inner-threedot">...</p>

                <div className="client-profileoverview-inner-des">
                    <p className="client-profileoverview-inner-des-head">Job Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className="client-profileoverview-inner-des-subhead">Title: </span>
                        {job.postTitle}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Job Description</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className="client-profileoverview-inner-des-subhead">Description: </span>
                        {job.description}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Job Status</p>
                    <p className="client-profileoverview-inner-des-subtxt">{job.status}</p>
                </div>

                <Link to="/client/jobs/unassigned" className="client-profileoverview-back-btn">
                    Back to Unassigned Jobs
                </Link>
            </div>
        </main>
    );
}