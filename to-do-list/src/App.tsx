import React, { useState } from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { v1 } from 'uuid';

// let tasks2 = [
//   { id: 1, title: 'Shawshank Redemption', isDone: true },
//   { id: 2, title: 'Pursuit of Happiness', isDone: false },
//   { id: 3, title: 'Harry Potter', isDone: true },
// ];

export function Counter() {
  const [data, setData] = useState(0);
  return (
    <div>
      <button onClick={() => setData(data - 1)}>-</button>
      {data}
      <button onClick={() => setData(data + 1)}>+</button>
    </div>
  );
}

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'TypeScript', isDone: false },
    { id: v1(), title: 'JavaScript', isDone: true },
  ]);
  console.log(tasks);

  let [filter, setFilter] = useState<FilterValuesType>('all');
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    console.log(filteredTasks);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  let tasksForToDoList = tasks;
  if (filter === 'completed') {
    tasksForToDoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForToDoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Counter />
      <Todolist
        title="What to learn"
        task={tasksForToDoList}
        changeFilter={changeFilter}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
