let dateInput = document.getElementById("date");
let textarea = document.getElementById("text_description");
let text = document.getElementById("text");
let form = document.getElementById("form")
let textInput = document.getElementById("input_text");
let add = document.getElementById("add_task");
let tasks = document.getElementById("submit");
let tasks2 = document.getElementById("tasks2");


   let todoTask = [];
  
  const addData = () => {
    todoData.push({
      text: textInput.value,
      description: textarea.value,
      date: dateInput.value,
    });
  
    localStorage.setItem("todoData", JSON.stringify(todoData));
    createTasks();
  };
  
  const resetForm = () => {
    textInput.value = "";
    textarea.value = "";
    dateInput.value = "";
  };
  
  let createTasks = () => {
     tasks.innerHTML = "";
    todoData.forEach((x, y) => {
      return (tasks.innerHTML += `
        <li  id=${y} class='task-list'>
        <span class="btn-utils">
        
        <button onClick ="deleteTask(this);createTasks()" class="btn-delete">DELETE</button>
        <button onClick= "editTask(this)" class = "open-modal edit" data-target="modal-1"> EDIT TEXT</button>
      </span>
         
          <span class="title-text">${x.text}</span>
          <br />
          <p>${x.description}</p>
          <br />
          <span class="date-text">Due date: ${x.date}</span><br />
          <button  class="click-button" onClick="changeListener(this)" >SUBMIT</button><br />
         
        </li>
      `);
    });
      resetForm();
  };
  
  (() => {
    todoData = JSON.parse(localStorage.getItem("todoData")) || [];
    createTasks();
  })();
  
  const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    todoData.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("todoData", JSON.stringify(todoData));
  };
  
  const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask)
  
    textInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[3].innerHTML;
    dateInput.value = selectedTask.children[4].innerHTML;
  
    deleteTask(e);
  };

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let Check = document.querySelectorAll(".button");
  
  let completedData = [];
  
  const changeListener = (e) => { 
    let completedDat = todoData.splice(e.parentElement.id, 1);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    completedData.push(...completedDat)
    localStorage.setItem("completedData", JSON.stringify(completedData))
    
    completedTask()
    createTasks()
  }
  
  const deleteCompletedTask = (e) => {
    e.parentElement.parentElement.remove();
    completedData.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("completedData", JSON.stringify(completedData));
  };
  
  const completedTask = () => {  
    console.log(completedData)
    tasks2.innerHTML = "";
    completedData.forEach((x, y) => {
      const dueDate = new Date(x.date);
      let today = new Date();
      let difference = dueDate.getTime() - today.getTime();
      let diffInDays = Math.ceil(difference /(1000*60*60*24));
    
      checkdueDateDIfference =() =>{
        if(diffInDays > 0){
          return ` You completed your task earlier by ${diffInDays} days `
        }
        else if(diffInDays < 0){
          console.log(diffInDays);
          return ` You submited your late by ${diffInDays * (-1) } days `
  
        }
        else{
          return `<span>You submited your  task on time</span>`
        }
      }
      return (tasks2.innerHTML += `
      <li  id=${y} class='task-list'>
      <span class="warning-dueDate">${checkdueDateDIfference()}</span>
      <span class="title-text">${x.text}</span>
      <p>${x.description}</p>
      <span class="date-text">Due date: ${x.date}</span>
      <span class="btn-utils">
        <button onClick ="deleteCompletedTask(this);createTasks()" class="btn-delete"> DELETE</button>
      </span>
    </li>
      `);
    });
     resetForm();
  };
  
  
  (() => {
    completedData = JSON.parse(localStorage.getItem("completedData")) || [];
    completedTask();
  })();

  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      text.innerHTML = "Add task";
    } else {
      console.log("success");
      text.innerHTML = "";
      addData();
      add.setAttribute("");
      add.click();
  
      (() => {
        add.setAttribute("");
      })();
    }
  };