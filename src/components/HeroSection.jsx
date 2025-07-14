import { ArrowDown, Github, Linkedin, Twitter, Gitlab, Facebook } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import tempImage from "../assets/example.jpg";

// Floating Particle component for a soft, drifting effect
const FloatingParticle = ({ isHovered }) => {
  const particleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState('');
  const [movement, setMovement] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    if (isHovered && particleRef.current) {
      // Random position around the container
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // Random movement direction
      const speed = 0.5 + Math.random() * 1.5;
      const moveAngle = Math.random() * Math.PI * 2;
      const dx = Math.cos(moveAngle) * speed;
      const dy = Math.sin(moveAngle) * speed;
      
      // Random size (now with more variation)
      const particleSize = 2 + Math.random() * 6;
      
      // Enhanced color palette
      const colors = [
        'hsla(var(--primary), 0.8)',      // Primary color from CSS variables
        'rgba(168, 85, 247, 0.8)',       // Purple-500
        'rgba(192, 132, 252, 0.8)',      // Purple-400
        'hsla(var(--primary), 0.4)',      // Primary color (transparent)
        'rgba(255, 255, 255, 0.6)',       // White (for sparkle effect)
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setPosition({ x, y });
      setSize(particleSize);
      setColor(randomColor);
      setMovement({ dx, dy });
      
      // Fade in with random delay
      setTimeout(() => {
        setOpacity(0.8);
      }, Math.random() * 300);
      
      // Animate position
      const moveInterval = setInterval(() => {
        setPosition(prev => ({ 
          x: prev.x + movement.dx, 
          y: prev.y + movement.dy 
        }));
      }, 50);
      
      // Fade out after random duration
      const fadeTimeout = setTimeout(() => {
        setOpacity(0);
      }, 800 + Math.random() * 1200);
      
      return () => {
        clearInterval(moveInterval);
        clearTimeout(fadeTimeout);
      };
    } else {
      setOpacity(0);
    }
  }, [isHovered]);

  return (
    <div
      ref={particleRef}
      className="absolute rounded-full transition-opacity duration-700"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        transition: 'opacity 0.7s ease',
      }}
    />
  );
};

// New Sparkle Particle component for a sharp, twinkling effect
const SparkleParticle = ({ isHovered }) => {
  const [style, setStyle] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let sparkleTimeout;
    let visibilityTimeout;

    const sparkle = () => {
      setVisible(true);
      const size = 1 + Math.random() * 2.5;
      const angle = Math.random() * 360;
      // Position sparkles more centrally, closer to the image
      const radius = 40 + Math.random() * 100;
      
      const x = Math.cos(angle * Math.PI / 180) * radius;
      const y = Math.sin(angle * Math.PI / 180) * radius;

      const life = 300 + Math.random() * 700;
      
      setStyle({
        width: `${size}px`,
        height: `${size}px`,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`,
        backgroundColor: `rgba(255, 255, 224, ${0.7 + Math.random() * 0.3})`, // Light yellow/white
        boxShadow: '0 0 8px 2px rgba(255, 255, 224, 0.5)',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        transition: `opacity ${life}ms ease-in-out`,
      });

      visibilityTimeout = setTimeout(() => {
        setVisible(false);
      }, life);
      
      // Schedule the next sparkle
      sparkleTimeout = setTimeout(sparkle, life + Math.random() * 500);
    };

    if (isHovered) {
      // Start the sparkle loop
      sparkleTimeout = setTimeout(sparkle, Math.random() * 500);
    }

    return () => {
      clearTimeout(sparkleTimeout);
      clearTimeout(visibilityTimeout);
    };
  }, [isHovered]);

  return (
    <div
      className="absolute"
      style={{
        ...style,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const roles = [
    "Aspiring Frontend Developer",
    "UI/UX Designer",
    "Problem Solver",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const imageRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Set loaded state after component mounts for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Changed from 100ms to 2000ms (2 seconds)
    return () => clearTimeout(timer);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout;
    
    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText.length === currentRole.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 1000); // Reduced pause before starting to delete (from 1800ms)
          return;
        }
        
        // Faster typing speed for more energetic effect
        const typingSpeed = Math.random() * 30 + 30; // Between 30ms and 60ms (much faster)
        timeout = setTimeout(type, typingSpeed);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          timeout = setTimeout(type, 400); // Reduced pause before typing next phrase (from 700ms)
          return;
        }
        
        // Faster deletion speed
        timeout = setTimeout(type, 20); // Reduced from 40ms
      }
    };
    
    timeout = setTimeout(type, 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleMouseMove = (e) => {
    if (imageRef.current && !isMobile) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const maxRotation = 25; // Increased further for a more dramatic effect
      const rotationX = ((mouseY - centerY) / (height / 2)) * -maxRotation;
      const rotationY = ((mouseX - centerX) / (width / 2)) * maxRotation;

      setRotateX(rotationX);
      setRotateY(rotationY);
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Add rotation animation
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation(prev => (prev + 0.1) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    
    if (isHovered) {
      animate();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered]);

  // Add subtle pulse animation to the image
  useEffect(() => {
    const pulsateInterval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.02 : 1);
    }, 2000);
    
    return () => clearInterval(pulsateInterval);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    // Keep effect active for a bit after touch ends for better mobile experience
    setTimeout(() => {
      setIsHovered(false);
    }, 1500);
  };

  // Auto-trigger hover effect periodically on mobile
  useEffect(() => {
    let mobileAnimationInterval;
    
    if (isMobile) {
      mobileAnimationInterval = setInterval(() => {
        setIsHovered(true);
        setTimeout(() => {
          setIsHovered(false);
        }, 2000);
      }, 5000);
    }
    
    return () => {
      if (mobileAnimationInterval) {
        clearInterval(mobileAnimationInterval);
      }
    };
  }, [isMobile]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden py-16 md:py-0"
    >
      {/* Animated Intro Overlay */}
      <div className={`fixed inset-0 bg-background z-50 flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 animate-pulse">
          Welcome to My Portfolio
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
          {/* Left side - Illustration (now below text on mobile) */}
          <div 
            className={`w-full md:w-1/2 flex justify-center items-center perspective-1000 transition-all duration-1000 mt-8 md:mt-0 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            ref={imageRef}
          >
            <div 
              className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] bg-primary/10 flex items-center justify-center transition-transform duration-300 ease-out overflow-hidden rounded-full"
              style={{
                transform: isMobile ? `scale(${pulseScale})` : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${pulseScale})`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              {/* Particles */}
              {isHovered && (
                <>
                  {Array.from({ length: isMobile ? 15 : 20 }).map((_, i) => (
                    <FloatingParticle key={`float-${i}`} isHovered={isHovered} />
                  ))}
                  {Array.from({ length: isMobile ? 10 : 15 }).map((_, i) => (
                    <SparkleParticle key={`sparkle-${i}`} isHovered={isHovered} />
                  ))}
                </>
              )}
              
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 animate-pulse rounded-full"></div>
              
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-full transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, hsla(var(--primary), 0.4) 0%, transparent 70%)',
                  opacity: isHovered ? 0.8 : 0,
                  filter: 'blur(15px)',
                }}
              ></div>
              
              {/* Shine effect on hover */}
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full animate-shine rounded-full"></div>
              )}
              
              {/* Double border effect */}
              <div 
                className="absolute w-[90%] h-[90%] z-[1] rounded-full"
                style={{
                  background: 'linear-gradient(45deg, hsla(var(--primary), 0.4), rgba(168, 85, 247, 0.4))',
                  padding: '8px',
                  boxShadow: isHovered ? '0 0 20px hsla(var(--primary), 0.4)' : 'none',
                  transition: 'box-shadow 0.5s ease',
                }}
              ></div>
              
              {/* Main image with overlay */}
              <div className="relative w-[80%] h-[80%] z-10 rounded-full overflow-hidden">
                <img 
                  src={tempImage}
                  alt="Temporary Illustration" 
                  className="w-full h-full object-cover transition-all duration-500 shadow-lg"
                  style={{
                    filter: isHovered ? 'brightness(1.15) contrast(1.1) saturate(1.1)' : 'brightness(1) contrast(1)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  loading="eager"
                />
                
                {/* Subtle overlay for professional look */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.1) 100%)',
                    opacity: isHovered ? 0.7 : 0.4,
                    mixBlendMode: 'overlay',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className={`w-full md:w-1/2 text-center md:text-left space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="space-y-4 sm:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mx-auto md:mx-0">
                Hi, I'm
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mx-auto md:mx-0">
                Genesis Clark
              </h1>
              
              {/* Completely rebuilt typing animation container for better mobile support */}
              <div className="mt-2 whitespace-nowrap text-center md:text-left flex flex-wrap justify-center md:justify-start items-center gap-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-medium">I'm A</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  {displayText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-0.5 font-normal text-primary`}>|</span>
                </span>
              </div>
              
              <div className="h-4"></div> {/* Added spacing */}
              <p className="text-base md:text-lg max-w-lg mx-auto md:mx-0">
                Aspiring frontend developer passionate about clean, responsive apps, also can do backend tasks.
              </p>
            </div>

            <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
              <a 
                href="#projects" 
                className="relative inline-flex items-center px-6 py-3 rounded-full bg-primary text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group w-[200px] sm:w-auto text-center justify-center"
              >
                <span className="relative z-10">Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <a href="https://github.com/genesist45" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors duration-200">
                  <Github className="h-5 w-5 text-foreground" />
                </a>
                <a href="https://gitlab.com/genesist45" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors duration-200">
                  <Gitlab className="h-5 w-5 text-foreground" />
                </a>
                <a href="https://www.linkedin.com/in/genesis-clark-0ab92836b/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors duration-200">
                  <Linkedin className="h-5 w-5 text-foreground" />
                </a>
                <a href="https://www.facebook.com/clark.genesis.9400" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 transition-colors duration-200">
                  <Facebook className="h-5 w-5 text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
    </section>
  );
};
