import React, { useState, useEffect } from 'react';

const ManagerView = ({timesheetData,onSubmitToBackend }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const [rejectionReasonMap, setRejectionReasonMap] = useState({});
 // const [timesheetData, setTimesheetData] = useState([]);

  // Fetch and set timesheetData
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/timesheet/entry/timesheet');
        const data = await response.json();
        setTimesheetData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);*/

  useEffect(() => {
    fetchData();
  }, [timesheetData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/timesheet/entry/timesheet');
      const data = await response.json();
      console.log('Fetched Data:', data);

      // Initialize selected status and rejection reason maps
      const initialSelectedStatusMap = {};
      const initialRejectionReasonMap = {};
      data.forEach((entry) => {
        initialSelectedStatusMap[entry.id] = '';
        initialRejectionReasonMap[entry.id] = '';
      });

      setSelectedStatusMap(initialSelectedStatusMap);
      setRejectionReasonMap(initialRejectionReasonMap);

      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleManagerSubmit = () => {
    if (!data || data.length === 0) {
      console.error('No entry found to update');
      return;
    }

    const firstEntry = data[0];
    const { id, /* other properties */ } = firstEntry;

    if (!id) {
      console.error('No entry ID found to update');
      return;
    }

    // Assuming 'status' is the property you want to update
    const updatedStatus = 'New Status';

    fetch(`http://localhost:8080/timesheet/entry/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({ status: updatedStatus }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        // Assuming the response contains the updated entry
        setData([updatedData, ...data.slice(1)]); // Update the first entry in the data array
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });

    // Call the submission function provided by the App component
    onSubmitToBackend(data);
  };



  const handleUpdateStatus = (id) => {
    const newStatus = selectedStatusMap[id];
    const rejectionReason = rejectionReasonMap[id];

    // If the selected status is 'Rejected', include the rejection reason
    const requestBody = {
      status: newStatus,
      reason: newStatus === 'Rejected' ? rejectionReason : undefined,
    };

    fetch(`http://localhost:8080/timesheet/entry/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((updatedEntry) => {
        setData((prevData) =>
          prevData.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
        );
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div>
      <h2>Manager View</h2>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Dates</th>
            <th>Employee ID</th>
            <th>Project</th>
            <th>Hours</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>
                {entry.dates.length > 0 &&
                  `${new Date(entry.dates[0]).toLocaleDateString()} - ${new Date(
                    entry.dates[entry.dates.length - 1]
                  ).toLocaleDateString()}`}
              </td>
              <td>{entry.employeeId}</td>
              <td>{entry.project}</td>
              <td>{entry.hours}</td>
              <td>{entry.total}</td>
              <td>{entry.status}</td>
              <td>
                <select
                  value={selectedStatusMap[entry.id]}
                  onChange={(e) => {
                    const newStatusMap = { ...selectedStatusMap };
                    newStatusMap[entry.id] = e.target.value;
                    setSelectedStatusMap(newStatusMap);
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {selectedStatusMap[entry.id] === 'Rejected' && (
                  <input
                    type="text"
                    placeholder="Rejection Reason"
                    value={rejectionReasonMap[entry.id]}
                    onChange={(e) => {
                      const newReasonMap = { ...rejectionReasonMap };
                      newReasonMap[entry.id] = e.target.value;
                      setRejectionReasonMap(newReasonMap);
                    }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleUpdateStatus(entry.id)}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleManagerSubmit}>Submit</button>
    </div>
  );
};

export default ManagerView;
