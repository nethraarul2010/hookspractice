import logo from './logo.svg';
import './App.css';
import { useState,useEffect,useRef} from 'react';


function App() {
  const hasMounted = useRef(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      name: inputValue,
    }

    setTasks([...tasks, newTask]);
    setInputValue('');
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks){
      setTasks(JSON.parse(storedTasks));
    }
  },[]);
 
  useEffect(() => {
    if(hasMounted.current){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    else{
      hasMounted.current = true;
    }
  },[tasks]);

  return (
   <div>
    <form onSubmit={handleAddTask}>
      <label htmlFor="taskname">Task Name</label>
      <input type="text" placeholder="Enter a task" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
      <button type="submit">Add Task</button>
      </form>
      <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
      </ul>
   </div>
  );
}

export default App;
