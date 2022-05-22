import React from "react";

const Food = (props) => {
  const coordinates = {
    left: `${props.foodState[0]}%`,
    top: `${props.foodState[1]}%`,
  };

  return <img src={process.env.PUBLIC_URL + "images/food.png"} alt="apple" className="food" style={coordinates}></img>;
};

export default Food;
