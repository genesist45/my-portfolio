import { Home } from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

function App() {
  // Apply theme from localStorage on initial load
  useEffect(() => {
    // Always default to dark mode
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Ensure dark mode is set as default
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <Toaster />
      <Home />
    </>
  );
}

export default App;
