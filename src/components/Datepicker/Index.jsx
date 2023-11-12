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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="calendar-icon">
            <path d="M5 12H27M21 8V4M11 8V4M7 28H25C26.1046 28 27 27.1046 27 26V8C27 6.89543 26.1046 6 25 6H7C5.89543 6 5 6.89543 5 8V26C5 27.1046 5.89543 28 7 28Z" stroke="#2E4454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <mask id="path-2-inside-1_12_647" fill="white">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 19.5C12.5 20.3284 11.8284 21 11 21C10.1716 21 9.5 20.3284 9.5 19.5C9.5 18.6715 10.1716 18 11 18C11.8284 18 12.5 18.6715 12.5 19.5ZM17.5 19.5C17.5 20.3284 16.8284 21 16 21C15.1716 21 14.5 20.3284 14.5 19.5C14.5 18.6715 15.1716 18 16 18C16.8284 18 17.5 18.6715 17.5 19.5ZM21 21C21.8284 21 22.5 20.3284 22.5 19.5C22.5 18.6715 21.8284 18 21 18C20.1716 18 19.5 18.6715 19.5 19.5C19.5 20.3284 20.1716 21 21 21Z"/>
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 19.5C12.5 20.3284 11.8284 21 11 21C10.1716 21 9.5 20.3284 9.5 19.5C9.5 18.6715 10.1716 18 11 18C11.8284 18 12.5 18.6715 12.5 19.5ZM17.5 19.5C17.5 20.3284 16.8284 21 16 21C15.1716 21 14.5 20.3284 14.5 19.5C14.5 18.6715 15.1716 18 16 18C16.8284 18 17.5 18.6715 17.5 19.5ZM21 21C21.8284 21 22.5 20.3284 22.5 19.5C22.5 18.6715 21.8284 18 21 18C20.1716 18 19.5 18.6715 19.5 19.5C19.5 20.3284 20.1716 21 21 21Z" fill="#2E4454"/>
            <path d="M11 22C12.3807 22 13.5 20.8807 13.5 19.5H11.5C11.5 19.7761 11.2761 20 11 20V22ZM8.5 19.5C8.5 20.8807 9.61929 22 11 22V20C10.7239 20 10.5 19.7761 10.5 19.5H8.5ZM11 17C9.61929 17 8.5 18.1193 8.5 19.5H10.5C10.5 19.2238 10.7239 19 11 19V17ZM13.5 19.5C13.5 18.1193 12.3807 17 11 17V19C11.2761 19 11.5 19.2238 11.5 19.5H13.5ZM16 22C17.3807 22 18.5 20.8807 18.5 19.5H16.5C16.5 19.7761 16.2761 20 16 20V22ZM13.5 19.5C13.5 20.8807 14.6193 22 16 22V20C15.7239 20 15.5 19.7761 15.5 19.5H13.5ZM16 17C14.6193 17 13.5 18.1193 13.5 19.5H15.5C15.5 19.2238 15.7239 19 16 19V17ZM18.5 19.5C18.5 18.1193 17.3807 17 16 17V19C16.2761 19 16.5 19.2238 16.5 19.5H18.5ZM21.5 19.5C21.5 19.7761 21.2761 20 21 20V22C22.3807 22 23.5 20.8807 23.5 19.5H21.5ZM21 19C21.2761 19 21.5 19.2238 21.5 19.5H23.5C23.5 18.1193 22.3807 17 21 17V19ZM20.5 19.5C20.5 19.2238 20.7239 19 21 19V17C19.6193 17 18.5 18.1193 18.5 19.5H20.5ZM21 20C20.7239 20 20.5 19.7761 20.5 19.5H18.5C18.5 20.8807 19.6193 22 21 22V20Z" fill="#2E4454" mask="url(#path-2-inside-1_12_647)"/>
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
