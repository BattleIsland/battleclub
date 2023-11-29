import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { WebsocketClientContext } from "./WebsocketClientContext";
import { render, setup } from "./RenderEngine";
import { useAssets } from "./Assets";
import { useKeyboardClicks } from "./KeysClicked";
import { useMousePosition } from "./MouseMovement";

export const GameView = () => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const {assets, loading: assetsLoading} = useAssets();
    const {client, userId} = useContext(WebsocketClientContext);

    useEffect(() => {
        if (client !== null && context !== null && !assetsLoading) {
            client.publish({
                destination: '/app/accept_userid',
                body: JSON.stringify({'userId': userId})
            });
            client.subscribe(`/topic/${userId}/messages`, (message) => {
                const gameState = JSON.parse(message.body);
                setup(context);
                render(context, gameState, assets);
            });
        }
    }, [client, context, assets, assetsLoading]);

    const {keysSelected} = useKeyboardClicks();
    const {angle} = useMousePosition();

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if (client !== null) {
            interval = setInterval(() => {
                client.publish({destination: '/app/accept_input', body: JSON.stringify({
                    keysSelected: keysSelected.current,
                    angle: angle.current
                })})
            }, 5);
        }

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        }
    }, [client]);

    useEffect(() => {
        if (canvasRef.current !== null) {
            const context = canvasRef.current.getContext('2d');
            setContext(context);
        } else {
            // log and show error
        }
    }, [])

    return <canvas ref={canvasRef}></canvas>;
}