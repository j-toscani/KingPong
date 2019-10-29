import React from "react";
import ChatRoom from "./ChatRoom";
import GameRoom from "./GameRoom";
import SelectRoom from "./SelectRoom";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";

export default function Main({ setSettings, settings, nickname }) {
  const [connectedTo, setConnectionTo] = React.useState(false);

  const history = useHistory();
  function routeTo() {
    history.push(`/select/chat`);
  }

  React.useEffect(() => {
    const socket = io(
      process.env.REACT_APP_CLIENT_SOCKET_CONNECT || "http://127.0.0.1:8000"
    );
    socket.emit("setname", nickname);
    setConnectionTo({ connected: true, socket });
    return () => {
      socket.close();
      setConnectionTo(false);
    };
  }, []);

  function enterPlaySession() {
    switch (ev) {
      case "join":
        const socket = io("/game");
        socket.emit("join channel", joinChannel);
        break;
      case "create":
        const socket = io("/game");
        socket.emit("create channel", createChannel);
      default:
        alert("Dude, choose an event!");
        break;
    }
  }
  function leavePlaySession() {
    const socket = io("/");
    socket.emit("leave game", handleGameLeave);
  }

  return (
    <>
      <Switch>
        <Route exact path="/main">
          <SelectRoom
            routeTo={routeTo}
            nickname={nickname}
            setSettings={setSettings}
            settings={settings}
          ></SelectRoom>
        </Route>
        <Route exact path="/main/chat">
          <ChatRoom
            setConnectionTo={setConnectionTo}
            connectedTo={connectedTo}
            nickname={nickname}
            setSettings={setSettings}
            settings={settings}
          ></ChatRoom>
        </Route>
        <Route exact path="/main/game">
          <GameRoom nickname={nickname} connectedTo={connectedTo}></GameRoom>
        </Route>
      </Switch>
    </>
  );
}
