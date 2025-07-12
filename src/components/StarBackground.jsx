import { useEffect, useState } from "react";

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
    setIsMobile(window.innerWidth <= 768);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains("dark")) {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    generateStars();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateStars = () => {
    const starDensity = isMobile ? 15000 : 10000;
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / starDensity
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
        animationDelay: Math.random() * 5,
        animationType: Math.random() > 0.7 ? "float" : "pulse-subtle"
      });
    }

    setStars(newStars);
  };

  if (!isDarkMode) {
    // Enhanced modern light mode background
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Modern gradient background for light mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-50" />
        
        {/* Geometric patterns */}
        <div className="absolute inset-0">
          {/* Circles */}
          <div className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-blue-100/40 to-indigo-100/40 blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-l from-sky-100/30 to-purple-100/30 blur-3xl" />
          
          {/* Animated wave patterns */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Floating elements */}
          <div className="absolute top-[30%] left-[60%] w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-lg rotate-12 animate-float" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[60%] left-[20%] w-24 h-24 bg-gradient-to-br from-sky-200/30 to-purple-200/30 rounded-full animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          <div className="absolute top-[15%] left-[40%] w-12 h-12 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-md rotate-45 animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
        </div>
      </div>
    );
  }

  // Enhanced dark mode with animated stars
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950" />
      
      {/* Grid lines */}
      <div className="grid-lines animate-grid-flow" />
      
      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.animationType === "float" ? "animate-float" : "animate-pulse-subtle"}`}
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            animationDelay: star.animationDelay + "s",
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 rounded-full bg-indigo-900/20 blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-violet-900/20 blur-3xl animate-glow" 
           style={{ animationDelay: '2s' }} />
    </div>
  );
};
