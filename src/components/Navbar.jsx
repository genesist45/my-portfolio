import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5" 
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold flex items-center group"
          href="#hero"
        >
          <span className="relative">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-extrabold">
              Personal
            </span>{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-bold">
              Portfolio
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, key) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  isActive 
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* mobile nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            "md:hidden p-2 rounded-full z-50 transition-colors duration-300",
            isMenuOpen ? "bg-primary/10 text-primary" : "text-foreground hover:bg-background/80"
          )}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 text-xl">
            {navItems.map((item, key) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={key}
                  href={item.href}
                  className={cn(
                    "px-8 py-3 transition-all duration-300 relative text-center",
                    isActive 
                      ? "text-primary font-medium" 
                      : "text-foreground/70 hover:text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
