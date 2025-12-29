import React, { useEffect } from 'react'
import Home from './pages/Home/Home'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WatchlistProvider } from './context/WatchlistContext';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Watchlist from './pages/Watchlist/Watchlist';

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged in");
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged out");
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    })
  }, [auth, navigate, location])

  return (
    <div>
      <WatchlistProvider>
        < ToastContainer theme='dark' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<Player />}></Route>
          <Route path='/movie/:id' element={<MovieDetail />}></Route>
          <Route path='/watchlist' element={<Watchlist />}></Route>
        </Routes>
      </WatchlistProvider>
    </div>
  )
}

export default App