import React, { useState } from 'react'
import './Navigation.css'

const Navigation = ({date, onChangeMonth}) => {
  console.log('navigation: ' + date)
  console.log(date)
  const [currentDate, setCurrentDate] = useState(date);

  const formatCurrentDate = () => {
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let currentMonthAndYear = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return currentMonthAndYear;
  }

  const nextMonth = () => {
    let newMonth = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let newDate = new Date(year, newMonth, 1)
    onChangeMonth(newDate);
    setCurrentDate(newDate);
    return newDate;
  };

  const prevMonth = () => {
    let newMonth = currentDate.getMonth() - 1;
    let year = currentDate.getFullYear();
    let newDate = new Date(year, newMonth, 1)
    onChangeMonth(newDate);
    setCurrentDate(newDate);
    return newDate;
  };

  return (
    <div className="">
        <div className="navigation-container">
            <button className="prev-month" onClick={prevMonth}>{'<'}</button>
            <button className="current-month">{formatCurrentDate()}</button>
            <button className="next-month" onClick={nextMonth}>{'>'}</button>
        </div>
        <ul className="days-label">
            <li>Su</li>
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
        </ul>
    </div>
  )
}

export default Navigation