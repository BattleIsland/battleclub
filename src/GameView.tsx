import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { WebsocketClientContext } from "./WebsocketClientContext";
import { render, setup } from "./RenderEngine";
import { useAssets } from "./Assets";

export const GameView = () => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const {assets, loading: assetsLoading} = useAssets();
    const {client} = useContext(WebsocketClientContext);

    useEffect(() => {
        if (client !== null && context !== null && !assetsLoading) {
            client.subscribe('/topic/messages', (message) => {
                const gameState = JSON.parse(message.body);
                setup(context);
                render(context, gameState, assets);
            });
        }
    }, [client, context, assets, assetsLoading]);

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