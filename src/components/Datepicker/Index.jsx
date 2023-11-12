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
        <div className="calendar-icon" onClick={toggleCalendar}>
          &#x1F4C5;
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
