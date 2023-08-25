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
    for (let i = 0; i < todoList.length; i++) {
      const todoObject = todoList[i];
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
            <button onclick="deleteTodo(${i})" class="delete-btn">Delete</button>
          </div>
        </div>
      `;
      todoListHTML += html;
    }
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

  if (name.trim() === "" || dueDate.trim() === "" || time.trim() === "") {
    alert("Please fill in all fields before adding a new todo.");
    return;
  }

  todoList.push({
    name,
    dueDate,
    time,
  });

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
