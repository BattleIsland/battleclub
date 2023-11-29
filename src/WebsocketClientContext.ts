import { createContext } from "react";
import {Client} from '@stomp/stompjs';

export type WebsocketClientProps = {
    client: Client | null;
    ready: boolean;
    userId: string;
}

export const WebsocketClientContext = createContext<WebsocketClientProps>({client: null, ready: false, userId: ''});