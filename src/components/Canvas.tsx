import React, { useRef, useEffect } from 'react';

export const SimpleCanvasExample: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    desenhaPoste();
  }, []);

  const getCanvaContext = () => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      return canvasCtxRef.current;
    }
  }

  const desenhaPoste = () => {
    const ctx = getCanvaContext();
    ctx!.beginPath();
    ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx!.stroke();
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default SimpleCanvasExample;