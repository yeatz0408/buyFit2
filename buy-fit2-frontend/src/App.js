import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import PageIndex from './admin/pages/PageIndex';
import PageAdd from './admin/pages/PageAdd'
import PageEdit from './admin/pages/PageEdit'
import CategoryIndex from './admin/categories/CategoryIndex'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

          <Route exact path="/admin/pages" element={<PageIndex/>}/>
          <Route exact path="/admin/pages/add" element={<PageAdd/>}/>
          <Route exact path="/admin/pages/edit/:id" element={<PageEdit/>}/>

          <Route exact path="/admin/categories" element={<CategoryIndex/>}/>

        </Routes>

      </Router>

    </div>
  );
}

export default App;
