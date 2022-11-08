import { useEffect, useState } from 'react';
import './Change.css';

const ChangeSession = ({valueSession, handleChangeSession, isReset}) => {

  const [sessionTime, setSessionTime] = useState(valueSession)

  useEffect(() => {
    if(isReset === true) {
      setSessionTime(valueSession)
    } 
  }, [isReset, valueSession])

  const increment = () => {
    let data = parseInt(document.getElementById('count').textContent)
    setSessionTime(data + 1)
    handleChangeSession(data + 1)
  }

  const decrement = () => {
    let data = parseInt(document.getElementById('count').textContent)
    setSessionTime(data - 1)
    handleChangeSession(data - 1)
  }

  return (
    <div className="pomodoro-bottom-left">
      <div className="text-top">
        <h2>Work Session</h2>
      </div>
      <div className="edit-bottom">
        <button onClick={decrement} className="button-bottom">-</button>
        <span id='count'>{sessionTime}</span>
        <button onClick={increment} className="button-bottom">+</button>
      </div>
    </div>
  );
};

export default ChangeSession;
