import React, { useState } from "react";
import { styled } from "styled-components";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { Input, InputContainer } from "./AddTodo";
import { userRequest } from "../requestMethods";
import Popup from "./Popup.jsx";

export const Container = styled.div`
  width: 100vw;
  height: min-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const InputContainers = InputContainer;

const Icon = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 0.9s;
`;
const Text = styled.p`
  width: 85%;
  height: min-content;
  padding: 15px;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: cursive;

  &:focus {
    outline: none;
  }
`;

const Textc = styled.p`
  width: 85%;
  height: min-content;
  padding: 15px;
  border: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: cursive;
  color: green;
  text-decoration: line-through;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Buttons = styled.button`
  border: 1px dotted green;
  cursor: pointer;
  background-color: #93ea93;
  color: darkgoldenrod;
  border-radius: 10px;
`;
const Inputs = Input;

const ViewTodo = ({
  task,
  id,
  isCompleted,
  onCompleteClicks,
  onDeleteClicks,
  onChangeClick,
}) => {
  const [change, setChange] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const changeTodo = () => {
    setChange(true);
  };
  const saveTodo = async (id) => {
    try {
      const res = await userRequest.put(`/todo/update/${id}`, {
        todo: updatedTodo,
      });
      onChangeClick(id, updatedTodo);
    } catch (error) {
      console.log(error);
    }
    setChange(false);
    // window.location.reload();
  };

  const completeTodo = async (id, isCompleted) => {
    try {
      const res = await userRequest.put(`/todo/update/${id}`, {
        isCompleted: !isCompleted,
      });
      onCompleteClicks(id);
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const res = await userRequest.delete(`/todo/delete/${id}`);
      const msg = res.data.msg;
      onDeleteClicks(id, msg);

      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputContainers>
        {change ? (
          <Inputs
            type="text"
            spellCheck="false"
            autoFocus
            defaultValue={task}
            onChange={(e) => {
              setUpdatedTodo(e.target.value);
            }}
          />
        ) : isCompleted ? (
          <Textc>{task}</Textc>
        ) : (
          <Text>{task}</Text>
        )}

        <Icon>
          <Button onClick={changeTodo} disabled={change}>
            <DriveFileRenameOutlineIcon
              sx={{ color: "blue", fontSize: "2.2rem" }}
            />
          </Button>
          <Button onClick={() => completeTodo(id, isCompleted)}>
            <DoneIcon
              sx={{ color: "green", cursor: "pointer", fontSize: "2.2rem" }}
            />
          </Button>
          <Button onClick={() => deleteTodo(id)}>
            <DeleteIcon
              sx={{ color: "red", cursor: "pointer", fontSize: "2.2rem" }}
            />
          </Button>

          {change && <Buttons onClick={() => saveTodo(id)}>Save Todo</Buttons>}
        </Icon>
      </InputContainers>
    </>
  );
};

export default ViewTodo;
