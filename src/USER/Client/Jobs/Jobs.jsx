import './jobs.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
export default function Jobs() {
    const location = useLocation();

    return (
        <>
            <main className="client-jobs-main">
                <div className="client-jobs-tabs-container">
                    <div className="client-jobs-tabs-titles">
                        <Link
                            to="unassigned"
                            className={location.pathname.includes("unassigned") ? "active" : ""}
                        >
                            <p>Unassigned Jobs</p>
                            <p>|</p>
                        </Link>
                        <Link
                            to="active"
                            className={location.pathname.includes("active") ? "active" : ""}
                        >
                            <p>Active Jobs</p>
                            <p>|</p>
                        </Link>
                        <Link
                            to="ongoing"
                            className={location.pathname.includes("ongoing") ? "active" : ""}
                        >
                            <p>Ongoing Jobs</p>
                            <p>|</p>
                        </Link>
                        <Link
                            to="completed"
                            className={location.pathname.includes("completed") ? "active" : ""}
                        >
                            <p>Completed Jobs</p>
                        </Link>
                    </div>
                    <Link to='add' className="client-jobs-newjob-btn"> Add Jobs +</Link>
                </div>
                <Outlet />
            </main>
        </>
    )
}