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
    console.log(job)

    return (
        <main className="client-profileoverview-main">
            <section className="client-profileoverview-inner client-oncooverview-inner">
        {/* <img className="client-profileoverview-inner-dp" src={dp} alt="User" /> */}
        <p className="client-profileoverview-inner-title">
          <h1>{job.postTitle}</h1>
          <span className="client-profileoverview-inner-time">
          {new Date(job.deadline).toLocaleDateString()}
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
            {job.description}
          </p>
          <div className="client-profileoverview-inner-side-byside">
            <div>
              {" "}
              <p className="client-profileoverview-inner-des-head">Deadline</p>
              <p className="client-profileoverview-inner-des-subtxt">
              {new Date(job.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Budget</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {job.budget}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Category</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {job.category}
              </p>
            </div>
          </div>

          <p className="client-profileoverview-inner-des-head">Tags</p>
          <p className="client-profileoverview-inner-des-tags">
            {job.tags.map((tag, i) => (
              <p className="job-tag-seps">{tag}</p>
            ))}
          </p>
          <p className="client-profileoverview-inner-des-head">Files</p>
          <p className="client-profileoverview-inner-des-file">
            {job.files.map((file, i) => (
              <p>
                <a href={file}>file {i + 1}</a>
              </p>
            ))}
          </p>
        </div>
      </section>
        </main>
    );
}
