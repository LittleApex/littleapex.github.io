import './modal.css';

const Modal = ({active, children}) => {
  return (
    <div className={ active ? "modal active" : "modal"}>
      <div className="modal_content">
        {children}
      </div>
    </div>
  );
}

export default Modal;