const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "active" && task.completed ||
      filter === "completed" && !task.completed
    ) {
      return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div class="actions">
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Enter a task");
    return;
  }

  tasks.push({
    text,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const updated = prompt("Edit Task", tasks[index].text);

  if (updated !== null && updated.trim() !== "") {
    tasks[index].text = updated;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();