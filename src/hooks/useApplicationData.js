import { useEffect, useState } from "react";
import axios from 'axios'; 

const useApplicationData = () => {

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


    // book interview function 
    const bookInterview = function(id, interview) {
      
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
        const days = updateSpots(state.day, state.days, appointments)
        setState({
          ...state,
          appointments,
          days
        });
      });
    };
  
  // cancel interview function
    const cancelInterview = function(id) {
      // set interview value to null 
  
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      // replace existing appointment with matching id 
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      // update the database with the interview data, setting a new state object 
      return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(state.day, state.days, appointments)
        setState({
          ...state,
          appointments,
          days
        });
      });
    };


  // helper to check for available spots
  const availableSpots = (day, appointments) => {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  };  

  // spots remaining
  const updateSpots = function(dayName, days, appointments) {
    
    const daysArray = days.map((day) => {
      if (day.name === dayName) {
        const spots = availableSpots(day, appointments);
        return { ...day, spots: spots};  
      }
      return day; 
    });
    return daysArray; 
  }
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};

export default useApplicationData; 