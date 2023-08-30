let todoList = [];

// Load the todoList from local storage if available
const storedTodoList = localStorage.getItem("todoList");
if (storedTodoList) {
  todoList = JSON.parse(storedTodoList);
  renderTodoList();
}

function toggleTodoStatus(index) {
  todoList[index].completed = !todoList[index].completed;
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = "";

  if (todoList.length === 0) {
    todoListHTML = "<p>No todos yet. Add some!</p>";
  } else {
    todoList.forEach(function (todoObject, index) {
      const { name, dueDate, time, completed } = todoObject;
      const placeholderImage = name.slice(0, 2).toUpperCase();

      const html = `
        <div class="todo-item ${completed ? "completed" : ""}">
          <div class="todo-image">
            <div class="placeholder-image">${placeholderImage}</div>
          </div>
          <div class="todo-details">
            <div class="todo-name ${completed ? "completed" : ""}">${name}</div>

          <div class="todo-actions">
          <input type="checkbox" ${
            completed ? "checked" : ""
          } onclick="toggleTodoStatus(${index})">
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

  if (name.trim() === "") {
    alert("Please fill in the todo name before adding a new todo.");
    return;
  }

  todoList.push({
    name,
    completed: false,
  });

  // Save the updated todoList to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  inputElement.value = "";
  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  // Save the updated todoList to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
}
