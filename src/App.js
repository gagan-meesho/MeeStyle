import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import OrderPlacePage from './components/OrderPlacePage';
import SupplierPage from './components/SupplierPage';
import MainPage from './components/MainPage'
import InstructionPage from './components/InstructionsPage'


function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/order-place" element={<OrderPlacePage />} />
        <Route path="/instruction-place" element={<InstructionPage />} />
        <Route path='/supplier-page' element={<SupplierPage/>}/>
      </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
