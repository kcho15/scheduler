import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode); 
    setHistory(prev => {
      if (replace) {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      } else {
        return [...prev, newMode]; 
      }
    });
  }; 

  function back(){
    if (history.length > 1) {
      
      setMode(history[history.length - 2]); 
      setHistory(prev => prev.slice(0, -1)); 

    }   
  }; 

  return { mode, transition, back }; 
}

