import React from "react";
import "../App.css";

export default function BlurGardenBg() {
  return (
    <div className="blur-garden-bg">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0}}>
        <ellipse cx="300" cy="800" rx="320" ry="120" fill="#7fc97f" fillOpacity="0.7"/>
        <ellipse cx="1200" cy="850" rx="260" ry="90" fill="#b6e2a1" fillOpacity="0.6"/>
        <ellipse cx="900" cy="780" rx="180" ry="60" fill="#388e3c" fillOpacity="0.5"/>
        <ellipse cx="700" cy="900" rx="400" ry="100" fill="#b6e2ff" fillOpacity="0.4"/>
        <ellipse cx="400" cy="200" rx="180" ry="60" fill="#ffe066" fillOpacity="0.3"/>
        <ellipse cx="1200" cy="100" rx="220" ry="80" fill="#fff" fillOpacity="0.2"/>
      </svg>
    </div>
  );
}
