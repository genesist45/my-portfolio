import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { 
    name: "HTML/CSS", 
    level: 50, 
    category: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  { 
    name: "JavaScript", 
    level: 40, 
    category: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  { 
    name: "React", 
    level: 30, 
    category: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  { 
    name: "TypeScript", 
    level: 20, 
    category: "frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  { 
    name: "Tailwind CSS", 
    level: 20, 
    category: "frontend",
    icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
  },

  // Backend
  { 
    name: "Laravel", 
    level: 25, 
    category: "backend",
    icon: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg"
  },
  { 
    name: "Next.js", 
    level: 15, 
    category: "backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  { 
    name: "MySQL", 
    level: 10, 
    category: "backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },

  // Tools
  { 
    name: "Git/GitHub", 
    level: 40, 
    category: "tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  { 
    name: "Canva", 
    level: 70, 
    category: "tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"
  },
  { 
    name: "Figma", 
    level: 20, 
    category: "tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  },
  { 
    name: "VS Code", 
    level: 50, 
    category: "tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
  },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Handle intro animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When entering viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLeaving(false);
          startAnimation();
          setHasAnimated(true);
        } 
        // When leaving viewport
        else if (hasAnimated) {
          setIsLeaving(true);
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "-50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated]);

  // Handle navbar click to replay animation
  useEffect(() => {
    const handleNavClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href === '#skills') {
        // Reset animation state to replay
        setIsVisible(false);
        setIsLeaving(false);
        setAnimationProgress(0);
        
        // Small delay to ensure state is updated before replaying
        setTimeout(() => {
          setIsVisible(true);
          startAnimation();
        }, 30);
      }
    };

    // Find all navbar links
    const navLinks = document.querySelectorAll('a[href="#skills"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  // Reset animations when category changes
  useEffect(() => {
    setAnimationProgress(0);
    
    setTimeout(() => {
      startAnimation();
    }, 30);
  }, [activeCategory]);

  const startAnimation = () => {
    let startTime = null;
    const duration = 1000; // 1 second for the entire animation sequence

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Calculate animation states for different elements
  const getAnimationStyle = (index, type = "default") => {
    // Base delay for staggered animations
    const delay = index * 80; // 80ms between each element
    const delaySeconds = delay / 1000;
    
    // If leaving viewport (outro animation)
    if (isLeaving) {
      switch (type) {
        case "title":
          return {
            opacity: 0,
            transform: "translateY(-20px) scale(0.95)",
            transition: `transform 0.4s ease-in ${delaySeconds}s, opacity 0.4s ease-in ${delaySeconds}s`
          };
        case "button":
          return {
            opacity: 0,
            transform: "translateY(15px) scale(0.9)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
        case "card":
          return {
            opacity: 0,
            transform: "translateY(40px) scale(0.95)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
        default:
          return {
            opacity: 0,
            transform: "translateY(30px)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
      }
    }
    
    // If not visible yet or not animated
    if (!isVisible) return { opacity: 0 };
    
    // Different animation types for intro
    switch (type) {
      case "title":
        return {
          opacity: animationProgress > 0.1 ? 1 : 0,
          transform: animationProgress > 0.1 
            ? "translateY(0) scale(1)" 
            : "translateY(-20px) scale(0.95)",
          transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "button":
        return {
          opacity: animationProgress > 0.2 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.2 + (index * 0.05) 
            ? "translateY(0) scale(1)" 
            : "translateY(15px) scale(0.9)",
          transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
                      opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "card":
        return {
          opacity: animationProgress > 0.3 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.3 + (index * 0.05) 
            ? "translateY(0) scale(1)" 
            : "translateY(40px) scale(0.95)",
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
                      opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
        
      default:
        return {
          opacity: animationProgress > 0.2 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.2 + (index * 0.05) 
            ? "translateY(0)" 
            : "translateY(30px)",
          transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
    }
  };

  // Skill bar animation
  const getSkillBarAnimation = (index) => {
    const delay = (index * 80 + 150) / 1000; // 80ms between each element + 150ms base delay
    
    if (isLeaving) {
      return {
        width: "0%",
        transition: `width 0.3s ease-in ${delay}s`
      };
    }
    
    if (!isVisible) return { width: "0%" };
    
    return {
      width: animationProgress > 0.4 + (index * 0.05) ? `${filteredSkills[index].level}%` : "0%",
      transition: `width 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
    };
  };

  // Percentage number animation
  const getNumberAnimation = (index) => {
    const delay = (index * 80 + 200) / 1000; // 80ms between each element + 200ms base delay
    
    if (isLeaving) {
      return {
        opacity: 0,
        transform: "translateY(5px)",
        transition: `transform 0.3s ease-in ${delay}s, opacity 0.3s ease-in ${delay}s`
      };
    }
    
    if (!isVisible) return { opacity: 0 };
    
    return {
      opacity: animationProgress > 0.4 + (index * 0.05) ? 1 : 0,
      transform: animationProgress > 0.4 + (index * 0.05) ? "translateY(0)" : "translateY(5px)",
      transition: `transform 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s, 
                  opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
    };
  };

  // Underline animation
  const getUnderlineAnimation = () => {
    if (isLeaving) {
      return {
        width: "0px",
        transition: "width 0.4s ease-in"
      };
    }
    
    return {
      width: isVisible ? "80px" : "0px",
      transition: "width 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
    };
  };

  return (
    <section 
      id="skills" 
      className="py-24 px-4 relative bg-secondary/30"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-5xl">
        <div 
          className="w-full text-center mb-12 relative"
          style={getAnimationStyle(0, "title")}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block">
            My <span className="text-primary">Skills</span>
          </h2>
          <div 
            className="h-1 w-0 bg-gradient-to-r from-primary to-emerald-400 mx-auto mt-2"
            style={getUnderlineAnimation()}
          ></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize opacity-0",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
              style={getAnimationStyle(index, "button")}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className="bg-card p-6 rounded-lg shadow-xs card-hover opacity-0"
              style={getAnimationStyle(index, "card")}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 p-1.5 flex items-center justify-center">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left"
                  style={getSkillBarAnimation(index)}
                />
              </div>

              <div className="text-right mt-1">
                <span 
                  className="text-sm text-muted-foreground"
                  style={getNumberAnimation(index)}
                >
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
