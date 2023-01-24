import Form from "../Form/Form";
import Popup from "../Popup/Popup";

import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../../actions";
import { useRef } from "react";

import { Link } from "react-router-dom";

import './app.css';

function App() {

  const dispatch = useDispatch();
  const {popupState} = useSelector(state => state);
  const popupBtnRef = useRef(null);
  
  return (
    <div>
      <Link to="/form">
        <button ref={popupBtnRef} id="open_form_btn" onClick={() => dispatch(openForm())}>Связь с нами</button>
      </Link>

      <Popup popupState={popupState} popupBtnRef={popupBtnRef}>
        <Form/>
      </Popup>

    </div>
  );
}

export default App;
