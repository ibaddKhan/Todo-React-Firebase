import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../screens/login/login'
import Signup from '../screens/signup/signup'
import Todo from '../screens/Todo/todo' 

const Routers = () => {
    return (
        <>
            <BrowserRouter>
            <Routes>
                    <Route path='login' element={<Login/>} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='/' element={<Todo />} />
                </Routes>
                
            </BrowserRouter>
        </>
    )
}
export default Routers