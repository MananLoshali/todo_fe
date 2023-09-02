import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const OuterContainer = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0px;
`;

const Container = styled.div`
  width: 100vw;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const Input = styled.input`
  width: 95%;
  height: min-content;
  padding: 15px;
  padding-left: 25px;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: cursive;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  outline: none;
  width: 30%;
  height: min-content;
  padding: 5px 10px 5px 10px;
  background-color: #f1b86d;
  color: inherit;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 800;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  border: 1px solid #c986ea;
  color: #e840da;
  border-radius: 10px;
  box-shadow: 8px 8px 8px lightblue;
  transition: all 0.1s;
  &:disabled {
    cursor: not-allowed;
  }
  &:active {
    background-color: #f1b86d;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;
export const InputContainer = styled.div`
  width: 70%;
  border: 1px solid indianred;
  border-radius: 10px;
  height: min-content;
  display: flex;
  padding: 4px;
  box-shadow: 10px 10px 10px darkkhaki;
`;

const AddTodo = ({ uid }) => {
  const [todo, setTodo] = useState("");
  const [disable, setDisable] = useState(true);
  const [warning, setWarning] = useState(false);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const res = JSON.parse(localStorage.getItem("userInfo"));
  //   res ? setId(res.userDetails.user._id) : setId("");
  // }, []);

  const handleClick = async () => {
    if (!todo) {
      return setWarning(true);
    }
    try {
      if (!uid) return navigate("/login", { replace: true });

      const res = await userRequest.post(`/todo/create/${uid}`, { todo });

      setTodo("");
      setMsg(res.data.msg);
      setModal(true);
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setModal(false);
  };

  return (
    <>
      <OuterContainer>
        <Container>
          <InputContainer>
            <Input
              spellCheck="false"
              autoFocus
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
                setWarning(false);
                setDisable(false);
              }}
              placeholder="Enter todo here"
            />
          </InputContainer>
          <Button onClick={handleClick} disabled={disable}>
            Add Todo
          </Button>
        </Container>
        {warning && (
          <h6
            style={{
              color: "red",
              fontSize: "1rem",
              fontFamily: "revert-layer",
            }}
          >
            Enter Some Todo
          </h6>
        )}
      </OuterContainer>
      {modal && <Popup msg={msg} onclick={handleModal} />}
    </>
  );
};

export default AddTodo;
