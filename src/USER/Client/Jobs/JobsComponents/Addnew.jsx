import '../Jobs.css'
import Addimg from '../../../assets/addnew.svg'
import { useState } from 'react'

export default function Addnew() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        projectName: '',
        projectDesc: '',
        projectDeadline: '',
        projectCategory: '',
        projectBudget: '',
        uploadFile: null
    });

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
            if (formData.projectCategory && formData.projectBudget && formData.uploadFile) {
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

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    }

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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="addnew-two-inputs">
                                            <label htmlFor="uploadFile" className="addnew-projectname-label">
                                                Upload File *
                                            </label>
                                            <input
                                                required
                                                type="file"
                                                name="uploadFile"
                                                className=" addnew-input"
                                                onChange={handleInputChange}
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
                                            <span className="preview-label">File:</span><br /> {formData.uploadFile?.name}
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
                                {step === 3 ? <p className='addnew-nxt-btn addnew-btn'>Publish</p> : <p onClick={nextstep} className='addnew-nxt-btn addnew-btn'>Next</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
