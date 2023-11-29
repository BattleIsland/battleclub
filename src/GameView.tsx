import { useContext, useEffect } from "react";
import { WebsocketClientContext } from "./WebsocketClientContext";

export const GameView = () => {
    const {client, ready} = useContext(WebsocketClientContext);
    useEffect(() => {
        if (ready && client !== null) {
            client.subscribe('/topic/messages', (message) => {
                console.log(message.body);
            });
        }
    }, [client, ready]);
    return <></>;
}