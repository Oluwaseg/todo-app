let todoList = [];

// Load the todoList from local storage if available
const storedTodoList = localStorage.getItem("todoList");
if (storedTodoList) {
  todoList = JSON.parse(storedTodoList);
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = "";

  if (todoList.length === 0) {
    todoListHTML = "<p>No todos yet. Add some!</p>";
  } else {
     let todoListHTML = "";

  if (todoList.length === 0) {
    todoListHTML = "<p>No todos yet. Add some!</p>";
  } else {
    todoList.forEach(function (todoObject, index) {
      const { name, dueDate, time } = todoObject;
      const placeholderImage = name.slice(0, 2).toUpperCase();
      const html = `
      <div class="todo-item">
          <div class="todo-image">
          <div class="placeholder-image">${placeholderImage}</div>
          </div>
          <div class="todo-details">
            <div class="todo-name">${name}</div>
            <div class="todo-due">${dueDate}</div>
            <div class="todo-time">${time}</div>
          </div>
          <div class="todo-actions">
            <button onclick="deleteTodo(${index})" class="delete-btn">Delete</button>
          </div>
        </div>
      `;
      todoListHTML += html;
    });
  }

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const timeInputElement = document.querySelector(".js-due-time-input");
  const dueDate = dateInputElement.value;
  const time = timeInputElement.value;

  let date = new Date()
  let month = date.getMonth()
  if (month != "12" && month != "11") {
    month = `0${month + 1}`
  } else {
    month += 1
  }

  let currentDate = `${date.getFullYear()}-${month}-${date.getDate()}`
  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 < date2) {
      alert("The due date is invalid");
      console.log("invalid")
      return;
    } else if (date1 > date2) {
      todoList.push({
        name,
        dueDate,
        time,
      });
      console.log("valid")
    }
  };



  if (name.trim() === "" || dueDate.trim() === "" || time.trim() === "") {
    alert("Please fill in all fields before adding a new todo.");
    return;
  }

  compareDates(dueDate, currentDate)


  // Save the updated todoList to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  inputElement.value = "";
  dateInputElement.value = "";
  timeInputElement.value = "";
  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  // Save the updated todoList to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
}
