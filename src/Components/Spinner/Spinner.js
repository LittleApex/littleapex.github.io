import icon from './loading.gif';

const Spinner = () => {
  return (
    <span className="spinner_wrapper">
      <img className="spinner" src={icon} alt="spinner.gif" style={{height: "70%"}}></img>
    </span>
  );
}

export default Spinner;