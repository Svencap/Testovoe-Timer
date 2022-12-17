import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

import Login from "./components/Login.jsx";
import TradeInfo from "./components/TradeInfo.jsx";
import AuthContext from "./context/index.jsx";
import useAuth from "./hooks/useAuth.jsx";


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  const logIn = () => setLoggedIn(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="h-100">
          <div className="d-flex flex-column h-100">
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <TradeInfo />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
