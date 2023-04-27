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
        const days = updateSpots("bookAppointment")
        setState({
            ...state,
            appointments,
            days
          })
        })
    }
  
  // cancel interview function
    const cancelInterview = function(id) {
      // set interview value to null 
  
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
  
      // replace existing appointment with matching id 
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      // update the database with the interview data, setting a new state object 
      return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots()
        setState({
          ...state,
          appointments,
          days
        })
      })

    }

  // // spots remaining
  const updateSpots = function(reqType) {
    
    const days = [];
    
    for (const day of state.days) {

      if (day.name === state.day) {
        if (reqType === "bookAppointment") {
          days.push({ ...day, spots: day.spots - 1  }) 
        } else {
          days.push({ ...day, spots: day.spots + 1  }) 
        }
      } else {
        days.push(day);  
      }
    }
    return days 
  };

  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}

export default useApplicationData; 