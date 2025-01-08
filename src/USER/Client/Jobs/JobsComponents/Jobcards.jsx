import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Jobs.css';
import dp from '../../../assets/userdp.svg';
import { GoSearch } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

export default function ActiveJobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const active = [
        {
            id: 1,
            company: 'DataInsight Labs',
            project: 'SalesBoost AI',
            cost: '₹110.40',
            summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsa.',
            applied: '10'

        },
        {
            id: 2,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            applied: '1'
        }, {
            id: 3,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            applied: '130'

        }, {
            id: 4,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            applied: '5'

        }, {
            id: 5,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            applied: '7'

        }, {
            id: 6,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            applied: '19'

        },
    ];
    // ------------------------------------------------------Ongoing ---------------------------------------------------->
    const ongoing = [
        {
            id: 1,
            company: 'DataInsight Labs',
            project: 'SalesBoost AI',
            cost: '₹110.40',
            summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsa.',
            startDate: '2/6/2025',
            endDate: '2/6/2025',
        },
        {
            id: 2,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        },
        {
            id: 3,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 4,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 5,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 6,
            company: 'a',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        },
    ];
    // ------------------------------------------------------completed ---------------------------------------------------->
    const completed = [
        {
            id: 1,
            company: 'DataInsight Labs',
            project: 'SalesBoost AI',
            cost: '₹110.40',
            summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ipsa.',
            startDate: '2/6/2025',
            endDate: '2/6/2025',
        },
        {
            id: 2,
            company: 'hj',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        },
        {
            id: 3,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 4,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 5,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        }, {
            id: 6,
            company: 'TechWorld',
            project: 'AI Analytics',
            cost: '₹200.00',
            summary: 'Harnessing data for better decision-making.',
            startDate: '1/1/2025',
            endDate: '5/1/2025',
        },
    ];
    let jobstatus = '';
    let jobs = []
    if (location.pathname.includes('/client/jobs/active')) {
        jobs = active;
        jobstatus = 'active';
    } else if (location.pathname.includes('/client/jobs/ongoing')) {
        jobs = ongoing;
        jobstatus = 'ongoing';
    } else if (location.pathname.includes('/client/jobs/completed')) {
        jobs = completed;
        jobstatus = 'completed';
    }


    const filteredJobs = jobs.filter(job =>
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="client-jobs-active-main">
            <section className="client-jobs-active-search-section">
                <input
                    placeholder="Search Jobs"
                    type="search"
                    className="client-jobs-active-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="client-jobs-unassigned-search-btn"><GoSearch /></p>
            </section>
            <section className="client-jobs-active-cards-container">
                {filteredJobs.map((job) => (
                    <div
                        key={job.id}
                        className="client-jobs-active-card"
                        onClick={() => navigate(`/client/jobs/${location.pathname.split('/').pop()}/${job.id}`)}
                    >
                        <img className="client-jobs-active-card-img" src={dp} alt="dp" />
                        <p className="client-jobs-active-card-title">
                            {job.company}
                            <span className="client-jobs-active-card-info"> {job.project}</span>
                            <span className="client-jobs-active-card-cost">{job.cost}</span>
                        </p>
                        <p className="client-jobs-active-card-threedot">...</p>

                        <p className="client-jobs-active-card-summary">
                            Summary
                            <p className="client-jobs-active-card-summary-des">{job.summary}</p>
                        </p>
                        {jobstatus === 'active' && (
                            <div className="company-job-card-box">
                                <p className="company-jobs-card-box-sdate">
                                    Status <span className="company-jobs-card-box-live"><GoDotFill style={{ color: '#14ef14', marginTop: '0.1em' }} /> live</span>
                                </p>
                                <p className="company-jobs-card-box-edate">
                                    Applied <span className="company-jobs-card-box-appli">{job.applied} +</span>
                                </p>
                            </div>
                        )}
                        {jobstatus === 'ongoing' && (
                            <div className="company-job-card-box">
                                <p className="company-jobs-card-box-sdate">
                                    Job holder <span className="company-jobs-card-box-live"><img className="company-jobs-card-box-dp" src={dp} alt="dp" /></span>
                                </p>
                                <p className="company-jobs-card-box-edate">
                                    Recent Report <span className="company-jobs-card-box-appli">2 days ago</span>
                                </p>
                            </div>
                        )}
                        {jobstatus === 'completed' && (
                            <div className="company-job-card-box">
                                <p className="company-jobs-card-box-sdate">
                                    Job holder <span className="company-jobs-card-box-live"><img className="company-jobs-card-box-dp" src={dp} alt="dp" /></span>
                                </p>
                                <p className="company-jobs-card-box-edate">
                                    Completed on <span className="company-jobs-card-box-appli">2 Feb 2024</span>
                                </p>
                            </div>
                        )}
                    </div>
                ))}
                {filteredJobs.length === 0 && (
                    <p className="client-jobs-active-no-results">No jobs found.</p>
                )}
            </section>
        </div>
    );
}
