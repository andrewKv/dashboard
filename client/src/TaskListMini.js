import './App.css';
import React, { useState, useEffect, useContext, Item } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "./Context";
import Axios from "axios";

function TaskListMini() {
  const [errorMsg, setErrorMsg] = useState("");
  let { user, changeUserName } = useContext(UsernameContext);
  let [tasks, setTaskList] = useState([])
  let history = useHistory();


  function showTasks() {
    history.push('/Tasks')
  }

  useEffect(() => {
    if (user === "") {
      user = (sessionStorage.getItem("username"))
    }
    getTasksMini()
  }, []);

  function getTasksMini() {
    console.log(user)
    Axios.post("http://localhost:3001/GetTasks", {
      username: user
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't get photos: " + response.data.error)
      }
      else {
        let taskData = response.data
        // Show 3 tasks
        let taskListElements = (taskData.map((task) =>
          <div className="Task Item" key={task.taskid}>
            <input className="Input TaskInput Mini" readOnly type="text" data-id={task.taskid} placeholder={task.description === "" ? "Task " + task.taskid : task.description}/>
            <input type ="checkbox" readOnly className="TaskStatus" checked={task.status} />
          </div>
        ))        
        setTaskList(taskListElements.slice(0,3))
      }
    })
  }

  return (
    <div className="TasksMini">
      <div className="ContainerTitle" onClick={showTasks}>Tasks</div>
      <ul className="Tasks">
        {tasks}
      </ul>
      <p>
        {errorMsg}
      </p>
    </div>
  );
}

export default TaskListMini;
