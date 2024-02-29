import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<todo>({
    id: "",
    progress: "",
    title: "",
    detail: "",
  });
  const [selectedProgress, setSelectedProgress] = useState("all");
  const [selectedList, setSelectedList] = useState<todo[]>([]);

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

  const onClickDelete = (id: string) => {
    const removedList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(removedList);
  };

  const onClickEdit = (todo: todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };
  const handleEditDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, detail: e.target.value });
  };
  const handleUpdateTodo = (id: string, updatedTodo: todo) => {
    const updatedItem = todoList.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodoList(updatedItem);
  };
  const onSubmitEditForm = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  // selectタグのonChangeイベントにswitch文で処理を記述
  const onChangeSelect = (e: any) => {
    setSelectedProgress(e.target.value);
  };

  useEffect(() => {
    switch (
      selectedProgress //selectedProgressから変更
    ) {
      case "all":
        setSelectedList(todoList);
        break;
      case "notStarted":
        setSelectedList(todoList.filter((todo) => todo.progress === "未着手"));
        break;
      case "inProgress":
        setSelectedList(todoList.filter((todo) => todo.progress === "進行中"));
        break;
      case "complete":
        setSelectedList(todoList.filter((todo) => todo.progress === "完了"));
        break;
    }
  }, [selectedProgress, todoList]);

  const filteredTodo = todoList.filter(
    (todo) => todo.progress === selectedProgress
  );

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={onSubmitEditForm}>
          <label htmlFor="editTodo">edit todo: </label>
          <input
            type={"text"}
            placeholder={"title"}
            value={currentTodo.title}
            onChange={handleEditTitleChange}
          />
          <input
            type={"text"}
            placeholder={"detail"}
            value={currentTodo.detail}
            onChange={handleEditDetailChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
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
        </div>
      )}

      {/* ↓todoリスト部分 */}
      <select onChange={onChangeSelect}>
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">進行中</option>
        <option value="complete">完了</option>
      </select>

      <ul>
        {selectedList.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} {todo.progress} {todo.title} {todo.detail}{" "}
              <button onClick={() => onClickEdit(todo)}>edit</button>
              <button onClick={() => onClickDelete(todo.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
