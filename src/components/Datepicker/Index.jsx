import React, { useEffect, useState } from 'react';
import './index.css';
import Navigation from './Navigation/Navigation';
import Days from './Days/Days';
import Months from './Months/Months';
import Years from './Years/Years';

/**
 * Datepicker component that allows users to select a date.
 * 
 * @param {Date} date - The initial date for the Datepicker. Defaults to the current date if not provided.
 */
const Datepicker = ({ date = new Date() }) => {
  const [view, setView] = useState('days');
  const [currentDate, setCurrentDate] = useState(date);
  const [inputValue, setInputValue] = useState(formatDate(date));
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState('');

  /**
   * Formats a given date into a string with the format 'YYYY-MM-DD'.
   * 
   * @param {Date} date - The date to be formatted.
   * @returns {string} - A string representing the formatted date.
   */
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Handles the change of the selected date in the Datepicker.
   * 
   * @param {Date} newDate - The new selected date.
   */
  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setInputValue(formatDate(newDate));
    setError('');
  };

  /**
   * Handles the change of the current view in the Datepicker (days, months, years).
   * 
   * @param {string} newView - The new view to be displayed.
   */
  const handleViewChange = (newView) => {
    setView(newView);
  };

  /**
   * Closes the calendar view.
   */
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

/**
 * Handles the change of the input value in the text field.
 * 
 * @param {Event} event - The input change event.
 */
const handleInputChange = (event) => {
  const inputValue = event.target.value;

  // Use a regular expression to check if the input follows the 'YYYY-MM-DD' format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input value matches the expected format
  if (dateRegex.test(inputValue)) {
    const newDate = new Date(inputValue);
    setCurrentDate(newDate);
    setInputValue(inputValue);
    setError('');
  } else {
    setInputValue(inputValue);
    setError('Invalid date format. Please use the format YYYY-MM-DD.');
  }
};

  /**
   * useEffect hook to log updates to view and currentDate.
   */
  useEffect(() => {
    console.log('Updated Index view:', view);
    console.log('Updated Index date:', currentDate);
  }, [view, currentDate, error]);

  /**
   * Renders the content based on the current view (days, months, years).
   * 
   * @returns {JSX.Element} - The rendered content.
   */
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

  /**
   * Toggles the visibility of the calendar.
   */
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
          className={`input-date  ${error === '' ? '' : 'error'}`}
        />
        <div className="calendar-icon-container" onClick={toggleCalendar}>
          <svg width="87" height="92" viewBox="0 0 87 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="calendar-icon">
            <path d="M28.76 0.5C30.0313 0.5 31.2505 1.00501 32.1494 1.90393C33.0483 2.80286 33.5533 4.02206 33.5533 5.29333V10.0867H52.7267V5.29333C52.7267 4.02206 53.2317 2.80286 54.1306 1.90393C55.0295 1.00501 56.2487 0.5 57.52 0.5C58.7913 0.5 60.0105 1.00501 60.9094 1.90393C61.8083 2.80286 62.3133 4.02206 62.3133 5.29333V10.0867H76.6933C79.2359 10.0867 81.6743 11.0967 83.4721 12.8945C85.27 14.6924 86.28 17.1308 86.28 19.6733V81.9867C86.28 84.5292 85.27 86.9676 83.4721 88.7655C81.6743 90.5633 79.2359 91.5733 76.6933 91.5733H9.58667C7.04412 91.5733 4.60572 90.5633 2.80787 88.7655C1.01002 86.9676 0 84.5292 0 81.9867V19.6733C0 17.1308 1.01002 14.6924 2.80787 12.8945C4.60572 11.0967 7.04412 10.0867 9.58667 10.0867H23.9667V5.29333C23.9667 4.02206 24.4717 2.80286 25.3706 1.90393C26.2695 1.00501 27.4887 0.5 28.76 0.5ZM23.9667 19.6733H9.58667V34.0533H76.6933V19.6733H62.3133V24.4667C62.3133 25.7379 61.8083 26.9571 60.9094 27.8561C60.0105 28.755 58.7913 29.26 57.52 29.26C56.2487 29.26 55.0295 28.755 54.1306 27.8561C53.2317 26.9571 52.7267 25.7379 52.7267 24.4667V19.6733H33.5533V24.4667C33.5533 25.7379 33.0483 26.9571 32.1494 27.8561C31.2505 28.755 30.0313 29.26 28.76 29.26C27.4887 29.26 26.2695 28.755 25.3706 27.8561C24.4717 26.9571 23.9667 25.7379 23.9667 24.4667V19.6733ZM76.6933 43.64H9.58667V81.9867H76.6933V43.64Z" fill="#0D0D0D"/>
          </svg>
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
