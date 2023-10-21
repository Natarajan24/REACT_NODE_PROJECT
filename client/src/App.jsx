import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import MainPage from "./MainPage";
import HomePage from "./HompePage";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      setIsLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("auth") !== null) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn])

  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && localStorage.getItem("auth") ? (
          <div>
            <Routes>
              <Route path="/home-page" element={<HomePage onLogin={handleLogOut}/>} />
            </Routes>
          </div>
        ) : (
          <MainPage onLogin={handleLogin} />
        )}
      </BrowserRouter>
    </>
  );
};

export default App;



