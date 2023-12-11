import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./TIMESheet.css";
import DatePicker from "react-datepicker";
import Modal from "./Modal";
import ManagerView from "./Manager";

const TimeSheet = ({
  timesheetData,
  setTimesheetData,
  onSubmitToManager,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  const [view, setView] = useState("week");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [data, setData] = useState([]);
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/timesheet/entry/timesheet');
      const data = await response.json();
      console.log('Fetched Data:', data);
      setData(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   // Function to handle form submission
   const handleSubmit = async () => {
    console.log("Submitting data...");
const newEntries = data.filter((entry) => entry.id === undefined);

  if (newEntries.length === 0) {
    console.log("No new data to submit");
    return;
  }
    const formattedData = data.map((project) => ({
      employeeId: project.employeeId,
      project: project.project,
      status: "Pending",
      total: project.total,
      weekStartDate: project.weekStartDate,
      weekEndDate: project.weekEndDate,
      dates: project.dates,
      hours: project.hours,
    }));

    const backendEndpoint = "http://localhost:8080/timesheet/entry";

    try {
      console.log("Initiating data submission to the backend...");
      if (!unsavedChanges) {
        console.log("No unsaved changes. Skipping submission.");
        return;
      }
      const responsePromises = formattedData.map((entry) =>
        fetch(backendEndpoint, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(entry),
        })
      );

      const responses = await Promise.all(responsePromises);

    if (responses.every((response) => response.ok)) {
      console.log("All data submitted successfully to the backend");
      console.log(formattedData);
      setUnsavedChanges(false);
    } else {
      console.error("Error submitting data to the backend");
    }
  } catch (error) {
    console.error("Error submitting data to the backend:", error);

 // Update state with only new data
 const updatedData = data.filter((entry) => entry.id !== undefined);
  setTimesheetData(updatedData);
};

    // Update state with the formatted data
    setTimesheetData(formattedData);
    // Callback to inform the manager about the submission
    onSubmitToManager(formattedData);

    console.log("Data to be saved:", formattedData);
    setUnsavedChanges(false);
  };



  const handleDeleteRow = async (id, projectIndex) => {
    try {
      // Send a DELETE request to the backend to delete the entry
      const response = await fetch(`http://localhost:8080/timesheet/entry/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Timesheet entry deleted successfully");
        const updatedData = [...data];
        updatedData.splice(projectIndex, 1);
        setData(updatedData);
        setUnsavedChanges(true);
      } else {
        console.error("Error deleting timesheet entry:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting timesheet entry:", error);
    }
  };
  const getCurrentDate = () => new Date();

  const dateOffset = (date, offset) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);
    return newDate;
  };

  const isCurrentDate = (date) => {
    const currentDate = getCurrentDate();
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleSetCurrentDate = () => {
    setStartDate(getCurrentDate());
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setNewEmployeeId("");
    setNewProjectName("");
  };

  const handleConfirmModal = () => {
    handleAddRow(newEmployeeId, newProjectName);
    setIsModalOpen(false);
    setNewEmployeeId("");
    setNewProjectName("");
  };

  const handleAddRow = (employeeId, project) => {
    const newProject = {
      employeeId,
      project,
      hours: Array(7).fill(0),
      total: 0,
      status: "Pending",
      weekStartDate: startDate.toISOString(), // Initialize with the current start date
      weekEndDate: dateOffset(startDate, 6).toISOString(), // Calculate and set the end date
    };

    const weekDates = getWeekDates(startDate);
  newProject.dates = weekDates;

  setData([...data, newProject]);
  setUnsavedChanges(true);
  };

  const getWeekDates = (startOfWeek) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date.toISOString());
    }
    return weekDates;
  };

  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    const currentDate = getCurrentDate();
    const dateDifference = Math.floor(
      (selectedDate - currentDate) / (24 * 60 * 60 * 1000)
    );

    const updatedData = data.map((project) => {
      const newHours = project.hours.map((hour, dayIndex) => {
        const newDayIndex = (dayIndex + dateDifference + 7) % 7;
        return (
          data.find((p) => p.project === project.project)?.hours[newDayIndex] ||
          0
        );
      });

      return {
        ...project,
        hours: newHours,
        total: newHours.reduce((acc, cur) => acc + cur, 0),
      };
    });

    setData(updatedData);
    setShowDatePicker(false);
    setUnsavedChanges(true);
  };

  const handlePrevious = () => {
    if (view === "week") {
      setStartDate((currDate) => dateOffset(currDate, -7));
    } else if (view === "month") {
      setStartDate((currDate) => dateOffset(currDate, -30));
    }
  };

  const handleNext = () => {
    if (view === "week") {
      setStartDate((currDate) => dateOffset(currDate, 7));
    } else if (view === "month") {
      setStartDate((currDate) => dateOffset(currDate, 30));
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleUpdateStatus = (updatedData) => {
    setData(updatedData);
    setUnsavedChanges(true);
  };

  const handleUpdateCompleted = (updatedData) => {
    setData(updatedData);
    setUnsavedChanges(true);
  };



  const handleHoursChange = (projectIndex, dayIndex, value) => {
    const updatedData = [...data];
    updatedData[projectIndex].hours[dayIndex] = parseInt(value, 10) || 0;

    updatedData[projectIndex].total = updatedData[projectIndex].hours.reduce(
      (acc, cur) => acc + cur,
      0
    );

    updatedData.forEach((project) => {
      project.total = project.hours.reduce((acc, cur) => acc + cur, 0);
    });

    setData(updatedData);
    setUnsavedChanges(true);
  };

  <ManagerView
  data={data}
  onUpdateStatus={handleUpdateStatus}
  onUpdateCompleted={handleUpdateCompleted}
/>


  return (
    <div className="container">
      <div>
        <button onClick={handlePrevious}>Previous {view}</button>
        {view === "month" && (
          <>
            <button onClick={() => setShowDatePicker(true)}>
              Select Month
            </button>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              showPopperArrow={false}
              dateFormat="dd MMMM yyyy"
              showDateMonthYearPicker
              popperPlacement="bottom-end"
              popperModifiers={{}}
              inline
              open={showDatePicker}
            />
          </>
        )}
        <span>
          {view === "week"
            ? `${startDate.toLocaleDateString("de-DE")} - ${dateOffset(
                startDate,
                6
              ).toLocaleDateString("de-DE")}`
            : startDate.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
        </span>
        <button onClick={handleNext}>Next {view}</button>
        <button onClick={handleSetCurrentDate}>Go to Current Date</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Project</th>
            {days.map((day, index) => (
              <th
                key={day}
                className={
                  isCurrentDate(dateOffset(startDate, index))
                    ? "current-date"
                    : ""
                }
              >
                {dateOffset(startDate, index).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                <br />
                {dateOffset(startDate, index).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
              </th>
            ))}
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, projectIndex) => (
            <tr key={projectIndex}>
              <td>{item.employeeId}</td>
              <td>{item.project}</td>
              {item.hours.map((hour, dayIndex) => (
                <td
                  key={dayIndex}
                  className={
                    isCurrentDate(dateOffset(startDate, dayIndex))
                      ? "current-date"
                      : ""
                  }
                >
                  <input
                    type="number"
                    value={hour}
                    onChange={(e) =>
                      handleHoursChange(projectIndex, dayIndex, e.target.value)
                    }
                  />
                </td>
              ))}
              <td>{item.total}</td>
              <td>{item.status}</td>
              <td>
      <button onClick={() => handleDeleteRow(item.id, projectIndex)}>
        Delete
      </button>
    </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={12}>
                No data available, Time is the only constant, make the most of it!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={() => handleOpenModal()}>Add task</button>
      <button onClick={handleSubmit} disabled={!unsavedChanges}>
        Submit
      </button>

      <Modal
        isOpen={isModalOpen}
        onCancel={handleCancelModal}
        onConfirm={handleConfirmModal}
        newEmployeeId={newEmployeeId}
        setNewEmployeeId={setNewEmployeeId}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
      />

      <div>
        <button onClick={() => handleViewChange("week")}>Week View</button>
        <button onClick={() => handleViewChange("month")}>Month View</button>
      </div>
    </div>
  );
};

export default TimeSheet;
