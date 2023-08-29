import { useReducer, useEffect } from "react";
import Modal from "./Modal";
const intialData = [
  { id: 1, title: "Clean the house", completed: false },
  { id: 2, title: "Cook adobo", completed: false },
  { id: 3, title: "Read a book", completed: false },
  { id: 4, title: "Bebe time", completed: true },
];

function Sort({ params }) {
  return (
    <div className="space-x-2">
      <label htmlFor="sort">Sort:</label>
      <select name="sort" id="sort" className="py-2 px-4 rounded">
        <option value="asc">Ascending</option>
        <option value="dsc">Descending</option>
      </select>
    </div>
  );
}

function Todo({ title, completed, id, dispatch }) {
  return (
    <div className="flex p-2 items-center space-x-3">
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
      <h1>{title}</h1>
      <div className="space-x-2 text-white">
        <button className="py-2 px-4 bg-green-500 rounded">Edit</button>
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
      <div className="w-1/2 p-4 space-y-2">
        <div className="bg-[#C7DBE6] p-4">
          <h1 className="text-lg font-bold text-center">Todos: </h1>
          <div className="text-end">
            <Sort />
          </div>
          <div>
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
        if (todo.id === action.todoId) {
          return { ...todo, completed: action.completed };
        } else {
          return todo;
        }
      });
      return nextState;
    }

    default:
      break;
  }
}
todo: create a eventlistener for edit and sort