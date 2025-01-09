import { useState, useEffect } from 'react';
import '../Jobs.css';
import dp from '../../../assets/userdp.svg';
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_Url = import.meta.env.VITE_BACKEND_URL;

export default function Unassigned() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("User is not authenticated. Please log in.");
                    return;
                }

                const response = await axios.get(`${API_Url}/api/jobs/pendingJobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setJobs(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching pending jobs:", err);
                setError(err.response?.data?.message || "Something went wrong!");
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="client-jobs-unassigned-main">
            <section className="client-jobs-unassigned-search-section">
                <input
                    placeholder="Search Jobs"
                    type="search"
                    className="client-jobs-unassigned-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="client-jobs-unassigned-search-btn"><GoSearch /></p>
            </section>
            <section className="client-jobs-unassigned-project-section">
                <div className="client-jobs-unassigned-project-inner">
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <div key={job._id} className="client-jobs-unassigned-project-card">
                                <img
                                    className="client-jobs-unassigned-project-card-dp"
                                    src={dp}
                                    alt="DP"
                                />
                                <p className="client-jobs-unassigned-project-card-title">
                                    {job.postTitle}
                                    <span className="client-jobs-unassigned-project-card-time">
                                        {new Date(job.deadline).toLocaleDateString()}
                                    </span>
                                </p>
                                <Link to={`${job._id}`} className="client-jobs-unassigned-project-card-btn">View more</Link>
                                <p className="client-jobs-unassigned-project-card-description">
                                    {job.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No jobs found.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
