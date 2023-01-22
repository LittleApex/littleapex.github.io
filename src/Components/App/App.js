import { useState } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function App() {

  const [modalActive, setModalActive] = useState(true);
  
  return (
    <div>
      <Link to="/form">
        <button onClick={() => setModalActive(true)}>Связаться с нами</button>
      </Link>
      <Routes>
        <Route path="/form" element={<Form active={modalActive} setActive={setModalActive}/>}/>
      </Routes>
    </div>
  );
}

export default App;
