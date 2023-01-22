import Icon from './icon.svg';

const Spinner = () => {
  return(
    <span className="spinner_wrapper">
      <img className="spinner" src={Icon} alt="spinner.gif" style={{height: "70%"}}></img>
    </span>
  );
}

export default Spinner;