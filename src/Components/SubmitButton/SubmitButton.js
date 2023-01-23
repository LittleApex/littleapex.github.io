import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './submitButton.css';

const SubmitButton = ({onClick}) => {

  const {formStatus} = useSelector(state => state);

  return (
    <button 
      disabled={formStatus === "loading" || formStatus === "invalid"}
      type="submit" 
      className="send_btn"
      onClick={(e) => onClick(e)}>
        {formStatus === "loading" ? <Spinner/> : "Оставить заявку"}
    </button>
  );
}

export default SubmitButton;