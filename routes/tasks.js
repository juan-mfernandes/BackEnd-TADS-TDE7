const express = require('express');
const taskRouters = express.Router();

let tasks = [
    {   
        "id": 1,
        "name": "Comprar leite",
        "description": "Ir ao mercado da esquina e comprar leite.",
        "isDone": false
    },
    {
        "id": 2,
        "name": "Lavar o carro",
        "description": "Birar o carro da garagem e lava-lo.",
        "isDone": true
    },
    {
        "id": 3,
        "name": "Beber agua",
        "description": "Beber pelo menos 3 litros de agua no dia.",
        "isDone": true
    },
    {
        "id": 4,
        "name": "Limpar a casa",
        "description": "Limpar a casa apos as 14:30h da tarde.",
        "isDone": false
    },
    {
        "id": 5,
        "name": "Fazer um bolo",
        "description": "Fazer o bolo prometido para a festa de aniversario.",
        "isDone": false
    },
];

taskRouters.get("/tasks", (req, res) => {
    res.json(tasks);
});

taskRouters.post("/tasks", (req, res) => {
    const data = req.body;
    console.log(data.description);
    const task = {
        id: tasks.length + 1,
        name: data.name,
        description: data.description,
        isDone: data.isDone
    };
    tasks.push(task);
    res.json(task);
});

taskRouters.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const task = tasks.find(task => task.id === Number(id));
    if (!task) {
        return res.status(404).send("Task not found");
    }
    task.name = data.name;
    task.description = data.description;
    task.isDone = data.isDone;
    res.json({task});
});

taskRouters.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(404).send("Task not found");
    const taskId = tasks.findIndex((task) => {return task.id === id});
    const deletedTask = tasks[taskId];
    tasks.splice(taskId, 1);
    res.json(deletedTask);
});

module.exports = { taskRouters };