import jwt from "jsonwebtoken";
let users = []; // in memory todos
let todoId = 1; // unique id for Each Todo
const JWT_SECRETE = "sujal"; // secrete key for authentication

export async function getAllTodo(req, res) {
    let username = req.username;

    let foundUser = users.find( user => user.username === username);
    
    if (!foundUser) {
        res.status(403).json({ Message : "User not found"})
    } else {
        res.json(foundUser.todos);
    }
}

export async function createTodo(req, res) {
    let username = req.username;
    let task = req.body.task

    let foundUser = users.find( user => user.username === username);

    if (!task) {
        return res.status(400).json({error : "Task is Required"});
    }

    let newTodo = { id : todoId++, task }; // increase counter for each todo

    foundUser.todos.push(newTodo)

    res.status(201).json(newTodo);
    
}

export async function updateTodo(req, res) {
    let username = req.username;
    let task = req.body.task;
    let id = req.params.id;

    let foundUser = users.find( user => user.username === username);

    if (!task) {
        return res.status(400).json({error : "Task is Required"});
    }

    let todoIndex = foundUser.todos.findIndex(todo => todo.id == id);
    
    if (todoIndex !== -1) {
        foundUser.todos[todoIndex] = { id : parseInt(id), task : task };
        res.json(foundUser.todos[todoIndex]);
    } else {
        res.status(400).json({error : "Todo Not Found"})
    }
    
}

export async function deleteTodoById(req, res) {
    let username = req.username;
    let id = req.params.id;

    let foundUser = users.find( user => user.username === username);

   const todoIndex = foundUser.todos.findIndex(todo => todo.id == id);
   

   if (todoIndex !== -1) {
    foundUser.todos.splice(todoIndex, 1);
    res.status(204).send(); 
   } else {
    res.status(404).json({error:"Todo Not Found"});
   }
}

export async function searchTodo(req, res) {
    let username = req.username;
    const { q } = req.query;

    let foundUser = users.find( user => user.username === username);
    if (!q) {
        return res.status(400).json({ message: 'Query parameter missing' });
    }

    let filteredTodos = foundUser.todos.filter((todo) => {
       return todo.task.toLowerCase().includes(q.toLowerCase())
    });

    if (filteredTodos.length == 0) {
        res.status(404).json({Message:"Todo Not Found"});
    } else {
        res.json(filteredTodos);
        
    }
    
}

export async function signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(402).json({ Message : "username & Password are Required"})
    } else {

        let newUser = { username : username, password : password, todos : [] };
    
        users.push(newUser);
        
        res.status(201).json({ Message : "You are sign up" })
    }

}


export async function signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(402).json({ Message : "username & Password are Required"})
    }

    let foundUser = users.find( user => user.username === username && user.password === password)

    if (!foundUser) {
        res.status(402).json({ Message : "invalid credential"});
    } else {
        let token = jwt.sign({ username : username }, JWT_SECRETE);

        res.json({ token : token })
    }
}

export async function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        res.status(403).json({ Messasge : "Token Not Found"});
    }
    try {
        let usernameObj = jwt.verify(token, JWT_SECRETE);

        let foundUser = users.find( user => user.username === usernameObj.username);

        if (!foundUser) {
            res.status(403).json({ Message : "invalid Token"});
        } else {
            req.username = usernameObj.username;
            next();
        }
        
    } catch (error) {
        console.log("the Error is " + error);
    }
    
    
}