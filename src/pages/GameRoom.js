import React from "react";
import ChatRoom from "./ChatRoom";
import GameScreen from "./GameScreen";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

export default function GameRoom({ nickname, setSettings, settings }) {
  let history = useHistory();

  const [roomId, setRoomId] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [connectedTo, setConnectionTo] = React.useState(false);

  function toggleOpen(open) {
    setOpen(!open);
  }

  React.useEffect(() => {
    history.push("/gameroom/join/chat");
    if (!connectedTo) {
      let id = Math.random();
      setRoomId(id);
      setConnectionTo({ connected: true, roomId });
      setOpen(false);
    } else {
      console.log(`ID already declared: ${roomId}`);
    }
  }, [open, roomId]);

  return (
    <>
      <Switch>
        <Route exact path="/gameroom/join/chat">
          <ChatRoom
            connectedTo={connectedTo}
            nickname={nickname}
            setSettings={setSettings}
            toggleOpen={toggleOpen}
            settings={settings}
            open={open}
          ></ChatRoom>
        </Route>
        <Route exact path="/gameroom/join/game">
          <GameScreen
            nickname={nickname}
            connectedTo={connectedTo}
          ></GameScreen>
        </Route>
      </Switch>
    </>
  );
}
