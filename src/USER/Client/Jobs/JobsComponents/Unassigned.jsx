import { useState } from 'react';
import '../Jobs.css';
import dp from '../../../assets/userdp.svg';
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';

const jobData = [
    {
        id: 1,
        title: 'CreativeTech Solution',
        time: '3 hours ago',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, eius.',
    },
    {
        id: 2,
        title: 'InnovateX Agency',
        time: '5 hours ago',
        description: 'Dolorum harum neque rem maiores repellat quam quo officia.',
    },
    {
        id: 3,
        title: 'TechStar Company',
        time: '1 day ago',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum animi.',
    },
];

export default function Unassigned() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobData.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <div key={job.id} className="client-jobs-unassigned-project-card">
                                <img
                                    className="client-jobs-unassigned-project-card-dp"
                                    src={dp}
                                    alt="DP"
                                />
                                <p className="client-jobs-unassigned-project-card-title">
                                    {job.title}
                                    <span className="client-jobs-unassigned-project-card-time">
                                        {job.time}
                                    </span>
                                </p>
                                <Link to={`${job.id}`} className="client-jobs-unassigned-project-card-btn">View more</Link>
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
