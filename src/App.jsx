import './App.css'
import Home from './pages/Home'
import SearchPandits from './pages/Searchpandits';
import Layout from './components/Layout';
import BookPandit from './pages/BookPandit';
import BookingConfirmation from './pages/BookingConfirmation';
import PanditRegistration from './pages/PanditRegistration';
import About from './pages/About';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/searchPandits" element={<SearchPandits/>} />
            <Route path="/book-pandit/:panditId" element={<BookPandit/>} />
            <Route path="/booking-confirmation/:panditId" element={<BookingConfirmation/>} />
            <Route path="/register-as-pandit" element={<PanditRegistration/>}/>
            <Route path="/about" element={<About/>}/>
          </Route>
        </Routes>        
      
    </div>
  )
}

export default App
