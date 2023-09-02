import React, { useEffect, useState } from "react";
//import { todos } from "../data";
import ViewTodo, { Container } from "../Components/ViewTodo";
import Navbar from "../Components/Navbar";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Category from "../Components/Category";
import Popup from "../Components/Popup";

const Containers = Container;
const Text = styled.p`
  font-size: 1.5rem;
  color: #81d5f0;
  margin-bottom: 35px;
`;

const AllTodo = ({ count, id, user }) => {
  //let id = JSON.parse(localStorage.getItem("userInfo"))?.userDetails?.user._id;

  const [todos, setTodos] = useState([]);
  const [cat, setCat] = useState(false);
  const [catTodos, setCatTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const pendingTodos = [];

  const fetchTodo = async () => {
    //id = JSON.parse(localStorage.getItem("userInfo"))?.userDetails?.user._id;
    console.log(count);
    if (count) {
      try {
        const res = await userRequest.get(
          `/todo/getall/${user.user._id}?new=true`
        );
        const data = res.data.todos;
        setTodos(data);
        console.log(todos);
        return;
      } catch (error) {
        console.log("The error is  ", error);
        return;
      }
    }
    try {
      const res = await userRequest.get(`/todo/getall/${id}`);
      const data = res.data.todos;
      setTodos(data);
    } catch (error) {
      console.log("The error is  ", error);
    }
  };

  const category = async (cat) => {
    try {
      const res = await userRequest.get(`/todo/getall/${id}?${cat}=true`);
      const data = res.data;
      setCatTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  todos?.map((item) => {
    if (item.isCompleted === false) {
      pendingTodos.push(item);
    }
  });

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleCompletedClick = (id) => {
    setTodos((preValue) => {
      //preValue contain current todos
      return preValue.map((item) => {
        if (item._id === id) {
          item.isCompleted = true;
          return item;
        }
        return item;
      });
    });
  };

  const handleDeleteClick = (id, msg) => {
    setModal(true);
    setMsg(msg);
    setTodos((preValue) => {
      return preValue.filter((item) => item._id !== id);
    });
    return;
  };

  const handleChangeClick = (id, updatedTodo) => {
    setTodos((preValue) => {
      return preValue.map((item) => {
        if (item._id === id) {
          item.todo = updatedTodo;
          return item;
        }
        return item;
      });
    });
  };

  const handleModal = () => {
    setModal((currentValue) => !currentValue);
  };

  return (
    <>
      {count ? (
        <>
          <Containers>
            {todos?.map((task) => (
              <ViewTodo
                key={task._id}
                task={task.todo}
                id={task._id}
                isCompleted={task.isCompleted}
                onCompleteClicks={handleCompletedClick}
                onDeleteClicks={handleDeleteClick}
                onChangeClick={handleChangeClick}
              />
            ))}
            <Link to="/alltodo" style={{ textDecoration: "none" }}>
              {todos.length >= 1 && <Text>See More Todos</Text>}
            </Link>
          </Containers>
        </>
      ) : (
        <>
          <Navbar />
          <div style={{ marginTop: "50px" }}>
            <Category pendingTodos={pendingTodos} category={category} />
            <Containers>
              {todos?.map((task) => (
                <ViewTodo
                  key={task._id}
                  task={task.todo}
                  id={task._id}
                  isCompleted={task.isCompleted}
                  onCompleteClicks={handleCompletedClick}
                  onDeleteClicks={handleDeleteClick}
                  onChangeClick={handleChangeClick}
                />
              ))}
              <Link to="/" style={{ textDecoration: "none" }}>
                <Text>Add More Todos</Text>
              </Link>
            </Containers>
          </div>
        </>
      )}
      {modal && <Popup msg={msg} onclick={handleModal} />}
    </>
  );
};

export default AllTodo;
