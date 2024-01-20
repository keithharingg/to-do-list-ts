import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  task: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyDownAddNewPost = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  };
  const onChangeFilterAll = () => {
    props.changeFilter('all');
  };
  const onChangeFilterActive = () => {
    props.changeFilter('active');
  };
  const onChangeFilterCompleted = () => {
    props.changeFilter('completed');
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <input
        value={newTaskTitle}
        type="text"
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownAddNewPost}
      />
      <button onClick={addTask}>Add New Task</button>
      <ul>
        {props.task.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };

          return (
            <li key={t.id}>
              <input type="checkbox" />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onChangeFilterAll}>All</button>
        <button onClick={onChangeFilterActive}>Active</button>
        <button onClick={onChangeFilterCompleted}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
