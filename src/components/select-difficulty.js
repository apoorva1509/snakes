import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import * as yup from "yup";
import "../App.css";

const SelectDifficulty = (props) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const SelectDifficultySchema = yup
  .string()
  .required("Please choose a difficulty-level.");

  const handleSubmit = (e) => {
    e.preventDefault();
    SelectDifficultySchema.validate(value, { abortEarly: false })
      .then(() => {
        setError(false);
        switch (value) {
          case "easy":
            props.setSpeed(250);
            break;
          case "normal":
            props.setSpeed(150);
            break;
          case "hard":
            props.setSpeed(50);
            break;
        }
        props.setOpenModal(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <form>
      <div className="select-difficulty-form">
        <FormControl help>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            style={{ fontSize: "25px", fontWeight: "bold", color: "black" }}
          >
            Select Difficulty:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="easy"
              control={<Radio />}
              label="Easy"
              style={{ fontWeight: "bold", color: "black", fontSize: "25px" }}
            />
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal"
              style={{ fontWeight: "bold", color: "black", fontSize: "25px" }}
            />
            <FormControlLabel
              value="hard"
              control={<Radio />}
              label="Hard"
              style={{ fontWeight: "bold", color: "black", fontSize: "25px" }}
            />
          </RadioGroup>
          {error && (
            <FormHelperText error={error}>
              Please choose a difficulty-level.
            </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          className="start-button"
          style={{ borderRadius: "50%", marginTop: "5px", padding: "10px" }}
        >
          Click to Start !
        </Button>
      </div>
    </form>
  );
};

export default SelectDifficulty;
