import { Book, Code, Palette, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

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
      if (href === '#about') {
        // Reset animation state to replay
        setIsVisible(false);
        setIsLeaving(false);
        setAnimationProgress(0);
        
        // Small delay to ensure state is updated before replaying
        setTimeout(() => {
          setIsVisible(true);
          startAnimation();
        }, 50);
      }
    };

    // Find all navbar links
    const navLinks = document.querySelectorAll('a[href="#about"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  const startAnimation = () => {
    let startTime = null;
    const duration = 1500; // 1.5 seconds for the entire animation sequence

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
    const delay = index * 120; // 120ms between each element
    const delaySeconds = delay / 1000;
    
    // If leaving viewport (outro animation)
    if (isLeaving) {
      switch (type) {
        case "title":
          return {
            opacity: 0,
            transform: "translateY(-20px) scale(0.95)",
            transition: `transform 0.6s ease-in ${delaySeconds}s, opacity 0.6s ease-in ${delaySeconds}s`
          };
        case "heading":
          return {
            opacity: 0,
            transform: "translateX(-30px)",
            transition: `transform 0.5s ease-in ${delaySeconds}s, opacity 0.5s ease-in ${delaySeconds}s`
          };
        case "paragraph":
          return {
            opacity: 0,
            transform: "translateY(20px)",
            transition: `transform 0.4s ease-in ${delaySeconds}s, opacity 0.4s ease-in ${delaySeconds}s`
          };
        case "card":
          return {
            opacity: 0,
            transform: "translateY(40px) scale(0.95)",
            transition: `transform 0.5s ease-in ${delaySeconds}s, opacity 0.5s ease-in ${delaySeconds}s`
          };
        case "button":
          return {
            opacity: 0,
            transform: "translateY(15px) scale(0.9)",
            transition: `transform 0.4s ease-in ${delaySeconds}s, opacity 0.4s ease-in ${delaySeconds}s`
          };
        default:
          return {
            opacity: 0,
            transform: "translateY(30px)",
            transition: `transform 0.5s ease-in ${delaySeconds}s, opacity 0.5s ease-in ${delaySeconds}s`
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
          transition: `transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "heading":
        return {
          opacity: animationProgress > 0.2 ? 1 : 0,
          transform: animationProgress > 0.2 
            ? "translateX(0)" 
            : "translateX(-30px)",
          transition: `transform 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "paragraph":
        return {
          opacity: animationProgress > 0.25 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.25 + (index * 0.05) 
            ? "translateY(0)" 
            : "translateY(20px)",
          transition: `transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "card":
        return {
          opacity: animationProgress > 0.3 + (index * 0.07) ? 1 : 0,
          transform: animationProgress > 0.3 + (index * 0.07) 
            ? "translateY(0) scale(1)" 
            : "translateY(40px) scale(0.95)",
          transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
                      opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "button":
        return {
          opacity: animationProgress > 0.5 + (index * 0.1) ? 1 : 0,
          transform: animationProgress > 0.5 + (index * 0.1) 
            ? "translateY(0) scale(1)" 
            : "translateY(15px) scale(0.9)",
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
                      opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
        
      default:
        return {
          opacity: animationProgress > 0.2 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.2 + (index * 0.05) 
            ? "translateY(0)" 
            : "translateY(30px)",
          transition: `transform 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
    }
  };

  // Animation for icon elements
  const getIconAnimation = (index) => {
    const delay = (index * 120 + 200) / 1000; // Slightly delayed after its parent card
    
    if (isLeaving) {
      return {
        opacity: 0,
        transform: "scale(0) rotate(-45deg)",
        transition: `transform 0.4s ease-in ${delay}s, opacity 0.2s ease-in ${delay}s`
      };
    }
    
    if (!isVisible) return { opacity: 0 };
    
    return {
      opacity: animationProgress > 0.3 + (index * 0.07) ? 1 : 0,
      transform: animationProgress > 0.3 + (index * 0.07) 
        ? "scale(1) rotate(0deg)" 
        : "scale(0) rotate(-45deg)",
      transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, 
                  opacity 0.3s ease ${delay}s`
    };
  };

  // Background element animations
  const getBackgroundAnimation = (isRight) => {
    if (isLeaving) {
      return {
        opacity: 0,
        transform: isRight ? "translateX(100px)" : "translateX(-100px)",
        transition: "opacity 1s ease-in, transform 1s ease-in"
      };
    }
    
    return {
      opacity: isVisible ? 0.7 : 0,
      transform: isVisible ? "translateX(0)" : isRight ? "translateX(100px)" : "translateX(-100px)",
      transition: "opacity 1.5s ease, transform 1.5s ease",
    };
  };

  // Underline animation
  const getUnderlineAnimation = () => {
    if (isLeaving) {
      return {
        width: "0px",
        transition: "width 0.6s ease-in"
      };
    }
    
    return {
      width: isVisible ? "80px" : "0px",
      transition: "width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
    };
  };

  return (
    <section 
      id="about" 
      className="py-24 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"
        style={getBackgroundAnimation(true)}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/5 rounded-full filter blur-3xl"
        style={getBackgroundAnimation(false)}
      ></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div 
          className="w-full text-center mb-12 relative"
          style={getAnimationStyle(0, "title")}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block">
            About <span className="text-primary">Me</span>
          </h2>
          <div 
            className="h-1 w-0 bg-gradient-to-r from-primary to-emerald-400 mx-auto mt-2"
            style={getUnderlineAnimation()}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 
              style={getAnimationStyle(1, "heading")}
              className="text-2xl font-semibold flex items-center gap-2 opacity-0"
            >
              I'm an aspiring web developer currently pursuing in studying at Tagoloan Community College.
            </h3>

            <p 
              style={getAnimationStyle(2, "paragraph")}
              className="text-muted-foreground opacity-0"
            >
              I'm a passionate Information Technology student currently learning the foundations 
              of web development and software design. While I'm still at the beginning of my 
              journey, I'm excited to explore and grow in this ever-evolving tech industry.
            </p>

            <p 
              style={getAnimationStyle(3, "paragraph")}
              className="text-muted-foreground opacity-0"
            >
              I enjoy learning new tools, solving small problems with code, and gradually 
              building projects that help sharpen my skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#contact" 
                className="cosmic-button opacity-0"
                style={getAnimationStyle(0, "button")}
              >
                Connect With Me
              </a>

              <a
                href="#projects"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 opacity-0"
                style={getAnimationStyle(1, "button")}
              >
                View My Work
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div 
              className="gradient-border p-6 card-hover opacity-0"
              style={getAnimationStyle(0, "card")}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-full bg-primary/10 opacity-0"
                  style={getIconAnimation(0)}
                >
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">
                    Learning to build responsive websites and web applications using 
                    beginner-friendly frameworks like HTML, CSS, JavaScript, PHP, and Laravel.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="gradient-border p-6 card-hover opacity-0"
              style={getAnimationStyle(1, "card")}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-full bg-primary/10 opacity-0"
                  style={getIconAnimation(1)}
                >
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">
                    Starting to understand how to design clean, user-friendly interfaces 
                    and improve the user experience in simple projects.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="gradient-border p-6 card-hover opacity-0"
              style={getAnimationStyle(2, "card")}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-full bg-primary/10 opacity-0"
                  style={getIconAnimation(2)}
                >
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Continuous Learning</h4>
                  <p className="text-muted-foreground">
                    Actively learning tools like Git, GitHub, and MySQL, and practicing 
                    version control and collaboration for real-world development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
