import { Typography } from "@mui/material";
import React from "react";

const GameScore = (props) => {
  const speed = props.speed;

  return (
    <div className="game-score-container" style={{ width: props.dim }}>
      <div className="game-score">
        <Typography style={{ color: "#EAEAEA" }}>FIRST SNAKE SCORE</Typography>
        <Typography style={{ color: "#EAEAEA" }} variant="h2">
          {props.snakeOne.length}
        </Typography>
      </div>
      <div className="game-score">
        <Typography style={{ color: "#EAEAEA" }}>SECOND SNAKE SCORE</Typography>
        <Typography style={{ color: "#EAEAEA" }} variant="h2">
          {props.snakeTwo.length}
        </Typography>
      </div>
    </div>
  );
};

export default GameScore;
