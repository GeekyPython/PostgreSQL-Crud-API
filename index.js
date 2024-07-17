const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create a todo

app.post('/todos', async(req, res) => {
    try
    {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    }
    catch(err)
    {
        console.error(err);
    }
});

//Update a todo
app.put("/todos/:id", async (req, res) => {
    try
    {
        const changedTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [req.body.description, req.params.id]);
        res.json(changedTodo.rows);
    }
    catch(err)
    {
        console.error(err);
    }
});

//List all todos
app.get("/todos", async (req, res) => {
    try
    {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch(err)
    {
        console.error(err);
    }
});

//Get a todo
app.get("/todos/:id", async (req, res) => {
    try
    {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [req.params.id]);
        res.json(todo.rows);
    }
    catch(err)
    {
        console.error(err);
    }
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try
    {
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [req.params.id]);
        console.log(deletedTodo.rows);
        res.json(deletedTodo.rows);
    }
    catch(err)
    {
        console.error(err);
    }
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});