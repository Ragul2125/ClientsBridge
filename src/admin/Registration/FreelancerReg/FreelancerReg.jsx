// import "./FreelancerReg.css";
// /* import { useSelector } from "react-redux";*/
// import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import assignedimg from "../../../assets/svg/assigned.svg";
// import { getAllFreelancers } from "../../api/registerations";

// const FreelancerReg = () => {
//   const [freelancers, setFreelancers] = useState([]);
//   const location = useLocation();
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [selectedFreelancer, setSelectedFreelancer] = useState(null);

//   const handleAssignClick = (freelancer) => {
//     setSelectedFreelancer(freelancer);
//     setIsPopupOpen(true);
//     setTimeout(() => {
//       setIsPopupOpen(false);
//       setSelectedFreelancer(null);
//     }, 2000);
//   };
//   useEffect(() => {
//     const fetchFreelancers = async () => {
//       const response = await getAllFreelancers();
//       if (response) {
//         setFreelancers(response);
//       }
//     };
//     fetchFreelancers();
//   }, []);
//   return (
//     <>
//       <section className="freelancerreg-container">
//         {freelancers && freelancers.length > 0 ? (
//           freelancers.map((freelancer, index) => (
//             <div className="freelancer-card" key={index}>
//               <div className="freelancerdp">
//                 {freelancer.name.charAt(0).toUpperCase()}
//               </div>
//               <p className="freelancerusername">{freelancer.name}</p>
//               <p className="freelancerprofession">
//                 {freelancer.description.substring(0, 30) + "..." || "N/A"}
//               </p>

//               {location.pathname.includes("assign") ? (
//                 <p
//                   onClick={() => handleAssignClick(freelancer)}
//                   className="freelancerviewbtn"
//                 >
//                   Assign
//                 </p>
//               ) : (
//                 <Link
//                   to={`${freelancer?.id || ""}`}
//                   className="freelancerviewbtn"
//                 >
//                   View
//                 </Link>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No freelancers available</p>
//         )}
//         <p
//           style={{
//             width: "100%",
//             textAlign: "center",
//             color: "gray",
//             fontStyle: "italic",
//           }}
//         >
//           No more Freelancers to show.
//         </p>
//       </section>
//       {/* -------------------------------Popup--------------- */}
//       {isPopupOpen && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <img src={assignedimg} alt="" />
//             <p>Job Has been assigned sucessfully!</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FreelancerReg;
// -----------------------------------------------------


import "./FreelancerReg.css";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import assignedimg from "../../../assets/svg/assigned.svg";
import { getAllFreelancers } from "../../api/registerations";
import Load from '../../../USER/ReuseableComponents/Loaders/Load'
const FreelancerReg = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const handleAssignClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedFreelancer(null);
    }, 2000);
  };

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const response = await getAllFreelancers();
        if (response) {
          setFreelancers(response);
        }
      } catch (err) {
        setError("Failed to fetch freelancers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  if (loading) {
    return <Load type='load' />;
  }

  if (error) {
    return <Load type='err' />;
  }

  return (
    <>
      <section className="freelancerreg-container">
        {freelancers && freelancers.length > 0 ? (
          freelancers.map((freelancer, index) => (
            <div className="freelancer-card" key={index}>
              <div className="freelancerdp">
                {freelancer.name.charAt(0).toUpperCase()}
              </div>
              <p className="freelancerusername">{freelancer.name}</p>
              <p className="freelancerprofession">
                {freelancer.description.substring(0, 30) + "..." || "N/A"}
              </p>

              {location.pathname.includes("assign") ? (
                <p
                  onClick={() => handleAssignClick(freelancer)}
                  className="freelancerviewbtn"
                >
                  Assign
                </p>
              ) : (
                <Link
                  to={`${freelancer?.id || ""}`}
                  className="freelancerviewbtn"
                >
                  View
                </Link>
              )}
            </div>
          ))
        ) : (
          <Load type='nojobs' />)}
        <p
          style={{
            width: "100%",
            textAlign: "center",
            color: "gray",
            fontStyle: "italic",
          }}
        >
          No more Freelancers to show.
        </p>
      </section>
      {/* -------------------------------Popup--------------- */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={assignedimg} alt="" />
            <p>Job Has been assigned successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FreelancerReg;
