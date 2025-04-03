import gamesControllers from "../controllers/games.controllers.js";
import express from "express";

const controllersGames = new gamesControllers;

const app = express.Router();

app.post("/create-game", controllersGames.createGame);
app.get("/get-all", controllersGames.getAllGames);
app.get("/get-one/:id", controllersGames.getGame);
app.put("/update/:id", controllersGames.updateGame);
app.delete("/delete/:id", controllersGames.deleteGame);

export default app;

