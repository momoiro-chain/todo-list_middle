import React, { useState } from "react";

import "./App.css";

function App() {
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  type todo = {
    id: string;
    progress: string;
    title: string;
    detail: string;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };

  const onClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    let uuid = crypto.randomUUID();
    e.preventDefault();
    setTodoList([
      ...todoList,
      { id: uuid, progress: "未着手", title: title, detail: detail },
    ]);
    setTitle("");
    setDetail("");
  };

  const onClickDelete = (id:string) => {
    const removedList = todoList.filter((todo) => {
      return todo.id !== id;
    })
    setTodoList(removedList);
  };

  return (
    <div className="App">
      <input
        type={"text"}
        placeholder={"title"}
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type={"text"}
        placeholder={"detail"}
        value={detail}
        onChange={handleDetailChange}
      />
      <button onClick={onClickAdd}>add</button>
      <select>
        <option>未完了</option>
        <option>進行中</option>
        <option>完了</option>
      </select>

      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} {todo.title} {todo.progress} {todo.detail}{" "}
              <button>edit</button>
              <button onClick={() => onClickDelete(todo.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
