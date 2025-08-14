document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const addCategoryBtn = document.getElementById("addCategory");
    const addTaskBtn = document.getElementById("addTask");
    const categoryList = document.getElementById("categoryList");
    const taskList = document.getElementById("taskList");
    const taskCategory = document.getElementById("taskCategory");

    let categories = ["Work", "Personal", "Hobby"];
    let tasks = [];

    function renderCategories() {
        categoryList.innerHTML = "";
        taskCategory.innerHTML = "";
        categories.forEach(cat => {
            let li = document.createElement("li");
            li.textContent = cat;
            categoryList.appendChild(li);

            let option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            taskCategory.appendChild(option);
        });
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            let div = document.createElement("div");
            div.classList.add("task-card");
            div.innerHTML = `
                <strong>${task.name}</strong> (${task.category})<br>
                Frequency: ${task.frequency}<br>
                Notes: ${task.notes}
            `;
            taskList.appendChild(div);
        });
    }

    addCategoryBtn.addEventListener("click", () => {
        let newCat = document.getElementById("newCategory").value.trim();
        if (newCat && !categories.includes(newCat)) {
            categories.push(newCat);
            document.getElementById("newCategory").value = "";
            renderCategories();
        }
    });

    addTaskBtn.addEventListener("click", () => {
        let name = document.getElementById("newTask").value.trim();
        let category = taskCategory.value;
        let notes = document.getElementById("taskNotes").value.trim();
        let frequency = document.getElementById("taskFrequency").value;

        if (name) {
            tasks.push({ name, category, notes, frequency });
            document.getElementById("newTask").value = "";
            document.getElementById("taskNotes").value = "";
            renderTasks();
        }
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    });

    renderCategories();
    renderTasks();
});
