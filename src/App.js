import { Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Help from "./components/Help/Help";
import Rules from "./components/Rules/Rules";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Help />}/>
        </Routes>
    </div>
  );
}

export default App;
