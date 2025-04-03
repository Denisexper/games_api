import connection from './src/config/connection.js';
import express from 'express'
import gamesRoutes from './src/routes/games.routes.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());


const port = process.env.PORT || 4000;

app.listen(port, ()=> {
    console.log("Server is running ar port 4000")
})

connection();

app.use('/api', gamesRoutes);

