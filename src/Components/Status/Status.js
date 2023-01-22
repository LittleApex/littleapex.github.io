
import { useSelector } from 'react-redux';
import greenIcon  from './green.png';
import redIcon  from './red.png';
import './status.css';


const Status = () => {
  const {formStatus, serverMessage} = useSelector(state => state);


  const ErrorMessage = () => {
    return (<div className="error">
      <img src={redIcon} alt="warning"></img>
      <div> При отправке формы возникла ошибка! Попробуйте снова. </div>
    </div>);
  }
  
  const SuccesMessage = () => {
    return (<div className="succes">
      <img src={greenIcon} alt="warning"></img>
      <div>
        Форма была успешно отправлена
      </div>
    </div>);
  }

  if (formStatus === "fetched") {
    return <SuccesMessage/>;
  } else if (formStatus === "error") {
    return <ErrorMessage/>;
  } else {
    return "";
  }
}

export default Status;