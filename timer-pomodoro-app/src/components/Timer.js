import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./Timer.css";
import pomodoroFoto from "../img/pomodoro.png";
import ChangeSession from "./ChangeSession";
import ChangeBreak from "./ChangeBreak";


const Timer = () => {
  
  let initialState = {
    defaultSessionTime: 25,
    defaultBreakTime: 5,
    isPaused: true,
    mode: "Session",
    updateSession: 0,
    updateBreak: 0,
    isUpdateSession: false,
    isUpdateBreak: false
  };

  const [config, setConfig] = useState(initialState);

  const [minutesSession, setMinutesSession] = useState(config.defaultSessionTime);
  const [secondsSession, setSecondsSession] = useState(0);
  const [minutesBreak, setMinutesBreak] = useState(config.defaultBreakTime);
  const [secondsBreak, setSecondsBreak] = useState(0);

  const [isReset, setIsReset] = useState(false)

  //funzione di callback per passare dati di un componente figlio(changeSession) al componente padre//
  const handleChangeSession = (childData) => {
    if(config.isPaused === true) {
      setMinutesSession(childData)
    }else {
      setConfig((config) => ({ ...config, ...{ isUpdateSession: true, updateSession: childData }}));
    }
  }

  //funzione di callback per passare dati di un componente figlio(changeBreak) al componente padre//
  const handleChangeBreak = (childData) => {
    if(config.isPaused === true) {
      setMinutesBreak(childData)
    }else {
      setConfig((config) => ({...config, ...{isUpdateBreak: true, updateBreak: childData}}))
    }
  }


  useEffect(() => {
    let interval = setInterval(() => {
      if (config.isPaused) {
        return;
      }

      if (config.mode === "Session") {
        if (secondsSession === 0) {
          if (minutesSession !== 0) {
            setSecondsSession(59);
            setMinutesSession(minutesSession - 1);
          } else {
            setConfig((config) => ({ ...config, ...{ mode: 'Break' } }));
            if(config.isUpdateSession) {
              setMinutesSession(config.updateSession)
              setSecondsSession(0)
            }
            if(config.isUpdateBreak) {
              setMinutesBreak(config.updateBreak)
              setSecondsBreak(0)
            }
          }
        } else {
          setSecondsSession(secondsSession - 1);
        }
      } else {
        if (secondsBreak === 0) {
          if (minutesBreak !== 0) {
            setSecondsBreak(59);
            setMinutesBreak(minutesBreak - 1);
          } else {
            setConfig((config) => ({ ...config, ...{ mode: 'Session' } }));
            if(config.isUpdateBreak) {
              setMinutesBreak(config.updateBreak)
              setSecondsBreak(0)
            }
            if(config.isUpdateSession) {
              setMinutesSession(config.updateSession)
              setSecondsSession(0)
            }
          }
        } else {
          setSecondsBreak(secondsBreak - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsSession, minutesSession, config, secondsBreak, minutesBreak]);

  let timerMinutes;
  let timerSeconds;

  if (config.mode === "Session") {
    timerMinutes = minutesSession < 10 ? `0${minutesSession}` : minutesSession;
    timerSeconds = secondsSession < 10 ? `0${secondsSession}` : secondsSession;
  } else {
    timerMinutes = minutesBreak < 10 ? `0${minutesBreak}` : minutesBreak;
    timerSeconds = secondsBreak < 10 ? `0${secondsBreak}` : secondsBreak;
  }

  const startTimer = () => {
    setConfig((config) => ({ ...config, ...{ isPaused: false } }));
    setIsReset(false)
  };

  const pauseTimer = () => {
    setConfig((config) => ({ ...config, ...{ isPaused: true } }));
    setIsReset(false)
  };

  const resetTimer = () => {
    setConfig((config) => ({ ...config, ...initialState }));
    setMinutesSession(initialState.defaultSessionTime);
    setSecondsSession(0);
    setMinutesBreak(initialState.defaultBreakTime);
    setSecondsBreak(0);
    setIsReset(true)
  };
  

  return (
    <div className="container">
      <header className="header">
        <img src={pomodoroFoto} alt='pomodoroFoto'/>
        <h1 style={{ color: "white" }}>Pomodoro Timer App</h1>
      </header>

      <main className="main">
        <section className="section-center-structure">
          <div className="message">
            {config.mode === "Session" ? <div>Session</div> : <div>Break</div>}
          </div>

          <div className="timer">
            {timerMinutes}:{timerSeconds}
          </div>

          <section className="buttons">
            {config.isPaused ? (
              <button className="button-center" onClick={startTimer}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            ) : (
              <button className="button-center" onClick={pauseTimer}>
                <FontAwesomeIcon icon={faCircle} />
              </button>
            )}
            <button className="button-center" onClick={resetTimer}>
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </section>
        </section>
      </main>

      <footer className="footer">
        <ChangeSession isReset={isReset} handleChangeSession={handleChangeSession} valueSession={config.defaultSessionTime}/>
        <ChangeBreak isReset={isReset} handleChangeBreak={handleChangeBreak} valueBreak ={config.defaultBreakTime}/>
      </footer>
    </div>
  );
};

export default Timer;
