import React from "react";
import Navbar from "../Components/Navbar";
import AddTodo from "../Components/AddTodo";

import AllTodo from "./AllTodo";
import { styled } from "styled-components";

const Container = styled.div`
  overflow-x: hidden;
`;

const Home = ({ user }) => {
  return (
    <Container>
      <Navbar />
      <AddTodo uid={user.user._id} />
      <AllTodo count={true} user={user} />
    </Container>
  );
};

export default Home;
