import { useParams } from 'react-router-dom';
import './Overview.css';
import dp from '../../../../assets/userdp.svg';

const projectData = [
    {
        id: '1',
        title: 'CreativeTech Solution',
        time: '3 hours ago',
        projectName: 'Mobile E-Commerce Application',
        objective: 'Developed a machine learning model to predict future sales based on historical data. The project involved preprocessing large datasets, feature engineering, and applying regression algorithms to achieve accurate sales predictions.',
        status: 'This project has been reviewed and selected by the admin at QuantumEdge Technologies, reflecting its alignment with the platform\'s standards and objectives.',
    },
    {
        id: '2',
        title: 'InnovateX Agency',
        time: '5 hours ago',
        projectName: 'AI-Powered Chatbot Development',
        objective: 'Built an AI-driven chatbot to enhance customer support for an e-commerce platform. Utilized natural language processing (NLP) and machine learning techniques.',
        status: 'This project is under review for deployment at InnovateX Agency.',
    },
];

export default function ProfileOverview() {
    const { viewid } = useParams();

    const project = projectData.find((p) => p.id === viewid);

    if (!project) {
        return <p style={{ margin: '3em' }}>Project not found. Please check the URL.</p>;
    }

    return (
        <main className="client-profileoverview-main">
            <div className="client-profileoverview-inner">
                <img className="client-profileoverview-inner-dp" src={dp} alt="User profile" />
                <p className="client-profileoverview-inner-title">
                    {project.title}
                    <span className="client-profileoverview-inner-time">{project.time}</span>
                </p>
                <p className="client-profileoverview-inner-threedot">...</p>

                <div className="client-profileoverview-inner-des">
                    <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className="client-profileoverview-inner-des-subhead">Name of the Project: </span>
                        {project.projectName}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Overview</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className="client-profileoverview-inner-des-subhead">Objective: </span>
                        {project.objective}
                    </p>

                    <p className="client-profileoverview-inner-des-head">Project Status</p>
                    <p className="client-profileoverview-inner-des-subtxt">{project.status}</p>
                </div>
            </div>
        </main>
    );
}
