import { createContext } from "react";
import {Client} from '@stomp/stompjs';

export type WebsocketClientProps = {
    client: Client | null;
    ready: boolean;
}

export const WebsocketClientContext = createContext<WebsocketClientProps>({client: null, ready: false});