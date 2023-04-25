import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"; 
  const CONFIRM = "CONFIRM"; 
  const ERROR = "ERROR";
  const STATUS = "STATUS";
  
  
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 
  
  const { mode, transition, back } = useVisualMode( state.appointments ? SHOW : EMPTY)

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, []);

// book interview function 
  const bookInterview = function(id, interview) {
    console.log(id, interview); 
    
    // replace value of interview key  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // replace existing appointment with matching id 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update the database with the interview data, setting a new state object 
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({
          ...state,
          appointments
        })
      });
  }

// cancel interview function
  const cancelInterview = function() {}
  

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}

      />
    );
  });
          
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
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
} 
