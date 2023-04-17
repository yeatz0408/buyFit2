import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import Index from './admin/Index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Index />
    </div>
  );
}

export default App;
