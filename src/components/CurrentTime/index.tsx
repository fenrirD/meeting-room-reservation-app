import React, {useEffect, useRef, useState} from "react";
import useResize from "../../hook/useResize";
import {useInterval} from "../../hook/useInterval";
import styles from './styles.module.css';
import {HOUR_MINUTES, MAX_TIME, MIN_TIME, TIMES} from "../../constants";
import utils from "../../utils";

const CurrentTime = () => {

  const realTimeDiv = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const {width} = useResize(realTimeDiv);
  const [currenTime, setCurrentTime] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);


  const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const position = (((currentHour % TIMES.length) + (currentMinutes / HOUR_MINUTES)) / TIMES.length) * 100;

    setPosition(position);
    setIsRunning(MIN_TIME < currentHour && currentHour < MAX_TIME);
    setCurrentTime(utils.stringToStringTime(currentHour.toString(),currentMinutes.toString()));
  };

  // 최초 한번은 무조건 실행
  useEffect(() => {
    getCurrentTime();
  }, []);

  // 9 ~ 17시에 벗어나면 10초마다 체크해줌.
  useInterval(()=>{
    const now = new Date();
    const currentHour = now.getHours();
    setIsRunning(MIN_TIME < currentHour && currentHour < MAX_TIME);
  },10000, !isRunning);

  useInterval(() => {
    getCurrentTime();
  }, 10000, isRunning, [width]);

  return (
    <div className={styles.current_time_zone} ref={realTimeDiv}>
      <div></div>
      <div className={styles.current_time} style={{display: `${isRunning ? '' : 'none'}`}}>
        <div style={{left: `${position}%`}} className={styles.time_son}></div>
        <div style={{
          left: `${position}%`,
        }}>{currenTime}</div>
      </div>
    </div>
  )
}

export default CurrentTime