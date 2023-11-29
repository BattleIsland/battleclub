import { useEffect, useRef, useState } from "react";

const VALID_KEYS = {
    'w': true,
    'a': true,
    's': true,
    'd': true,
    'ArrowUp': true,
    'ArrowLeft': true,
    'ArrowDown': true,
    'ArrowRight': true,
    '1': true,
    '2': true,
    '3': true,
};

export const useKeyboardClicks = () => {
    const keysSelected = useRef<string[]>([]);
    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key in VALID_KEYS) {
                const oldKeysSelected = keysSelected.current;
                if (oldKeysSelected.includes(e.key)) {
                    // do nothing since already in keysSelected
                } else {
                    keysSelected.current.push(e.key);
                }
            }
        }
        document.onkeyup = (e) => {
            keysSelected.current = keysSelected.current.filter(k => e.key !== k);
        }
    }, []);
    return {keysSelected};
}