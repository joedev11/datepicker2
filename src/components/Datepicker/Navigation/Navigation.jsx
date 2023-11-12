import React, { useEffect, useState } from 'react';
import './Navigation.css';

const Navigation = ({ date, view, onChangeView, onChangeMonth }) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentView, setView] = useState(view);

  useEffect(() => {
    console.log('Updated Navigation view:', view);
    console.log('Updated Navigation date:', date);
    setView(view);
    setCurrentDate(date);
  }, [view, date, currentDate]);


  const formatCurrentDate = () => {
    console.log('Date from days to Navigation: ' + date)
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
        year += 10; // Increment by 10 years for the "years" view
        newDate = new Date(year, 0, 1); // Set to the first month of the new year
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      default:
        return ;
    }
  };

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
        year -= 10; // Decrement by 10 years for the "years" view
        newDate = new Date(year, 0, 1); // Set to the first month of the new year
        onChangeMonth(newDate);
        setCurrentDate(newDate);
        break;
      default:
        return;
    }
  };

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
