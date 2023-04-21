import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  }); 
  
  const dailyAppointments = getAppointmentsForDay(state, state.day); 

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            value={state.day}
            days={state.days}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment  
            key={appointment.id}
            {...appointment}
          />
        ))}
      </section>
    </main>
  );
}
