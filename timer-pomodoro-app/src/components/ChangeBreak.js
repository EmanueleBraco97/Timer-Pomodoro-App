import './Change.css';
import { useState, useEffect } from 'react';

const ChangeBreak = ({valueBreak, handleChangeBreak, isReset }) => {
  
  const [BreakTime, setBreakTime] = useState(valueBreak);

  useEffect(() => {
    if(isReset === true) {
      setBreakTime(valueBreak)
    }
  }, [isReset, valueBreak])

  const increment = () => {
    let data = parseInt(document.getElementById('countBreak').textContent)
    setBreakTime(data + 1)
    handleChangeBreak(data + 1)
  }

  const decrement = () => {
    let data = parseInt(document.getElementById('countBreak').textContent)
    setBreakTime(data - 1)
    handleChangeBreak(data - 1)
  }

    
  return (
    <div className="pomodoro-bottom-right">
      <div className="text-top">
        <h2>Break Time</h2>
      </div>
      <div className="edit-bottom">
        <button onClick={decrement} className="button-bottom">-</button>
        <span id='countBreak'>{BreakTime}</span>
        <button onClick={increment} className="button-bottom">+</button>
      </div>
    </div>
  );
};

export default ChangeBreak;
