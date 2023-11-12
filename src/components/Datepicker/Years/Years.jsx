import React from 'react';
import './years.css';

/**
 * Years component for displaying and selecting years.
 * 
 * @param {Date} date - The current selected date.
 * @param {function} onChangeYear - Callback function to change the selected year.
 * @param {function} onChangeView - Callback function to change the current view.
 */
const Years = ({ date, onChangeYear, onChangeView }) => {
  const currentYear = date.getFullYear();
  const startYear = (Math.floor(currentYear / 10) * 10) - 1;
  const endYear = startYear + 11;

  /**
   * Handles the click event for a specific year, updating the selected year and changing the view to 'days'.
   * 
   * @param {number} year - The selected year.
   */
  const handleYearClick = (year) => {
    const newDate = new Date(year, date.getMonth(), 1);
    onChangeYear(newDate);
    onChangeView('days');
  };

  /**
   * Renders the years within the specified range, allowing users to select a year.
   * 
   * @returns {JSX.Element[]} - An array of JSX elements representing the years.
   */
  const renderYears = () => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const isInactive = year === startYear || year === endYear;
      years.push(
        <div
          key={year}
          onClick={() => handleYearClick(year)}
          className={`year ${currentYear === year ? 'red' : ''} ${isInactive ? 'inactive' : ''}`}
        >
          {year}
        </div>
      );
    }
    return years;
  };

  return <div className="years-container">{renderYears()}</div>;
};

export default Years;