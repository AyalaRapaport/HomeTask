import { Route, Routes } from 'react-router-dom';
import './App.css';
import MemberList from './Components/MemberList';
import Member from './Components/Member';
import HomePage from './Components/HomePage';
import DetailsCard from './Components/DetailsCard';
import CovidDetails from './Components/CovidDetails';
import CovidChart from './Components/CovidChart';
import Logo from './Components/Logo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='memberlist' element={<MemberList/>}/>
        <Route path='member/:type' element={<Member/>}/>
        <Route path='homepage' element={<HomePage/>}/>
        <Route path='card' element={<DetailsCard/>}/>
        <Route path='covidchart' element={<CovidChart/>}/>
        <Route path='covid/:id' element={<CovidDetails/>}/>
        <Route path='logo' element={<Logo/>}/>
        <Route path='' element={<HomePage />} />
        <Route path='*' element={<h1> not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
