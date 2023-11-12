import React from 'react';
import './days.css';

/**
 * Days component for displaying and selecting days within a month.
 * 
 * @param {Date} date - The current selected date.
 * @param {function} onChangeDate - Callback function to change the selected date.
 * @param {function} onCloseCalendar - Callback function to close the calendar.
 */
const Days = ({ date, onChangeDate, onCloseCalendar }) => {

  /**
   * Handles the click event for a specific day, updating the selected date.
   * 
   * @param {number} day - The selected day.
   */
  const handleDateClick = (day) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const newDate = new Date(currentYear, currentMonth, day);
    
    onChangeDate(newDate);
    onCloseCalendar();
  };

  /**
   * Formats a given date into a string with the format 'YYYY-MM-DD'.
   * 
   * @param {Date} date - The date to be formatted.
   * @returns {string} - A string representing the formatted date.
   */
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Populates the days in the selected month, including days from the previous and next months.
   * 
   * @returns {JSX.Element[]} - An array of JSX elements representing the days.
   */
  const populateDaysInSelectedMonth = () => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const daysBefore = firstDayOfMonth;
    const totalDisplayedDays = daysBefore + daysInCurrentMonth;
    const daysAfter = 42 - totalDisplayedDays;

    const daysArr = [];

    // Populate the days from the previous month
    for (let i = daysBefore - 1; i >= 0; i--) {
      daysArr.push(
        <div key={`prev-${i}`} className="days inactive">
          {prevMonthDays - i}
        </div>
      );
    }

    // Populate the days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const day = i.toString();
      const today = new Date();
      const newDate = new Date(currentYear, currentMonth, i);
      const isSelected = formatDate(date) === formatDate(newDate);
      const isToday = today.getDate() === i && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
      let color = 'black';
      let backgroundColor = 'transparent';

      if(isToday) {
        color = '#F34242';
      }

      if(isSelected) {
        color = 'white'
        backgroundColor = '#F34242'
      } 

      daysArr.push(
        <span
          key={day}
          onClick={() => handleDateClick(i)}
          className={`days`}
          style={{color, backgroundColor}}
        >
          {day}
        </span>
      );
    }
    
    // Populate the days from the next month
    for (let i = 0; i < daysAfter; i++) {
      daysArr.push(
        <div key={`next-${i}`} className="days inactive">
          {i + 1}
        </div>
      );
    }
    return daysArr;
  };

  return (
    <div>
      <ul className="days-label">
        <li>Su</li>
        <li>Mo</li>
        <li>Tu</li>
        <li>We</li>
        <li>Th</li>
        <li>Fr</li>
        <li>Sa</li>
      </ul>
      <div className="days-container">{populateDaysInSelectedMonth()}</div>
    </div>
  );
};

export default Days;
