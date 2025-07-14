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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300",
          isScrolled || isMenuOpen
            ? "py-3 bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5" 
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
                Clark's
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

          {/* mobile nav button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-foreground z-50"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - separated from nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-white/95 dark:bg-background/95 backdrop-blur-md" style={{ top: "60px" }}>
          <div className="container py-8 px-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, key) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={key}
                    href={item.href}
                    className={cn(
                      "relative py-4 px-6 rounded-xl text-xl font-medium transition-all duration-300 overflow-hidden",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-foreground/80 hover:text-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-purple-500 rounded-r-full" />
                    )}
                  </a>
                );
              })}
            </div>
            
            {/* Additional menu footer */}
            <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800/50 flex justify-center">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
