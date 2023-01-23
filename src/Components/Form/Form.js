import SubmitButton from "../SubmitButton/SubmitButton";
import Status from "../Status/Status";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { formIdle, formFetching, formFetched, formFetchingError, formInvalid } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
import { useInput } from "../../hooks/useInput";
import './form.css';

const Form = () => {
  
  const {formStatus} = useSelector(state => state),
        dispatch = useDispatch(),
        {request} = useHttp();

  const name = useInput('name'),
        phone = useInput('phone'),
        email = useInput('email'),
        comment = useInput('comment');

  const [check, setCheck] = useState(false);

  const sendForm = (event) => {
    event.preventDefault();
    if (!check) {
      return;
    }
    dispatch(formFetching());
    request('https://formcarry.com/s/NDosF_UEHQ', 
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
  };


  useEffect(() => {
    dispatch(formInvalid());
  }, []);


  const validateForm = () => {
    if (!check) {
      dispatch(formIdle());
    } else {
      dispatch(formInvalid());
    }

  }
  

  let blocked = formStatus === 'loading';

  return (
    <div className="form_wrapper">
      <form>
          <input readOnly={blocked} name="name" type="text" className={blocked ? "input_blocked" : ""} placeholder="Ваше имя" value={name.value} onChange={name.onChange}/>
          <input readOnly={blocked} name="phone" type="tel" className={blocked ? "input_blocked" : ""} placeholder="Телефон" value={phone.value} onChange={phone.onChange}/>
          <input readOnly={blocked} name="email" type="email" className={blocked ? "input_blocked" : ""} placeholder="E-mail" value={email.value} onChange={email.onChange}/>
          <textarea readOnly={blocked} name="comment" placeholder="Ваш комментарий" className={blocked ? "input_blocked" : ""} cols="30" rows="9" value={comment.value} onChange={comment.onChange}></textarea>

          <div className="check_wrapper">
              <input type="checkbox" className="check" checked={check} onChange={() =>{setCheck(!check); validateForm();}}/>
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