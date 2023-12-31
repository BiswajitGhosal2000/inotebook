import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
// import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthState from './context/auth/AuthState';
import Footer from './components/Footer';


function App() {
  return (
    <AuthState>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {/* <Alert message="Custom Alert" /> */}
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </NoteState>
    </AuthState>
  );
}

export default App;
