import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || "light" } catch(e){ return "light" }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    try { localStorage.setItem("theme", theme) } catch(e){}
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
