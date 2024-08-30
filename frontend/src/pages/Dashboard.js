import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userType = "doctor"; 

  if (userType === "doctor") {
    return <Link to="/doctor/propose-prescription">Propose Prescription</Link>;
  }

  if (userType === "pharmacist") {
    return (
      <div>
        <Link to="/pharmacist/manage-prescriptions">Manage Prescriptions</Link>
        <Link to="/pharmacist/manage-doctors">Manage Doctors</Link>
      </div>
    );
  }

  if (userType === "owner") {
    return (
      <div>
        <Link to="/owner/set-prescription-token">Set Prescription Token</Link>
        <Link to="/pharmacist/manage-pharmacists">Manage Pharmacists</Link>
      </div>
    );
  }

  return <div>Unauthorized</div>;
};

export default Dashboard;
