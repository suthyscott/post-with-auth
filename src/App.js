import './App.css';
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom'
import Landing from './Landing'
import Profile from './Profile'

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing></Landing>}/>
          <Route path='/profile' element={<Profile></Profile>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
