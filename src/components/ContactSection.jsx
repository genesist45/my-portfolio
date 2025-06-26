import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      if (href === '#contact') {
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
    const navLinks = document.querySelectorAll('a[href="#contact"]');
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
        case "contact-item":
          return {
            opacity: 0,
            transform: "translateX(-30px)",
            transition: `transform 0.3s ease-in ${delaySeconds}s, opacity 0.3s ease-in ${delaySeconds}s`
          };
        case "form-element":
          return {
            opacity: 0,
            transform: "translateY(20px)",
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
          opacity: animationProgress > 0.3 ? 1 : 0,
          transform: animationProgress > 0.3 
            ? "translateY(0) scale(1)" 
            : "translateY(40px) scale(0.95)",
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delaySeconds}s, 
                      opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "contact-item":
        return {
          opacity: animationProgress > 0.3 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.3 + (index * 0.05) 
            ? "translateX(0)" 
            : "translateX(-30px)",
          transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
                      opacity 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s`
        };
      
      case "form-element":
        return {
          opacity: animationProgress > 0.4 + (index * 0.05) ? 1 : 0,
          transform: animationProgress > 0.4 + (index * 0.05) 
            ? "translateY(0)" 
            : "translateY(20px)",
          transition: `transform 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) ${delaySeconds}s, 
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section 
      id="contact" 
      className="py-24 px-4 relative bg-secondary/30"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-5xl">
        <div 
          className="w-full text-center mb-4 relative"
          style={getAnimationStyle(0, "title")}
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-block">
            Get In <span className="text-primary">Touch</span>
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
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 opacity-0" style={getAnimationStyle(0, "card")}>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div 
                className="flex items-start space-x-4 opacity-0" 
                style={getAnimationStyle(0, "contact-item")}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:genesisclark79o@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    genesisclark79o@gmail.com
                  </a>
                </div>
              </div>
              <div 
                className="flex items-start space-x-4 opacity-0" 
                style={getAnimationStyle(1, "contact-item")}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href="tel:+639127237881"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +63 912 723 7881
                  </a>
                </div>
              </div>
              <div 
                className="flex items-start space-x-4 opacity-0" 
                style={getAnimationStyle(2, "contact-item")}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">
                    Zone 6 Bugo Bolok-Bolok, Cagayan de Oro City
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="pt-8 opacity-0" 
              style={getAnimationStyle(3, "contact-item")}
            >
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://www.facebook.com/clark.genesis.9400" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a href="#" target="_blank">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a href="#" target="_blank">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a href="#" target="_blank">
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs opacity-0"
            style={getAnimationStyle(1, "card")}
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6">
              <div 
                className="opacity-0"
                style={getAnimationStyle(0, "form-element")}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Enter your name..."
                />
              </div>

              <div 
                className="opacity-0"
                style={getAnimationStyle(1, "form-element")}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Enter your email..."
                />
              </div>

              <div 
                className="opacity-0"
                style={getAnimationStyle(2, "form-element")}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 opacity-0"
                )}
                style={getAnimationStyle(3, "form-element")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
