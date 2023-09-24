import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
// import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        {/* <Alert message="Custom Alert" /> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </NoteState>

  );
}

export default App;
