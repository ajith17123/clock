import React, { useState, useEffect } from 'react';
import '../assets/style/Home.css';

const Home = () => {
  const [time, setTime] = useState(new Date());

  // Automatically updates time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const currentDate = time.getDate();
  const currentMonth = time.getMonth(); // 0 - 11
  const currentDay = time.getDay(); // 0 - 6 (Sun - Sat)

  // Data arrays for calendar rings
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // 1. Calculate clock hand rotation angles
  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  // 2. Find the natural un-rotated angle of the CURRENT active items
  const activeDateAngle = ((currentDate - 1) * 360) / 31;
  const activeMonthAngle = (currentMonth * 360) / 12;
  const activeDayAngle = (currentDay * 360) / 7;

  // 3. Math to dynamically shift the entire ring so the active items line up with the hour hand
  const dateRingOffset = hourAngle - activeDateAngle;
  const monthRingOffset = hourAngle - activeMonthAngle;
  const dayRingOffset = hourAngle - activeDayAngle;

  return (
    <div className="dashboard-container">
      <div className="center-dial">
        
        {/* Outer Ring: Days of the Month (1-31) */}
        <div className="ring date-ring" style={{ transform: `rotate(${dateRingOffset}deg)` }}>
          {daysInMonth.map((day, index) => {
            const angle = (index * 360) / 31;
            const isActive = day === currentDate;
            return (
              <span
                key={day}
                className={`ring-item ${isActive ? 'active' : ''}`}
                style={{ transform: `rotate(${angle}deg) translateY(-170px)` }}
              >
                {day}
              </span>
            );
          })}
        </div>

        {/* Middle Ring: Months (JAN-DEC) */}
        <div className="ring month-ring" style={{ transform: `rotate(${monthRingOffset}deg)` }}>
          {months.map((month, index) => {
            const angle = (index * 360) / 12;
            const isActive = index === currentMonth;
            return (
              <span
                key={month}
                className={`ring-item ${isActive ? 'active' : ''}`}
                style={{ transform: `rotate(${angle}deg) translateY(-130px)` }}
              >
                {month}
              </span>
            );
          })}
        </div>

        {/* Inner Ring: Days of the Week (SUN-SAT) */}
        <div className="ring day-ring" style={{ transform: `rotate(${dayRingOffset}deg)` }}>
          {daysOfWeek.map((day, index) => {
            const angle = (index * 360) / 7;
            const isActive = index === currentDay;
            return (
              <span
                key={day}
                className={`ring-item ${isActive ? 'active' : ''}`}
                style={{ transform: `rotate(${angle}deg) translateY(-90px)` }}
              >
                {day}
              </span>
            );
          })}
        </div>

        {/* Core Analogue Clock Face - Locked Exactly in the Center */}
        <div className="clock-core">
          <div className="center-pivot"></div>
          
          {/* Clock Hands */}
          <div className="hand hour-hand" style={{ transform: `rotate(${hourAngle}deg)` }}></div>
          <div className="hand minute-hand" style={{ transform: `rotate(${minAngle}deg)` }}></div>
          <div className="hand second-hand" style={{ transform: `rotate(${secAngle}deg)` }}></div>
          
          {/* Central Digital Label */}
          <div className="central-text">
          
            <span className="sub-day">{time.getFullYear()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;