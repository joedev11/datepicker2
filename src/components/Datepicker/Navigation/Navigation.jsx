import React, { useEffect, useState } from 'react';
import './Navigation.css';

/**
 * Navigation component for switching between views (days, months, years) and navigating through time.
 * 
 * @param {Date} date - The current date in the navigation.
 * @param {string} view - The current view ('days', 'months', 'years').
 * @param {function} onChangeView - Callback function to change the current view.
 * @param {function} onChangeMonth - Callback function to change the current month.
 */
const Navigation = ({ date, view, onChangeView, onChangeMonth }) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentView, setView] = useState(view);

  // useEffect to log updates and synchronize state with props
  useEffect(() => {
    console.log('Updated Navigation view:', view);
    console.log('Updated Navigation date:', date);
    setView(view);
    setCurrentDate(date);
  }, [view, date, currentDate]);

  /**
   * Formats the current date based on the current view.
   * 
   * @returns {string} - The formatted date string.
   */
  const formatCurrentDate = () => {
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDate();
    let currentMonthAndYear = new Date(year, month, day).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    switch (currentView) {
      case 'days':
        return currentMonthAndYear;
      case 'months':
        return year.toString();
      case 'years':
        let startYear = Math.floor(year / 10) * 10;
        let endYear = startYear + 9;
        return `${startYear}-${endYear}`;
      default:
        return currentMonthAndYear;
    }
  };

  /**
   * Handles the click event to navigate to the next month or year based on the current view.
   */
  const nextMonth = () => {
    let newMonth = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let newDate = new Date(year, newMonth, 1);
    switch (currentView) {
      case 'days':
        newMonth++;
        newDate = new Date(year, newMonth, 1);
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      case 'months':
        year++;
        newDate = new Date(year, newMonth, 1)
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      case 'years':
        year += 10;
        newDate = new Date(year, 0, 1);
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      default:
        return ;
    }
  };

  /**
   * Handles the click event to navigate to the previous month or year based on the current view.
   */
  const prevMonth = () => {
    let newMonth = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let newDate;
  
    switch (currentView) {
      case 'days':
        newMonth--; // Decrement the month
        newDate = new Date(year, newMonth, 1);
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      case 'months':
        year--;
        newDate = new Date(year, newMonth, 1);
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      case 'years':
        year -= 10;
        newDate = new Date(year, 0, 1);
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      default:
        return;
    }
  };

  /**
   * Handles the click event to change the current view.
   */
  const handleChangeView = () => {
    if (view === 'days') {
      setView('months');
      onChangeView('months');
    } else if (view === 'months') {
      setView('years');
      onChangeView('years');
    }
  };

  return (
    <div className="navigation-container">
      <button className="prev-month" onClick={prevMonth}>{'<'}</button>
      <button className="current-month" onClick={handleChangeView}>{formatCurrentDate()}</button>
      <button className="next-month" onClick={nextMonth}>{'>'}</button>
    </div>
  );
};

export default Navigation;
