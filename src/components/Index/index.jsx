import React, { useState } from 'react';
import Datepicker from '../Datepicker/Datepicker';

const Index = ({ date = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0'); // Use getDate() instead of getDay()
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    console.log('dateChange index' + newDate);
  };
  
  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          value={formatDate(currentDate)}
          onClick={toggleCalendar}
          readOnly
          className="input-date"
        />
        <div className="calendar-icon" onClick={toggleCalendar}>
          &#128197;
        </div>
      </div>
      {showCalendar && (
        <Datepicker date={currentDate} onDateChange={handleDateChange} />
      )}
    </div>
  );
};

export default Index;
