


import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calander.css';
const localizer = momentLocalizer(moment);

const VacationCalander = () => {
    const [events] = useState([
        {
            title: 'Eid ul Adha',
            start: new Date(2024, 5, 15),
            end: new Date(2024, 5, 21),
            allDay: true,
        },
        {
            title: 'Summar Vacation',
            start: new Date(2024, 6, 22),
            end: new Date(2024, 6, 25),
            allDay: true,
        },
    ]);

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 5 || day === 6; 
    };

    const eventStyleGetter = (event) => {
        const backgroundColor = isWeekend(event.start) ? 'red' : '#3174ad';
        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };
        return {
            style: style,
        };
    };
    return (
        <div className="container mx-auto mt-10">
        <h1 className="text-4xl  mb-5 text-center">Company Calendar</h1>
        <div className="bg-white p-5 shadow-md rounded-lg">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            views={['month']}
          />
        </div>
      </div>
    );
};

export default VacationCalander;