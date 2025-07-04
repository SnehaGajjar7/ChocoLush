import React from "react";
import Sidebar from "./component/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Order/Order";
import { ToastContainer } from "react-toastify";
import Navbar from "./component/Navbar/Navbar";

const App = () => {
  const url = "http://localhost:2000";
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
           <Route path="/orders" element={<Orders url={url} />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default App;
