import React, {useEffect, useRef, useState} from "react";
import useResize from "../../hook/useResize";
import {useInterval} from "../../hook/useInterval";
import styles from './styles.module.css';

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
    const position = (((currentHour % 9) + (currentMinutes / 60)) / 9) * 100
    setPosition(position)
    setIsRunning(8 < currentHour && currentHour < 18)
    setCurrentTime(`${currentHour} : ${currentMinutes.toString().padStart(2,'0')}`)
  }

  // 최초 한번은 무조건 실행
  useEffect(() => {
    getCurrentTime()
  }, [])

  useInterval(() => {
    getCurrentTime()
  }, 10000, isRunning, [width])

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