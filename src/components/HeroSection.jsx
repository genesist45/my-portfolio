import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const roles = [
    "I'm A Aspiring Web Designer |",
    "I'm A Aspiring Web Developer |",
    "I'm A Aspiring UX/UI Designer |"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    
    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText.length === currentRole.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait before starting to delete
          return;
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      timeout = setTimeout(type, isDeleting ? 50 : 100);
    };
    
    timeout = setTimeout(type, 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[400px] h-[400px] bg-[#a3e6ab]/10 rounded-full flex items-center justify-center">
              <img 
                src="/coding-illustration.svg" 
                alt="Coding Illustration" 
                className="w-[90%] h-[90%] object-contain"
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:w-1/2 text-left space-y-6">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              <span className="text-primary inline-block min-h-[1.5em]">{displayText}</span>
            </h2>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold">
                Hi,
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
                Genesis Clark
              </h1>
            </div>

            <div className="pt-8">
              <a 
                href="/cv.pdf" 
                download 
                className="relative inline-flex items-center px-6 py-3 rounded-full bg-primary text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group"
              >
                <span className="relative z-10">Download CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};
