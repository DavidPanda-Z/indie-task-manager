let categories = JSON.parse(localStorage.getItem("categories")) || ["Work", "Personal"];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isLightMode = localStorage.getItem("theme") === "light";

document.body.classList.toggle("light", isLightMode);

// Elements
const categoryList = document.getElementById("categoryList");
const taskCategory = document.getElementById("taskCategory");
const taskList = document.getElementById("taskList");
const newCategoryInput = document.getElementById("newCategory");
const addCategoryBtn = document.getElementById("addCategory");
const newTaskInput = document.getElementById("newTask");
const addTaskBtn = document.getElementById("addTask");
const searchTasks = document.getElementById("searchTasks");
const themeToggle = document.getElementById("themeToggle");

// Render Functions
function renderCategories() {
    categoryList.innerHTML = "";
    taskCategory.innerHTML = "";
    categories.forEach(cat => {
        let li = document.createElement("li");
        li.textContent = cat;
        li.onclick = () => filterTasks(cat);
        categoryList.appendChild(li);

        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        taskCategory.appendChild(option);
    });
    localStorage.setItem("categories", JSON.stringify(categories));
}

function renderTasks(filtered = tasks) {
    taskList.innerHTML = "";
    filtered.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = `${task.name} (${task.category})`;
        li.draggable = true;
        li.ondragstart = e => e.dataTransfer.setData("index", index);
        li.ondblclick = () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };
        taskList.appendChild(li);
    });
}

// Event Listeners
addCategoryBtn.onclick = () => {
    if (newCategoryInput.value.trim()) {
        categories.push(newCategoryInput.value.trim());
        newCategoryInput.value = "";
        renderCategories();
    }
};

addTaskBtn.onclick = () => {
    if (newTaskInput.value.trim()) {
        tasks.push({ name: newTaskInput.value.trim(), category: taskCategory.value });
        newTaskInput.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
};

searchTasks.oninput = () => {
    let query = searchTasks.value.toLowerCase();
    let filtered = tasks.filter(t => t.name.toLowerCase().includes(query));
    renderTasks(filtered);
};

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
};

// Drag and Drop
taskList.ondragover = e => e.preventDefault();
taskList.ondrop = e => {
    let fromIndex = e.dataTransfer.getData("index");
    let toIndex = [...taskList.children].indexOf(e.target);
    let moved = tasks.splice(fromIndex, 1)[0];
    tasks.splice(toIndex, 0, moved);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
};

function filterTasks(category) {
    let filtered = tasks.filter(t => t.category === category);
    renderTasks(filtered);
}

// Initial Render
renderCategories();
renderTasks();
