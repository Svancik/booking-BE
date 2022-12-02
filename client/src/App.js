import {BrowserRouter,Routes,Route} from "react-router-dom";
import List from './pages/list/List';
import Home from './pages/home/Home';
import {Hotel} from "./pages/hotel/Hotel";
import { Login } from "./pages/login/Login";

function App() {
  return (
    //TODO: Založit nový projekt na GIT booking -FE a tam to programovat
    <BrowserRouter>  
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/hotels" exact element={<List/>}/>
      <Route path="/hotels/:id" exact element={<Hotel/>}/>
      <Route path="/login" exact element={<Login/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
