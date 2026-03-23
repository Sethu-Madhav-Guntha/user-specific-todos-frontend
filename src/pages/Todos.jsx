import { useEffect, useRef, useState } from "react";

function Todos() {
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const todoInputRef = useRef();
  const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;
  const token = localStorage.getItem("token");
  const handleEditTodo = (todoId, todoItem) => {
    setEditFlag(true);
    todoInputRef.current.value = todoItem;
    setTodoId(todoId);
  };

  const handleDeleteTodo = (todoId) => {
    fetch(`${BACKEND_BASE_URI}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    })
      .then(() => {
        getUserTodos();
      })
      .catch((err) => console.log(err));
  };

  const getUserTodos = () => {
    fetch(`${BACKEND_BASE_URI}/todos`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.userTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTodoFormSubmit = () => {
    event.preventDefault();
    const todoForm = new FormData(event.target);
    const todoFormData = Object.fromEntries(todoForm.entries());
    console.log(todoFormData);
    event.target.reset();
    if (editFlag) {
      fetch(`${BACKEND_BASE_URI}/todos/${todoId}`, {
        method: "PUT",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoFormData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getUserTodos();
        })
        .catch((err) => console.log(err));
      setEditFlag(false);
    } else {
      fetch(`${BACKEND_BASE_URI}/todos`, {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoFormData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getUserTodos();
        });
    }
  };

  useEffect(() => {
    getUserTodos();
  }, []);

  return (
    <div>
      <h1>Todos Page</h1>
      <form onSubmit={handleTodoFormSubmit}>
        <label htmlFor="todoId">Todo: </label>
        <input
          type="text"
          name="todo"
          id="todoId"
          placeholder="Provide Todo Here"
          ref={todoInputRef}
          required
        />
        <button type="submit">{editFlag ? "Edit" : "Add"} Todo</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li key={todo._id}>
            <span>{todo.todo}</span>
            <button onClick={() => handleEditTodo(todo._id, todo.todo)}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Todos;
