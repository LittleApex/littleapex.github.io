import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './submitButton.css';

const SubmitButton = ({onClick}) => {

  const {formStatus} = useSelector(state => state);
  
  if (formStatus === "loading") {
    return <button 
      disabled
      type="submit" 
      className="send_btn send_btn_pressed"
      onClick={(e) => onClick(e)}>
        <Spinner/>
    </button> 
  } else {
    return <button 
      type="submit" 
      className="send_btn" 
      onClick={(e) => onClick(e)}>
        Оставить заявку
    </button>
  }
}

export default SubmitButton;