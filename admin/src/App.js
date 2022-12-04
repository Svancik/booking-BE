import Home from "./pages/home/Home";

import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/newUser/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from './context/AuthContext';
import { Login } from "./pages/login/Login";
import { hotelColumns, userColumns } from './datatablesource';
import NewHotel from "./pages/newHotel/NewHotel";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext);

    // když není v Route přihlášený user => navigujeme na Login Page
    if(!user){
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns}/></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewUser inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewHotel inputs={productInputs} title="Add New Product" /></ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
