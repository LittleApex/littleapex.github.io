import { useState, useRef, useEffect } from "react";
import { moveAnimation, scaleAnimation } from "./animation";

import { useDispatch } from "react-redux";
import { closeForm } from "../../actions";

import { useNavigate } from "react-router";

import "./popup.css";
import Close from './close.png'

const Popup = ({ popupState,  popupBtnRef, children }) => {

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useDispatch();

  const [thisPopupState, setThisPopupState] = useState(popupState);
  const popupContent = useRef();

  const btnPoint = () => {
    const pos = popupBtnRef.current?.getBoundingClientRect();
    return {
      x: pos ? pos.x : window.innerWidth / 2,
      y: pos ? pos.y <  window.innerWidth ? pos.y : window.innerWidth : 0
    }
  }

  const updateContentSize = () => {
    if (popupContent.current) {
      setContentSize({
        width: popupContent.current.offsetWidth,
        height: popupContent.current.offsetHeight
      });
    }
  }

  const [position, setPosition] = useState(btnPoint());
  const [scale, setScale] = useState(thisPopupState === "opened" ? 1 : 0);
  const [contentSize, setContentSize] = useState({width: 0, height: 0});
  const [centerPoint, setCetnerPoint] = useState({x: window.innerWidth / 2, y: window.innerHeight / 2});

  useEffect(() => {
    window.addEventListener("popstate", () => {
      dispatch(closeForm());
    });

    window.addEventListener("resize", () => {
      setCetnerPoint({
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2
      });
      updateContentSize();
    })
  }, []);

  useEffect(() => {
    updateContentSize();
  }, [children]);



  useEffect(() => {
    if (thisPopupState !== popupState) {
      updateContentSize();
  
      if (thisPopupState === 'closed') {
        console.log(contentSize);
        const time = moveAnimation(
          btnPoint(),
          centerPoint,
          setPosition,
          2, 
          () => {
            setThisPopupState(popupState);
          }
        );
        scaleAnimation(0, 1, setScale, time + 100);
        
      } else if (thisPopupState === 'opened') {
        const time = moveAnimation(
          centerPoint,
          btnPoint(),
          setPosition,
          2,
          () => {
            setThisPopupState(popupState);
          }
          );
        scaleAnimation(1, 0, setScale, time - 100);
      }
    }
  }, [popupState]);


  const wrapperStyle = {
    left: (thisPopupState === "opened" && popupState !== "closed" ? centerPoint.x : position.x) - contentSize.width / 2,
    top: (thisPopupState === "opened" && popupState !== "closed"? centerPoint.y : position.y) - contentSize.height / 2,
  }

  if (thisPopupState === "opened" || popupState === "opened") {
    return (
      <div className="popup">
        <div ref={popupContent} className="popup_wrapper" style={{...wrapperStyle, scale:`${scale}`}}>
          <button id="close">
            <img src={Close} alt="close" onClick={goBack}></img>
          </button>
          {children}
        </div>
      </div>
    );
  }

  return "";
};

export default Popup;