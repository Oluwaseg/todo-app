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
  const todoListContainer = document.querySelector(".js-todo-list");
  todoListContainer.innerHTML = ""; // Clear the container first

  if (todoList.length === 0) {
    todoListContainer.innerHTML = "<p>No todos yet. Add some!</p>";
  } else {
    todoList.forEach(function (todoObject, index) {
      const { name, dueDate, time, completed } = todoObject;

      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      if (completed) {
        todoItem.classList.add("completed");
      }

      const todoDetails = document.createElement("div");
      todoDetails.classList.add("todo-details");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
      checkbox.addEventListener("click", function () {
        toggleTodoStatus(index);
      });

      const todoName = document.createElement("div");
      todoName.classList.add("todo-name");
      if (completed) {
        todoName.classList.add("completed");
      }
      todoName.textContent = name;

      const todoActions = document.createElement("div");
      todoActions.classList.add("todo-actions");

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteTodo(index);
      });

      todoDetails.appendChild(checkbox);
      todoDetails.appendChild(todoName);
      todoActions.appendChild(deleteButton);

      todoItem.appendChild(todoDetails);
      todoItem.appendChild(todoActions);

      todoListContainer.appendChild(todoItem);
    });
  }
}

// ... (other functions like addTodo and deleteTodo)

// The rest of your code remains unchanged

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
