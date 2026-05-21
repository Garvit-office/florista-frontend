
import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const PLANT_STAGES = [
  "", // 0
  "grown-1", // 1
  "grown-2", // 2
  "grown-3"  // 3
];

const MARKET_ITEMS_BATCH = 10;

function getRandomItem() {
  const flowers = [
    { name: "Sunflower", emoji: "🌻" },
    { name: "Tulip", emoji: "🌷" },
    { name: "Rose", emoji: "🌹" },
    { name: "Daisy", emoji: "🌼" },
    { name: "Hibiscus", emoji: "🌺" },
    { name: "Lily", emoji: "🌸" },
    { name: "Orchid", emoji: "🪷" },
    { name: "Cactus", emoji: "🌵" },
    { name: "Herb", emoji: "🌿" },
    { name: "Seedling", emoji: "🌱" }
  ];
  const f = flowers[Math.floor(Math.random() * flowers.length)];
  return {
    ...f,
    price: `$${(Math.random() * 100).toFixed(2)}`
  };
}

export default function Home() {
  const [growth, setGrowth] = useState(1);
  const [weather, setWeather] = useState("sunny");
  const [marketItems, setMarketItems] = useState([]);
  const [rain, setRain] = useState(false);
  const marketRef = useRef();

  // Plant growth animation
  useEffect(() => {
    setTimeout(() => setGrowth(1), 200);
  }, []);

  // Rain effect
  useEffect(() => {
    setRain(weather === "rainy");
    document.body.classList.remove("weather--sunny","weather--cloudy","weather--rainy","weather--night");
    document.body.classList.add(`weather--${weather}`);
  }, [weather]);

  // Infinite scroll for marketplace
  useEffect(() => {
    function onScroll() {
      if (!marketRef.current) return;
      const { bottom } = marketRef.current.getBoundingClientRect();
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setMarketItems(items => [
          ...items,
          ...Array.from({ length: MARKET_ITEMS_BATCH }, getRandomItem)
        ]);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initial market items
  useEffect(() => {
    setMarketItems(Array.from({ length: MARKET_ITEMS_BATCH }, getRandomItem));
  }, []);

  // Decorative elements scroll animation
  useEffect(() => {
    const elements = document.querySelectorAll('.decorative-element');
    function handleScroll() {
      const triggerPoint = window.innerHeight * 0.8;
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          element.classList.add('grow');
        }
      });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controls
  const handleWater = () => setGrowth(g => Math.min(3, g + 1));
  const handleFertilizer = () => setGrowth(g => Math.min(3, g + 2));
  const handleReset = () => setGrowth(0);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-sky">
        <div className="sky">
          <div className="sun"></div>
          <div className="cloud cloud--1"></div>
          <div className="cloud cloud--2"></div>
          <div className="cloud cloud--3"></div>
          <div className="rain" style={{ opacity: rain ? 1 : 0 }}></div>
        </div>
        {/* Controls overlay */}
        <div className="controls-overlay card">
          <h2>Controls</h2>
          <div className="controls__grid">
            <button className="pill" onClick={handleWater}>💧 Water</button>
            <button className="pill" onClick={handleFertilizer}>🧪 Fertilizer</button>
            <button className="pill pill--ghost" onClick={handleReset}>↺ Reset</button>
          </div>
          <div className="divider"></div>
          <label htmlFor="weatherSelect">Weather:</label>
          <select id="weatherSelect" value={weather} onChange={e => setWeather(e.target.value)}>
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="rainy">Rainy</option>
            <option value="night">Night</option>
          </select>
        </div>
        {/* Grassland */}
        <svg className="grassland" viewBox="0 0 100 20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grass-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#32CD32"/>
              <stop offset="100%" stopColor="#006400"/>
            </linearGradient>
          </defs>
          <path d="M0 20 Q 25 15, 50 20 T 100 20 L100 20 L0 20 Z" className="ground"/>
        </svg>
        {/* Plant */}
        <div className="hero-plant">
          <svg className={`plant ${PLANT_STAGES[growth]}`} viewBox="0 0 200 240" role="img" aria-label="Plant">
            <path d="M100 210 C 100 200, 98 190, 100 180 S 102 150, 100 130 S 98 90, 100 60" className="stem"/>
            <path d="M100 170 C 60 160, 60 140, 100 150" className="leaf leaf--left"/>
            <path d="M100 150 C 140 140, 140 120, 100 130" className="leaf leaf--right"/>
            <path d="M100 120 C 60 110, 60 90, 100 100" className="leaf leaf--left"/>
            <path d="M100 95 C 140 85, 140 70, 100 80" className="leaf leaf--right"/>
            <g className="flower">
              <circle cx="100" cy="50" r="10" className="flower__center"/>
              <g className="petals">
                <circle cx="100" cy="34" r="10" />
                <circle cx="116" cy="42" r="10" />
                <circle cx="116" cy="58" r="10" />
                <circle cx="100" cy="66" r="10" />
                <circle cx="84" cy="58" r="10" />
                <circle cx="84" cy="42" r="10" />
              </g>
            </g>
          </svg>
        </div>
      </section>

      {/* Zigzag Divider with Leaves */}
      <section className="zigzag-divider">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="zigzag">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="#228B22" strokeWidth="2"/>
        </svg>
        <div className="leaves">
          <img src="assets/leaf1.png" alt="Leaf" className="leaf leaf--left" />
          <img src="assets/leaf2.png" alt="Leaf" className="leaf leaf--right" />
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="decorative-element flower flower--1"></div>
        <div className="decorative-element flower flower--2"></div>
        <div className="decorative-element leaf leaf--1"></div>
        <div className="decorative-element leaf leaf--2"></div>
        <svg className="bael bael--1" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="#228B22" strokeWidth="2"/>
        </svg>
        <svg className="bael bael--2" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="#228B22" strokeWidth="2"/>
        </svg>
      </div>

      {/* Marketplace Section */}
      <section className="marketplace" ref={marketRef}>
        <h2>Never-Ending Marketplace</h2>
        <div className="marketplace__grid">
          {marketItems.map((item, i) => (
            <div className="marketplace__item" key={i}>
              <div className="marketplace__image" style={{fontSize: "3rem", height: "150px", display: "flex", alignItems: "center", justifyContent: "center"}}>{item.emoji}</div>
              <h3 className="marketplace__title">{item.name}</h3>
              <p className="marketplace__price">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}