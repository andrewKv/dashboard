import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "./Context";
import Axios from "axios";

function TaskList() {
  const [errorMsg, setErrorMsg] = useState("");
  let [taskValue, setTaskValue] = useState("");
  const [taskElements, setTasksList] = useState([])
  let { user } = useContext(UsernameContext);
  let [taskObj, setTaskObj] = useState([])
  let history = useHistory();

  useEffect(() => {
    if (user === "") {
      user = sessionStorage.getItem("username")
    }
    getTasks()
    
  }, []);

  function homeRequest() {
    history.push('/Dashboard')
  }

  function getTasks() {
    Axios.post("http://localhost:3001/GetTasks", {
      username: user
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't get tasks: " + response.data.error)
      }
      else {
        let tasks = response.data
        let tempObjList = []
        tasks.map((t) => {
          tempObjList.push({
            id: t.taskid,
            description: t.description,
            status: t.status
          })
        })
        taskObj = tempObjList

        setTasksList(tasks.map((task) =>
          <div className="Task Item" key={task.taskid}>
            <input className="Input TaskInput" type="text" data-id={task.taskid} placeholder={task.description === "" ? "Task " + task.taskid : task.description} onChange={(e) => setTaskValue(updateDescription(e))} onBlur={(e) => { updateTask(e) }} />
            <input className="TaskStatus" type="checkbox" data-id={task.taskid} checked={task.status} onChange={(e) => { changeStatus(e) }} />
          </div>
        ))
      }
    })
  }

  function updateDescription(e){
    taskValue = (e.target.value)
  }

  function changeStatus(e) {
    let taskId = parseInt((e.target.attributes[2].value))
    taskObj.find(obj => {
      return obj.id === taskId
    }).status ^= 1;
    setTaskObj(taskObj)
    updateTask(e)
  }

  // find relevant task to update in obj_list
  function updateTask(e) { 
    let taskId = parseInt((e.target.attributes[2].value))
    let selectedObj = taskObj.find(obj => {
      return obj.id === taskId
    })
    selectedObj.description = taskValue

    Axios.post("http://localhost:3001/UpdateTask", {
      status: selectedObj.status,
      description: selectedObj.description,
      taskId: taskId,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't update photo: " + response.data.error.sqlMessage)
      }
      else {
        getTasks()
      }
    })
  }


  // Add blank task to database,
  // Load back tasks and render
  function addTask(e) {
    Axios.post("http://localhost:3001/PostTask", {
      username: user,
      description: "",
      status: false,
    }).then((response) => {
      if (response.data.error) {
        setErrorMsg("Couldn't update task: " + response.data.error.sqlMessage)
      }
      else {
        // Redsiplay photos
        getTasks()
      }
    })
  }
  return (
    <div className="TaskList">
      <div className="MainTitle" onClick={homeRequest}>Tasks</div>
      <ul className="Tasks">
        <button className="SmallAdd" onClick={(e) => { addTask(e) }} />
        {taskElements}
      </ul>

      <p>{errorMsg}</p>

    </div>
  );
}


export default TaskList
