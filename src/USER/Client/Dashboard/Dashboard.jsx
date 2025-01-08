import './Dashboard.css';
// ----------------------------------- SVG -------------------------------->
import ov1 from '../../assets/overview1.svg';

// -------------------------------------- Icons --------------------------->
import { IoIosTrendingUp } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const projectHistoryData = [
        {
            projectName: 'Project A',
            orderId: 'ORD12345',
            status: 'Completed',
            deadline: '2025-01-10',
            imgSrc: ov1,
        },
        {
            projectName: 'Project B',
            orderId: 'ORD67890',
            status: 'Ongoing',
            deadline: '2025-01-15',
            imgSrc: ov1,
        },
        {
            projectName: 'Project C',
            orderId: 'ORD54321',
            status: 'Pending',
            deadline: '2025-01-20',
            imgSrc: ov1,
        },
        {
            projectName: 'Project D',
            orderId: 'ORD58321',
            status: 'Pending',
            deadline: '2025-08-20',
            imgSrc: ov1,
        }
    ];

    const statusColors = {
        Completed: '#5d975d',
        Ongoing: '#d92c2c',
        Pending: '#8181eb',
    };

    return (
        <>
            <main className="client-dashboard-main">
                <h1 className="client-dashboard-title">Dashboard</h1>
                {/* -----------------------------OVERVIEW---------------------------- */}
                <section className='client-dashboard-overview-section'>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Unassigned Jobs</p>
                        <p className='client-dashboard-overview-card-count'>10</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'><span><IoIosTrendingUp /> </span> 10% Up from yesterday</p>
                        <Link to='/client/jobs/unassigned' className='client-dashboard-overview-card-btn'>View details</Link>
                    </div>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Ongoing Jobs</p>
                        <p className='client-dashboard-overview-card-count'>4</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'><span><IoIosTrendingUp /> </span> 1.2% Up from yesterday</p>
                        <Link to='/client/jobs/ongoing' className='client-dashboard-overview-card-btn'>View details</Link>
                    </div>
                    <div className='client-dashboard-overview-card'>
                        <p className='client-dashboard-overview-card-head'>Completed Jobs</p>
                        <p className='client-dashboard-overview-card-count'>7</p>
                        <img className='client-dashboard-overview-card-img' src={ov1} alt="ov1" />
                        <p className='client-dashboard-overview-card-growth'><span><IoIosTrendingUp /> </span> 8% Up from yesterday</p>
                        <Link to='/client/jobs/completed' className='client-dashboard-overview-card-btn'>View details</Link>
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
                                {projectHistoryData.map((project, index) => (
                                    <tr key={index}>
                                        <td className='client-dashboard-project-history-table-imgcon'>
                                            <img src={project.imgSrc} alt="" />
                                            {project.projectName}
                                        </td>
                                        <td>{project.orderId}</td>
                                        <td style={{color: statusColors[project.status] || 'black'}} >
                                            {project.status}
                                        </td>
                                        <td>{project.deadline}</td>
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
