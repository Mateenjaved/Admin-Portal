import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Attendence from './Attendence'
import Courses from './Courses'
import Students from './Students'
import Dashboard from './Dash'
export default function Index() {
  return (
    <Routes>
        <Route path='/Attendence' element={<Attendence/>} />
        <Route path='/Courses' element={<Courses/>} />
        <Route path='/Students' element={<Students/>} />
        <Route path='/' element={<Dashboard/>} />
    </Routes>
  )
}
