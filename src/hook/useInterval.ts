
import {DependencyList, useEffect, useRef} from "react";

export const useInterval = (callback:Function, delay:number, isRunning?:boolean, deps?:DependencyList) => {
  const savedCallback = useRef<Function>();


  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(()=>{

    const tick = () => savedCallback.current?.call(this)

    if(isRunning) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id)
    }
  },[isRunning,...(deps||[])])
}