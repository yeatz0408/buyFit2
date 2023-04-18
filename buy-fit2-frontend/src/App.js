import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import Index from './admin/pages/Index';
import Add from './admin/pages/Add'
import Edit from './admin/pages/Edit'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

          <Route exact path="/admin/pages" element={<Index/>}/>
          <Route exact path="/admin/pages/add" element={<Add/>}/>
          <Route exact path="/admin/pages/edit/:id" element={<Edit/>}/>



        </Routes>

      </Router>

    </div>
  );
}

export default App;
