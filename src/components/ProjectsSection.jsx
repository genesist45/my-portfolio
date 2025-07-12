import { ArrowRight, ExternalLink, Github } from "lucide-react";
import premioImg from "../assets/premio.jpg";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Premio Registration System",
    description: "Online registration system for Premio Motorcycles & Parts Corporation. Features user-friendly dashboard for managing motorcycle applications and real-time status tracking.",
    image: premioImg,
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Calculator App",
    description: "testing...",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23202124'/%3E%3Crect x='20' y='20' width='260' height='80' rx='8' fill='%23313337'/%3E%3Ctext x='250' y='70' font-family='monospace' font-size='32' fill='%23ffffff' text-anchor='end'%3E0%3C/text%3E%3Cg transform='translate(20, 120)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23616161' /%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3EC%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23616161'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E±%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23616161'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E%25%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E÷%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 186)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E7%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E8%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E9%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E×%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 252)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E4%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E5%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E6%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E-%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 318)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E1%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E2%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E3%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E+%3C/text%3E%3C/g%3E%3C/svg%3E",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
  }
];

export const ProjectsSection = () => {
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
      if (href === '#projects') {
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
    const navLinks = document.querySelectorAll('a[href="#projects"]');
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
        case "paragraph":
          return {
            opacity: 0,
            transform: "translateY(20px)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
        case "card":
          return {
            opacity: 0,
            transform: "translateY(40px) scale(0.95)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
        case "button":
          return {
            opacity: 0,
            transform: "translateY(15px) scale(0.9)",
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
      
      case "paragraph":
        return {
          opacity: animationProgress > 0.25 ? 1 : 0,
          transform: animationProgress > 0.25 
            ? "translateY(0)" 
            : "translateY(20px)",
          transition: `transform 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
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
      
      case "button":
        return {
          opacity: animationProgress > 0.5 ? 1 : 0,
          transform: animationProgress > 0.5 
            ? "translateY(0) scale(1)" 
            : "translateY(15px) scale(0.9)",
          transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
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
      id="projects" 
      className="py-24 px-4 relative"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-5xl">
        <div 
          className="w-full text-center mb-4 relative"
          style={getAnimationStyle(0, "title")}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block">
            Projects & <span className="text-primary">Activities</span>
          </h2>
          <div 
            className="h-1 w-0 bg-gradient-to-r from-primary to-emerald-400 mx-auto mt-2"
            style={getUnderlineAnimation()}
          ></div>
        </div>

        <p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto opacity-0"
          style={getAnimationStyle(0, "paragraph")}
        >
          Not yet deployed — I'm still creating and learning. This is where I'll showcase my projects and activities soon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover opacity-0"
              style={getAnimationStyle(index, "card")}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={`${project.id}-${tagIndex}`}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="text-center mt-12 opacity-0"
          style={getAnimationStyle(0, "button")}
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/genesist45"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
