import React, { lazy, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Landing from '../pages';
import NavBar from '../pages/navbar';
import '../assets/global.css'
import { useGiraf } from '../giraff';
import { Analytics } from "@vercel/analytics/react"
const MainLayout = () => {
  const {gHead, addGHead} = useGiraf()
  useState(()=>{
    addGHead('level', 'intermediate')
  },[])
  return (
    <div className='main'>
      <NavBar />
      <div className='inner-main'>
        <Outlet />
      </div>
      <Analytics/>
    </div>
  )
}

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/intamediate',
      element: (
        <Landing />
      )
    }, {
      path: '/advanced',
      element: (
        <Landing />
      )
    },
    {
      path: '*',
      element: <Landing />
    },
  ]
}

export default MainRoutes