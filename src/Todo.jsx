import { useReducer, useEffect, useState } from "react";
import Modal from "./Modal";
const intialData = [
  { id: 1, title: "Clean the house", completed: false },
  { id: 2, title: "Cook adobo", completed: false },
  { id: 3, title: "Read a book", completed: false },
  { id: 4, title: "Bebe time", completed: true },
];

function Sort({ dispatch }) {
  return (
    <div className="space-x-2">
      <label htmlFor="sort">Sort:</label>
      <select
        name="sort"
        id="sort"
        className="py-2 px-4 rounded"
        onChange={(e) => {
          dispatch({ type: "sort", value: e.target.value });
        }}
      >
        <option value="asc">Ascending</option>
        <option value="dsc">Descending</option>
      </select>
    </div>
  );
}

function Todo({ title, completed, id, dispatch }) {
  const [showInvalid, setShowInvalid] = useState(false);
  return (
    <div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="completed"
          onChange={(e) => {
            dispatch({
              type: "setComplete",
              completed: e.target.checked,
              todoId: id,
            });
          }}
          checked={completed}
        />
        <input
          type="text"
          name="title"
          value={title}
          className="py-1 px-3 rounded border"
          onChange={(e) => {
            const { value } = e.target;
            value ? setShowInvalid(false) : setShowInvalid(true);
            dispatch({ type: "editTodo", title: value, todoId: id });
          }}
        />
        <div className="space-x-2 text-white">
          <button
            className="py-2 px-4 bg-red-500 rounded"
            onClick={() => {
              dispatch({ type: "deleteTodo", todoId: id });
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {showInvalid ? (
        <p className="text-sm text-red-500 opacity-80 pl-5">
          * Please provide a title
        </p>
      ) : null}
    </div>
  );
}
function Todos({ todos, dispatch }) {
  return (
    <>
      <ul className="space-y-4">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo
                title={todo.title}
                completed={todo.completed}
                id={todo.id}
                dispatch={dispatch}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function App() {
  const [todos, dispatch] = useReducer(todosReducer, intialData);
  const nextId = todos.length + 1;
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-1/4 p-4 space-y-2">
        <div className="bg-[#C7DBE6] p-4">
          <h1 className="text-lg font-bold text-center">Todos: </h1>
          <div className="text-end">
            <Sort dispatch={dispatch} />
          </div>
          <div className="my-4 flex justify-center">
            <Todos todos={todos} dispatch={dispatch} />
          </div>
        </div>
        <div className="text-end">
          <Modal dispatch={dispatch} nextId={nextId} />
        </div>
      </div>
    </div>
  );
}

export default App;

function todosReducer(currState, action) {
  switch (action.type) {
    case "addTodo": {
      return [
        ...currState,
        { id: action.nextId, title: action.newTodo, completed: false },
      ];
    }
    case "deleteTodo": {
      const nextState = currState.filter((todo) => todo.id !== action.todoId);
      return nextState;
    }
    case "setComplete": {
      const nextState = currState.map((todo) => {
        return todo.id === action.todoId
          ? { ...todo, completed: action.completed }
          : { ...todo };
      });
      return nextState;
    }
    case "editTodo": {
      const nextState = currState.map((todo) => {
        return todo.id === action.todoId
          ? { ...todo, title: action.title }
          : { ...todo };
      });
      return nextState;
    }
    case "sort": {
      let nextState = [...currState];
      return nextState.reverse();
    }
    default:
      break;
  }
}
