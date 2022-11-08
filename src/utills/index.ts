

const Utils = (() => {

  const stringTimeToMinutes = (str:string) => {
    return str.split(":").reduce((acc,cur,idx)=> acc+= idx ? Number(cur) : Number(cur) * 60,0);
  }

  const isIncludesTime = (oldStartTime:string, oldEndTime:string ,startTime:string, endTime:string) => {
    const oldStartMinutes = stringTimeToMinutes(oldStartTime);
    const oldEndMinutes = stringTimeToMinutes(oldEndTime);
    const startMinutes = stringTimeToMinutes(startTime);
    const endMinutes = stringTimeToMinutes(endTime);
    return (oldStartMinutes < startMinutes && startMinutes < oldEndMinutes) || (oldStartMinutes < endMinutes && endMinutes < oldEndMinutes)
  }

  const stringToStringTime = (hour:string='',minutes:string='') => `${hour}:${minutes.padStart(2,'0')}`

  const minutesToStringTime = (minutes:number) => `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2,'0')}`


  return {
    stringTimeToMinutes,
    isIncludesTime,
    stringToStringTime,
    minutesToStringTime
  }
})()


export default Utils