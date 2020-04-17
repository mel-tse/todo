//clears local storage
//localStorage.clear();

//Selectors
//The text
const todoInput = document.querySelector(".todo-input");
// The button with icon
const todoButton = document.querySelector(".todo-button");
// The ul list
const todoList = document.querySelector(".todo-list");
// Filter todo
const filterOption = document.querySelector(".filter-todo");
// drop down
const dropDown = document.querySelector(".drop-down");

//Event listeners
//checks if the web page is loaded
document.addEventListener("DOMContentLoaded", getTodos);
//When button is clicked, add dynamic todo
todoButton.addEventListener("click", addTodo);
//Delete button
todoList.addEventListener("click", deleteCheck);
//filter option
filterOption.addEventListener("click", filterTodo);
//drop down menu
dropDown.addEventListener("click", showlist);

//show list drop down menu
function showlist(e) {
  // to do drop down
  const todoDrop = document.querySelector("#todos");
  if (todoDrop.style.display === "none") {
    todoDrop.style.display = "block";
  } else {
    todoDrop.style.display = "none";
  }
}

//Functions
//Adding todo dynamic function
function addTodo(event) {
  //stops the browser refreshing
  event.preventDefault();
  //Create the Todo Div
  const todoDiv = document.createElement("div");
  //add a class to the div
  todoDiv.classList.add("todo");
  //Create li inside div
  const newTodo = document.createElement("li");
  //text inside the li tag pulls from todoInput
  newTodo.innerText = todoInput.value;
  //add a class to the li
  newTodo.classList.add("todo-item");
  //places it inside the todo div
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  //Create check mark button
  const completedButton = document.createElement("button");
  //adds text to complete button, innerHTML adds the fa
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  //add a class to complete button
  completedButton.classList.add("complete-btn");
  //places it inside the todo div
  todoDiv.appendChild(completedButton);
  //Create trash button
  const TrashButton = document.createElement("button");
  //adds text to complete button, innerHTML adds the fa
  TrashButton.innerHTML = '<i class="fas fa-trash"></i>';
  //add a class to complete button
  TrashButton.classList.add("trash-btn");
  //places it inside the todo div
  todoDiv.appendChild(TrashButton);
  //APPEND TO UL LIST
  todoList.appendChild(todoDiv);
  //clear todo Input value
  todoInput.value = "";
}

function deleteCheck(e) {
  //selects everything in the new todo-item and both buttons
  const item = e.target;
  //delete TODO
  //If the item in the classlast === trash-btn
  if (item.classList[0] === "trash-btn") {
    //delete parent of the item itself (new li and buttons)
    const todo = item.parentElement;
    todo.classList.add("fall");
    //remove it on the storage
    removeLocalTodos(todo);
    //removes the div when animation is completed
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    //add a toggle to the completed class
    todo.classList.toggle("completed");
  }
}

//Filters the todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  //loops to find what we are clicking on
  todos.forEach(function (todo) {
    //e.target is the value, and will check if it is all, completed or uncompleted
    switch (e.target.id) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        //Check if the todos have the list of completed on them
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          //if they don't have the class of completed do not display them
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        //if todo list does not contain completed
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          //if they have the class of completed do not display them
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check if I already have todos here
  let todos;
  if (localStorage.getItem("todos") === null) {
    //If it dosn't exist create an empty array
    todos = [];
  } else {
    // If it does, parse it back into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //push it to the todos array
  todos.push(todo);
  //Push back the array into local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  console.log("hi");
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
