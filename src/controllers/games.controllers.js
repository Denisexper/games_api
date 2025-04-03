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
        try {
            
            const games = await game.find();
            
            res.status(200).send({
                message: "juesgos obtenidos con exito",
                games
            })

        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo juegos",
                error: error.message
            })
        }
    }

    async getGame (req, res) {
        try {
            
            const { id } = req.params;

            const game1 = await game.findById(id)

            res.status(200).send({
                message: "juego obtenido con exito",
                game1
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo usuario",
                error: error.message
            })
        }
    }

    async updateGame (req, res) {
        try {
            
            const { id } = req.params;

            const {name, image, genre, platform, releaseDate, developer, publisher, price, rating, multiplayer, createdAt} = req.body;

            const newGame = await game.findByIdAndUpdate( id ,{name, image, genre, platform, releaseDate, developer, publisher, price, rating, multiplayer, createdAt}, {new: true});

            res.status(200).send({
                message: "Juego actualizado correctamente",
                newGame
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error actualizando el juego",
                error: error.message
            })
        }
    }

    async deleteGame (req, res) {
        try {
            
            const {id} = req.params;

            const delGame = await game.findByIdAndDelete(id)

            res.status(200).send({
                message: "Juego eliminado correctamente"
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error eliminando el juego",
                error: error.message
            })
        }
    }

}

export default gamesControllers;