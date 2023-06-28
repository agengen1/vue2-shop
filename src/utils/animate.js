function animate(element, targetPos, duration) {
    const startPos = element.scrollTop;
    const distance = targetPos - startPos;
    const startTime = performance.now();
    
    function step(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newPos = startPos + distance * easeOutQuad(progress);
      
      element.scrollTop = newPos;
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    
    requestAnimationFrame(step);
  }
  
  function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }
  


export default animate
