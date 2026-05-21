import React, { useEffect, useRef } from "react";
import "./GardenAnimation.css";

export default function GardenAnimation({ onFinish }) {
  const plantRef = useRef();

  useEffect(() => {
    // End animation after 3.5s
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="garden-anim-root">
      <div className="sky">
        <div className="sun" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>
      <div className="ground">
        <div className="plant-grow">
          <div className="stem" ref={plantRef} />
          <div className="leaf leaf-left" />
          <div className="leaf leaf-right" />
          <div className="flower" />
        </div>
      </div>
    </div>
  );
}
