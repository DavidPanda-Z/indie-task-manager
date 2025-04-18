// Game Task Manager - Visual, Minimal, Customizable
// Built with React + TailwindCSS

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

const defaultCategories = ["Art", "Code", "Story", "Audio"];

export default function GameTaskManager() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : {};
  });
  const [newCategory, setNewCategory] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [categories, tasks]);

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const addTask = (category) => {
    const name = prompt("Task name:");
    if (!name) return;
    const newTask = {
      id: uuid(),
      name,
      description: "",
      frequency: "",
      status: "Not Started",
      progress: 0,
    };
    setTasks({
      ...tasks,
      [category]: tasks[category] ? [...tasks[category], newTask] : [newTask],
    });
  };

  const updateTask = (category, taskId, updatedFields) => {
    const updated = tasks[category].map((task) =>
      task.id === taskId ? { ...task, ...updatedFields } : task
    );
    setTasks({ ...tasks, [category]: updated });
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark bg-zinc-900 text-white min-h-screen p-4" : "bg-white text-black min-h-screen p-4"}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Indie Game Task Manager</h1>
        <Button onClick={toggleTheme}>{darkMode ? <Sun /> : <Moon />}</Button>
      </div>

      <div className="mb-4">
        <input
          className="p-2 rounded border mr-2 text-black"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={addCategory}>Add Category</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category} className="bg-zinc-800 p-2 rounded-2xl shadow-md">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">{category}</h2>
                <Button size="sm" onClick={() => addTask(category)}>
                  +
                </Button>
              </div>
              {tasks[category]?.map((task) => (
                <motion.div
                  key={task.id}
                  className="bg-zinc-700 p-2 rounded-lg mb-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    const desc = prompt("Description:", task.description);
                    const freq = prompt("Frequency:", task.frequency);
                    const status = prompt("Status:", task.status);
                    const progress = parseInt(prompt("Progress (0-100):", task.progress), 10);
                    updateTask(category, task.id, {
                      description: desc,
                      frequency: freq,
                      status,
                      progress: isNaN(progress) ? task.progress : progress,
                    });
                  }}
                >
                  <p className="font-medium">{task.name}</p>
                  <div className="text-xs opacity-70">{task.frequency} | {task.status}</div>
                  <div className="w-full bg-zinc-600 rounded h-1 mt-1">
                    <div
                      className="bg-green-400 h-1 rounded"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
