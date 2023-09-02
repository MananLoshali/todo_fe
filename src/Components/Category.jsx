import React, { useState } from "react";
import { styled } from "styled-components";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: min-content;
  display: flex;
  margin-bottom: 25px;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 15%;
  height: 42px;
  padding: 4px 8px 4px 8px;
  background-color: #beb9b9;
  color: white;
  cursor: pointer;
  border: 2px;
  border-bottom-right-radius: 15px;
  font-size: 0.9rem;
`;

const Info = styled.div`
  width: 40%;
  height: min-content;
  font-size: 1.5rem;
  color: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
`;
const Category = ({ pendingTodos, category }) => {
  const handleAllTodo = () => {
    category();
  };

  const handlePendingTodo = () => {
    category("pending");
  };

  const handleCompletedTodo = () => {
    category("completed");
  };

  return (
    <Container>
      <Wrapper>
        <Button onClick={handleAllTodo}>All Todo</Button>
        <Button onClick={handlePendingTodo}>Pending Todo</Button>
        <Button onClick={handleCompletedTodo}>Completed Todo</Button>
      </Wrapper>
      <Info>{`${pendingTodos.length} todos are pending`}</Info>
    </Container>
  );
};

export default Category;
