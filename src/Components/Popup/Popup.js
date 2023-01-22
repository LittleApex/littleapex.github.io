
import { useState, useRef, useEffect } from "react";
import './popup.css';
import Close from './close.png'
import { useNavigate } from "react-router";

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const speed = 3;

const Popup = ({spawnRef, close, setClose, children}) => {
  
  let offsetX, offsetY;
  
  const [x, setX] = useState(spawnRef.current ? spawnRef.current.getBoundingClientRect().x : centerX);
  const [y, setY] = useState(spawnRef.current ? spawnRef.current.getBoundingClientRect().y > window.innerHeight 
        ? window.innerHeight : spawnRef.current.getBoundingClientRect().y : centerY);
  const [scale, setScale] = useState(0);

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

    window.addEventListener('popstate', () => {
      // window.history.go(1);
    });

    offsetX = popupRef?.current.offsetWidth / 2;
    offsetY = popupRef?.current.offsetHeight / 2;
    setX(x - offsetX);
    setY(y - offsetY);

    if (!(x === centerX && y === centerY)) {
      requestRef.current = requestAnimationFrame(openAnimation);
    } else {
      setScale(1);
    }
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  const openAnimation = time => {
    if (!startRef.current) {
      startRef.current = time;
    }

    let stepX = centerX - x;
    let stepY = centerY - y;
    const length = Math.sqrt(stepX * stepX + stepY * stepY);
    stepX /= length;
    stepY /= length;  
    const deltaTime = time - previousTimeRef.current;      

    if (time - startRef.current < length / speed) {
      if (previousTimeRef.current !== null) {    
        setX(prev => prev + stepX * deltaTime * speed);
        setY(prev => prev + stepY * deltaTime * speed);
        setScale(prev => prev + (1 / length) * deltaTime * speed);
      }
      
      previousTimeRef.current = time;
    
      requestRef.current = requestAnimationFrame(openAnimation);
    } else {
      setX(centerX - offsetX);
      setY(centerY - offsetY);
      setScale(1);
      requestRef.current = previousTimeRef.current = startRef.current = null;
    }
  }

  const closeAnimation = (stepX, stepY, length, time) => {
    if (!startRef.current) {
      startRef.current = time;
    }

    const deltaTime = time - previousTimeRef.current;      
    
    if (time - startRef.current < length / speed) {
      if (previousTimeRef.current !== null) {    
        setX(prev => prev + stepX * deltaTime * speed);
        setY(prev => prev + stepY * deltaTime * speed);
        setScale(prev => prev - (1 / length) * deltaTime * speed);
      }
      
      previousTimeRef.current = time;      
      requestRef.current = requestAnimationFrame((time) => closeAnimation(stepX, stepY, length, time));
    } else {
      setScale(0);
      goBack();
    }
  }
  
  const closeRoutine = () =>
  {
    let stepX = spawnRef.current.getBoundingClientRect().x - x;
    let stepY =  spawnRef.current.getBoundingClientRect().y < window.innerHeight 
      ? spawnRef.current.getBoundingClientRect().y : window.innerHeight;
  
    const length = Math.sqrt(stepX * stepX + stepY * stepY);
    stepX /= length;
    stepY /= length;  
    console.log(length);
    requestRef.current = requestAnimationFrame((time) => closeAnimation(stepX, stepY, length, time));
  }

  return(
    <div className="popup active">
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
