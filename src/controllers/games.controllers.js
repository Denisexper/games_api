import game from "../models/games.models.js";

class gamesControllers {
    async createGame (req, res) {
        try {
            const { name, image, genre, platform, releaseDate, developer, publisher, price, rating, multiplayer, createdAt } = req.body;

            const existinGame = await game.findOne({name});

            if (existinGame) {

                return res.status(400).send({
                    message: "Juego ya existe"
                })
            }

            const newGame = await game.create( {name, image, genre, platform, releaseDate, developer, publisher, price, rating, multiplayer, createdAt} )

            res.status(200).send({
                message: "Juego creado correctamente",
                newGame
            })

        } catch (error) {
            
            res.status(500).send({
                message: "Error creando juego",
                error: error.message
            })
        }
    }

    async getAllGames (req, res) {
        
    }

}

export default gamesControllers;