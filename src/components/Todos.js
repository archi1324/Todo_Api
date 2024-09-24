import React from "react";

function Todo({ todos, currentPage, setCurrentPage }) {
  const todosPerPage = 10; // Количество задач на странице
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const displayedTodos = todos.slice((currentPage - 1) * todosPerPage, currentPage * todosPerPage);

  return (
    <div>
      <h1>Todo List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {displayedTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.todo}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Todo;