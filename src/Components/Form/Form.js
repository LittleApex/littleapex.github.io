import SubmitButton from "../SubmitButton/SubmitButton";
import Status from "../Status/Status";
import Close from './close.png'

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { formFetching, formFetched, formFetchingError } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
import { useInput } from "../../hooks/useInput";

import './form.css';

const Form = ({active, setActive}) => {

  const name = useInput(''),
        phone = useInput(''),
        email = useInput(''),
        comment = useInput('Ваш комментарий');


  const {formStatus} = useSelector(state => state);
  const dispatch = useDispatch(); 
  const {request} = useHttp();

  const sendForm = (event) => {
    event.preventDefault();
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

  let blocked = false;
  if (formStatus === 'loading') {
    // console.log("Loading...");
    blocked = true;
  } else if (formStatus === "error") {
    // console.log("ERROR");
  } else if (formStatus === "fetched") {
    console.log("succes!");
  }

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="form">
        <Link to="/">
          <button id="close" onClick={() => setActive(false)}>
            <img src={Close} alt="close"></img>
          </button>
        </Link>
        <form>
            <input readOnly={blocked} name="name" type="text" className={blocked ? "input_blocked" : ""} placeholder="Ваше имя" value={name.value} onChange={name.onChange}/>
            <input readOnly={blocked} name="phone" type="tel" className={blocked ? "input_blocked" : ""} placeholder="Телефон" value={phone.value} onChange={phone.onChange}/>
            <input readOnly={blocked} name="email" type="email" className={blocked ? "input_blocked" : ""} placeholder="E-mail" value={email.value} onChange={email.onChange}/>
            <textarea readOnly={blocked} name="comment" className={blocked ? "input_blocked" : ""} cols="30" rows="9" value={comment.value} onChange={comment.onChange}></textarea>

            <div className="check_wrapper">
                <input type="checkbox" className="check"/>
                <div className="check_text">
                    Отправляя заявку, я даю согласие на <span>обработку своих персональных данных</span>
                </div>
            </div> 

            <SubmitButton onClick={sendForm}/>
            <Status/>

        </form>
      </div>
    </div>);
}

export default Form;