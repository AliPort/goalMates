const express = require('express');
const app = express();
const cors = require('cors');
const Pool = require('./db');
const { application } = require('express');

//middleware

app.use(cors());
app.use(express.json());

//Routes

//create a to do
app.post('/todos', async(req, res) => {
    try {
        
        const { description } = req.body;
        const newTodo = await Pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]
        );

        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});
//get all 

app.get("/todos", async(req, res) => {
    try {
            const allTodos = await Pool.query("SELECT * FROM todo");
            res.json(allTodos.rows);
        }   catch (err) {
            console.error(err.message)
        }
    });


 app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await Pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows);
    }   catch (err) {
        console.error(err.message)
    }
 }) ;  


app.put("/todos/:id", async(req, res) => {
    try {

        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await Pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id ]);

        res.json("The Goal was updated!");
     } catch (err) {
        console.error(err.message)
        }

    })

app.delete("/todos/:id", async(req, res) =>{

    try {

       const {id} = req.params; 
       const deleteTodo = await Pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
       res.json("The Goal was deleted!");
    } catch (err) { 
        console.error(err.message)
    }
})


app.listen(5001, () => {
    console.log('listening on port whatever...');
});