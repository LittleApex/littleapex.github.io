import { useState, useRef } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Popup from "../Popup/Popup";

function App() {

  const openButtonRef = useRef();  
  
  return (
    <div>
      <Link to="/form">
        <button  ref={openButtonRef}>Связь с нами</button>
      </Link>

      <Routes>
        <Route path="/form" element={
          <Popup spawnRef={openButtonRef}>
            <Form/>
          </Popup>
        }/>
      </Routes>
    </div>
  );
}

export default App;
