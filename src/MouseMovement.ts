import {useEffect, useRef, useState} from 'react';

const getAngle = (x: number, y: number) => {
    return Math.atan2(window.innerHeight/2 - y, window.innerWidth/2 - x) / Math.PI * 180 + 180
}

export const useMousePosition = () => {
    const angle = useRef(0);
    useEffect(() => {
      const updateMousePosition = (ev: MouseEvent) => {
        angle.current = getAngle(ev.clientX, ev.clientY);
      };
      window.addEventListener('mousemove', updateMousePosition);
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
    return {angle};
};