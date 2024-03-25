import React from "react"
import Header from "../header"
import Container from "../container"
import Navbar from "../navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar></Navbar>
        </div>
        <div className="flex-1 p-4">
          {/* 
			 все посты, возможность подписчкиов, 
			 профиль и т.д все сюда будет идти
			 через Outlet
			 */}
          <Outlet />
        </div>
        <div>...Профиль...</div>
      </Container>
    </>
  )
}

export default Layout
