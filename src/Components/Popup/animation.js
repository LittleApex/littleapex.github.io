
const moveAnimation = (from, to, setPosition, speed, callback) => {
  setPosition({x: from.x, y: from.y});

  let start, previousTime;

  let stepX = to.x - from.x;
  let stepY = to.y - from.y;
  let length = Math.sqrt(stepX * stepX + stepY * stepY);
  stepX /= length;
  stepY /= length;

  const moveAnimationStep = (time) => {
    if (!start) {
      start = time;
    }
    const deltaTime = time - previousTime;

    if (time - start < length / speed) {
      if (previousTime) {
        setPosition(prev => { return {
          x: prev.x + stepX * deltaTime * speed,
          y: prev.y + stepY * deltaTime * speed
        }});
        
      }

      previousTime = time;

      requestAnimationFrame(moveAnimationStep);
    } else {

      setPosition(to);

      if (callback) {
        callback();
      }
    }
  };

  requestAnimationFrame(moveAnimationStep);
  return length / speed;
};

const scaleAnimation = (from, to, setScale, length) => {
  setScale(from);
  
  let start, previousTime;
  let step = (to - from) / length;
  
  const scaleAnimationStep = (time) => {
    if (!start) {
      start = time;
    }
    const deltaTime = time - previousTime;
    
    if (time - start < length) {
      if (previousTime) {
        setScale(prev => prev + step * deltaTime);
        
      }
      
      previousTime = time;
      
      requestAnimationFrame(scaleAnimationStep);
    } else {
      setScale(to);
    }
  }

  requestAnimationFrame(scaleAnimationStep);
}

export { moveAnimation, scaleAnimation };
