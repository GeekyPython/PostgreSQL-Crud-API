# Crud API using Nodejs and PostgreSQL

## Steps:
1. Create a .sql file to create your DB Schema (dabatase.sql)

```
    CREATE DATABASE perntodo;
    CREATE TABLE todo(
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255)
    );
```

2. Create a DB connection/pool inside the db.js file

```
    const Pool = require('pg').Pool;

    const pool = new Pool({
        user: <username>,
        password: <your_password>,
        host: "localhost",
        port: <your_database_port>,
        database: <your_database_name>
    });
```

3. Include the pool into the index.js file to use with your API for your CRUD operations

```
    const pool = require('./db');

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
```