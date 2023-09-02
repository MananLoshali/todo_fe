import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: min-content;
  background-color: darkgray;
  display: flex;
  padding: 8px 15px 8px 15px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Middle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-family: monospace;
`;
const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: bolder;
  font-family: monospace;
`;
const Navbar = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("userInfo"));
    res ? setUser(res.userDetails) : setUser();
  }, []);

  return (
    <Container>
      {user ? (
        <Left>
          <Link to="/alltodo" style={{ textDecoration: "none" }}>
            <Text>
              <AppRegistrationIcon
                sx={{
                  marginRight: "4px",
                  color: "cornflowerblue",
                  fontSize: "2.2rem",
                }}
              />
              Show All Todo
            </Text>
          </Link>
        </Left>
      ) : (
        <Left>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Text>
              <AppRegistrationIcon
                sx={{
                  marginRight: "4px",
                  color: "cornflowerblue",
                  fontSize: "2.2rem",
                }}
              />
              Register
            </Text>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Text>
              <LoginIcon
                sx={{
                  marginRight: "4px",
                  color: "cornflowerblue",
                  fontSize: "2.2rem",
                }}
              />
              Login
            </Text>
          </Link>
        </Left>
      )}

      <Middle>
        <Heading>Todo App</Heading>
      </Middle>
      <Right>
        <Link to="/myprofile" style={{ textDecoration: "none" }}>
          <Text>
            <LoginIcon
              sx={{
                marginRight: "4px",
                color: "cornflowerblue",
                fontSize: "2.2rem",
              }}
            />
            My Profile
          </Text>
        </Link>
      </Right>
    </Container>
  );
};

export default Navbar;
