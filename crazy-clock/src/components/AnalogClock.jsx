import React, { useEffect, useRef } from "react";
import "./Clock.css";

export default function Clock() {
  const secondsRef = useRef(null);
  const minutesRef = useRef(null);
  const minuteRef = useRef(null);
  const hourRef = useRef(null);

  useEffect(() => {
    const seconds = secondsRef.current;
    const minutes = minutesRef.current;
    const minute = minuteRef.current;
    const hour = hourRef.current;

    // Create spikes dynamically
    for (let s = 0; s < 60; s++) {
      let mSpikeEl = document.createElement("i");
      let sSpikeEl = document.createElement("i");
      mSpikeEl.className = "spike";
      sSpikeEl.className = "spike";
      mSpikeEl.style = `--rotate:${6 * s}deg`;
      sSpikeEl.style = `--rotate:${6 * s}deg`;
      mSpikeEl.setAttribute("data-i", s);
      sSpikeEl.setAttribute("data-i", s);

      seconds.appendChild(sSpikeEl);
      minutes.appendChild(mSpikeEl);
    }

    function getTime() {
      let date = new Date(),
        s = date.getSeconds(),
        m = date.getMinutes(),
        h = date.getHours();

      // Convert to 12-hour format
      h = h % 12;
      h = h ? h : 12;

      hour.textContent = h;
      minute.textContent = m.toString().padStart(2, "0");

      minutes.style = `--dRotate:${6 * m}deg`;

      if (s === 0) {
        seconds.classList.add("stop-anim");
      } else {
        seconds.classList.remove("stop-anim");
      }
      if (m === 0) {
        minutes.classList.add("stop-anim");
      } else {
        minutes.classList.remove("stop-anim");
      }

      seconds.style = `--dRotate:${6 * s}deg`;
    }

    const interval = setInterval(getTime, 1000);
    getTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className="seconds" ref={secondsRef}></div>
      <div className="minutes" ref={minutesRef}></div>
      <div className="minute" ref={minuteRef}></div>
      <div className="hour" ref={hourRef}></div>
    </div>
  );
}
