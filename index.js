import express from 'express';
import connectionDB from './db/connectionDB.js';
import bookRouter from './src/modules/book/book.routes.js';
import authorRouter from './src/modules/author/author.routes.js';

const app = express();
const port=5000;

app.use(express.json());
connectionDB()

app.use('/books',bookRouter);
app.use('/authors',authorRouter)

app.use('*',(req,res)=>res.status(404).json('404 NOT FOUND'));

app.listen(port,()=>console.log(`Server is running on port ${port}`));