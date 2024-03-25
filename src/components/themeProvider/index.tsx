import React, { useState } from "react"

type ThemeContextType = {
  //дарк или лайт от Next UI
  theme: "dark" | "light",
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  //брать тему из локал стор
  const storedTheme = localStorage.getItem("theme")
  //проверять если не null тогда поставь дарк или лайт, если null тогда dark
  const cuurentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark"

  //состояние темы
  const [theme, setTheme] = useState(cuurentTheme)

  //
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
