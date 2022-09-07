const taskValue = document.querySelector(".input input");
const addTaskButton = document.querySelector(".input button");
const doneTasksDivision = document.querySelector(".done-tasks");
const runningTasksDivision = document.querySelector(".running-tasks");
/*---------------------------------*/
let runningTasks = [];
let doneTasks = [];

//localStorage Process
if (localStorage.length > 0) {
  localStorage.getItem("runningTasks") != null
    ? (runningTasks = localStorage.getItem("runningTasks").split(","))
    : "";
  localStorage.getItem("doneTasks") != null
    ? (doneTasks = localStorage.getItem("doneTasks").split(","))
    : "";
  /*---------------------------------*/
  checkEmptyTask(runningTasks, runningTasksDivision);
  checkEmptyTask(doneTasks, doneTasksDivision);
  /*---------------------------------*/
  for (let i = 0; i < runningTasks.length; i++) {
    createTask(runningTasks[i], runningTasksDivision);
  }
  /*---------------------------------*/
  for (let i = 0; i < doneTasks.length; i++) {
    createTask(doneTasks[i], doneTasksDivision);
  }
  /*---------------------------------*/
  done(runningTasksDivision.querySelectorAll(".task-btn"));
  gone(doneTasksDivision.querySelectorAll(".task-btn"));
}

//to handle entery of input value
taskValue.addEventListener("keyup", checkEmptyInput);

//to toggle error message for empty input value
function checkEmptyInput() {
  const errorMessage = document.querySelector(".input .error-message");
  taskValue.value.length > 0
    ? errorMessage.classList.remove("active")
    : errorMessage.classList.add("active");
}

//to toggle error message for empty tasks
function checkEmptyTask(array, parent) {
  const errorMessage = parent.querySelector(".empty-task");
  array.length == 0
    ? errorMessage.classList.add("active")
    : errorMessage.classList.remove("active");
}

//to create task
function createTask(val, parent) {
  const taskBox = document.createElement("div");
  taskBox.className = "task-box";
  /*---------------------------------*/
  const taskContent = document.createElement("p");
  taskContent.className = "task-content";
  const taskContentText = document.createTextNode(val);
  taskContent.appendChild(taskContentText);
  /*---------------------------------*/
  const taskButton = document.createElement("button");
  taskButton.className = "task-btn";
  let taskButtonValue = document.createTextNode("Done");
  if (parent == doneTasksDivision)
    taskButtonValue = document.createTextNode("Delete");
  taskButton.appendChild(taskButtonValue);
  /*---------------------------------*/
  taskBox.append(taskContent, taskButton);
  parent.appendChild(taskBox);
}

//addTask button process
addTaskButton.onclick = () => {
  if (taskValue.value.length > 0) {
    runningTasks.unshift(taskValue.value);
    localStorage.setItem("runningTasks", runningTasks);
    checkEmptyTask(runningTasks, runningTasksDivision);
    createTask(taskValue.value, runningTasksDivision);
    /*---------------------------------*/
    taskValue.value = "";
    /*---------------------------------*/
    const doneButtons = runningTasksDivision.querySelectorAll(".task-btn");
    done(doneButtons);
    /*---------------------------------*/
    const deleteButtons = doneTasksDivision.querySelectorAll(".task-btn");
    gone(deleteButtons);
  }
};

//to handle done buttons process
function done(doneButtons) {
  doneButtons.forEach((doneBtn) => {
    doneBtn.onclick = () => {
      const taskContent =
        doneBtn.parentElement.querySelector(".task-content").textContent;
      doneTasks.unshift(taskContent);
      localStorage.setItem("doneTasks", doneTasks);
      checkEmptyTask(doneTasks, doneTasksDivision);
      runningTasks.splice(runningTasks.indexOf(taskContent), 1);
      localStorage.setItem("runningTasks", runningTasks);
      doneBtn.parentElement.remove();
      checkEmptyTask(runningTasks, runningTasksDivision);
      /*---------------------------------*/
      createTask(taskContent, doneTasksDivision);
      checkEmptyTask(doneTasks, doneTasksDivision);
    };
  });
}

//to handle delete buttons process
function gone(deleteButtons) {
  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.onclick = () => {
      const taskContent =
        deleteBtn.parentElement.querySelector(".task-content").textContent;
      doneTasks.splice(doneTasks.indexOf(taskContent), 1);
      localStorage.setItem("doneTasks", doneTasks);
      deleteBtn.parentElement.remove();
      checkEmptyTask(doneTasks, doneTasksDivision);
    };
  });
}
