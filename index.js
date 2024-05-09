const express = require('express');
const server = express();
const { taskRouters } = require('./routes/tasks');

server.use(express.json());

server.use("/health", (req, res) => {
    res.send("Working!");
});

server.use("/api", taskRouters);

const port = 8080;
server.listen(port, () => {
    console.log(`Running on port ${port}`); 
});

