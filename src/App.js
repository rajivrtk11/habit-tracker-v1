import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Task from './components/Task';
import Goal from './components/Goal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDataContext } from './context/DataContext';
import { useCookies } from 'react-cookie';
import { GoalService } from './services/goal.services';

function App() {
  const [ cookies ] = useCookies(['token','user'])
  const { setUser, setGoals } = useDataContext()

  const fetchGoals = async () => {
    const { data : { data : { goals }}} = await GoalService.getGoals(cookies.token, 1);
    setGoals(goals);
  }
  
  useEffect(()=>{
    if(cookies.user){
      fetchGoals();
      setUser(cookies.user);
    }
  },[cookies.token,cookies.user])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/GoalListing",
      element: <Home />,
    },
    {
      path: "/goal",
      element: <Goal />,
    },
    {
      path: "/task",
      element: <Task />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App;