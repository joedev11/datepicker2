import React, { useEffect, useState } from 'react';
import './index.css';
import Navigation from './Navigation/Navigation';
import Days from './Days/Days';
import Months from './Months/Months';
import Years from './Years/Years';

const Datepicker = ({ date = new Date() }) => {
  const [view, setView] = useState('days');
  const [currentDate, setCurrentDate] = useState(date);
  const [inputValue, setInputValue] = useState(formatDate(date));
  const [showCalendar, setShowCalendar] = useState(false);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setInputValue(formatDate(newDate));
    console.log('dateChange', newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    console.log(newView);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const newDate = new Date(inputValue);

    // Check if the input value is a valid date before updating state
    if (!isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
    }
  };

  useEffect(() => {
    console.log('Updated Index view:', view);
    console.log('Updated Index date:', currentDate);
  }, [view, currentDate]);

  const renderContent = () => {
    switch (view) {
      case 'days':
        return <Days date={currentDate} onChangeDate={handleDateChange} onCloseCalendar={handleCloseCalendar} />;
      case 'months':
        return <Months date={currentDate} onChangeMonth={handleDateChange} onChangeView={handleViewChange} />;
      case 'years':
        return <Years date={currentDate} onChangeYear={handleDateChange} onChangeView={handleViewChange} />;
      default:
        return <Days date={currentDate} onChangeDate={handleDateChange} onCloseCalendar={handleCloseCalendar} />;
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={toggleCalendar}
          className="input-date"
        />
        <div className="calendar-icon" onClick={toggleCalendar}>
          &#128197;
        </div>
      </div>
      {showCalendar && (
        <div className="datepicker-container">
          <Navigation date={currentDate} view={view} onChangeView={handleViewChange} onChangeMonth={handleDateChange} />
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default Datepicker;
