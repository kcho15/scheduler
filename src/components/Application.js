import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Appointment/Form";

import Empty from "./Appointment/Empty";
import Show from "./Appointment/Show";
import Confirm from "./Appointment/Confirm";
import Error from "./Appointment/Error";
import Status from "./Appointment/Status"; 

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"; 
const CONFIRM = "CONFIRM"; 
const ERROR = "ERROR";
const STATUS = "STATUS";

export default function Application(props) {

  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 
    
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
  
  const { mode, transition, back } = useVisualMode( state.appointments ? SHOW : EMPTY)
  
  const dailyAppointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        appointmentId={appointment.id}
      />
    );
  });
  
  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   return (
  //    <Appointment
  //       key={appointment.id}
  //       {...appointment}
  //       interview={interview}
  //   />
  //   );
  // });
        
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
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && 
          (
            <Show
            student={getInterview(state, props.appointment.interview).student}
            interviewer={getInterview(state, props.appointment.interview).interviewer}
            />
          )
        }
        {mode === CREATE && 
          (
            <Form
              interviewers={state.interviewers}
              onCancel={()=> back()}
            />
          )
        }
        {dailyAppointments}  
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
} 
