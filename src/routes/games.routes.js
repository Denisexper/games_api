import gamesControllers from "../controllers/games.controllers.js";
import express from "express";

const controllersGames = new gamesControllers;

const app = express.Router();

app.post("/create-game", controllersGames.createGame);

export default app;

