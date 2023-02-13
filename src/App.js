import './App.css';
import React , { useState, useEffect }from 'react'
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from './Components/Home/Home';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Tv } from './Components/Tv/Tv';
import { Movies } from './Components/Movies/Movies';
import { Details } from './Components/Details/Details';
import { Results } from './Components/Results/Results';
import { NotFound } from './Components/NotFound/NotFound';
import jwtDecode from "jwt-decode";




export function App() {

  function Guard( {children} ){
    if(localStorage.getItem('tkn')){
      return <>{children}</>
    }
    else{
      return <Navigate to='/login' />
    }
  }

  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    if(localStorage.getItem('tkn')){
      decodeToken()
    }
  }, [])
  


  const navigate = useNavigate()

  function decodeToken(){
    let userData = jwtDecode( localStorage.getItem('tkn') )
    setCurrentUser(userData)
  }

  function clearUserData(){
    setCurrentUser(null)
    localStorage.removeItem('tkn')
    navigate('/login')
  }

  return <>
      <Navbar currentUser={currentUser} clearUserData={clearUserData} />
      <Routes>
          <Route path='/' element={ <Guard> <Home /> </Guard> }/>
          <Route path='home' element={ <Guard> <Home /> </Guard>}/>
          <Route path='Login' element={ <Login decodeToken={decodeToken}/> }/>
          <Route path='register' element={ <Register /> }/>
          <Route path='tv' element={ <Guard> <Tv /> </Guard> }/>
          <Route path='movies' element={ <Guard> <Movies /> </Guard> }/>
          <Route path='results' element={ <Guard> <Results /> </Guard> }/>

          <Route path='details'>
            <Route path='' element={<NotFound />}/>
            <Route path=':category'>
              <Route path='' element = {<NotFound />}/>
              <Route path=':id' element = {<Guard> <Details /> </Guard>}/>
            </Route>
          </Route>

          <Route path='*' element={<NotFound />}/>
      </Routes>
   </>
}
