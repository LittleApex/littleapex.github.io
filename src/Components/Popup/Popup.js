
import { useState, useRef, useEffect } from "react";
import './popup.css';
import Close from './close.png'
import { useNavigate } from "react-router";

const centerX = window.screen.availWidth / 2;
const centerY = window.screen.availHeight / 2 - 150;

const Popup = ({spawnRef, children}) => {
  
  
  const [x, setX] = useState(spawnRef.current ? spawnRef.current.getBoundingClientRect().x : centerX);
  const [y, setY] = useState(spawnRef.current ? spawnRef.current.getBoundingClientRect().y > window.innerHeight 
        ? window.innerHeight : spawnRef.current.getBoundingClientRect().y : centerY);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const startRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const popupRef = useRef(null);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);


  useEffect(() => { 
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const offsetX = popupRef?.current.offsetWidth / 2;
    const offsetY = popupRef?.current.offsetHeight / 2;
    setX(x - offsetX);
    setY(y - offsetY);

    if (!(x === centerX && y === centerY)) {
      let stepX = centerX - x;
      let stepY = centerY - y;
      const length = Math.sqrt(stepX * stepX + stepY * stepY);
      stepX /= length;
      stepY /= length;  
      requestRef.current = requestAnimationFrame((time) => openAnimation(time, stepX, stepY, length, 3));
    } else {
      setScale(1);
      setOpacity(1);
    }
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  const openAnimation = (time, stepX, stepY, length, speed) => {
    if (!startRef.current) {
      startRef.current = time;
    }
    const deltaTime = time - previousTimeRef.current;      

    if (time - startRef.current < length / speed) {
      if (previousTimeRef.current !== null) {    
        setX(prev => prev + stepX * deltaTime * speed);
        setY(prev => prev + stepY * deltaTime * speed);
        setScale(prev => prev + (1 / length) * deltaTime * speed);
        setOpacity(prev => prev + (1 / length) * deltaTime * speed);
      }
      
      previousTimeRef.current = time;
    
      requestRef.current = requestAnimationFrame((time) => openAnimation(time, stepX, stepY, length, speed));
    } else {
      setX(centerX - popupRef?.current.offsetWidth / 2);
      setY(centerY - popupRef?.current.offsetHeight / 2);
      setScale(1);
      setOpacity(1);
      requestRef.current = previousTimeRef.current = startRef.current = null;
    }
  }

  const closeAnimation = (time, stepX, stepY, length, speed) => {
    if (!startRef.current) {
      startRef.current = time;
    }

    const deltaTime = time - previousTimeRef.current;      
    
    if (time - startRef.current < length / speed) {
      if (previousTimeRef.current !== null) {    
        setX(prev => prev + stepX * deltaTime * speed);
        setY(prev => prev + stepY * deltaTime * speed);
        // setScale(prev => prev - (1 / length) * deltaTime * speed);
        setOpacity(prev => prev - (1 / length) * deltaTime * speed);
      }
      
      previousTimeRef.current = time;      
      requestRef.current = requestAnimationFrame((time) => closeAnimation(time, stepX, stepY, length, speed));
    } else {
      setScale(0);
      goBack();
    }
  }
  
  const closeRoutine = () =>
  {
    let stepX = 0;
    let stepY =  y + 100;
    
    const length = Math.sqrt(stepX * stepX + stepY * stepY);
    stepX /= length;
    stepY /= length;  
    requestRef.current = requestAnimationFrame((time) => closeAnimation(time, stepX, stepY, length, 1));
  }

  return (
    <div className="popup" style={{opacity: `${opacity}`}}> 
      <div ref={popupRef} className="popup_wrapper" style={{left: `${x}px`, top: `${y}px`, scale:`${scale}`}}>
        <button id="close">
          <img src={Close} alt="close" onClick={closeRoutine}></img>
        </button>
        {children}
      </div>
  </div>
  );
}

export default Popup;
