import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);           // Set the initial mode
  const [history, setHistory] = useState([initial]);  // Set the initial history with the first mode

  function transition(newMode, replace = false) {
    // Set the new mode
    setMode(newMode); 

    // Update the history array depending on whether this is a replacement or not
    setHistory(prev => {
      if (replace) {
        // If this is a replacement, make a copy of the history array and replace the last item with the new mode
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      } else {
        // If this is not a replacement, add the new mode to the end of the history array
        return [...prev, newMode]; 
      }
    });
  }; 

  function back(){
    if (history.length > 1) {
      // If there is more than one item in the history array, set the mode to the previous item in the array
      setMode(history[history.length - 2]); 
      
      // Update the history array to remove the last item
      setHistory(prev => prev.slice(0, -1)); 
    }   
  }; 
  
  // Return an object containing the current mode, the transition function, and the back function
  return { mode, transition, back }; 
}