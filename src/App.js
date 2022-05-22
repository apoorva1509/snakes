import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Slide } from "@mui/material";
import Snake from "./components/snake";
import Food from "./components/food";
import SelectDifficulty from "./components/select-difficulty";
import GameScore from "./components/game-score";
import GameOver from "./components/game-over";
import "./App.css";

// random dimensions of board
const maxDim = 600;
const minDim = 400;
const randomDimension =
  Math.floor((Math.random() * (maxDim - minDim + 1) + minDim) / 2) * 2;

// random coordinates for food position
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// random count of food
const maxCountFood = 30;
const minCountFood = 20;
var randomCountFood = Math.floor((Math.random() * (maxCountFood - minCountFood + 1) + minCountFood) / 2) * 2;

const App = () => {
  const [firstSnakeState, setSnakeState] = useState([
    [0, 0],
    [2, 0],
    [4, 0],
  ]);
  const [secondSnakeState, setSecondSnakeState] = useState([
    [94, 98],
    [96, 98],
    [98, 98],
  ]);
  const [foodState, setFoodState] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [secondSnakeDirection, setSecondSnakeDirection] = useState("LEFT");
  const [speed, setSpeed] = useState(null);
  const [time, setTime] = useState(0);
  const [openModal, setOpenModal] = useState(true);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [whichSnakeHits, setWhichSnakeHits] = useState(null);

  useEffect(() => {
    if (speed != null) {
      const id = setInterval(changeTime, speed);
      return () => clearInterval(id);
    }
  }, [time, speed]);

  useEffect(() => {
    onEatingFood();
  }, [time]);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  }, []);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setSecondSnakeDirection("LEFT");
        break;
      case 38:
        setSecondSnakeDirection("UP");
        break;
      case 39:
        setSecondSnakeDirection("RIGHT");
        break;
      case 40:
        setSecondSnakeDirection("DOWN");
        break;

      case 65:
        setDirection("LEFT");
        break;
      case 87:
        setDirection("UP");
        break;
      case 68:
        setDirection("RIGHT");
        break;
      case 83:
        setDirection("DOWN");
        break;
    }
  };

  const changeTime = () => {
    setTime(time + 1);
  };

  const onCrossingWall = () => {
    var firstSnakeHead = firstSnakeState[firstSnakeState.length - 1];
    var secondSnakeHead = secondSnakeState[secondSnakeState.length - 1];
    var firstSnakeHits =
      firstSnakeHead[0] >= 100 ||
      firstSnakeHead[1] >= 100 ||
      firstSnakeHead[0] < 0 ||
      firstSnakeHead[1] < 0;
    var secondSnakeHits =
      secondSnakeHead[0] >= 100 ||
      secondSnakeHead[1] >= 100 ||
      secondSnakeHead[0] < 0 ||
      secondSnakeHead[1] < 0;
    if (firstSnakeHits || secondSnakeHits) {
      if (firstSnakeHits) {
        setWhichSnakeHits(1);
      } else if (secondSnakeHits) {
        setWhichSnakeHits(2);
      }
      gameOver();
    }
  };

  const onEatingOtherSnake = () => {
    const firstSnake = [...firstSnakeState];
    const secondSnake = [...secondSnakeState];
    const firstSnakeHead = firstSnakeState[firstSnakeState.length - 1];
    const secondSnakeHead = secondSnakeState[secondSnakeState.length - 1];
    var isSecondSnake = false;
    var isFirstSnake = false;

    firstSnake.forEach((dot) => {
      if (secondSnakeHead[0] === dot[0] && secondSnakeHead[1] === dot[1]) {
        isSecondSnake = true;
      }
    });

    secondSnake.forEach((dot) => {
      if (firstSnakeHead[0] === dot[0] && firstSnakeHead[1] === dot[1]) {
        isFirstSnake = true;
      }
    });

    if (isSecondSnake || isFirstSnake) {
      if (isFirstSnake) {
        setWhichSnakeHits(1);
      } else if (isSecondSnake) {
        setWhichSnakeHits(2);
      }

      gameOver();
    } else {
      moveFirstSnake();
      moveSecondSnake();
    }
  };

  const onEatingFood = () => {
    var firstSnakeHead = [...firstSnakeState[firstSnakeState.length - 1]];
    var secondSnakeHead = [...secondSnakeState[secondSnakeState.length - 1]];
    var food = [...foodState];
    var first = firstSnakeHead[0] == food[0] && firstSnakeHead[1] == food[1];
    var second = secondSnakeHead[0] == food[0] && secondSnakeHead[1] == food[1];

    if (first || second) {
      setFoodState(getRandomCoordinates());
      randomCountFood--;
      if (randomCountFood > 0) {
        enlargeSnake(first ? "first" : "second");
      } else if (randomCountFood == 0) {
        gameOver();
      }
    } else {
      onCrossingWall();
      onEatingOtherSnake();
    }
  };

  const enlargeSnake = (snakeNumber) => {
    var enlargedSnake;
    var snakeDirection;

    if (snakeNumber == "first") {
      enlargedSnake = [...firstSnakeState];
      snakeDirection = direction;
    } else {
      enlargedSnake = [...secondSnakeState];
      snakeDirection = secondSnakeDirection;
    }

    var newDot;
    var tail = enlargedSnake[0];

    switch (snakeDirection) {
      case "RIGHT":
        newDot = [tail[0] - 2, tail[1]];
        break;
      case "LEFT":
        newDot = [tail[0] + 2, tail[1]];
        break;
      case "UP":
        newDot = [tail[0], tail[1] + 2];
        break;
      case "DOWN":
        newDot = [tail[0], tail[1] - 2];
        break;
    }

    if (snakeNumber == "first") {
      console.log(snakeNumber);
      setSnakeState([[...newDot], ...firstSnakeState]);
    } else {
      console.log(snakeNumber);
      setSecondSnakeState([[...newDot], ...secondSnakeState]);
    }
  };

  const moveFirstSnake = () => {
    var snake = [...firstSnakeState];
    var head = snake[snake.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
    }
    snake.push(head);
    snake.shift();
    setSnakeState(snake);
  };

  const moveSecondSnake = () => {
    var snake = [...secondSnakeState];
    var head = snake[snake.length - 1];

    switch (secondSnakeDirection) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
    }
    snake.push(head);
    snake.shift();
    setSecondSnakeState(snake);
  };

  const gameOver = () => {
    setSpeed(null);
    setOpenResultModal(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div className="App">
      <Dialog open={openModal} TransitionComponent={Transition} keepMounted>
        <DialogContent>
          <img
            className="snake-image"
            src={process.env.PUBLIC_URL + "images/start-game.jpg"}
          />{" "}
          <div>
            <h1 className="start-text"> Lets play Snakes! </h1>
            <SelectDifficulty
              speed={speed}
              setSpeed={setSpeed}
              setOpenModal={setOpenModal}
            />
          </div>
        </DialogContent>
      </Dialog>

      <GameScore
        dim={randomDimension}
        snakeOne={firstSnakeState}
        snakeTwo={secondSnakeState}
        speed={speed}
      />

      <div
        className="board"
        style={{
          height: `${randomDimension}px`,
          width: `${randomDimension}px`,
        }}
      >
        <Snake snakeState={firstSnakeState} />
        <Food foodState={foodState} />
        <Snake backgroundColor="#bb1068" snakeState={secondSnakeState} />
      </div>

      <Dialog
        open={openResultModal}
        TransitionComponent={Transition}
        keepMounted
        style={{ paddingBottom: "0px" }}
      >
        <DialogContent style={{ overflowY: "hidden" }}>
          <img
            className="snake-image1"
            src={process.env.PUBLIC_URL + "images/green-background.png"}
          />{" "}
          <div style={{ marginBottom: "-50px", padding: "0px" }}>
            <h1 className="start-text">GAME OVER!</h1>
            <img
              className="snake-image2"
              src={process.env.PUBLIC_URL + "images/game-over.jpeg"}
            />
            <GameOver
              whichSnakeHits={whichSnakeHits}
              firstSnakeState={firstSnakeState}
              secondSnakeState={secondSnakeState}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
