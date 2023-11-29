import React, { useEffect, useState } from 'react';
import {Client} from '@stomp/stompjs';
import logo from './logo.svg';
import './App.css';
import { WebsocketClientContext } from './WebsocketClientContext';
import { GameView } from './GameView';

function App() {
  const [client, setClient] = useState<Client | null>(null);
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    const newClient = new Client({
      brokerURL: 'ws://localhost:8080/websocket-endpoint',
      onConnect: () => {
        setClientReady(true);
        setClient(newClient);
      },
    });
    newClient.activate();
  }, []);
  return (
    <WebsocketClientContext.Provider value={{client, ready: clientReady}}>
      <GameView/>
    </WebsocketClientContext.Provider>
  );
}

export default App;
