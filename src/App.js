import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import { useSelector } from 'react-redux';
import { selectUser } from './redux/userRedux';
import Entry from './pages/Entry';

function App() {

  const user= useSelector(selectUser)
  // console.log(user)
  return (
    <div className="App">
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element= {<Home />} />
          <Route path="/login" element= {user ? <Navigate to="/admin" replace /> :  <Login />} />
          <Route path="/admin" element= {user===null ? <Navigate to="/login" replace /> :  <Admin />} />
          <Route path="/entry/:tokenNumber" element= {<Entry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
