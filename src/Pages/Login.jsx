import React, { useState } from "react";
import styled from "styled-components";
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
  height: 40%;
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
  height: 15%;
  padding: 2px 4px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 10%;
  height: 17%;
  font-size: 1rem;
  font-weight: bolder;
  background-color: #97e3ec;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
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
const Login = () => {
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const dispatch = useDispatch();
  //const { isFetching, error } = useSelector((state) => state.user);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (!username || !password) {
  //     setErrors(true);
  //     return;
  //   }
  //   console.log("Before login");
  //   login(dispatch, { username, password });
  //   console.log("after login");
  //   // window.location.reload();
  // };
  // console.log(error);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setWarning(true);
    }
    try {
      const res = await publicRequest.post("/auth/login", {
        username,
        password,
      });
      const user = await res.data;
      console.log(user);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          userDetails: { accessToken: user.token, user: user.user },
        })
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        return setError(error.response.data.error);
      } else if (error.response?.status === 400) {
        return setError(error.response.data.error);
      }
    }
  };

  return (
    <Box>
      <Form>
        <Heading>LogIn</Heading>
        <Input
          placeholder="enter username"
          type="string"
          onChange={(e) => {
            setUsername(e.target.value);
            setWarning(false);
          }}
        ></Input>
        <Input
          placeholder="enter password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning(false);
          }}
        ></Input>
        <Button
          onClick={handleClick}
          sx={{
            border: "1px solid blue",
            "&:disabled": { color: "green", cursor: "not-allowed" },
          }}
        >
          LogIn
        </Button>
        {warning && <Warning>All fields are necessary</Warning>}
        {error && <Warning>{error}</Warning>}
      </Form>
      <Para>
        New user ?? <Link to="/register">Register</Link>
      </Para>
    </Box>
  );
};

export default Login;
