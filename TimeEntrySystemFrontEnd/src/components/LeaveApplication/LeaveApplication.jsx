import React, { useState } from 'react';
import "./LeaveApplication.css";

const LeaveApplication = () => {
  const [empId, setempId] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Submitted:', { name, startDate, endDate});
    // You can make an API call to submit this data to your backend
  };

  return (
    <div className="leave-application-container">
      <div className="leave-card">
        <h1 className="leave-heading">Leave Application</h1>
        <form onSubmit={handleSubmit} className="leave-form">
        <label className="input-label">
            Employe Id:
            <input
              type="text"
              value={empId}
              onChange={(e) => setempId(e.target.value)}
              className="input-field"
            />
            </label>
          <label className="input-label">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="input-label">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="input-label">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          
          
          <div className="leaveApplication">
             <label htmlFor="leaveReason">Select Reason for Leave:</label>
                <select id="leaveReason" className="dropdown">
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation Leave</option>
                  <option value="personal">Personal Leave</option>
                  <option value="family">Family Emergency Leave</option>
                  <option value="bereavement">Bereavement Leave</option>
                  <option value="maternity">Maternity/Paternity Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                       {/* Add more options as needed */}
                </select>
          </div>


          </label>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplication;
