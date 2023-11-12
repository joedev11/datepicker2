import React from 'react';
import './months.css';

/**
 * Months component for displaying and selecting months.
 * 
 * @param {Date} date - The current selected date.
 * @param {function} onChangeMonth - Callback function to change the selected month.
 * @param {function} onChangeView - Callback function to change the current view.
 */
const Months = ({ date, onChangeMonth, onChangeView }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get the index of the current month
  const currentMonth = date.getMonth();

  /**
   * Handles the click event for a specific month, updating the selected month and changing the view to 'days'.
   * 
   * @param {number} index - The index of the selected month.
   */
  const handleMonthClick = (index) => {
    const newDate = new Date(date.getFullYear(), index, 1);

    onChangeMonth(newDate);
    onChangeView('days');
  };

  return (
    <ul className="months-container">
      {months.map((month, index) => (
        <li key={index} onClick={() => handleMonthClick(index)}
        className= {`month ${index === currentMonth ? 'red' : ''}`}>
          {month}
        </li>
      ))}
    </ul>
  );
};

export default Months;