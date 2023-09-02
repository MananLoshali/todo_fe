import React, { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(189, 189, 189, 0.9);
  transition: all 1s ease-in-out;
`;
const Wrapper = styled.div`
  width: 30%;
  height: 35%;
  padding-top: 40px;
  border: 1px dotted red;
  background-color: darkslategrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Text = styled.p`
  font-size: 1.7rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: mistyrose;
`;

const Button = styled.button`
  outline: none;
  width: 30%;
  padding: 8px;
  cursor: pointer;
  border: 1px solid dodgerblue;
  background-color: brown;
  color: lightgrey;
  font-size: 1rem;
`;

const Popup = ({ msg, onclick }) => {
  const handleClick = () => {
    onclick();
  };

  useEffect(() => {
    console.log("Use effect running");

    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <Container>
      <Wrapper>
        <Text>{msg}</Text>
        <Button onClick={handleClick}>Ok</Button>
      </Wrapper>
    </Container>
  );
};

export default Popup;
