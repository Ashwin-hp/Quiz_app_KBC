import React, { useEffect, useState } from "react";
export default function Timer(props) {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer === 0) return props.setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.setStop, timer]);
  useEffect(() => {
    setTimer(30);
  }, [props.questionNumber]);
  return timer;
}
