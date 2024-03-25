import React, { useContext } from "react"
import { ThemeContext } from "../themeProvider"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"

const Header = () => {
  //достаем тему и тогглтемы
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem 
		  onClick={toggleTheme}
		  className="lg:flex text-3xl cursor-pointer">
          {/*если светлая тема то солнце иначе луну (иконки из react-icon)*/}
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        {/*если вошли */}

        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
