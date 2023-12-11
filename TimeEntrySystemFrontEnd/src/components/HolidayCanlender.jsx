import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const HolidayCanlender = () => {
  // State variables
  const [value, onChange] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [holidays, setHolidays] = useState([]);

  // Handler for country change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Fetch holidays from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/events/country/${selectedCountry}`);
        const data = await response.json();
        console.log('Fetched holidays:', data);
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  // Function to check if a date is a holiday
  const isHoliday = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return holidays.some(
      (holiday) => holiday.eventDate === dateString && holiday.holiday === true
    );
  };

  // Function to get holiday name for a specific date
  const getHolidayName = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const holiday = holidays.find((holiday) => holiday.eventDate === dateString);
    return holiday ? holiday.eventName : '';
  };

  // Function to render content for each date tile
  const tileContent = ({ date, view }) => {
    const isHolidayDate = isHoliday(date);

    const handleClick = () => {
      console.log(`Clicked on holiday date: ${date.toISOString().split('T')[0]}`);
    };

    if (view === 'month' && isHolidayDate) {
      return (
        <div style={{ color: 'black', cursor: 'pointer' }} onClick={handleClick}>
          {getHolidayName(date)}
        </div>
      );
    }

    return null;
  };

  // Get the current year for min and max date restrictions
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1);
  const maxDate = new Date(currentYear, 11, 31);

  return (
    <div className="calendar-container">
      <div className="calendar">
        {/* Header */}
        <h2 className="head">HOLIDAY CALENDAR</h2>

        {/* Country selection dropdown */}
        <label htmlFor="countrySelect" className="country-label">
          Select Country:
        </label>
        <select
          id="countrySelect"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="India">India</option>
          <option value="USA">US</option>
          <option value="Dubai">Dubai</option>
        </select>

        {/* Calendar component */}
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          minDate={minDate}
          maxDate={maxDate}
        />

        {/* Selected date display */}
        <p className="selected-date">Selected Date: {value.toString()}</p>
      </div>
    </div>
  );
};

export default HolidayCanlender;
