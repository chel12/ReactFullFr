import React, { useContext } from "react"
import { ThemeContext } from "../themeProvider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import {
  logout,
  selectIsAuthenticated,
} from "../../features/userSlice/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

const Header = () => {
  //достаем тему и тогглтемы
  const { theme, toggleTheme } = useContext(ThemeContext)
  //кнопка выхода
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          onClick={toggleTheme}
          className="lg:flex text-3xl cursor-pointer"
        >
          {/*если светлая тема то солнце иначе луну (иконки из react-icon)*/}
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        {/*если вошли */}

        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout /> <span>выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
