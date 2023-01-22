import SubmitButton from "../SubmitButton/SubmitButton";
import Status from "../Status/Status";
import Close from './close.png'

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { formFetching, formFetched, formFetchingError } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
import { useInput } from "../../hooks/useInput";

import './form.css';


const Form = () => {
  
  const {formStatus} = useSelector(state => state),
        dispatch = useDispatch(),
        {request} = useHttp();

  const name = useInput(''),
        phone = useInput(''),
        email = useInput(''),
        comment = useInput('Ваш комментарий');

  const [check, setCheck] = useState(false);

  const sendForm = (event) => {
    event.preventDefault();
    if (!check) {
      return;
    }
    dispatch(formFetching());
    request('ttps://formcarry.com/s/NDosF_UEHQ', 
      'POST', 
      JSON.stringify({
        name: name.value, 
        phone: phone.value, 
        email: email.value, 
        comment: comment.value}))
      .then(() => { 
        dispatch(formFetched());
        clearForm();
      })
      .catch((e) => dispatch(formFetchingError(e.message)));
  };

  const clearForm = () => {
    name.clear();
    phone.clear();
    email.clear();
    comment.clear();
  }

  let blocked = formStatus === 'loading';

  return (
    <div className="form">

      {/* <Link to="/">
        <button id="close" onClick={() => setClose(true)}>
          <img src={Close} alt="close"></img>
        </button>
      </Link> */}

      <form>
          <input readOnly={blocked} name="name" type="text" className={blocked ? "input_blocked" : ""} placeholder="Ваше имя" value={name.value} onChange={name.onChange}/>
          <input readOnly={blocked} name="phone" type="tel" className={blocked ? "input_blocked" : ""} placeholder="Телефон" value={phone.value} onChange={phone.onChange}/>
          <input readOnly={blocked} name="email" type="email" className={blocked ? "input_blocked" : ""} placeholder="E-mail" value={email.value} onChange={email.onChange}/>
          <textarea readOnly={blocked} name="comment" className={blocked ? "input_blocked" : ""} cols="30" rows="9" value={comment.value} onChange={comment.onChange}></textarea>

          <div className="check_wrapper">
              <input type="checkbox" className="check" checked={check} onChange={() =>setCheck(!check)}/>
              <div className="check_text">
                  Отправляя заявку, я даю согласие на <span>обработку своих персональных данных</span>
              </div>
          </div> 

          <SubmitButton onClick={sendForm}/>
          <Status/>
      </form>
    </div>
  );
}

export default Form;