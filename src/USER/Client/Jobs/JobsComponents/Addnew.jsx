import '../Jobs.css';
import Addimg from '../../../assets/addnew.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TagsInput from '../../../../Landing/Registerations/TagsInput';

export default function Addnew() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [formData, setFormData] = useState({
        projectName: '',
        projectDesc: '',
        projectDeadline: '',
        projectCategory: '',
        projectBudget: '',
        uploadFiles: [] 
    });
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (isSubmitting) return;
            setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User is not authenticated. Please log in.");
                navigate('/login', { replace: true });
                return;
            }

            if (
                !formData.projectName ||
                !formData.projectDesc ||
                !formData.projectBudget ||
                !formData.projectDeadline ||
                !formData.projectCategory
            ) {
                alert("Please fill all the required fields.");
                return;
            }

            const formDataObj = new FormData();
            formData.uploadFiles.forEach((file) => {
                formDataObj.append("media", file);
            });

            const jobDetails = [
                {
                    postTitle: formData.projectName,
                    description: formData.projectDesc,
                    budget: formData.projectBudget,
                    deadline: formData.projectDeadline,
                    category: formData.projectCategory,
                    tags: ["tag1", "tag2"],
                },
            ];

            formDataObj.append("jobdetails", JSON.stringify(jobDetails));

            const response = await axios.post(
                `${API_URL}/api/jobs/postJob`,
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            alert("Jobs created successfully!");
            navigate('/client/jobs/unassigned',{ replace: true });
            console.log(response.data);
        } catch (error) {
            console.error("Error publishing job:", error);
            alert(
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred. Please try again."
            );
        }
    };

    function nextstep() {
        if (step === 1) {
            if (formData.projectName && formData.projectDesc) {
                setStep((prevStep) => {
                    const newStep = prevStep === 3 ? 1 : prevStep + 1;
                    updateProgressBar(newStep);
                    return newStep;
                });
            } else {
                alert("Please fill in all required fields.");
            }
        } else if (step === 2) {
            if (formData.projectCategory && formData.projectBudget && formData.uploadFiles.length > 0) {
                setStep((prevStep) => {
                    const newStep = prevStep === 3 ? 1 : prevStep + 1;
                    updateProgressBar(newStep);
                    return newStep;
                });
            } else {
                alert("Please fill in all required fields.");
            }
        } else {
            setStep((prevStep) => {
                const newStep = prevStep === 3 ? 1 : prevStep + 1;
                updateProgressBar(newStep);
                return newStep;
            });
        }
    }

    function updateProgressBar(step) {
        const progressBarInner = document.querySelector('.addnew-progressbar-inner');
        if (progressBarInner) {
            const widthPercentage = (step - 1) * 50;
            progressBarInner.style.width = `${widthPercentage}%`;
        }
    }

    const handleFileChange = (e) => {
        const allowedTypes = [
            'application/pdf', 
            'image/jpeg', 
            'image/png', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'video/mp4', 
            'video/x-matroska', 
        ];
        const files = Array.from(e.target.files);
    
        const validFiles = files.filter(file => allowedTypes.includes(file.type));
        if (validFiles.length !== files.length) {
            alert("Some files were not allowed. Only PDFs and Word documents are accepted.");
        }
    
        if (validFiles.length + formData.uploadFiles.length > 5) {
            alert("You can upload a maximum of 5 files.");
            return;
        }
    
        setFormData((prevData) => ({
            ...prevData,
            uploadFiles: [...prevData.uploadFiles, ...validFiles],
        }));
    };
    

    return (
        <>
            <div className="addnew-container">
                <div className="addnew-progressbar-container">
                    <div className="addnew-progress-step-container">
                        <div className="addnew-progressbar">
                            <div className="addnew-progressbar-inner"></div>
                        </div>
                        <span className="addnew-progress-step">1</span>
                        <span className="addnew-progress-step">2</span>
                        <span className="addnew-progress-step">3</span>
                    </div>
                </div>
                <div className="addnew-step1-container">
                    <img className='addnew-step1-img' src={Addimg} alt="" />
                    <div className="addnew-step1-inner-container">
                        <div className="addnew-step1-inner">
                            {step === 1 && (
                                <>
                                    <label htmlFor="projectName" className="addnew-projectname-label">
                                        Project Name *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="projectName"
                                        className="addnew-input addnew-projectname-input"
                                        placeholder="Enter the Project Name"
                                        value={formData.projectName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, projectName: e.target.value })
                                        }
                                    />
                                    <br />
                                    <label htmlFor="projectDesc" className="addnew-projectname-label">
                                        Project Description *
                                    </label>
                                    <textarea
                                        required
                                        name="projectDesc"
                                        className="addnew-input projectdesc-input"
                                        placeholder="Enter the Project Description"
                                        value={formData.projectDesc}
                                        onChange={(e) =>
                                            setFormData({ ...formData, projectDesc: e.target.value })
                                        }
                                    />
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <label htmlFor="projectDeadline" className="addnew-projectname-label">
                                        Project Deadline
                                    </label>
                                    <input
                                        type="date"
                                        name="projectDeadline"
                                        className=" addnew-input"
                                        placeholder="Enter the Deadline / Submission Date"
                                        value={formData.projectDeadline}
                                        onChange={(e) =>
                                            setFormData({ ...formData, projectDeadline: e.target.value })
                                        }
                                    />
                                    <br />
                                    <label htmlFor="projectCategory" className="addnew-projectname-label">
                                        Project Category *
                                    </label>
                                    <input
                                        type="text"
                                        name="projectCategory"
                                        className=" addnew-input"
                                        placeholder="Enter the Project Category"
                                        value={formData.projectCategory}
                                        onChange={(e) =>
                                            setFormData({ ...formData, projectCategory: e.target.value })
                                        }
                                    />
                                    <br />
                                    <div className="addnew-twoinputs-container">
                                        <div className="addnew-two-inputs">
                                            <label htmlFor="projectBudget" className="addnew-projectname-label">
                                                Project Budget *
                                            </label>
                                            <input
                                                type="number"
                                                name="projectBudget"
                                                className=" addnew-input"
                                                placeholder="Enter the Project Budget"
                                                value={formData.projectBudget}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, projectBudget: e.target.value })
                                                }
                                            />
                                            
                                        </div>
                                        <div>
                                            <TagsInput />
                                        </div>
                                        <div className="addnew-two-inputs">
                                            <label htmlFor="uploadFiles" className="addnew-projectname-label">
                                                Upload Files (Max 5) *
                                            </label>
                                            <input
                                                type="file"
                                                name="uploadFiles"
                                                className=" addnew-input"
                                                onChange={handleFileChange}
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div className="addnew-preview-container">
                                        <p className="addnew-preview preview-projectname">
                                            <span className="preview-label">Name: </span> {formData.projectName}
                                        </p>
                                        <p className="addnew-preview preview-budget">
                                            <span className="preview-label">Budget: </span><br />{formData.projectBudget}
                                        </p>
                                        <p className="addnew-preview preview-deadline">
                                            <span className="preview-label">Deadline:</span><br />{formData.projectDeadline}
                                        </p>
                                        <p className="addnew-preview preview-Category">
                                            <span className="preview-label">Category:</span><br />{formData.projectCategory}
                                        </p>
                                        <p className="addnew-preview preview-desc">
                                            <span className="preview-label">Description:</span><br />{formData.projectDesc}
                                        </p>
                                        <p className="addnew-preview preview-file">
                                            <span className="preview-label">Files:</span><br />
                                            {formData.uploadFiles.map((file, index) => (
                                                <span key={index}>{file.name}<br /></span>
                                            ))}
                                        </p>
                                    </div>
                                </>
                            )}
                            <div className="addnew-button-container">
                                <p
                                    onClick={() => {
                                        if (step > 1) {
                                            setStep((prevStep) => {
                                                const newStep = prevStep - 1;
                                                updateProgressBar(newStep);
                                                return newStep;
                                            });
                                        }
                                    }}
                                    className="addnew-prv-btn addnew-btn"
                                >
                                    Prev
                                </p>
                                {step === 3 ? <p onClick={handlePublish} className='addnew-nxt-btn addnew-btn'disabled={isSubmitting}>Publish</p> : <p onClick={nextstep} className='addnew-nxt-btn addnew-btn'>Next</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
