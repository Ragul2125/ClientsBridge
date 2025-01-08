import './Dashboard.css';
// ----------------------------------- SVG -------------------------------->
import ov1 from '../../assets/overview1.svg';

// -------------------------------------- Icons --------------------------->
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

export default function Dashboard() {
    const [statistics, setStatistics] = useState({
        pending: { count: 0, status: '', value: '' },
        active: { count: 0, status: '', value: '' },
        ongoing: { count: 0, status: '', value: '' },
    });

    const [projectHistory, setProjectHistory] = useState([]);

    const statusColors = {
        accepted:'blue',
        completed: 'green',
        ongoing: '#d92c2c',
        pending: 'red',
    };

    useEffect(() => {
        // Fetch Statistics using Axios
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clStats/statistics`,{
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }); // Backend route for project history
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching project history:', error);
            }
        };

        // Fetch Project History using Axios
        const fetchProjectHistory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`,{
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }); // Backend route for project history
                setProjectHistory(response.data);
            } catch (error) {
                console.error('Error fetching project history:', error);
            }
        };

        fetchStatistics();
        fetchProjectHistory();
    }, []);

    return (
        <>
            <main className="client-dashboard-main">
                <h1 className="client-dashboard-title">Dashboard</h1>
                {/* -----------------------------OVERVIEW---------------------------- */}
                <section className='client-dashboard-overview-section'>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Unassigned Jobs</p>
                        <p className='client-dashboard-overview-card-count'>{statistics.pending.count}</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'>
                            <span className={statistics.pending.status === "increasing" ? "growww" : "downnn"}>{statistics.pending.status === "increasing" ? <IoIosTrendingUp/>: <IoIosTrendingDown/>} </span> 
                            {statistics.pending.value} {statistics.pending.status === "increasing" ? "Up" : "Down"} from last month
                        </p>
                        <Link to='/client/jobs/unassigned' className='client-dashboard-overview-card-btn'>View details</Link>
                    </div>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Ongoing Jobs</p>
                        <p className='client-dashboard-overview-card-count'>{statistics.ongoing.count}</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'>
                            <span className={statistics.ongoing.status === "increasing" ? "growww" : "downnn"}>{statistics.ongoing.status === "increasing" ? <IoIosTrendingUp/>: <IoIosTrendingDown/>} </span> 
                            {statistics.ongoing.value} {statistics.ongoing.status === "increasing" ? "Up" : "Down"} from last month
                        </p>
                        <Link to='/client/jobs/ongoing' className='client-dashboard-overview-card-btn'>View details</Link>
                    </div>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Active Jobs</p>
                        <p className='client-dashboard-overview-card-count'>{statistics.active.count}</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'>
                            <span className={statistics.active.status === "increasing" ? "growww" : "downnn"}>{statistics.active.status === "increasing" ? <IoIosTrendingUp/>: <IoIosTrendingDown/>} </span> 
                            {statistics.active.value} {statistics.active.status === "increasing" ? "Up" : "Down"} from last month
                        </p>
                        <Link to='/client/jobs/active' className='client-dashboard-overview-card-btn'>View details</Link>
                    </div>
                </section>
                {/* -----------------------------PROJECT HISTORY TABLE---------------------------- */}
                <h1 style={{ marginTop: '0.1em' }} className="client-dashboard-title">Project History</h1>
                <section className='client-dashboard-project-history-section'>
                    <div className="client-dashboard-project-history-table-container">
                        <table className="client-dashboard-project-history-table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Order Id</th>
                                    <th>Status</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectHistory.map((project, index) => (
                                    <tr key={index}>
                                        <td className='client-dashboard-project-history-table-imgcon'>
                                            <img src={ov1} alt="" />
                                            {project.postTitle}
                                        </td>
                                        <td>{project.category}</td>
                                        <td style={{color: statusColors[project.status] || 'black'}} >
                                            {project.status}
                                        </td>
                                        <td>{project.deadline.substring(0,10)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
}
