import React, {RefObject, useCallback, useEffect, useState} from "react";

export default function useResize(myRef:RefObject<HTMLDivElement>) {

  const [width, setWidth] = useState(myRef.current?.offsetWidth)
  const [height, setHeight] = useState(myRef.current?.offsetHeight)

  const handleResize = useCallback(() => {
    if(myRef.current) {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }
  }, [myRef])

  const initialSize = useCallback(()=>{
    if(myRef.current) {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }
  },[])

  useEffect(() => {

    initialSize()
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef, handleResize])

  return { width, height }
}

