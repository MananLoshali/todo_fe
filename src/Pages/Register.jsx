import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
//import { useDispatch } from "react-redux";
// import { register } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
`;
const Form = styled.form`
  width: 40%;
  height: 60%;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
  align-items: center;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 80%;
  height: 10%;
  padding: 2px 4px;
  &:focus {
    outline: none;
  }
`;

const Para = styled.p`
  font-size: 1rem;
  color: orange;
`;
const Warning = styled.p`
  font-size: 1rem;
  color: red;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);

  //const dispatch = useDispatch();

  // const handleClick = async (e) => {
  //     e.preventDefault();
  //     if (!username || !email || !password || !confirmPassword) {
  //       setWarning("All fields are necessary");
  //       return;
  //     }
  //     if (password !== confirmPassword) {
  //       setWarning("Enter correct password");
  //       return;
  //     }
  //     const user = {
  //       username,
  //       email,
  //       password,
  //     };
  //     register(dispatch, user);
  //   };
  //}

  const handleClick = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      return setWarning(true);
    }
    if (password !== confirmPassword) {
      return setError(true);
    }
    const data = {
      username,
      email,
      password,
    };
    try {
      const res = await publicRequest.post("/auth/register", data);
      const user = await res.data;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          userDetails: { accessToken: user.accessToken, user: user.user },
        })
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Form>
        <Heading>REGISTER</Heading>
        <Input
          type="string"
          placeholder="enter username"
          onChange={(e) => {
            setUsername(e.target.value);
            setWarning(false);
          }}
        ></Input>
        <Input
          type="email"
          placeholder="enter email"
          onChange={(e) => {
            setEmail(e.target.value);
            setWarning(false);
          }}
        ></Input>
        <Input
          type="password"
          placeholder="enter password"
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning(false);
          }}
        ></Input>
        <Input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setWarning(false);
            setError(false);
          }}
        ></Input>

        <Button sx={{ border: "1px solid blue" }} onClick={handleClick}>
          SignUp
        </Button>
        {warning && <Warning>All fields are necessary</Warning>}
        {error && <Warning>Password not same</Warning>}
      </Form>
      <Para>
        Already a user ?? <Link to="/login">LogIn</Link>
      </Para>
    </Box>
  );
};

export default Register;
