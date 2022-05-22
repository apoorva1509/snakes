import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const GameOver = (props) => {
  const handleClick = () => {
    window.location.href = "/";
  };

  const lengthFirst = props.firstSnakeState.length;
  const lengthSecond = props.secondSnakeState.length;
  const checkIfHit = props.whichSnakeHits;

  return (
    <div style={{ padding: "0px" }}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          style={{
            color: "black",
            top: "340px",
            left: "165px",
            position: "absolute",
            fontSize: "30px",
          }}
        >
          {checkIfHit != null
            ? checkIfHit == 1
              ? "Second Snake Wins!"
              : "First Snake Wins!"
            : lengthFirst != lengthSecond
            ? lengthSecond > lengthSecond
              ? "First Snake Wins!"
              : "Second Snake Wins!"
            : "It's a Draw!"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClick}
          className="start-button"
          style={{
            borderRadius: "8%",
            padding: "10px",
            width: "50%",
            right: "160px",
            top: "390px",
            position: "absolute",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          PLAY AGAIN
        </Button>
      </DialogActions>
    </div>
  );
};

export default GameOver;
