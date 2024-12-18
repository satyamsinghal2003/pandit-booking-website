import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Searchpandits from './pages/Searchpandits';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import BookPandit from './pages/BookPandit';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/searchPandits" element={<Searchpandits/>} />
            <Route path="/book-pandit/:panditId" element={<BookPandit/>} />
            <Route path="/booking-confirmation/:panditId" element={<BookingConfirmation/>} />
          </Route>
        </Routes>        
      
    </div>
  )
}

export default App
